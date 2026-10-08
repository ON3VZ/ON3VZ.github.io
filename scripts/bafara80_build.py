#!/usr/bin/env python3
"""
Build assets/bafara80/result.json for the BAFARA Award OR80AF tracker page.
Added 2026-10-08. Remove: delete this file, assets/bafara80/, the OR80AF post in _posts/,
css/bafara80.css, js/bafara80.js and .github/workflows/bafara80.yml.

Rules applied (https://www.bafara80.be/regles.php):
  * a contact counts once per station x band x mode group, whatever the date
  * mode groups: CW, PHONE, DIGI
  * only QSOs dated inside the event window (UTC) are matched

Freeze: the last matching run may happen on 2026-11-01 (UTC). From
2026-11-02 00:00 UTC the script never reads an ADIF again; it only marks
the existing result as frozen. Once frozen it does nothing at all.
"""
import glob
import json
import os
import re
import sys
from datetime import datetime, timezone

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DATA_DIR = os.path.join(ROOT, 'assets', 'data')
OUT_DIR = os.path.join(ROOT, 'assets', 'bafara80')
STATIONS = os.path.join(OUT_DIR, 'stations.json')
RESULT = os.path.join(OUT_DIR, 'result.json')

EVENT_START = '20261001'
EVENT_END = '20261031'
FREEZE_AT = datetime(2026, 11, 2, 0, 0, tzinfo=timezone.utc)

PHONE_MODES = {'SSB', 'USB', 'LSB', 'AM', 'FM'}
BAND_EDGES = [  # MHz ranges -> band, used only when BAND is missing
    (1.8, 2.0, '160m'), (3.5, 4.0, '80m'), (5.0, 5.5, '60m'), (7.0, 7.3, '40m'),
    (10.1, 10.15, '30m'), (14.0, 14.35, '20m'), (18.068, 18.168, '17m'),
    (21.0, 21.45, '15m'), (24.89, 24.99, '12m'), (28.0, 29.7, '10m'),
    (50.0, 54.0, '6m'), (144.0, 146.0, '2m'), (430.0, 440.0, '70cm'),
]


def parse_records(text):
    body = re.split(r'<eoh>', text, maxsplit=1, flags=re.I)
    body = body[1] if len(body) > 1 else text
    out = []
    for rec in re.split(r'<eor>', body, flags=re.I):
        fields = dict(re.findall(r'<(\w+):\d+(?::\w+)?>([^<]*)', rec, flags=re.I))
        fields = {k.upper(): v.strip() for k, v in fields.items()}
        if fields:
            out.append(fields)
    return out


def band_of(f):
    b = f.get('BAND', '').strip().lower()
    if b:
        return b
    try:
        mhz = float(f.get('FREQ', ''))
    except ValueError:
        return ''
    for lo, hi, name in BAND_EDGES:
        if lo <= mhz <= hi:
            return name
    return ''


def mode_group(f):
    m = f.get('MODE', '').upper()
    if m == 'CW':
        return 'CW'
    if m in PHONE_MODES:
        return 'PHONE'
    return 'DIGI'  # FT8, FT4, RTTY, PSK, JT, MFSK ... (and anything unknown)


def station_of(call, known):
    """Map a logged callsign (ON8LX/P, OR80AF/QRP ...) to a listed station."""
    parts = call.upper().split('/')
    for p in parts:
        if p in known:
            return p
    return None


def load_qsos():
    # Every .adi in the folder counts. The manifest list is only used as an extra source:
    # it is rewritten by another workflow at the same moment and may lag behind an upload.
    names = {os.path.basename(p) for p in glob.glob(os.path.join(DATA_DIR, '*.adi'))}
    manifest = os.path.join(DATA_DIR, 'manifest.json')
    if os.path.exists(manifest):
        try:
            names |= set(json.load(open(manifest))['files'])
        except (ValueError, KeyError):
            pass
    names = sorted(names)
    seen, qsos = set(), []
    for name in names:
        path = os.path.join(DATA_DIR, name)
        if not os.path.exists(path):
            continue
        with open(path, errors='replace') as fh:
            recs = parse_records(fh.read())
        for r in recs:
            key = (r.get('CALL', '').upper(), r.get('QSO_DATE', ''),
                   r.get('TIME_ON', '')[:4], band_of(r), mode_group(r))
            if key in seen:
                continue
            seen.add(key)
            qsos.append(r)
    return qsos


def grade_for(points, grades):
    best = None
    for g in grades:
        if points >= g['points']:
            best = g
    return best


def main():
    ref = json.load(open(STATIONS))
    now = datetime.now(timezone.utc)
    previous = json.load(open(RESULT)) if os.path.exists(RESULT) else None

    if previous and previous.get('frozen'):
        print('Event result is frozen, nothing to do.')
        return 0

    if now >= FREEZE_AT:
        # Past the last allowed run: never read an ADIF again.
        if previous is None:
            print('Frozen without a previous result; writing an empty final result.')
            previous = build_result(ref, [], now)
        previous['frozen'] = True
        previous['frozen_at'] = now.strftime('%Y-%m-%dT%H:%MZ')
        write(previous)
        print('Freeze applied.')
        return 0

    known = {s['call'] for s in ref['stations']}
    first = {}
    for r in load_qsos():
        d = r.get('QSO_DATE', '')
        if not (EVENT_START <= d <= EVENT_END):
            continue
        st = station_of(r.get('CALL', ''), known)
        if not st:
            continue
        band = band_of(r)
        if not band:
            continue
        key = (st, band, mode_group(r))
        if key not in first or d < first[key]:
            first[key] = d
    result = build_result(ref, first, now)
    write(result)
    print('Score: %d points, %d combinations, %d stations' % (
        result['score']['points'], result['score']['combos'], result['score']['stations']))
    return 0


def build_result(ref, first, now):
    cat = {s['call']: s['cat'] for s in ref['stations']}
    worked = []
    total = 0
    for (st, band, mode), d in sorted(first.items(), key=lambda kv: (kv[1], kv[0])):
        pts = ref['points'][cat[st]][mode]
        total += pts
        worked.append({'call': st, 'band': band, 'mode': mode,
                       'date': '%s-%s-%s' % (d[:4], d[4:6], d[6:])})
    g = grade_for(total, ref['grades'])
    return {
        'event': 'OR80AF',
        'window': {'start': '2026-10-01', 'end': '2026-10-31'},
        'generated': now.strftime('%Y-%m-%dT%H:%MZ'),
        'frozen': False,
        'score': {
            'points': total,
            'combos': len(worked),
            'stations': len({w['call'] for w in worked}),
            'grade': g['name'] if g else None,
        },
        'worked': worked,
    }


def write(obj):
    with open(RESULT, 'w') as fh:
        json.dump(obj, fh, indent=2)
        fh.write('\n')


if __name__ == '__main__':
    sys.exit(main())
