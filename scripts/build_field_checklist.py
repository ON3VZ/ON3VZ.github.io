#!/usr/bin/env python3
"""
Build the ON3VZ/P field checklists (EN + NL) as print-ready A4 PDFs.

Regenerate with:
    python3 scripts/build_field_checklist.py

Output:
    assets/files/on3vz-p-field-checklist-en.pdf
    assets/files/on3vz-p-veldchecklist-nl.pdf

Layout constants below reproduce the original hand-built PDFs exactly
(A4, 45.354 pt margins, 14.9 pt item pitch). Edit CONTENT_EN / CONTENT_NL
to change the checklists; do not edit the PDFs directly.
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

PW, PH = A4
M = 45.354
RIGHT = PW - M

C_HEADER_BG = Color(0.07451, 0.164706, 0.117647)
C_ACCENT = Color(0.388235, 0.600000, 0.133333)
C_TITLE = Color(0.639216, 0.819608, 0.415686)
C_BADGE = Color(0.980392, 0.780392, 0.458824)
C_SUBTLE = Color(0.764706, 0.850980, 0.784314)
C_SECTION = Color(0.231373, 0.427451, 0.066667)
C_TEXT = Color(0.109804, 0.164706, 0.121569)
C_FOOT = Color(0.352941, 0.435294, 0.372549)
C_RULE = Color(0.764706, 0.835294, 0.776471)

HEADER_H = 68.0
ACCENT_H = 2.8
BODY_TOP = 86.9
BODY_BOTTOM = 790.0
FOOT_RULE_Y = 802.2
FOOT_TEXT_Y = 807.6

PITCH = 14.9
GAP_SUB_TO_ITEM = 18.2
GAP_ITEM_TO_SUB = 25.3
GAP_SECTION_TO_SUB = 26.7
GAP_BEFORE_SECTION = 33.7
PARA_LEADING = 13.0

F_BODY, S_BODY = "Helvetica", 8.8
F_SUB, S_SUB = "Helvetica-Bold", 10.0
F_SEC, S_SEC = "Helvetica-Bold", 13.0
F_PARA, S_PARA = "Helvetica", 9.0
F_FOOT, S_FOOT = "Helvetica", 7.5

BOX = 8.79
TEXT_X = M + 17.0


def wrap(text, font, size, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = w if not cur else cur + " " + w
        if stringWidth(trial, font, size) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines or [""]


class Sheet:
    def __init__(self, path, strings):
        self.c = canvas.Canvas(path, pagesize=A4)
        self.s = strings
        self.page = 0
        self.y = 0
        self.last_leading = PITCH
        self._new_page()

    def _new_page(self):
        if self.page:
            self.c.showPage()
        self.page += 1
        c = self.c
        c.setFillColor(C_HEADER_BG)
        c.rect(0, PH - HEADER_H, PW, HEADER_H, stroke=0, fill=1)
        c.setFillColor(C_ACCENT)
        c.rect(0, PH - HEADER_H - ACCENT_H, PW, ACCENT_H, stroke=0, fill=1)
        c.setFillColor(C_TITLE)
        c.setFont("Courier-Bold", 19)
        c.drawString(M, PH - 41.5, "ON3VZ/P")
        c.setFillColor(C_SUBTLE)
        c.setFont("Helvetica", 8.5)
        c.drawString(M, PH - 57.5, self.s["subtitle"])
        c.setFillColor(C_BADGE)
        c.setFont("Courier-Bold", 11)
        c.drawRightString(RIGHT, PH - 42.5, "5 W  QRP")
        c.setFillColor(C_SUBTLE)
        c.setFont("Helvetica", 8.0)
        c.drawRightString(RIGHT, PH - 57.5, "QRP Labs QMX")
        c.setStrokeColor(C_RULE)
        c.setLineWidth(0.4)
        c.line(M, PH - FOOT_RULE_Y, RIGHT, PH - FOOT_RULE_Y)
        c.setFillColor(C_FOOT)
        c.setFont(F_FOOT, S_FOOT)
        c.drawString(M, PH - FOOT_TEXT_Y - S_FOOT + 1.5, self.s["footer"])
        c.drawRightString(RIGHT, PH - FOOT_TEXT_Y - S_FOOT + 1.5, str(self.page))
        self.y = BODY_TOP
        self.last_leading = None

    def _room(self, need):
        if self.y + need > BODY_BOTTOM:
            self._new_page()

    def _base(self, size):
        return PH - self.y - size

    def para(self, text):
        lines = wrap(text, F_PARA, S_PARA, RIGHT - M)
        self._room(PARA_LEADING * len(lines))
        self.c.setFillColor(C_TEXT)
        self.c.setFont(F_PARA, S_PARA)
        for ln in lines:
            self.c.drawString(M, self._base(S_PARA), ln)
            self.y += PARA_LEADING
        self.last_leading = PARA_LEADING

    def section(self, text):
        self._room(GAP_SECTION_TO_SUB + PITCH * 3)
        if self.last_leading:
            self.y += GAP_BEFORE_SECTION - self.last_leading
        self.c.setFillColor(C_SECTION)
        self.c.setFont(F_SEC, S_SEC)
        self.c.drawString(M, self._base(S_SEC), text)
        self.y += GAP_SECTION_TO_SUB
        self.last_leading = PITCH

    def sub(self, text, first=False):
        self._room(GAP_SUB_TO_ITEM + PITCH * 2)
        if not first:
            self.y += GAP_ITEM_TO_SUB - PITCH
        self.c.setFillColor(C_TEXT)
        self.c.setFont(F_SUB, S_SUB)
        self.c.drawString(M, self._base(S_SUB), text)
        self.y += GAP_SUB_TO_ITEM

    def item(self, text, box=True):
        lines = wrap(text, F_BODY, S_BODY, RIGHT - TEXT_X)
        self._room(PITCH * len(lines))
        c = self.c
        if box:
            top = self._base(S_BODY) + S_BODY - 1.5
            c.setStrokeColor(C_ACCENT)
            c.setLineWidth(0.7)
            c.rect(M, top - BOX, BOX, BOX, stroke=1, fill=0)
        c.setFillColor(C_TEXT)
        c.setFont(F_BODY, S_BODY)
        for i, ln in enumerate(lines):
            c.drawString(TEXT_X, self._base(S_BODY), ln)
            self.y += PITCH if i < len(lines) - 1 else 0
        self.y += PITCH

    def note(self, text):
        lines = wrap(text, "Helvetica-Oblique", S_BODY, RIGHT - TEXT_X)
        self._room(PITCH * len(lines) + 4)
        self.y += 4
        self.c.setFillColor(C_FOOT)
        self.c.setFont("Helvetica-Oblique", S_BODY)
        for ln in lines:
            self.c.drawString(TEXT_X, self._base(S_BODY), ln)
            self.y += PITCH

    def band(self, label, text):
        self._room(PITCH)
        self.c.setFillColor(C_SECTION)
        self.c.setFont(F_SUB, S_BODY)
        self.c.drawString(M, self._base(S_BODY), label)
        self.c.setFillColor(C_TEXT)
        self.c.setFont(F_BODY, S_BODY)
        self.c.drawString(TEXT_X + 18, self._base(S_BODY), text)
        self.y += PITCH

    def table(self, head, rows):
        colx = (M, M + 250)
        colw = (240, RIGHT - colx[1])
        self._room(PITCH * 3)
        self.c.setFillColor(C_SECTION)
        self.c.setFont(F_SUB, S_BODY)
        for x, t in zip(colx, head):
            self.c.drawString(x, self._base(S_BODY), t)
        self.y += PITCH * 0.6
        self.c.setStrokeColor(C_RULE)
        self.c.setLineWidth(0.4)
        self.c.line(M, PH - self.y, RIGHT, PH - self.y)
        self.y += PITCH * 0.55
        for a, b in rows:
            la = wrap(a, F_BODY, S_BODY, colw[0])
            lb = wrap(b, F_BODY, S_BODY, colw[1])
            n = max(len(la), len(lb))
            self._room(PITCH * n + 4)
            y0 = self.y
            self.c.setFillColor(C_TEXT)
            self.c.setFont(F_BODY, S_BODY)
            for i, ln in enumerate(la):
                self.y = y0 + i * PITCH
                self.c.drawString(colx[0], self._base(S_BODY), ln)
            for i, ln in enumerate(lb):
                self.y = y0 + i * PITCH
                self.c.drawString(colx[1], self._base(S_BODY), ln)
            self.y = y0 + n * PITCH + 3
        self.y += 4

    def page_break(self):
        self._new_page()

    def save(self):
        self.c.showPage()
        self.c.save()


def render(path, doc):
    sheet = Sheet(path, doc["strings"])
    for kind, *args in doc["blocks"]:
        getattr(sheet, kind)(*args)
    sheet.save()
    return path


CONTENT_EN = {
    "strings": {
        "subtitle": "Field checklist  ·  WWFF / ONFF  ·  portable activations",
        "footer": "ON3VZ/P field checklist  ·  on3vz.github.io  ·  73 and 44",
    },
    "blocks": [
        ("para", "Work through this block by block. Blocks A and B are done at home, "
                 "C to E in the field, F afterwards. The most common mistakes are at "
                 "the end. Read those at least once before your first activation."),

        ("section", "A  ·  At home, the night before"),
        ("sub", "A1  ·  Choose the location", True),
        ("item", "Reference chosen (ONFF number), or deliberately \u201cno reference\u201d for plain portable"),
        ("item", "Boundaries checked against the official ONFF KMZ. Will I really be inside?"),
        ("item", "Gridsquare of the location looked up (6 characters, e.g. JO20qe)"),
        ("item", "Access and parking checked; is permission needed?"),
        ("sub", "A2  ·  TQSL"),
        ("item", "Station Location created for this site, under ON3VZ/P"),
        ("item", "Named by convention: place or reference + grid, e.g. ONFF-0599 Alouette JO20xx"),
        ("item", "DXCC Belgium  ·  CQ 14  ·  ITU 27  ·  correct gridsquare"),
        ("sub", "A3  ·  Log4OM"),
        ("item", "Configuration ON3VZ-P portable loaded, not the shack configuration"),
        ("item", "Station Callsign = ON3VZ/P"),
        ("item", "Operator Callsign = ON3VZ"),
        ("item", "Station Gridsquare = today\u2019s grid"),
        ("item", "Station configuration: QMX + Band Hopper IV, power 5 W"),
        ("item", "LoTW Station ID points to the correct Station Location"),
        ("item", "For a WWFF activation: My Sig = WWFF, My Sig Info = ONFF-xxxx"),
        ("item", "Without WWFF: leave My Sig and My Sig Info empty"),
        ("item", "Test QSO entered, ADIF fields verified, test QSO deleted again"),
        ("sub", "A4  ·  WSJT-X"),
        ("item", "Configuration Portable loaded"),
        ("item", "My Call = ON3VZ/P"),
        ("item", "My Grid = today\u2019s grid"),
        ("item", "Rig = QRPLabs QMX on the correct COM port, PTT method = CAT"),
        ("item", "Poll interval 2 to 3 s, not the default 10 s"),
        ("item", "\u201cHalt Tx when SWR is above 2.5\u201d enabled, PWR and SWR display on"),
        ("item", "Audio in and out = USB sound card of the QMX"),
        ("item", "UDP forwarding to Log4OM enabled"),
        ("item", "PSK Reporter spotting enabled, so reach is measured even without QSOs"),
        ("item", "Hamlib on a stable release, not a release candidate"),
        ("sub", "A5  ·  PoLo, for SSB and later CW"),
        ("item", "Operator call ON3VZ, station call ON3VZ/P"),
        ("item", "New activation created with the correct reference"),
        ("item", "Power set to 5 W"),
        ("item", "Offline datafiles refreshed, so callsign lookup works without a network"),
        ("item", "Self-spotting enabled"),
        ("sub", "A6  ·  Backup and power"),
        ("item", "Log4OM database exported to OneDrive"),
        ("item", "TQSL backup up to date"),
        ("item", "Battery, laptop, phone and power bank all fully charged"),

        ("section", "B  ·  Packing"),
        ("sub", "Radio", True),
        ("item", "QMX + USB-C cable"),
        ("item", "Battery, cables and fuse"),
        ("item", "DC-DC buck converter and Powerpole leads"),
        ("item", "Headphones"),
        ("item", "G7UFO Turret microphone (for SSB)"),
        ("sub", "Antenna"),
        ("item", "Band Hopper IV. The 80 m section stays coiled on its winders"),
        ("item", "Tactical 7000hds mast + ground spike or tripod"),
        ("item", "Guy lines and pegs"),
        ("item", "Coax, kept as short as possible"),
        ("item", "Clip-on ferrites for the feedline"),
        ("item", "SWR meter or analyser"),
        ("item", "Throw line in case the mast cannot be used"),
        ("sub", "Logging"),
        ("item", "Laptop + charger (for FT8)"),
        ("item", "iPad or phone with PoLo (for SSB)"),
        ("item", "Paper backup log and pen. Always works"),
        ("sub", "Everything else"),
        ("item", "Chair or mat, rain gear, water, food"),
        ("item", "Phone with the ONFF KMZ available offline"),
        ("item", "Camera or phone for the mandatory photos"),

        ("section", "C  ·  On site, before the first QSO"),
        ("sub", "Power", True),
        ("item", "Converter output read at 11.50 V on its own display, before the radio is connected"),
        ("note", "The QMX accepts 6.0 to 12.0 V. A charged 12 V LiFePO4 sits above 13 V."),
        ("sub", "Antenna"),
        ("item", "GPS check: am I inside the boundaries of the reference?"),
        ("item", "Antenna up, links set for the starting band"),
        ("item", "Same number of links closed on BOTH legs, counted on both sides"),
        ("item", "Dipole ends out of reach of walkers, at least 2 m high"),
        ("item", "SWR measured before the first transmission. The QMX has no ATU"),
        ("sub", "Software"),
        ("item", "Log4OM: correct configuration? Check the title bar"),
        ("item", "WSJT-X: correct call and grid? Check the title bar"),
        ("item", "Clock synchronised. FT8 fails without accurate time"),
        ("item", "Photos taken: at least two, or one with GPS location"),
        ("note", "Without photos ONFF will reject your log. Do this now, not afterwards."),

        ("section", "D  ·  During the activation"),
        ("sub", "Every session", True),
        ("item", "Self-spot posted, with the reference and \u201c5W QRP\u201d in the comment"),
        ("item", "Park-to-park: the other station\u2019s reference noted"),
        ("item", "At least 60 minutes on the air, counted from the first QSO"),
        ("sub", "After every band change"),
        ("item", "Links changed on BOTH legs, counted"),
        ("item", "SWR measured again before transmitting"),
        ("item", "WSJT-X dial frequency matches the radio"),
        ("item", "Self-spot repeated"),

        ("section", "Daylight band plan"),
        ("sub", "Where to start", True),
        ("band", "20 m", "The daytime workhorse. Widest reach, most hunters active"),
        ("band", "40 m", "Early morning and late afternoon. Where the Benelux hunters are"),
        ("band", "30 m", "When 20 and 40 disappoint. No contests, no SSB"),

        ("section", "E  ·  Packing up"),
        ("sub", "Before driving off", True),
        ("item", "Time of the last QSO noted"),
        ("item", "Antenna and mast fully recovered, nothing left behind"),
        ("item", "All pegs pulled out of the ground"),
        ("item", "Rubbish taken along"),
        ("item", "Log exported or synchronised"),

        ("section", "F  ·  At home, after the activation"),
        ("sub", "F1  ·  Consolidate the log", True),
        ("item", "For SSB: export ADIF from PoLo and import into Log4OM"),
        ("item", "For FT8: QSOs are already in Log4OM via UDP, verify"),
        ("item", "Check MY_SIG and MY_SIG_INFO, or add them in bulk"),
        ("item", "Check TX_PWR = 5 on all QSOs"),
        ("item", "Clean up duplicates and errors"),
        ("sub", "F2  ·  Upload"),
        ("item", "LoTW, using the correct Station Location for that day"),
        ("item", "QRZ Logbook ON3VZ/P"),
        ("item", "Club Log, under the call ON3VZ/P"),
        ("item", "QRZCQ"),
        ("sub", "F3  ·  WWFF"),
        ("item", "Export ADIF containing only the QSOs of this activation"),
        ("item", "Filename exactly: on3vz_p@ONFF-xxxx YYYYMMDD.adi"),
        ("item", "Attach photos, maximum 600 px, or one photo with GPS position"),
        ("item", "Email to onfflogapproval@gmail.com"),
        ("item", "Mention \u201c5W QRP\u201d in the email. This triggers the QRP exception to the 44 QSOs"),
        ("item", "Is there also a POTA reference? Then upload to POTA separately"),
        ("sub", "F4  ·  Back to the home configuration"),
        ("item", "Log4OM back on the shack configuration"),
        ("item", "WSJT-X back on the home configuration"),
        ("item", "CAT ports back to the IC-7300 (COM5 / COM6)"),

        ("page_break",),
        ("section", "The mistakes people make most often"),
        ("table", ("Mistake", "Consequence"), [
            ("Forgetting to switch configuration",
             "QSOs in the wrong logbook and the wrong call sent to LoTW"),
            ("Leaving the old gridsquare in place",
             "Wrong distances and an incorrect location in your confirmations"),
            ("Taking no photos",
             "ONFF rejects the log, and you only find out once you are home"),
            ("Wrong filename for WWFF",
             "The log is not processed; the filename is the duplicate check"),
            ("Transmitting without measuring SWR after a band change",
             "Risk of damage to the PA. The QMX has no ATU"),
            ("Connecting the radio straight to the battery",
             "Over 13 V into a radio rated 6.0 to 12.0 V. Regulate to 11.50 V first"),
            ("Different links closed on the two dipole legs",
             "Not a dipole any more. High SWR and current on the outside of the coax"),
            ("Leaving the WSJT-X poll interval at 10 s",
             "Transmitting on the previous band\u2019s dial frequency after a change"),
        ]),
    ],
}

CONTENT_NL = {
    "strings": {
        "subtitle": "Veldchecklist  ·  WWFF / ONFF  ·  portable activaties",
        "footer": "ON3VZ/P veldchecklist  ·  on3vz.github.io  ·  73 and 44",
    },
    "blocks": [
        ("para", "Werk deze lijst blok per blok af. Blokken A en B doe je thuis, "
                 "C tot E ter plaatse, F na afloop. De fouten die het vaakst gemaakt "
                 "worden staan achteraan. Lees die minstens \u00e9\u00e9n keer voor je eerste activatie."),

        ("section", "A  ·  Thuis, de avond ervoor"),
        ("sub", "A1  ·  Locatie bepalen", True),
        ("item", "Referentie gekozen (ONFF-nummer), of bewust \u201cgeen referentie\u201d bij gewoon portable"),
        ("item", "Grenzen gecontroleerd in de offici\u00eble ONFF KMZ. Sta ik straks \u00e9cht binnen de referentie?"),
        ("item", "Gridsquare van de locatie opgezocht (6 tekens, bv. JO20qe)"),
        ("item", "Toegang en parkeren nagekeken; is er toestemming nodig?"),
        ("sub", "A2  ·  TQSL"),
        ("item", "Station Location aangemaakt voor deze locatie, onder ON3VZ/P"),
        ("item", "Naam volgens afspraak: plaats of referentie + grid, bv. ONFF-0599 Alouette JO20xx"),
        ("item", "DXCC Belgium  ·  CQ 14  ·  ITU 27  ·  juiste gridsquare"),
        ("sub", "A3  ·  Log4OM"),
        ("item", "Configuratie ON3VZ-P portable geladen, niet de shackconfiguratie"),
        ("item", "Station Callsign = ON3VZ/P"),
        ("item", "Operator Callsign = ON3VZ"),
        ("item", "Station Gridsquare = het grid van vandaag"),
        ("item", "Stationconfiguratie: QMX + Band Hopper IV, vermogen 5 W"),
        ("item", "LoTW Station ID wijst naar de juiste Station Location"),
        ("item", "Bij WWFF-activatie: My Sig = WWFF, My Sig Info = ONFF-xxxx"),
        ("item", "Zonder WWFF: My Sig en My Sig Info leeg laten"),
        ("item", "TestQSO ingevoerd, ADIF-velden gecontroleerd, testQSO weer verwijderd"),
        ("sub", "A4  ·  WSJT-X"),
        ("item", "Configuratie Portable geladen"),
        ("item", "My Call = ON3VZ/P"),
        ("item", "My Grid = het grid van vandaag"),
        ("item", "Rig = QRPLabs QMX op de juiste COM-poort, PTT-methode = CAT"),
        ("item", "Poll interval op 2 \u00e0 3 s, niet de standaard 10 s"),
        ("item", "\u201cHalt Tx when SWR > 2.5\u201d aangevinkt, PWR- en SWR-weergave aan"),
        ("item", "Audio in en uit = USB-geluidskaart van de QMX"),
        ("item", "UDP-doorgifte naar Log4OM staat aan"),
        ("item", "PSK Reporter spotting aan, zo meet je bereik ook zonder QSO\u2019s"),
        ("item", "Hamlib op een stabiele versie, geen release candidate"),
        ("sub", "A5  ·  PoLo, voor SSB en later CW"),
        ("item", "Operator call ON3VZ, station call ON3VZ/P"),
        ("item", "Nieuwe activatie aangemaakt met de juiste referentie"),
        ("item", "Vermogen ingesteld op 5 W"),
        ("item", "Offline datafiles ververst, callsign-lookup werkt dan zonder netwerk"),
        ("item", "Zelfspotten ingeschakeld"),
        ("sub", "A6  ·  Backup en energie"),
        ("item", "Log4OM-database ge\u00ebxporteerd naar OneDrive"),
        ("item", "TQSL-backup actueel"),
        ("item", "Accu vol, laptop vol, gsm vol, powerbank vol"),

        ("section", "B  ·  Inpakken"),
        ("sub", "Radio", True),
        ("item", "QMX + USB-C-kabel"),
        ("item", "Accu, kabels en zekering"),
        ("item", "DC-DC-converter en Powerpole-kabels"),
        ("item", "Koptelefoon"),
        ("item", "G7UFO Turret microfoon (voor SSB)"),
        ("sub", "Antenne"),
        ("item", "Band Hopper IV. De 80 m-sectie blijft opgerold op de winders"),
        ("item", "Tactical 7000hds mast + grondpen of statief"),
        ("item", "Scheerlijnen en haringen"),
        ("item", "Coax, zo kort mogelijk houden"),
        ("item", "Klemferrieten voor de voedingslijn"),
        ("item", "SWR-meter of analyzer"),
        ("item", "Werptouw als de mast niet kan"),
        ("sub", "Logging"),
        ("item", "Laptop + lader (bij FT8)"),
        ("item", "iPad of gsm met PoLo (bij SSB)"),
        ("item", "Papieren reservelog en pen. Werkt altijd"),
        ("sub", "Rest"),
        ("item", "Stoel of mat, regenkledij, water, eten"),
        ("item", "Gsm met de ONFF KMZ offline beschikbaar"),
        ("item", "Camera of gsm voor de verplichte foto\u2019s"),

        ("section", "C  ·  Ter plaatse, v\u00f3\u00f3r de eerste QSO"),
        ("sub", "Voeding", True),
        ("item", "Uitgang van de converter afgelezen op 11.50 V, v\u00f3\u00f3r de radio wordt aangesloten"),
        ("note", "De QMX aanvaardt 6.0 tot 12.0 V. Een volle 12 V LiFePO4 staat boven 13 V."),
        ("sub", "Antenne"),
        ("item", "GPS-check: sta ik binnen de grenzen van de referentie?"),
        ("item", "Antenne op, links correct gezet voor de startband"),
        ("item", "Even veel links dicht aan BEIDE zijden, aan beide kanten geteld"),
        ("item", "Uiteinden van de dipool buiten bereik van wandelaars, minstens 2 m hoog"),
        ("item", "SWR gemeten v\u00f3\u00f3r de eerste zending. De QMX heeft geen ATU"),
        ("sub", "Software"),
        ("item", "Log4OM: juiste configuratie? Controleer de titelbalk"),
        ("item", "WSJT-X: juiste call en grid? Controleer de titelbalk"),
        ("item", "Klok gesynchroniseerd. FT8 faalt zonder juiste tijd"),
        ("item", "Foto\u2019s genomen: minstens twee, of \u00e9\u00e9n met GPS-locatie"),
        ("note", "Zonder foto\u2019s keurt ONFF je log af. Doe dit nu, niet achteraf."),

        ("section", "D  ·  Tijdens de activatie"),
        ("sub", "Elke sessie", True),
        ("item", "Zelfspot geplaatst, met referentie \u00e9n \u201c5W QRP\u201d in het commentaar"),
        ("item", "Park-to-park: referentie van de tegenpartij genoteerd"),
        ("item", "Minstens 60 minuten in de lucht, gerekend vanaf de eerste QSO"),
        ("sub", "Na elke bandwissel"),
        ("item", "Links aangepast aan BEIDE zijden, geteld"),
        ("item", "SWR opnieuw gemeten v\u00f3\u00f3r het zenden"),
        ("item", "Frequentie in WSJT-X komt overeen met de radio"),
        ("item", "Zelfspot herhaald"),

        ("section", "Bandplan bij daglicht"),
        ("sub", "Waar beginnen", True),
        ("band", "20 m", "Werkpaard overdag. Grootste bereik, meeste jagers actief"),
        ("band", "40 m", "Vroege ochtend en late namiddag. Hier zitten de Benelux-jagers"),
        ("band", "30 m", "Als 20 en 40 tegenvallen. Geen contesten, geen SSB"),

        ("section", "E  ·  Afbouwen"),
        ("sub", "Voor je wegrijdt", True),
        ("item", "Tijd van de laatste QSO genoteerd"),
        ("item", "Antenne en mast volledig mee, niets achtergelaten"),
        ("item", "Alle haringen terug uit de grond"),
        ("item", "Afval mee"),
        ("item", "Log ge\u00ebxporteerd of gesynchroniseerd"),

        ("section", "F  ·  Thuis, na de activatie"),
        ("sub", "F1  ·  Log samenbrengen", True),
        ("item", "Bij SSB: ADIF uit PoLo exporteren en in Log4OM importeren"),
        ("item", "Bij FT8: QSO\u2019s staan al in Log4OM via UDP, controleren"),
        ("item", "MY_SIG en MY_SIG_INFO controleren of in bulk toevoegen"),
        ("item", "TX_PWR = 5 controleren op alle QSO\u2019s"),
        ("item", "Dubbels en fouten opkuisen"),
        ("sub", "F2  ·  Uploaden"),
        ("item", "LoTW, met de juiste Station Location van die dag"),
        ("item", "QRZ Logbook ON3VZ/P"),
        ("item", "Club Log, onder de call ON3VZ/P"),
        ("item", "QRZCQ"),
        ("sub", "F3  ·  WWFF"),
        ("item", "ADIF exporteren met uitsluitend de QSO\u2019s van deze activatie"),
        ("item", "Bestandsnaam exact: on3vz_p@ONFF-xxxx JJJJMMDD.adi"),
        ("item", "Foto\u2019s bijvoegen, maximaal 600 px, of \u00e9\u00e9n foto met GPS-positie"),
        ("item", "Mailen naar onfflogapproval@gmail.com"),
        ("item", "\u201c5W QRP\u201d vermelden in de mail. Dit activeert de QRP-uitzondering op de 44 QSO\u2019s"),
        ("item", "Is er ook een POTA-referentie? Dan apart uploaden naar POTA"),
        ("sub", "F4  ·  Terug naar de thuisconfiguratie"),
        ("item", "Log4OM terug op de shackconfiguratie"),
        ("item", "WSJT-X terug op de thuisconfiguratie"),
        ("item", "CAT-poorten terug naar de IC-7300 (COM5 / COM6)"),

        ("page_break",),
        ("section", "De fouten die het vaakst gemaakt worden"),
        ("table", ("Fout", "Gevolg"), [
            ("Vergeten van configuratie te wisselen",
             "QSO\u2019s in het verkeerde logboek en de verkeerde call naar LoTW"),
            ("Oud gridsquare laten staan",
             "Verkeerde afstanden en een foute locatie in je bevestigingen"),
            ("Geen foto\u2019s genomen",
             "ONFF keurt de log af, en dat merk je pas als je thuis bent"),
            ("Verkeerde bestandsnaam bij WWFF",
             "De log wordt niet verwerkt; de naam is de duplicaatcontrole"),
            ("Zenden zonder SWR te meten na een bandwissel",
             "Risico op schade aan de eindtrap. De QMX heeft geen ATU"),
            ("De radio rechtstreeks op de accu aansluiten",
             "Meer dan 13 V op een radio van 6.0 tot 12.0 V. Eerst naar 11.50 V regelen"),
            ("Verschillend aantal links dicht op beide dipoolbenen",
             "Geen dipool meer. Hoge SWR en stroom op de buitenkant van de coax"),
            ("Poll interval in WSJT-X op 10 s laten staan",
             "Zenden op de dialfrequentie van de vorige band na een bandwissel"),
        ]),
    ],
}


if __name__ == "__main__":
    here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out = os.path.join(here, "assets", "files")
    os.makedirs(out, exist_ok=True)
    for name, doc in (("on3vz-p-field-checklist-en.pdf", CONTENT_EN),
                      ("on3vz-p-veldchecklist-nl.pdf", CONTENT_NL)):
        p = render(os.path.join(out, name), doc)
        print("wrote", p)
