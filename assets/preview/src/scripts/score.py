"""Original 120 BPM score + frame-aligned sound design. No external music samples."""
import numpy as np
import wave
from pathlib import Path
SR=48000; D=42.5; rng=np.random.default_rng(72)
mix=np.zeros((int(SR*D),2),dtype=np.float64)
def add(sig,at,gain=1,pan=0,target=None):
 bus=mix if target is None else target
 start=int(at*SR)
 if start<0:sig=sig[-start:];start=0
 n=min(len(sig),len(mix)-start)
 if n<=0:return
 if sig.ndim==1:
  bus[start:start+n,0]+=sig[:n]*gain*np.sqrt((1-pan)/2)
  bus[start:start+n,1]+=sig[:n]*gain*np.sqrt((1+pan)/2)
 else:bus[start:start+n]+=sig[:n]*gain
def tone(note,dur=1.4,kind='pluck'):
 t=np.arange(int(dur*SR))/SR; hz=440*2**((note-69)/12)
 if kind=='pluck':
  env=(1-np.exp(-t*160))*np.exp(-t*4.3)
  s=(np.sin(2*np.pi*hz*t+.8*np.sin(2*np.pi*hz*2*t)*np.exp(-t*8))+.15*np.sin(2*np.pi*hz*3*t))*env
 elif kind=='bass':s=(np.sin(2*np.pi*hz*t)+.18*np.sin(2*np.pi*2*hz*t))*np.minimum(1,t/.018)*np.exp(-t*3)
 else:
  env=np.minimum(1,t/.5)*np.minimum(1,(dur-t)/.85)
  s=(np.sin(2*np.pi*hz*t)+.25*np.sin(2*np.pi*hz*1.003*t)+.12*np.sin(2*np.pi*hz*2*t))*env
 return s
# B minor / G major / D major / A major; warm, purposeful, 120 BPM.
chords=[[59,62,66,73],[55,59,62,69],[57,62,66,69],[57,61,64,71]]
for bar in range(22):
 at=bar*2
 if at>=D:break
 chord=chords[(bar//2)%4]
 amp=.064 if at<4 else .08
 for j,n in enumerate(chord):
  pad=tone(n,3.1,'pad');pan=-.7+j*.45
  add(pad,at,amp,pan)
 for step in range(8):
  tm=at+step*.25
  if tm>D-1.5 or 32<=tm<36.5:continue  # full music until 32 s; then no arp plucks so only the 3 Warrior level tings ring
  n=chord[[0,2,1,3,2,1,3,2][step]]+(12 if step in [3,6] else 0)
  v=.15 if at<4 else .2
  sig=tone(n,1.3)
  add(sig,tm,v,(-.35 if step%2 else .35))
  add(sig,tm+.375,v*.2,(.5 if step%2 else -.5))
 if at>=4:
  for step in [0,1,2.5,3]:
   bass=tone(chord[0]-24,.6,'bass');when=at+step*.5
   add(bass,when,.3)
# Percussion: controlled kick, brushed claps, light hats.
for beat in range(8,86):
 at=beat*.5
 if at>=D-1.5:break
 t=np.arange(int(.34*SR))/SR
 kick=np.sin(2*np.pi*(48*t+8*(1-np.exp(-t*24))))*np.exp(-t*15)
 add(kick,at,.45)
 if beat%2:
  t=np.arange(int(.18*SR))/SR;n=rng.normal(0,1,len(t));n=np.r_[0,np.diff(n)]
  clap=n*np.exp(-t*33)*np.minimum(1,t/.002)
  add(clap,at,.078,.08)
 for half in [0,.25]:
  t=np.arange(int(.07*SR))/SR;n=rng.normal(0,1,len(t));n=np.r_[0,np.diff(n)]
  add(n*np.exp(-t*85),at+half,.021,-.25 if half else .3)
# Full music bed runs unbroken from the tutor chat into Warrior, then fades out right
# after the third level ting (34.835 s). Gate before SFX so tings, swishes and logo stay.
seconds=np.arange(len(mix))/SR
mix*=np.clip(1-(seconds-34.835)/.5,0,1)[:,None]
# Paper swishes, each centered on an origami scene boundary.
for at in [4,8,12,15.5,21.5,26.5,32.5,36.5]:
 t=np.arange(int(.66*SR))/SR;n=rng.normal(0,1,len(t))
 soft=np.convolve(n,np.ones(19)/19,'same');env=np.sin(np.pi*t/.66)**2
 sw=soft*env
 add(sw,at-.33,.43,-.45);add(sw,at-.31,.38,.45)
# Tiny paper folds and purposeful clicks.
for at in [.7,1.2,1.8,5.5,6.7,9.3,14.2,16.35,17.55,18.95,23.05,27.85,31.05]:
 t=np.arange(int(.09*SR))/SR;n=rng.normal(0,1,len(t))
 add(n*np.exp(-t*70)*.24,at,.35,.12)
# One clear ting at each cursor target: station 13.25 s, bomb 14.20 s.
for at,n in [(13.25,74),(14.20,78)]:add(tone(n,.72),at,.32)
for at,notes in [(5.85,[74,78]),(9.4,[59,58]),(19.1,[66,71]),(24.55,[71,74,78]),(28.45,[69,74]),(32.5,[71]),(33.5,[74]),(34.5,[78]),(34.835,[83])]:
 for i,n in enumerate(notes):add(tone(n,.9),at+i*.1,.23,-.2+i*.2)
# Continuous music under the convergence riser and the three-note logo signature.
t=np.arange(int(1.15*SR))/SR;n=rng.normal(0,1,len(t));n=np.convolve(n,np.ones(37)/37,'same')
add(n*(t/1.15)**2,36.75,.75)
for at,n in [(38.22,71),(38.46,78),(38.72,83)]:add(tone(n,3),at,.48)
for n in [47,59,62,66,73,78]:add(tone(n,4,'pad'),38.35,.14)
add(tone(35,2,'bass'),38.22,.6)
# Smooth fades and gentle tape saturation; final LUFS mastering is done with ffmpeg.
mix*=np.minimum(1,np.arange(len(mix))/SR/.18)[:,None]
fade=np.clip((D-np.arange(len(mix))/SR)/1.25,0,1);mix*=fade[:,None]
mix=np.tanh(mix*1.15)
mix/=max(1,np.max(np.abs(mix))/.9)
out=Path(__file__).resolve().parents[1]/'public'/'soundtrack-raw.wav'
with wave.open(str(out),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes((mix*32767).astype('<i2').tobytes())
print(out)
