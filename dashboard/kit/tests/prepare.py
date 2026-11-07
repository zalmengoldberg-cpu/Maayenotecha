"""מכין את סביבת הבדיקות מאפס (גם בסשן חדש):
   1. בונה את staff/v21.html מ-backups/v20_out.html
   2. יוצר v21_mock.html (עם מסד מדומה מ-dashboard/db) ואת srv/index.html + srv/_blob/* (רקעים ואווטארים) לבדיקות שמשתמשות ב-srvlib
   הרצה מתוך dashboard/:  python3 kit/tests/prepare.py"""
import json, shutil, subprocess, pathlib
D = pathlib.Path(__file__).resolve().parents[2]          # dashboard/
T = D / 'kit' / 'tests'
subprocess.run(['python3', 'staff/build.py', 'backups/v20_out.html', 'staff/v21.html'], cwd=D, check=True)
(T / 'srv' / '_blob').mkdir(parents=True, exist_ok=True)
subprocess.run(['python3', 'kit/mock.py', 'staff/v21.html', str(T / 'srv' / 'index.html')], cwd=D, check=True)
shutil.copy(T / 'srv' / 'index.html', T / 'v21_mock.html')
W = json.loads((D / 'staff' / 'walls' / 'walls.json').read_text())
for k, u in W.items(): shutil.copy(D / 'staff' / 'walls' / f'wall-{k}.webp', T / 'srv' / '_blob' / u.split('/')[-1])
AV = {'zalmen': '0f15bf100e73db8b208368566f83eeb5', 'mendy': 'f4e10f01a88f100caf547fdb227ec759', 'ben': 'ccb13eac897ed86c40a74bd8fbe17ab9',
      'kaplan': '6eb24157e2c1901c584471614fafc3ba', 'tzama-social': 'd24327a997fa847d38609e9e3b7b0cb0', 'claude': '2c69a8ecbbf66f0ef213863c434d3c70'}
for k, i in AV.items(): shutil.copy(D / 'staff' / 'avatars' / f'{k}.webp', T / 'srv' / '_blob' / i)
print('ready:', T / 'v21_mock.html', '+', T / 'srv')
