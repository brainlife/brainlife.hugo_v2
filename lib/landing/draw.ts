/* eslint-disable */
// @ts-nocheck
/**
 * Generative drawings for the landing page: the three abstract hero visuals (field, lens, ruler)
 * and the stylised datatype tiles used as fallbacks when a publication or App has no media.
 * All colours come from the brand palette; everything is deterministic for a given seed.
 */
export const PAL={blue:'#005981',bluel:'#3b9fd0',red:'#a9262c',orange:'#e57536',yellow:'#f9c926',ink:'#eef3f6',muted:'#a9bac6',bg:'#07131c',bg2:'#0b1f2d',slate:'#2a4a5e'};
export const SEQ=['#07131c','#005981','#3b9fd0','#e57536','#f9c926'];
    export function rng(seed){return function(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
  function hex(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
  function mix(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}
  function ramp(stops,t){var c=stops.map(hex);t=Math.max(0,Math.min(0.9999,t))*(c.length-1);var i=Math.floor(t);return mix(c[i],c[i+1],t-i);}
  function rgba(c,a){return 'rgba('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+','+a+')';}
  function Simplex(r){var p=[];for(var i=0;i<256;i++)p[i]=i;for(i=255;i>0;i--){var j=Math.floor(r()*(i+1));var t=p[i];p[i]=p[j];p[j]=t;}var perm=[];for(i=0;i<512;i++)perm[i]=p[i&255];
    var G=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]],F2=0.5*(Math.sqrt(3)-1),G2=(3-Math.sqrt(3))/6;
    return function(x,y){var s=(x+y)*F2,i=Math.floor(x+s),j=Math.floor(y+s),t=(i+j)*G2,x0=x-(i-t),y0=y-(j-t),i1=x0>y0?1:0,j1=x0>y0?0:1,x1=x0-i1+G2,y1=y0-j1+G2,x2=x0-1+2*G2,y2=y0-1+2*G2,ii=i&255,jj=j&255,n=0,tt,g;
      tt=0.5-x0*x0-y0*y0;if(tt>0){g=G[perm[ii+perm[jj]]%8];tt*=tt;n+=tt*tt*(g[0]*x0+g[1]*y0);}
      tt=0.5-x1*x1-y1*y1;if(tt>0){g=G[perm[ii+i1+perm[jj+j1]]%8];tt*=tt;n+=tt*tt*(g[0]*x1+g[1]*y1);}
      tt=0.5-x2*x2-y2*y2;if(tt>0){g=G[perm[ii+1+perm[jj+1]]%8];tt*=tt;n+=tt*tt*(g[0]*x2+g[1]*y2);}
      return 70*n;};}
  export function canvasIn(el,W,H){var c=document.createElement('canvas'),dpr=Math.min(2,window.devicePixelRatio||1);c.width=W*dpr;c.height=H*dpr;c.style.width='100%';c.style.height='100%';el.appendChild(c);var x=c.getContext('2d');x.scale(dpr,dpr);x.fillStyle=PAL.bg;x.fillRect(0,0,W,H);return x;}
  function svgIn(el,W,H,inner,label){el.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+label+'">'+inner+'</svg>';}

  /* ===== drawing functions: (el, W, H, seed, small) ===== */
  export const D: Record<string, (el: HTMLElement, W: number, H: number, seed?: number, small?: boolean) => void> = {};
  D.field=function(el,W,H,seed,small){var x=canvasIn(el,W,H),r=rng(seed),noise=Simplex(rng(seed+1)),N=Math.round(W*H/(small?120:190));x.lineCap='round';x.globalCompositeOperation='lighter';
    for(var i=0;i<N;i++){var px=r()*W,py=r()*H,u=px/W,freq=0.045*Math.pow(0.08,u),steps=Math.round(8+70*u*u),len=0.9+3.2*u,ang=0,col=ramp([PAL.bluel,PAL.red,PAL.orange,PAL.yellow],u+(r()-0.5)*0.12),a=(0.2+0.1*u)*(0.6+r()*0.6);
      x.strokeStyle=rgba(col,a);x.lineWidth=0.9+0.8*u;x.beginPath();x.moveTo(px,py);for(var s=0;s<steps;s++){var n=noise(px*freq,py*freq*0.9);ang=n*Math.PI*2*(1.6-0.9*u);px+=Math.cos(ang)*len;py+=Math.sin(ang)*len*(0.5+0.5*u);if(px<-5||px>W+5||py<-5||py>H+5)break;x.lineTo(px,py);}x.stroke();}
    if(!small){x.globalCompositeOperation='source-over';var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(7,19,28,0)');g.addColorStop(0.45,'rgba(7,19,28,0.1)');g.addColorStop(1,'rgba(7,19,28,0.8)');x.fillStyle=g;x.fillRect(0,0,W,H);var g2=x.createLinearGradient(0,0,W*0.5,0);g2.addColorStop(0,'rgba(7,19,28,0.4)');g2.addColorStop(1,'rgba(7,19,28,0)');x.fillStyle=g2;x.fillRect(0,0,W,H);}};
  D.lens=function(el,W,H,seed,small){var r=rng(seed),cx=W*0.52,cy=H*0.5,R=Math.min(W,H)*0.46,out=[];function arc(rad,a0,a1,col,w,op){var x0=cx+Math.cos(a0)*rad,y0=cy+Math.sin(a0)*rad,x1=cx+Math.cos(a1)*rad,y1=cy+Math.sin(a1)*rad,big=(a1-a0)>Math.PI?1:0;out.push('<path d="M'+x0.toFixed(1)+' '+y0.toFixed(1)+'A'+rad.toFixed(1)+' '+rad.toFixed(1)+' 0 '+big+' 1 '+x1.toFixed(1)+' '+y1.toFixed(1)+'" fill="none" stroke="'+col+'" stroke-width="'+w+'" opacity="'+op+'" stroke-linecap="round"/>');}
    var k=R/280;for(var i=0;i<70;i++){var rad=(215+r()*62)*k,a0=r()*6.283;arc(rad,a0,a0+0.5+r()*1.5,PAL.yellow,(0.9+r()*0.8)*Math.max(0.6,k),0.35+r()*0.4);}
    for(var b=0;b<9;b++){var rb=(152+b*6.4)*k;for(var q=0;q<4;q++){var a=r()*6.283;arc(rb,a,a+0.35+r()*0.6,PAL.orange,1.2*Math.max(0.6,k),0.45+r()*0.4);}}
    for(var f=0;f<60;f++){var a=r()*6.283,rad=(88+r()*48)*k,x=cx+Math.cos(a)*rad,y=cy+Math.sin(a)*rad,d='M'+x.toFixed(1)+' '+y.toFixed(1),ang=a+(r()-0.5)*1.2;for(var s=0;s<5;s++){ang+=(r()-0.5)*1.1;x+=Math.cos(ang)*(5+r()*7)*k;y+=Math.sin(ang)*(5+r()*7)*k;var rr=Math.hypot(x-cx,y-cy);if(rr<84*k||rr>146*k)break;d+='L'+x.toFixed(1)+' '+y.toFixed(1);}out.push('<path d="'+d+'" fill="none" stroke="'+PAL.red+'" stroke-width="'+(1.1*Math.max(0.6,k))+'" opacity="'+(0.5+r()*0.4)+'" stroke-linecap="round"/>');out.push('<circle cx="'+(cx+Math.cos(a)*rad).toFixed(1)+'" cy="'+(cy+Math.sin(a)*rad).toFixed(1)+'" r="'+((1.6+r()*1.4)*k).toFixed(1)+'" fill="'+PAL.red+'" opacity="0.8"/>');}
    for(var g=0;g<420;g++){var a=r()*6.283,rad=Math.sqrt(r())*76*k;out.push('<circle cx="'+(cx+Math.cos(a)*rad).toFixed(1)+'" cy="'+(cy+Math.sin(a)*rad).toFixed(1)+'" r="'+((0.7+r()*2.2)*k).toFixed(1)+'" fill="'+PAL.bluel+'" opacity="'+(0.3+r()*0.6).toFixed(2)+'"/>');}
    [80,148,210,280].forEach(function(rad){out.push('<circle cx="'+cx+'" cy="'+cy+'" r="'+(rad*k)+'" fill="none" stroke="rgba(238,243,246,0.16)" stroke-width="0.8"/>');});
    if(!small){[['nm','EM',40],['µm','lightsheet',114],['mm','PS-OCT',179],['cm','MRI',245]].forEach(function(l){var ang=-Math.PI/4,x=cx+Math.cos(ang)*l[2]*k,y=cy+Math.sin(ang)*l[2]*k;out.push('<line x1="'+x.toFixed(1)+'" y1="'+y.toFixed(1)+'" x2="'+(x+14).toFixed(1)+'" y2="'+(y-14).toFixed(1)+'" stroke="rgba(238,243,246,0.5)" stroke-width="0.8"/><text x="'+(x+18).toFixed(1)+'" y="'+(y-16).toFixed(1)+'" font-family="Geist Mono,ui-monospace,monospace" font-size="10.5" letter-spacing="1.2" fill="#eef3f6">'+l[0]+'<tspan fill="#a9bac6"> · '+l[1].toUpperCase()+'</tspan></text>');});}
    svgIn(el,W,H,out.join(''),'Concentric rings, each drawn at a different scale of the brain');};
  D.ruler=function(el,W,H){var L=190,R=W-40,x0=-9,x1=-1;function X(m){return L+(Math.log10(m)-x0)/(x1-x0)*(R-L);}var out=[],axisY=168;
    out.push('<line x1="'+L+'" y1="'+axisY+'" x2="'+R+'" y2="'+axisY+'" stroke="rgba(238,243,246,0.45)"/>');
    var dec=[[1e-9,'1 nm'],[1e-8,'10 nm'],[1e-7,'100 nm'],[1e-6,'1 µm'],[1e-5,'10 µm'],[1e-4,'100 µm'],[1e-3,'1 mm'],[1e-2,'1 cm'],[1e-1,'10 cm']];
    dec.forEach(function(d,i){var x=X(d[0]);out.push('<line x1="'+x+'" y1="'+(axisY-6)+'" x2="'+x+'" y2="'+(axisY+6)+'" stroke="rgba(238,243,246,0.6)"/><text x="'+x+'" y="'+(axisY+22)+'" text-anchor="middle" font-family="Geist Mono,ui-monospace,monospace" font-size="10.5" letter-spacing="1" fill="#a9bac6">'+d[1]+'</text>');if(i<dec.length-1)for(var k=2;k<10;k++){var xx=X(d[0]*k);out.push('<line x1="'+xx+'" y1="'+(axisY-3)+'" x2="'+xx+'" y2="'+(axisY+3)+'" stroke="rgba(238,243,246,0.25)" stroke-width="0.8"/>');}});
    [[2e-8,'synapse'],[1e-6,'axon'],[2e-5,'cell body'],[2e-3,'cortical column'],[1e-1,'whole brain']].forEach(function(a){var x=X(a[0]);out.push('<line x1="'+x+'" y1="'+(axisY+34)+'" x2="'+x+'" y2="'+(axisY+42)+'" stroke="rgba(238,243,246,0.35)"/><text x="'+x+'" y="'+(axisY+56)+'" text-anchor="'+(a[0]>=1e-1?'end':'middle')+'" font-family="Geist Mono,ui-monospace,monospace" font-size="9.5" letter-spacing="1" fill="rgba(238,243,246,0.5)">'+a[1].toUpperCase()+'</text>');});
    [['Electron microscopy',3e-9,1e-3,PAL.bluel],['X-ray nanotomography',3e-8,5e-3,PAL.bluel],['Lightsheet microscopy',3e-7,2e-2,PAL.red],['PS-OCT · tract tracing',2e-6,3e-2,PAL.orange],['MRI · fMRI · dMRI',4e-4,2.5e-1,PAL.yellow],['EEG · MEG',5e-3,2.5e-1,PAL.yellow]].forEach(function(m,i){var y=axisY-24-i*20,xa=X(m[1]),xb=X(m[2]);out.push('<line x1="'+xa+'" y1="'+y+'" x2="'+xb+'" y2="'+y+'" stroke="'+m[3]+'" stroke-width="6" stroke-linecap="round" opacity="0.9"/><text x="'+(xa-10)+'" y="'+(y+4)+'" text-anchor="end" font-family="Geist,system-ui,sans-serif" font-size="12" fill="#eef3f6">'+m[0]+'</text>');});
    [['Neuroglancer · precomputed · OME-Zarr · BossDB',3e-9,3e-2],['NiiVue · NIfTI · BIDS · TRX · NWB',2e-5,2.5e-1]].forEach(function(m,i){var y=axisY+84+i*22,xa=X(m[1]),xb=X(m[2]);out.push('<line x1="'+xa+'" y1="'+y+'" x2="'+xb+'" y2="'+y+'" stroke="rgba(238,243,246,0.55)" stroke-width="2" stroke-linecap="round"/><text x="'+xa+'" y="'+(y+16)+'" font-family="Geist Mono,ui-monospace,monospace" font-size="10" letter-spacing="1" fill="#a9bac6">'+m[0].toUpperCase()+'</text>');});
    svgIn(el,W,H,out.join(''),'Log-scale ruler from one nanometre to ten centimetres showing the range of each modality and viewer');};
  // palette-mapped tracts: bundles in the four colours instead of RGB direction coding
    // connectivity matrix with community structure, sequential ramp
    // parcellated cortical surface, abstract: sulcal contours with coloured parcels
    // fMRI statistical map: grey anatomy noise with thresholded clusters, orange->yellow
    // MEG/EEG: sensor topography + butterfly plot
    // EM, lightsheet, PS-OCT tiles (palette-aligned)
        // featured publication video slot
  function putImg(x,img,W,H){var off=document.createElement('canvas');off.width=W;off.height=H;off.getContext('2d').putImageData(img,0,0);x.drawImage(off,0,0,W,H);}
  /* ===== stylised data tiles v2: one grammar (dark ground, thin line work, palette ramp, soft vignette) ===== */
  function vignette(x,W,H){var g=x.createRadialGradient(W/2,H/2,Math.min(W,H)*0.35,W/2,H/2,Math.max(W,H)*0.75);g.addColorStop(0,'rgba(7,19,28,0)');g.addColorStop(1,'rgba(7,19,28,0.55)');x.fillStyle=g;x.fillRect(0,0,W,H);}
  function brainMask(W,H){ // lateral hemisphere silhouette as a path (generic shape)
    var p=new Path2D(),cx=W/2,cy=H*0.5,w=W*0.44,h=H*0.36;
    p.moveTo(cx-w*0.95,cy+h*0.1);p.bezierCurveTo(cx-w*1.05,cy-h*0.6,cx-w*0.5,cy-h*1.1,cx+w*0.05,cy-h*1.0);p.bezierCurveTo(cx+w*0.6,cy-h*0.95,cx+w*1.05,cy-h*0.5,cx+w*0.98,cy+h*0.05);
    p.bezierCurveTo(cx+w*0.95,cy+h*0.55,cx+w*0.6,cy+h*0.85,cx+w*0.2,cy+h*0.7);p.bezierCurveTo(cx+w*0.05,cy+h*0.95,cx-w*0.25,cy+h*1.05,cx-w*0.45,cy+h*0.8);p.bezierCurveTo(cx-w*0.75,cy+h*0.7,cx-w*0.98,cy+h*0.5,cx-w*0.95,cy+h*0.1);p.closePath();return p;}

  D.em=function(el,W,H,seed){var x=canvasIn(el,W,H),r=rng(seed),n=Math.round(W*H/520),seeds=[];for(var i=0;i<n;i++)seeds.push({x:r()*W,y:r()*H,g:0.5+r()*0.35,dark:r()<0.08});
    var mito=[];for(var i=0;i<Math.round(n*0.35);i++)mito.push({x:r()*W,y:r()*H,rx:3+r()*5,ry:2+r()*3,a:r()*3.14});
    var img=x.createImageData(W,H),d=img.data,ink=hex('#dfe6ea'),base=hex('#0b1f2d');
    for(var py=0;py<H;py++)for(var px=0;px<W;px++){var b1=1e9,b2=1e9,bi=0;for(var k=0;k<seeds.length;k++){var dx=px-seeds[k].x,dy=py-seeds[k].y,dd=dx*dx+dy*dy;if(dd<b1){b2=b1;b1=dd;bi=k;}else if(dd<b2)b2=dd;}
      var edge=Math.sqrt(b2)-Math.sqrt(b1),mem=Math.min(1,edge/1.8),s0=seeds[bi],g=s0.dark?0.25:s0.g;for(var mi=0;mi<mito.length;mi++){var m=mito[mi],ca=Math.cos(m.a),sa=Math.sin(m.a),ex=((px-m.x)*ca+(py-m.y)*sa)/m.rx,ey=(-(px-m.x)*sa+(py-m.y)*ca)/m.ry,q=ex*ex+ey*ey;if(q<1){g*=q>0.7?0.35:0.6;break;}}
      var v=0.12+(g-0.12)*mem+(r()-0.5)*0.06,c=mix(base,ink,v*0.78),o=(py*W+px)*4;d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=255;}
    putImg(x,img,W,H);
    // segmentation outlines in palette (thin, not filled)
    var cols=[PAL.bluel,PAL.orange,PAL.yellow,PAL.red];for(var k=0;k<6;k++){var sd=seeds[Math.floor(r()*seeds.length)];x.strokeStyle=cols[k%4];x.lineWidth=1.6;x.fillStyle=rgba(hex(cols[k%4]),0.18);x.beginPath();var pts=12,rad=W*0.045+r()*W*0.05;for(var a=0;a<=pts;a++){var ang=a/pts*6.283,rr=rad*(0.8+0.3*Math.sin(ang*3+k));var qx=sd.x+Math.cos(ang)*rr,qy=sd.y+Math.sin(ang)*rr;a?x.lineTo(qx,qy):x.moveTo(qx,qy);}x.closePath();x.fill();x.stroke();}
    vignette(x,W,H);};

  D.lightsheet=function(el,W,H,seed){var x=canvasIn(el,W,H),r=rng(seed);x.fillStyle='#04090e';x.fillRect(0,0,W,H);
    function neuron(cx,cy,col,scale,alpha){var c=hex(col);x.strokeStyle=rgba(c,alpha);x.lineCap='round';var nb=3+Math.floor(r()*3);for(var b=0;b<nb;b++){var ang=r()*6.283,px=cx,py=cy,w=2.2*scale;for(var s=0;s<6;s++){var len=(10+r()*16)*scale;ang+=(r()-0.5)*0.9;var nx=px+Math.cos(ang)*len,ny=py+Math.sin(ang)*len;x.lineWidth=Math.max(0.4,w);x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+Math.cos(ang-0.3)*len*0.5,py+Math.sin(ang-0.3)*len*0.5,nx,ny);x.stroke();px=nx;py=ny;w*=0.75;if(r()<0.25){var a2=ang+(r()-0.5)*1.6,l2=len*0.6;x.lineWidth=Math.max(0.4,w*0.8);x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a2)*l2,py+Math.sin(a2)*l2);x.stroke();}}}
      var g=x.createRadialGradient(cx,cy,0,cx,cy,7*scale);g.addColorStop(0,rgba(c,alpha));g.addColorStop(0.5,rgba(c,alpha*0.9));g.addColorStop(1,rgba(c,0));x.fillStyle=g;x.beginPath();x.arc(cx,cy,7*scale,0,6.283);x.fill();}
    // background layer, blurred (depth)
    x.save();x.filter='blur(2.2px)';for(var i=0;i<Math.round(W*H/5000);i++)neuron(r()*W,r()*H,i%5?PAL.yellow:PAL.bluel,0.7,0.35);x.restore();
    for(var i=0;i<Math.round(W*H/7000);i++)neuron(r()*W,r()*H,i%4?PAL.yellow:PAL.bluel,1.0,0.9);
    vignette(x,W,H);};

  D.oct=function(el,W,H,seed){var x=canvasIn(el,W,H),r=rng(seed),noise=Simplex(rng(seed+8));x.fillStyle='#07131c';x.fillRect(0,0,W,H);x.lineCap='round';
    // orientation field: fibre strokes coloured by local angle (as PS-OCT orientation maps are)
    var n=Math.round(W*H/9);for(var i=0;i<n;i++){var px=r()*W,py=r()*H,ang=noise(px*0.006,py*0.006)*2.2+noise(px*0.02,py*0.02)*0.5;var hue=(ang+3.14)/6.283;var col=ramp([PAL.blue,PAL.bluel,PAL.yellow,PAL.orange,PAL.red,PAL.blue],hue);var len=4+r()*7;x.strokeStyle=rgba(col,0.35+r()*0.4);x.lineWidth=0.8+r()*0.8;x.beginPath();x.moveTo(px-Math.cos(ang)*len,py-Math.sin(ang)*len);x.lineTo(px+Math.cos(ang)*len,py+Math.sin(ang)*len);x.stroke();}
    // retardance shading
    vignette(x,W,H);};

  D.tracts=function(el,W,H,seed,small){var x=canvasIn(el,W,H),r=rng(seed),noise=Simplex(rng(seed+6));x.lineCap='round';
    // sagittal view: arcuate (yellow, C open to the left), cingulum (orange, long arc), IFOF (blue, long sag), uncinate (red, hook); depth-sorted fibres
    var bundles=[{c:PAL.yellow,p:[[0.30,0.72],[0.26,0.52],[0.34,0.32],[0.50,0.22],[0.66,0.26],[0.78,0.40],[0.82,0.58]],n:420,s:0.030},{c:PAL.orange,p:[[0.14,0.46],[0.28,0.30],[0.50,0.24],[0.72,0.30],[0.88,0.46]],n:300,s:0.018},{c:PAL.bluel,p:[[0.08,0.64],[0.28,0.60],[0.48,0.62],[0.68,0.60],[0.90,0.52]],n:380,s:0.022},{c:PAL.red,p:[[0.22,0.84],[0.16,0.70],[0.20,0.56],[0.32,0.50],[0.40,0.56]],n:220,s:0.020}];
    var fibres=[];bundles.forEach(function(b,bi){var col=hex(b.c);for(var i=0;i<b.n;i++){var ox=(r()+r()-1)*b.s*W,oy=(r()+r()-1)*b.s*H,ph=r()*6.28,z=r();var pts=b.p.map(function(p,j){var t=j/(b.p.length-1),sw=0.7+0.4*Math.sin(t*3.14+ph),nx=noise(t*3+bi*7,i*0.05)*W*0.014,ny=noise(t*3+bi*11,i*0.05+5)*H*0.014;return [p[0]*W+ox*sw+nx,p[1]*H+oy*sw+ny];});fibres.push({pts:pts,col:col,z:z});}});
    fibres.sort(function(a,b){return a.z-b.z;});
    fibres.forEach(function(f){var shade=mix([7,19,28],f.col,0.35+0.65*f.z);x.strokeStyle=rgba(mix(shade,[255,255,255],f.z>0.85?0.18:0),0.3+0.5*f.z);x.lineWidth=0.5+0.9*f.z;var pts=f.pts;x.beginPath();x.moveTo(pts[0][0],pts[0][1]);for(var j=1;j<pts.length-1;j++){var xc=(pts[j][0]+pts[j+1][0])/2,yc=(pts[j][1]+pts[j+1][1])/2;x.quadraticCurveTo(pts[j][0],pts[j][1],xc,yc);}x.lineTo(pts[pts.length-1][0],pts[pts.length-1][1]);x.stroke();});
    vignette(x,W,H);};

  D.surface=function(el,W,H,seed,small){var x=canvasIn(el,W,H),noise=Simplex(rng(seed+5)),noise2=Simplex(rng(seed+9)),mask=brainMask(W,H);
    // hillshaded gyri inside a lateral silhouette, parcels as muted tints with thin yellow borders
    var off=document.createElement('canvas');off.width=W;off.height=H;var ox=off.getContext('2d');var img=ox.createImageData(W,H),d=img.data,base=hex('#2a4a5e'),tints=[hex(PAL.blue),hex(PAL.bluel),hex(PAL.orange),hex(PAL.yellow),hex(PAL.red)];
    var k=220/Math.min(W,H);function hgt(px,py){return noise(px*0.013*k,py*0.013*k)*0.55+noise(px*0.03*k,py*0.03*k)*0.3+noise(px*0.07*k,py*0.07*k)*0.15;}function parcel(px,py){return Math.floor((noise2(px*0.0045*k,py*0.0045*k)+1)*2.49);}
    var cx=W/2,cy=H*0.5,rx=W*0.46,ry=H*0.40;
    for(var py=0;py<H;py++)for(var px=0;px<W;px++){var o=(py*W+px)*4,ex=(px-cx)/rx,ey=(py-cy)/ry,rr=Math.min(1,ex*ex+ey*ey);var h=hgt(px,py),hx=hgt(px+1.5,py)-hgt(px-1.5,py),hy=hgt(px,py+1.5)-hgt(px,py-1.5),nx=-hx*7,ny=-hy*7,nl=Math.sqrt(nx*nx+ny*ny+1);var dome=Math.sqrt(1-rr*0.9);var light=(nx*(-0.5)+ny*(-0.65)+0.58)/nl*0.8+dome*0.4;light=Math.max(0.1,Math.min(1.1,light));
      var sul=h<-0.1?0.5+0.5*Math.max(0,(h+0.3)/0.2):1;var pid=parcel(px,py),c=mix(base,tints[pid],0.38);var edge=(parcel(px+2,py)!==pid||parcel(px,py+2)!==pid);var v=edge?[235,195,50]:[c[0]*light*sul,c[1]*light*sul,c[2]*light*sul];d[o]=v[0];d[o+1]=v[1];d[o+2]=v[2];d[o+3]=255;}
    ox.putImageData(img,0,0);x.save();x.clip(mask);x.drawImage(off,0,0);x.restore();x.strokeStyle='rgba(238,243,246,0.35)';x.lineWidth=1;x.stroke(mask);vignette(x,W,H);};

  D.matrix=function(el,W,H,seed,small){var x=canvasIn(el,W,H),r=rng(seed),n=small?56:96,S=Math.min(W,H)*0.84,ox=(W-S)/2+6,oy=(H-S)/2+6,cell=S/n,blocks=[0,0.18,0.31,0.5,0.62,0.8,1],noise=Simplex(rng(seed+3));
    function blk(i){var u=i/n;for(var k=0;k<blocks.length-1;k++)if(u>=blocks[k]&&u<blocks[k+1])return k;return blocks.length-2;}
    var M=[];for(var i=0;i<n;i++){M[i]=[];for(var j=0;j<n;j++){if(j<i){M[i][j]=M[j][i];continue;}var same=blk(i)===blk(j),v=(same?0.55:0.1)+0.22*noise(i*0.25,j*0.25)+(i===j?0.35:0)+(r()-0.5)*0.12;if(Math.abs(blk(i)-blk(j))===1)v+=0.1;if((blk(i)+blk(j))%3===0&&!same)v+=0.08;M[i][j]=Math.max(0,Math.min(1,v));}}
    for(var i=0;i<n;i++)for(var j=0;j<n;j++){x.fillStyle=rgba(ramp(SEQ,M[i][j]),1);x.fillRect(ox+j*cell,oy+i*cell,cell+0.4,cell+0.4);}
    var cols=[PAL.bluel,PAL.red,PAL.orange,PAL.yellow,PAL.bluel,PAL.red];for(var k=0;k<blocks.length-1;k++){x.fillStyle=cols[k];x.fillRect(ox-7,oy+blocks[k]*S+1,2.5,(blocks[k+1]-blocks[k])*S-2);x.fillRect(ox+blocks[k]*S+1,oy-7,(blocks[k+1]-blocks[k])*S-2,2.5);}
    if(!small){x.fillStyle=PAL.muted;x.font='500 10px "Geist Mono",monospace';x.fillText('PARCELS × PARCELS · STREAMLINE COUNT',ox,oy+S+18);}};

  D.fmri=function(el,W,H,seed,small){var x=canvasIn(el,W,H),r=rng(seed),noise=Simplex(rng(seed+2)),img=x.createImageData(W,H),d=img.data,cx=W/2,cy=H/2,rx=W*0.36,ry=H*0.45,k=220/Math.min(W,H),cl=[];
    for(var q=0;q<5;q++){var a=r()*6.283,rad=0.3+r()*0.5;cl.push({x:cx+Math.cos(a)*rx*rad,y:cy+Math.sin(a)*ry*rad,s:(0.05+r()*0.05)*Math.min(W,H),a:0.75+r()*0.5});}
    for(var py=0;py<H;py++)for(var px=0;px<W;px++){var ex=(px-cx)/rx,ey=(py-cy)/ry,o=(py*W+px)*4;var ang=Math.atan2(ey,ex),wob=1+0.04*noise(Math.cos(ang)*2,Math.sin(ang)*2);var rr=(ex*ex+ey*ey)/(wob*wob);if(rr>1){d[o]=7;d[o+1]=19;d[o+2]=28;d[o+3]=255;continue;}
      var g;var fis=Math.abs(ex)<0.025&&(ey<-0.25||ey>0.35);var folds=noise(px*0.035*k,py*0.035*k)*0.6+noise(px*0.09*k,py*0.09*k)*0.25;if(rr>0.52){g=folds>0.1?0.36:0.5;if(rr>0.88)g=0.4;}else g=0.64+0.05*noise(px*0.05*k,py*0.05*k);
      var vx=(Math.abs(ex)-0.16)/0.1,vy=(ey+0.05)/0.3;if(vx*vx+vy*vy<1&&Math.abs(ex)>0.08)g=0.14;if(fis)g=0.1;g+=0.03*noise(px*0.2*k,py*0.2*k);
      var t=0;for(var q=0;q<cl.length;q++){var dx=px-cl[q].x,dy=py-cl[q].y;t=Math.max(t,cl[q].a*Math.exp(-(dx*dx+dy*dy)/(2*cl[q].s*cl[q].s)));}t+=0.1*noise(px*0.05*k,py*0.05*k);
      var base=[22+g*150,30+g*150,40+g*150],c=t>0.42?ramp([PAL.red,PAL.orange,PAL.yellow],Math.min(1,(t-0.42)/0.5)):base;if(rr>0.96){var f=(1-rr)/0.04;c=[c[0]*f+7*(1-f),c[1]*f+19*(1-f),c[2]*f+28*(1-f)];}
      d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=255;}
    putImg(x,img,W,H);vignette(x,W,H);};

  D.meg=function(el,W,H,seed,small){var x=canvasIn(el,W,H),r=rng(seed),noise=Simplex(rng(seed+4)),R=Math.min(W,H)*0.36,cx=small?W/2:W*0.3,cy=H*0.5,img=x.createImageData(W,H),d=img.data;
    var poles=[{x:cx-R*0.42,y:cy-R*0.18,s:1},{x:cx+R*0.45,y:cy-R*0.1,s:-1},{x:cx,y:cy+R*0.5,s:0.5}];var F=[];
    for(var py=0;py<H;py++){F[py]=[];for(var px=0;px<W;px++){var dx=px-cx,dy=py-cy;if(dx*dx+dy*dy>R*R){F[py][px]=null;continue;}var v=0;poles.forEach(function(p){var ddx=px-p.x,ddy=py-p.y;v+=p.s*Math.exp(-(ddx*ddx+ddy*ddy)/(2*R*R*0.12));});F[py][px]=0.5+0.5*v+0.04*noise(px*0.03,py*0.03);}}
    for(var py=0;py<H;py++)for(var px=0;px<W;px++){var o=(py*W+px)*4,v=F[py][px];if(v===null){d[o]=7;d[o+1]=19;d[o+2]=28;d[o+3]=255;continue;}var lv=Math.floor(v*9)/9;var c=ramp(SEQ,0.1+0.85*lv);var iso=false;if(px>0&&F[py][px-1]!==null&&Math.floor(F[py][px-1]*9)!==Math.floor(v*9))iso=true;if(py>0&&F[py-1][px]!==null&&Math.floor(F[py-1][px]*9)!==Math.floor(v*9))iso=true;if(iso)c=[c[0]*0.45,c[1]*0.45,c[2]*0.45];d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=255;}
    putImg(x,img,W,H);x.strokeStyle='rgba(238,243,246,0.55)';x.lineWidth=1.2;x.beginPath();x.arc(cx,cy,R,0,6.283);x.stroke();
    // nose and ears
    x.beginPath();x.moveTo(cx-R*0.1,cy-R*0.99);x.lineTo(cx,cy-R*1.12);x.lineTo(cx+R*0.1,cy-R*0.99);x.stroke();
    x.fillStyle='rgba(238,243,246,0.9)';for(var k=0;k<(small?48:102);k++){var a=r()*6.283,rr=Math.sqrt(r())*R*0.94;x.beginPath();x.arc(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,1.4,0,6.283);x.fill();}
    if(!small){var bx=W*0.56,bw=W*0.4,by=H*0.2,bh=H*0.6;x.strokeStyle='rgba(238,243,246,0.25)';x.beginPath();x.moveTo(bx,by+bh/2);x.lineTo(bx+bw,by+bh/2);x.stroke();for(var ch=0;ch<60;ch++){var col=ramp(SEQ,0.45+r()*0.55),ph=r()*6.28,amp=bh*0.08*(0.5+r());x.strokeStyle=rgba(col,0.55);x.lineWidth=0.9;x.beginPath();for(var i=0;i<=200;i++){var t=i/200,ex=Math.exp(-Math.pow((t-0.45)/0.12,2));var yv=by+bh/2+Math.sin(t*40+ph)*amp*ex*3+noise(i*0.1,ch)*amp*0.5;if(i===0)x.moveTo(bx+t*bw,yv);else x.lineTo(bx+t*bw,yv);}x.stroke();}x.fillStyle=PAL.muted;x.font='500 10px "Geist Mono",monospace';x.fillText('MEG · 102 SENSORS · EVOKED RESPONSE',bx,by+bh+22);}};

  
export default D;
