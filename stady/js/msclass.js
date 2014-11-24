<!--
/*MSClass (Class Of Marquee Scroll - General Uninterrupted Scrolling(JS)) Ver 2.85*\

@ Code By : Yongxiang Cui(333) E-Mail:zhadan007@21cn.com http://www.popub.net
@ Update　: 2011-07-08 (Ver 2.85)
@ Download: http://www.popub.net/script/MSClass.html

\***================Please keep the above copyright information================***/


/**==================The following instructions can be deleted=================**\
　Explain:
　　include <script type="text/javascript" src="MSClass.js"></script> 
　Create Examples:
　　I
　　new Marquee("Marquee") 
　　new Marquee("Marquee","top")
　　......
　　new Marquee("Marquee",0,1,760,52)
　　new Marquee("Marquee","top",1,760,52,50,5000)
　　......
　　new Marquee("Marquee",0,1,760,104,50,5000,3000,52)
　　new Marquee("Marquee",null,null,760,104,null,5000,null,-1)

　　II
　　var Marquee1 = new Marquee("Marquee")　*required 
　　Marquee1.Direction = "top";　or　Marquee1.Direction = 0; 
　　Marquee1.Step = 1; 
　　Marquee1.Width = 760; 
　　Marquee1.Height = 52; 
　　Marquee1.Timer = 50; 
　　Marquee1.DelayTime = 5000; 
　　Marquee1.WaitTime = 3000; 
　　Marquee1.ScrollStep = 52; 
　　Marquee1.Start(); 

　　III
　　new Marquee( 
　　{ 
　　　MSClassID : "Marquee", 
　　　Direction : "top", 
　　　Step　 : 1, 
　　　Width　 : 760, 
　　　Height　 : 52, 
　　　Timer　 : 50, 
　　　DelayTime : 5000, 
　　　WaitTime : 3000, 
　　　ScrollStep: 52, 
　　　AutoStart : 1 
　　}); 

　Parameters:
　　ID　　　　　 "Marquee"　Container ID　　　(required) 
　　Direction　　(0)　　　　Scroll direction　(optional,Default 0)(Values:0 Up, 1 Down, 2 Left, 3 Right, -1 Vertical alternate, 4 Transverse alternate) 
　　Step　　　　 (1)　　　　Scrolling step　　(optional,Default 2) 
　　Width　　　　(760)　　　Visual width　　　(optional,Default is container width) 
　　Height　　　 (52)　　　 Visual height　　 (optional,Default is container height) 
　　Timer　　　　(50)　　　 Running timer　　 (optional,Default 30) 
　　DelayTime　　(5000)　　 Pause delay time　(optional,Default 0 - not pause) 
　　WaitTime　　 (3000)　　 Waiting time　　　(optional,Default 0 - not wait) 
　　ScrollStep　 (52)　　　 Scroll spacing　　(optional,Default is visual width or visual height) 
　　SwitchType　 (0)　　　　Wheel show type 　(optional,Default 0 - scroll)(Values:0 Scroll, 1 Cut in, 2 Fade in)

\***all rights reserved:Yongxiang Cui(333) E-Mail:zhadan007@21cn.com Website:http://www.popub.net***/ 

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('13 2r(){16 b=1k,a=1M;b.$=13(c){15 1h.3K(c)};b.t=(b.F=["3M 2.78.77","76 74 2r 2s","73 72 71(70)","6Z://6Y.6X.6W/6V/3M.6U","6T 6S(6R) 6Q@6P.6O"]).4x("\\n");b.a=a[0]["3M"]||a[0]||a[0][0];b.b=(b.c=1L b.a=="3l"?b.$(b.a[0])||b.$(b.a.4K):b.$(b.a))&&b.6N.1U().2S(4N>>>4M,14>>4L)==b.F[1].2S(4N>>>4M,14>>4L);11(!b.c||!b.b){15 2u("4k ["+(b.a.4K||b.a[0]||b.a)+"] 6M 6L!")||(b.c=-1)}b.2Y=1+(b.i=b.2d=-1);b.f=b.q=b.r=b.s=b.B=b.u=b.k=b.e=b.d=b.j=0;b.18=a[1]||a[0]["18"]||0;b.1a=a[2]||a[0]["1a"]||1;b.1F=a[3]||a[0]["1F"]||0;b.1N=a[4]||a[0]["1N"]||0;b.1T=a[5]||a[0]["1T"]||30;b.1n=a[6]||a[0]["1n"]||0;b.1S=a[7]||a[0]["1S"]||2G;b.1b=a[8]||a[0]["1b"]||-10;b.1m=a[9]||a[0]["1m"]||0;b.2j=a[10]||a[0]["2j"];b.38=b.$(a[0]["6K"])||0;b.37=b.$(a[0]["6J"])||0;b.1Q=a[0]["1Q"]||[];b.c.12.3e=b.c.12.4f=b.c.12.4e="2O";b.3O=(6I.6H.2v().6G("6F")==-1);b.m=(1h.3B)?1:0;11(a.1j>=7||a[0]["6E"]==1){b.4J()}}2r.3Y.4J=13(){11(1k.c==-1||1k.i>=0){11(1k.i==2){1k.2B()}15 1g}16 f=1k,G,r,P,K,u,O,e="6D",N=2r,E=0,p=[],D=0,B=0,n,b=0,L={6C:-1,6B:-1,1t:0,6A:0,2o:1,6z:1,1x:2,3G:3,6y:4},h=0,A=0,T=0,w=0,t=0,q=0,F=0,M=0,a=[],S=1A;16 g=13(m,j,i){i?0:i=0;15 f.m?(m.2a[j]!="4I"&&m.2a[j]!="4H"&&m.2a[j]!="3I"&&m.2a[j]!="6x"&&m.2a[j]!="6w"&&m.2a[j]!="3v")?m.2a[j]:i:(1i.2p(m,1A)[j]!="4I"&&1i.2p(m,1A)[j]!="4H"&&1i.2p(m,1A)[j]!="3I"&&1i.2p(m,1A)[j]!="2z"&&1i.2p(m,1A)[j]!="3v")?1i.2p(m,1A)[j]:i};16 v=13(j){16 i=j||1i.1v;3L=i.3L||i.6v;11(3L==6u){2u(f.t)}};f.c.12.1G=g(f.c,"1G","4G");16 H={b:13(){15\'<1s><1p 1D="8"><1E 12="1o:0;1o-1t:1z 1I #2X;1o-2o:1z 1I #29;1O:0;28:0;1O-2o:-4F;"></1E></1p></1s>\'},c:13(i,j){15 6t(j)?\'<1s><1p 6s="2o" 1D="17" 1R="1k.12.2n=\\\'#3E\\\';1k.12.1P=\\\'#29\\\';" 1W="1k.12.2n=\\\'\\\';1k.12.1P=\\\'#3D\\\';" 32="\'+j+\'">\'+i+"</1p></1s>":"<1s><1p 1D=\\"17\\" 1R=\\"1k.12.2n=\'#3E\';1k.12.1P=\'#29\';1h.3K(\'"+n+"3J"+R+"\').12.1w=\'1B\';\\" 1W=\\"1k.12.2n=\'\';1k.12.1P=\'#3D\';1h.3K(\'"+n+"3J"+R+\'\\\').12.1w=\\\'\\\';" ><1E 12="1D:6r;1G:4G;"><1E 2q="\'+n+"3J"+R+\'" 12="1G:2x;1x:1z;1t:6q;1P:#29;z-4D:0;2W-3F:2z;1y:2w%;1o:0;1O:0;28:0;">\'+i+\'</1E><1E 12="1G:2x;1x:3I;1t:4F;1P:#2X;-4A-4z-4y:1B;2W-3F:2z;1y:2w%;1o:0;1O:0;28:0;">\'+i+"</1E></1E></1p></1s>"},f:13(){16 i=f.$(n);11(!i){15 1g}i.12.1w="1B"},d:13(j){16 m=f.$(n);11(!m){15 1g}16 i=j||1i.1v;m.12.1t=(i.2F+(1h.6p.3z||1h.2V.3z))+"1f";m.12.1x=1h.2V.6o-i.2c<=4E?(i.2c-4E)+"1f":i.2c+"1f";m.12.1w="";15 1g},a:13(){11(!N.c){N.c=1;f.m?1h.1Y("6n",v):1h.1X("6m",v,1J)}11(!f.1Q[0]){15 1g}f.c.3C=13(){15 1g};16 j=1h.4g("6l");n=j.2q="M"+(19.3c().1U().6k(-6));j.12.6j="1w:1B;z-4D:2w;1G:2x;1x:0;1t:-4n;1y:6i;1o-1x:1z 1I #3H;1o-1t:1z 1I #3H;1o-3G:1z 1I #4C;1o-2o:1z 1I #4C;1O:0;28:0;";16 i=\'<1E 12="2W-6h:\\\'\\6g\\6f\\\',6e;2E:6d;6c-1P:#3H;1y:6b;1o-1x:1z 1I #29;1o-1t:1z 1I #29;1o-3G:1z 1I #2X;1o-2o:1z 1I #2X;1O:0;28:0;"><2l 1o="0" 3A="0" 12="2W-3F:2z;4B-6a:69;1O:1z;1y:68;4B-67:1x;-4A-4z-4y:1B; 1o-2m:2m" 66="15 1g;" 3C="15 1g">\';1C(R=1;R<f.1Q.1j;R++){i+=(!f.1Q[R]||!f.1Q[R][0]||f.1Q[R][0]=="")?H.b():H.c(f.1Q[R][0],f.1Q[R][1]||R)}i+=H.b();i+="<1s><1p 1D=\\"17\\" 1R=\\"1k.12.2n=\'#3E\';1k.12.1P=\'#29\';\\" 1W=\\"1k.12.2n=\'\';1k.12.1P=\'#3D\';\\" 32=\\"2u(\'"+f.F.4x("\\\\n")+"\')\\">65 "+f.F[0]+"</1p></1s></2l></1E>";j.1q=i;11(f.m){1i.1Y("64",13(){1h.2V.2K(j)});f.c.1Y("3C",H.d);1h.1Y("2J",H.f)}1e{1i.1X("63",13(){1h.2V.2K(j)},1J);f.c.1X("62",H.d,1J);1h.1X("61",H.f,1J)}}};H.a();11(f.1T<20){f.1T=20}11(f.1S<2G){f.1S=2G}11(f.1F==0){f.1F=1l(f.c.12.1y)}11(f.1N==0){f.1N=1l(f.c.12.1D)}f.c.12.1y=f.1F+"1f";f.c.12.1D=f.1N+"1f";11(1L f.18=="2t"){f.18=L[f.18.1U().2v()]}G=f.18>1?"<2l 4s=\'0\' 3A=\'0\' 12=\'1o-2m:2m;1w:3u;\'><1s><1p 3h=1J 12=\'4w-4v: 3g;4u-2I:4t-3B;\'>2h</1p><1p 3h=1J 12=\'4w-4v: 3g;4u-2I:4t-3B;\'>2h</1p></1s></2l>":"<2l 4s=\'0\' 3A=\'0\' 12=\'1o-2m:2m;\'><1s><1p>2h</1p></1s><1s><1p>2h</1p></1s></2l>";r=f.18>1?f.1F:f.1N;P=f.18>1?"60":"5Z";f.d=f.18>1?"5Y":"3z";f.w=f.18>1?"1x":"1t";11(f.18>4){f.18=2}11(f.18<-1){f.18=0}f.n=f.c.1q;16 c={0:13(){15 1},5X:13(i,m,j){15 m*(i/=j)*i},5W:13(i,m,j){15-m*(i/=j)*(i-2)},5V:13(i,m,j){11((i/=j/2)<1){15 m/2*i*i}15-m/2*((--i)*(i-2)-1)},5U:13(i,m,j){15 m*(i/=j)*i*i},5T:13(i,m,j){15 m*((i=i/j-1)*i*i+1)},5S:13(i,m,j){11((i/=j/2)<1){15 m/2*i*i*i}15 m/2*((i-=2)*i*i+2)},5R:13(i,m,j){15 m*(i/=j)*i*i*i},5Q:13(i,m,j){15-m*((i=i/j-1)*i*i*i-1)},5P:13(i,m,j){11((i/=j/2)<1){15 m/2*i*i*i*i}15-m/2*((i-=2)*i*i*i-2)},5O:13(i,m,j){15 m*(i/=j)*i*i*i*i},5N:13(i,m,j){15 m*((i=i/j-1)*i*i*i*i+1)},5M:13(i,m,j){11((i/=j/2)<1){15 m/2*i*i*i*i*i}15 m/2*((i-=2)*i*i*i*i+2)},5L:13(i,m,j){15-m*19.4r(i/j*(19.1H/2))+m},5K:13(i,m,j){15 m*19.2A(i/j*(19.1H/2))},5J:13(i,m,j){15-m/2*(19.4r(19.1H*i/j)-1)},5I:13(i,m,j){15(i==0)?0:m*19.1V(2,10*(i/j-1))},5H:13(i,m,j){15(i==j)?m:m*(-19.1V(2,-10*i/j)+1)},5G:13(i,m,j){11(i==0){15 0}11(i==j){15 m}11((i/=j/2)<1){15 m/2*19.1V(2,10*(i-1))}15 m/2*(-19.1V(2,-10*--i)+2)},5F:13(i,m,j){15-m*(19.2U(1-(i/=j)*i)-1)},5E:13(i,m,j){15 m*19.2U(1-(i=i/j-1)*i)},5D:13(i,m,j){11((i/=j/2)<1){15-m/2*(19.2U(1-i*i)-1)}15 m/2*(19.2U(1-(i-=2)*i)+1)},2N:13(j,W,V){16 m=1.2k;16 U=0;16 i=W;11(j==0){15 0}11((j/=V)==1){15 W}11(!U){U=V*0.3}11(i<19.2D(W)){i=W;16 m=U/4}1e{16 m=U/(2*19.1H)*19.3y(W/i)}15-(i*19.1V(2,10*(j-=1))*19.2A((j*V-m)*(2*19.1H)/U))},4b:13(j,W,V){16 m=1.2k;16 U=0;16 i=W;11(j==0){1