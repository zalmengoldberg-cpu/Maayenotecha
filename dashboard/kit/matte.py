import numpy as np,sys
from PIL import Image
def matte(src,dst,T=38.0,gamma=0.9,xmin=0.0):
    im=np.asarray(Image.open(src).convert('RGB')).astype(np.float64);h,w,_=im.shape
    yy,xx=np.mgrid[0:h,0:w];xn=xx/w;yn=yy/h
    sat=im.max(2)-im.min(2)
    # background sample: low-saturation pixels in the right half + borders
    m=(sat<14)&((xn>.62)|(yn<.04)|(yn>.96)|(xn<.03))
    A=np.stack([np.ones_like(xn),xn,yn,xn*xn,yn*yn,xn*yn],-1)
    B=np.zeros_like(im)
    for c in range(3):
        coef,*_=np.linalg.lstsq(A[m],im[...,c][m],rcond=None);B[...,c]=A@coef
    d=np.abs(im-B).max(2)
    from PIL import ImageFilter
    d=np.asarray(Image.fromarray(np.clip(d,0,255).astype(np.uint8)).filter(ImageFilter.MedianFilter(3))).astype(np.float64)
    a=np.clip((d-7)/T,0,1)**gamma
    a[a<0.06]=0
    a[xn<xmin]=0
    F=np.where(a[...,None]>0.02,(im-(1-a[...,None])*B)/np.maximum(a[...,None],1e-3),im)
    F=np.clip(F,0,255)
    out=np.dstack([F,a*255]).astype(np.uint8)
    Image.fromarray(out,'RGBA').save(dst,quality=88,method=6)
    return B.mean((0,1))
if __name__=='__main__':print(matte(sys.argv[1],sys.argv[2],38.0,0.9,float(sys.argv[3]) if len(sys.argv)>3 else 0.0))
