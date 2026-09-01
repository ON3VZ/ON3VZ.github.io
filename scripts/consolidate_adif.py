#!/usr/bin/env python3
"""
Consolidate ON3VZ ADIF snapshot uploads into a single deduplicated archive,
then prune snapshot files older than RETENTION_DAYS.

Why this exists: each upload to assets/data/ is a FULL cumulative export
from QRZ Logbook (every new file already contains every previous QSO plus
whatever's new), so the raw snapshots pile up and mostly duplicate each
other. This script never assumes that stays true, though — it always
merges every QSO from every file into assets/data/archive.adi first, and
only deletes an old snapshot file after confirming the merged archive has
at least as many records as the newest snapshot did. If that check fails,
nothing is deleted.

Safe to re-run any time; re-running with no old files to prune is a no-op.
"""
import re
import sys
import glob
import os
from datetime import datetime, timezone

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'data')
RETENTION_DAYS = 30
ARCHIVE_NAME = 'archive.adi'
FILENAME_RE = re.compile(r'\.(\d{14})\.adi$')  # on3vz.468118.YYYYMMDDHHMMSS.adi


def parse_records(text):
    """Split raw ADIF text into a list of {FIELD: value} dicts."""
    body = re.split(r'<eoh>', text, maxsplit=1, flags=re.I)
    body = body[1] if len(body) > 1 else text
    records = re.split(r'<eor>', body, flags=re.I)
    out = []
    for rec in records:
        fields = dict(re.findall(r'<(\w+):\d+(?::\w+)?>([^<]*)', rec, flags=re.I))
        fields = {k.upper(): v.strip() for k, v in fields.items()}
        if fields:
            out.append(fields)
    return out


def dedup_key(f):
    """Mirror js/logbook.js:deduplicateQsos() exactly.

    FIXED 2026-09-01: previously rounded TIME_ON to a ~10-minute bucket
    (t[:3]), which collapsed genuinely different QSOs with the same call
    on the same band/mode within that window (e.g. two separate FT8
    contacts with the same station a minute apart) into a single record.
    That silently dropped real QSOs and tripped this script's own safety
    check every month (merged count < newest snapshot count), aborting
    the whole consolidation run. The only thing this key needs to catch
    is the SAME QSO appearing in multiple cumulative QRZ exports, and
    re-exports always carry an identical TIME_ON for a given QSO, so the
    full timestamp is used with no rounding.
    Revert: change `t` back to `t[:3]` below.
    """
    t = f.get('TIME_ON', '0000')
    return (
        f.get('CALL', '').lower(),
        f.get('QSO_DATE', ''),
        t,
        f.get('BAND', '').lower(),
        f.get('MODE', '').lower(),
    )


def record_to_adif(f):
    parts = []
    for k, v in f.items():
        parts.append(f'<{k}:{len(v)}>{v}')
    parts.append('<eor>')
    return ''.join(parts) + '\n'


def file_age_days(filename):
    m = FILENAME_RE.search(filename)
    if not m:
        return None  # unknown naming pattern (e.g. legacy 'logbook') -> treat as always-old
    ts = datetime.strptime(m.group(1), '%Y%m%d%H%M%S')
    return (datetime.now(timezone.utc) - ts.replace(tzinfo=timezone.utc)).days


def main():
    # FIXED 2026-09-01: previously globbed every file in assets/data/ and
    # excluded only a fixed set of names by exact match. Any other non-ADIF
    # file dropped into that folder (e.g. qsl-manifest.json, which lives
    # there for the QSL wall) was silently treated as a source snapshot:
    # merged as if it were ADIF (contributing nothing, since it has no
    # <eor> records) and then deleted during pruning, since its filename
    # never matches the timestamp pattern. Only ever touch *.adi files.
    # Revert: change the glob back to '*' and drop the .adi filter.
    all_files = sorted(
        f for f in glob.glob(os.path.join(DATA_DIR, '*.adi'))
        if os.path.basename(f) not in ('manifest.json', '.gitkeep', ARCHIVE_NAME)
    )
    if not all_files:
        print('No source files found, nothing to do.')
        return 0

    # Merge everything (including any pre-existing archive.adi if present).
    merged = {}
    newest_snapshot_count = 0
    newest_mtime = None
    for fp in all_files:
        text = open(fp, encoding='utf-8', errors='ignore').read()
        recs = parse_records(text)
        if fp.endswith('.adi'):
            age = file_age_days(os.path.basename(fp))
            if age is not None and (newest_mtime is None or age < newest_mtime):
                newest_mtime = age
                newest_snapshot_count = len(recs)
        for r in recs:
            key = dedup_key(r)
            if key not in merged:
                merged[key] = r
            else:
                if len([v for v in r.values() if v]) > len([v for v in merged[key].values() if v]):
                    merged[key] = r

    merged_count = len(merged)
    print(f'Merged {merged_count} unique QSOs from {len(all_files)} file(s).')
    print(f'Newest snapshot had {newest_snapshot_count} record(s).')

    # Safety check — never write/delete anything if the merge looks incomplete.
    if merged_count < newest_snapshot_count:
        print('SAFETY CHECK FAILED: merged archive has fewer records than the '
              'newest snapshot. Aborting without changes.', file=sys.stderr)
        return 1

    # Write the consolidated archive.
    archive_path = os.path.join(DATA_DIR, ARCHIVE_NAME)
    header = (
        'QRZLogbook consolidated archive for on3vz\n'
        f'    Generated: {datetime.now(timezone.utc).strftime("%a %b %d %H:%M:%S %Y")} UTC\n'
        f'    Records: {merged_count}\n'
        '<ADIF_VER:5>3.1.1\n'
        '<PROGRAMID:17>consolidate_adif.py\n'
        '<eoh>\n'
    )
    with open(archive_path, 'w', encoding='utf-8') as out:
        out.write(header)
        for r in merged.values():
            out.write(record_to_adif(r))
    print(f'Wrote {archive_path} ({merged_count} records).')

    # Prune snapshots older than RETENTION_DAYS (archive.adi itself is exempt).
    removed = []
    for fp in all_files:
        base = os.path.basename(fp)
        if base == ARCHIVE_NAME:
            continue
        age = file_age_days(base)
        # Unknown naming pattern (e.g. legacy 'logbook' file) counts as old,
        # since its content is by definition already merged above.
        is_old = age is None or age > RETENTION_DAYS
        if is_old:
            os.remove(fp)
            removed.append(base)

    print(f'Removed {len(removed)} file(s) older than {RETENTION_DAYS} days:')
    for r in removed:
        print(f'  - {r}')

    return 0


if __name__ == '__main__':
    sys.exit(main())
