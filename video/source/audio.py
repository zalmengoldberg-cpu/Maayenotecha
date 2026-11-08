import numpy as np, wave
sr=44100; dur=24.5; n=int(sr*dur); t=np.arange(n)/sr
out=np.zeros(n)
rng=np.random.default_rng(7)
bpm=124; beat=60/bpm
def add(sig,at,gain=1.0):
    i=int(at*sr); j=min(n,i+len(sig)); out[i:j]+=sig[:j-i]*gain
def kick():
    L=int(.35*sr); tt=np.arange(L)/sr; f=45+90*np.exp(-tt*28); ph=2*np.pi*np.cumsum(f)/sr
    return np.sin(ph)*np.exp(-tt*9)
def hat():
    L=int(.06*sr); x=rng.standard_normal(L); x=np.diff(np.concatenate([[0],x])); return x*np.exp(-np.arange(L)/sr*70)*.5
def clap():
    L=int(.18*sr); x=rng.standard_normal(L); env=np.exp(-np.arange(L)/sr*22); return x*env*.35
def whoosh(L=.45,up=True):
    N=int(L*sr); x=rng.standard_normal(N); 
    # simple moving-average lowpass with sweeping window
    y=np.cumsum(x); out_=np.zeros(N)
    for k in range(0,N,64):
        w=int(40-35*(k/N if up else 1-k/N))+2; a=max(0,k-w); out_[k:k+64]=(y[min(N-1,k)]-y[a])/w
    env=np.sin(np.pi*np.linspace(0,1,N))**2; return out_*env*1.6
def impact():
    L=int(1.2*sr); tt=np.arange(L)/sr; f=38+70*np.exp(-tt*10); s=np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-tt*3.2)
    s+=rng.standard_normal(L)*np.exp(-tt*14)*.25; return s
# bass + pad chord (Am - F - C - G) as soft saw-ish
chords=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]]
bar=beat*4; music=np.zeros(n)
for bi in range(int(dur/bar)+1):
    c=chords[bi%4]; a=int(bi*bar*sr); b=min(n,int((bi+1)*bar*sr))
    if a>=n: break
    tt=t[a:b]-bi*bar
    pad=sum(np.sin(2*np.pi*f*tt)+.3*np.sin(4*np.pi*f*tt) for f in c)/3
    music[a:b]+=pad*.10*(1-np.exp(-tt*6))
    for k in range(8):
        s=int((bi*bar+k*beat/2)*sr); e=min(n,s+int(beat/2*sr*.9))
        if s<n: tb=t[s:e]-t[s]; music[s:e]+=np.sign(np.sin(2*np.pi*c[0]/2*tb))*.07*np.exp(-tb*7)
start=1.6
k=0; tb=start
while tb<20.2:
    add(kick(),tb,.9)
    add(hat(),tb+beat/2,.5)
    if k%2==1: add(clap(),tb,.6)
    tb+=beat; k+=1
music[:int(start*sr)]*=np.linspace(0,1,int(start*sr))**2
# outro: music cut at slam then soft pad
cut=int(20.2*sr); music[cut:]*=np.exp(-(t[cut:]-20.2)*1.2)
out+=music
for s in [1.6,3.4,5.7,7.7,9.8,11.9,14.0,16.2,18.4,21.9]: add(whoosh(),s-.3,.35)
add(whoosh(.8),19.6,.5); add(impact(),20.62,1.0)
# riser in intro
N=int(1.5*sr); tt=np.arange(N)/sr; add(np.sin(2*np.pi*(200+600*tt**2)*tt)*.08*(tt/1.5)**2,0.1)
out=np.tanh(out*1.1); out*=0.85/np.max(np.abs(out))
fade=int(.6*sr); out[-fade:]*=np.linspace(1,0,fade)
pcm=(out*32767).astype(np.int16)
with wave.open('music.wav','wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(pcm.tobytes())
print('ok')
