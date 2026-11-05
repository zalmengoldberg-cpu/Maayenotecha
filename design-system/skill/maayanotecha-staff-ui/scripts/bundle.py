#!/usr/bin/env python3
"""Prints a ready-to-paste <style> block (+ optional <script>) for an artifact.
Usage:
  python3 scripts/bundle.py                 # tokens + skin + components CSS
  python3 scripts/bundle.py --js            # ...and ds.js (icons, calendar, sparkline, gauge, sidebar)
  python3 scripts/bundle.py --tailwind      # Tailwind theme.extend snippet mapped to the tokens
  python3 scripts/bundle.py --img assets/logos/maayanotecha-logo-ondark.webp   # data: URI of an asset
"""
import base64, mimetypes, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
REF = ROOT / "references"
def mini(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css)
    return re.sub(r"\s*([{};,])\s*", r"\1", css).strip()
a = sys.argv[1:]
if "--img" in a:
    p = ROOT / a[a.index("--img") + 1]
    mt = mimetypes.guess_type(p.name)[0] or ("image/webp" if p.suffix == ".webp" else "application/octet-stream")
    print(f"data:{mt};base64," + base64.b64encode(p.read_bytes()).decode()); sys.exit()
if "--tailwind" in a:
    print("""tailwind.config = { theme: { extend: {
  fontFamily: { sans: ['Rubik','Heebo','Arial','sans-serif'] },
  colors: { ink:{900:'#141A33',800:'#1F2747',700:'#353D5E',500:'#626A88',400:'#8B91A9',300:'#B7BBCB',200:'#D9DCE5'},
    canvas:'#ECEEF3', stage:'#D1D4DD', surface:{DEFAULT:'#FFFFFF',2:'#F6F7FA'},
    royal:{DEFAULT:'#3F5499',600:'#33468A',400:'#6476B6',200:'#C6CDE6',100:'#E4E8F4',50:'#F1F3FA'},
    gold:{DEFAULT:'#F2911C',600:'#C9730C',100:'#FCEBD3'}, plum:'#5E1542', kraft:{DEFAULT:'#D2B899',600:'#A9865C'},
    ok:{DEFAULT:'#2E8566',bg:'#E2F2EA'}, warn:{DEFAULT:'#B86A0A',bg:'#FCEFD9'}, bad:{DEFAULT:'#B93B36',bg:'#F8E4E2'} },
  borderRadius: { sm:'12px', md:'16px', lg:'22px', xl:'28px', '2xl':'36px' },
  boxShadow: { e1:'inset 0 1px 0 rgba(255,255,255,.9),0 0 0 1px rgba(20,26,51,.07),0 1px 2px rgba(20,26,51,.06)',
    e2:'0 0 0 1px rgba(20,26,51,.05),0 1px 2px rgba(20,26,51,.04),0 8px 24px -10px rgba(20,26,51,.12)',
    e3:'inset 0 1px 0 rgba(255,255,255,.9),0 0 0 1px rgba(255,255,255,.5),0 2px 6px rgba(20,26,51,.06),0 18px 40px -12px rgba(20,26,51,.22)',
    primary:'inset 0 1px 0 rgba(255,255,255,.14),inset 0 -1px 0 rgba(0,0,0,.25),0 1px 2px rgba(20,26,51,.2),0 6px 14px -6px rgba(20,26,51,.45)' },
  height: { 'ctl-sm':'30px', ctl:'38px', 'ctl-lg':'46px' } } } }""")
    sys.exit()
css = "".join(mini((REF / f).read_text()) for f in ("tokens.css", "skin.css", "components.css"))  # order matters: skin (0 specificity) before components
print('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;800;900&display=swap">')
print(f"<style>{css}</style>")
if "--js" in a:
    print(f"<script>{(REF / 'ds.js').read_text()}</script>  <!-- place at the END of <body> -->")
