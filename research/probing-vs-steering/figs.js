/* figs.js: animated redrawings of two results figures of the paper (values read from the vector PDFs). */
(function(){
'use strict';
var D={"log":[-3,-2.5,-2,-1.5,-1,-0.5,0,0.5,1,1.5,2,2.5,3,null],"dial":{"T":{"LLaMA":{"probe":[0.8029,0.8341,0.8728,0.9091,0.9367,0.9529,0.9598,0.9597,0.9533,0.9406,0.923,0.9038,0.8901,0.8802],"steer":[0.0958,0.0701,0.0179,-0.0386,-0.0481,0.0337,0.2091,0.4619,0.7394,0.9223,1.0009,1.018,1.0096,1.0]},"Qwen":{"probe":[0.8044,0.8401,0.8823,0.9206,0.9451,0.9571,0.9612,0.9593,0.9513,0.9371,0.9186,0.9014,0.8909,0.8838],"steer":[0.0158,-0.0207,-0.0446,-0.074,-0.0263,0.0415,0.2499,0.5237,0.8037,1.0325,1.1169,1.1062,1.0438,1.0]},"Gemma":{"probe":[0.8622,0.8997,0.9306,0.9514,0.9629,0.9678,0.9683,0.9637,0.9512,0.9336,0.9143,0.8622,0.7328,0.5958],"steer":[-0.1663,-0.1268,-0.063,0.006,0.1166,0.3232,0.6351,0.8911,1.072,1.1276,1.0281,0.9987,0.9608,1.0]}},"S":{"LLaMA":{"probe":[0.9613,0.9615,0.9621,0.9639,0.9679,0.9735,0.9786,0.9811,0.9799,0.9749,0.9666,0.9533,0.9289,0.893],"steer":[0.4455,0.4473,0.4531,0.467,0.507,0.596,0.7598,0.9857,1.2063,1.3072,1.2893,1.2039,1.1047,1.0]},"Qwen":{"probe":[0.9485,0.9487,0.9491,0.9503,0.9533,0.9582,0.9637,0.9662,0.9635,0.9545,0.9391,0.9075,0.8601,0.8164],"steer":[0.4147,0.4111,0.42,0.4318,0.476,0.5839,0.7861,1.1073,1.421,1.5587,1.5054,1.3958,1.1961,1.0]},"Gemma":{"probe":[0.9614,0.9622,0.9641,0.968,0.9733,0.9771,0.9781,0.9743,0.9659,0.9543,0.9278,0.8714,0.7735,0.6314],"steer":[0.499,0.5016,0.519,0.563,0.6381,0.7525,0.9995,1.1967,1.2678,1.2589,1.1635,1.0511,1.045,1.0]}}},"plateau":{"T":{"LLaMA":{"probe":[6,7],"steer":[11]},"Qwen":{"probe":[6],"steer":[10,11]},"Gemma":{"probe":[5,6],"steer":[9]}},"S":{"LLaMA":{"probe":[7],"steer":[9]},"Qwen":{"probe":[7],"steer":[9]},"Gemma":{"probe":[6],"steer":[8,9]}}},"laws":{"p1":[{"c":"T","x":0.8802,"y":0.8548,"pair":null,"src":"LLaMA"},{"c":"T","x":0.8802,"y":0.8721,"pair":null,"src":"LLaMA"},{"c":"T","x":0.8838,"y":0.8296,"pair":null,"src":"Qwen"},{"c":"T","x":0.8838,"y":0.8475,"pair":null,"src":"Qwen"},{"c":"T","x":0.5958,"y":0.5795,"pair":"G\u2192L","src":"Gemma"},{"c":"T","x":0.5958,"y":0.5296,"pair":"G\u2192Q","src":"Gemma"},{"c":"S","x":0.893,"y":0.8137,"pair":null,"src":"LLaMA"},{"c":"S","x":0.893,"y":0.8246,"pair":null,"src":"LLaMA"},{"c":"S","x":0.8164,"y":0.7923,"pair":null,"src":"Qwen"},{"c":"S","x":0.8164,"y":0.7845,"pair":null,"src":"Qwen"},{"c":"S","x":0.6314,"y":0.5218,"pair":"G\u2192Q","src":"Gemma"},{"c":"S","x":0.6314,"y":0.537,"pair":"G\u2192L","src":"Gemma"}],"p2":[{"c":"T","x":0.8838,"y":0.8498,"pair":null,"tgt":"Qwen"},{"c":"T","x":0.5959,"y":0.557,"pair":"Q\u2192G","tgt":"Gemma"},{"c":"T","x":0.8801,"y":0.8398,"pair":null,"tgt":"LLaMA"},{"c":"T","x":0.5959,"y":0.5626,"pair":"L\u2192G","tgt":"Gemma"},{"c":"T","x":0.8801,"y":0.8627,"pair":null,"tgt":"LLaMA"},{"c":"T","x":0.8838,"y":0.8562,"pair":null,"tgt":"Qwen"},{"c":"S","x":0.8164,"y":0.8003,"pair":null,"tgt":"Qwen"},{"c":"S","x":0.6315,"y":0.4468,"pair":"Q\u2192G","tgt":"Gemma"},{"c":"S","x":0.893,"y":0.8118,"pair":null,"tgt":"LLaMA"},{"c":"S","x":0.6315,"y":0.454,"pair":"L\u2192G","tgt":"Gemma"},{"c":"S","x":0.893,"y":0.8341,"pair":null,"tgt":"LLaMA"},{"c":"S","x":0.8164,"y":0.8071,"pair":null,"tgt":"Qwen"}],"p3":[{"c":"T","x":0.6067,"y":0.6359,"pair":"L\u2192Q","xi":[0.5221,0.683],"yi":[0.5655,0.7179],"tabdiff":0.004},{"c":"T","x":0.3029,"y":0.4371,"pair":"L\u2192G","xi":[0.214,0.3983],"yi":[0.3417,0.5425],"tabdiff":0.003},{"c":"T","x":0.3852,"y":0.536,"pair":"Q\u2192L","xi":[0.3225,0.4619],"yi":[0.4753,0.599],"tabdiff":0.005},{"c":"T","x":0.21,"y":0.5251,"pair":"Q\u2192G","xi":[0.1319,0.2941],"yi":[0.4208,0.6315],"tabdiff":0.005},{"c":"T","x":-0.1291,"y":0.6159,"pair":"G\u2192L","xi":[-0.2251,-0.042],"yi":[0.5561,0.682],"tabdiff":0.004},{"c":"T","x":-0.0347,"y":0.6869,"pair":"G\u2192Q","xi":[-0.0969,0.0266],"yi":[0.6157,0.7765],"tabdiff":0.005},{"c":"S","x":0.8502,"y":0.928,"pair":"L\u2192Q","xi":[0.7686,0.9365],"yi":[0.8569,0.9983],"tabdiff":0.002},{"c":"S","x":0.3166,"y":0.7243,"pair":"L\u2192G","xi":[0.276,0.3734],"yi":[0.6673,0.8023],"tabdiff":0.004},{"c":"S","x":0.4541,"y":0.6545,"pair":"Q\u2192L","xi":[0.4252,0.4864],"yi":[0.62,0.6905],"tabdiff":0.004},{"c":"S","x":0.2779,"y":0.6962,"pair":"Q\u2192G","xi":[0.2519,0.3238],"yi":[0.6579,0.755],"tabdiff":0.004},{"c":"S","x":0.054,"y":0.6988,"pair":"G\u2192L","xi":[0.0483,0.0598],"yi":[0.6697,0.7285],"tabdiff":0.004},{"c":"S","x":0.0719,"y":0.8053,"pair":"G\u2192Q","xi":[0.0625,0.0825],"yi":[0.7518,0.867],"tabdiff":0.005}]}};
var MODELS=['LLaMA','Qwen','Gemma'], MCOL={LLaMA:'#2d5f7f',Qwen:'#e5896f',Gemma:'#b5679b'}, CCOL={T:'#2d5f7f',S:'#e5896f'};
var NS='http://www.w3.org/2000/svg';
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function el(tag,attrs,parent){var e=document.createElementNS(NS,tag);for(var k in attrs){if(k==='text')e.textContent=attrs[k];else e.setAttribute(k,attrs[k]);}if(parent)parent.appendChild(e);return e;}
function h(tag,cls,parent,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;if(parent)parent.appendChild(e);return e;}
function onView(node,fn){if(reduce||!('IntersectionObserver' in window)){fn();return;}var io=new IntersectionObserver(function(es){if(es.some(function(e){return e.isIntersecting;})){fn();io.disconnect();}},{threshold:.25});io.observe(node);}
function f2(v){return (Math.round(v*100)/100).toFixed(2);}
function drawOn(path,delay,dur){var L=path.getTotalLength();path.style.strokeDasharray=L+' '+L;path.style.strokeDashoffset=L;path.getBoundingClientRect();path.style.transition='stroke-dashoffset '+dur+'s ease '+delay+'s';path.style.strokeDashoffset='0';setTimeout(function(){path.style.strokeDasharray=path.getAttribute('data-dash')||'';path.style.strokeDashoffset='';path.style.transition='';},(delay+dur)*1000+50);}

/* ============================ the dial ============================ */
(function(){
  var host=document.getElementById('dialFig'); if(!host) return;
  var W=380,H=300,ml=44,mr=44,mt=22,mb=46, iw=W-ml-mr, ih=H-mt-mb;
  var LOG=D.log, XS=[]; for(var i=0;i<13;i++) XS.push(ml+iw*(i/14)); XS.push(ml+iw*(14/14)); // Δμ one decade beyond 10^3
  function yL(a){return mt+ih*(1-(a-0.55)/0.45);}   // AUROC 0.55..1.0
  function yR(s){return mt+ih*(1-(s+0.3)/1.95);}    // S/S(Δμ) -0.3..1.65
  var panels=[],state={i:7,auto:true,idle:null};
  var row=h('div','anirow',host);
  [['T','Truthfulness'],['S','Sentiment']].forEach(function(pc){
    var key=pc[0], wrap=h('div','anipanel',row), svg=el('svg',{viewBox:'0 0 '+W+' '+H,'class':'dial'},wrap);
    el('text',{x:W/2,y:14,'class':'ttl','text-anchor':'middle',text:pc[1]});
    el('text',{x:W/2,y:14,'class':'ttl','text-anchor':'middle',text:pc[1]},svg);
    // frame and ticks
    el('rect',{x:ml,y:mt,width:iw,height:ih,'class':'frame'},svg);
    [0.6,0.7,0.8,0.9,1.0].forEach(function(a){el('line',{x1:ml-4,x2:ml,y1:yL(a),y2:yL(a),'class':'tick'},svg);el('text',{x:ml-7,y:yL(a)+3.5,'class':'tl','text-anchor':'end',text:a.toFixed(1)},svg);});
    [0,0.5,1.0,1.5].forEach(function(s){el('line',{x1:ml+iw,x2:ml+iw+4,y1:yR(s),y2:yR(s),'class':'tick'},svg);el('text',{x:ml+iw+7,y:yR(s)+3.5,'class':'tl',text:s.toFixed(1)},svg);});
    [[0,'10⁻³'],[4,'10⁻¹'],[8,'10¹'],[12,'10³'],[13,'Δμ']].forEach(function(t){el('line',{x1:XS[t[0]],x2:XS[t[0]],y1:mt+ih,y2:mt+ih+4,'class':'tick'},svg);el('text',{x:XS[t[0]],y:mt+ih+16,'class':'tl','text-anchor':'middle',text:t[1]},svg);});
    el('text',{x:ml+iw/2,y:H-6,'class':'al','text-anchor':'middle',text:'λ/τ  (probe end → mean difference)'},svg);
    el('text',{x:12,y:mt+ih/2,'class':'al','text-anchor':'middle',transform:'rotate(-90 12 '+(mt+ih/2)+')',text:'probing: AUROC (dashed)'},svg);
    el('text',{x:W-10,y:mt+ih/2,'class':'al','text-anchor':'middle',transform:'rotate(90 '+(W-10)+' '+(mt+ih/2)+')',text:'steering: S/S(Δμ) (solid)'},svg);
    // reference: S = 1 and the axis break before Δμ
    el('line',{x1:ml,x2:ml+iw,y1:yR(1),y2:yR(1),'class':'ref'},svg);
    el('line',{x1:(XS[12]+XS[13])/2,x2:(XS[12]+XS[13])/2,y1:mt,y2:mt+ih,'class':'ref'},svg);
    var cursor=el('line',{x1:XS[7],x2:XS[7],y1:mt,y2:mt+ih,'class':'cursor'},svg);
    var marks={};
    var curves=[];
    MODELS.forEach(function(m,mi){
      var pr=D.dial[key][m].probe, st=D.dial[key][m].steer, col=MCOL[m];
      var dp=pr.map(function(v,i){return (i?'L':'M')+XS[i].toFixed(1)+' '+yL(v).toFixed(1);}).join(' ');
      var ds=st.map(function(v,i){return (i?'L':'M')+XS[i].toFixed(1)+' '+yR(v).toFixed(1);}).join(' ');
      var pp=el('path',{d:dp,'class':'cv probe',stroke:col,'data-dash':'5 3'},svg);
      var ps=el('path',{d:ds,'class':'cv steer',stroke:col},svg);
      curves.push([pp,0.25*mi,1.3],[ps,0.9+0.25*mi,1.3]);
      marks[m]={probe:[],steer:[]};
      var bp=D.plateau[key][m].probe||[], bs=D.plateau[key][m].steer||[];
      pr.forEach(function(v,i){var big=bp.indexOf(i)>=0;marks[m].probe.push(el('circle',{cx:XS[i],cy:yL(v),r:big?4.6:2.6,'class':'mk probe'+(big?' big':''),stroke:col},svg));});
      st.forEach(function(v,i){var big=bs.indexOf(i)>=0,s=big?9:5;marks[m].steer.push(el('rect',{x:XS[i]-s/2,y:yR(v)-s/2,width:s,height:s,'class':'mk steer'+(big?' big':''),fill:col},svg));});
    });
    var read=h('div','aniread',wrap);
    panels.push({key:key,svg:svg,cursor:cursor,marks:marks,curves:curves,read:read});
    svg.addEventListener('pointermove',function(ev){var r=svg.getBoundingClientRect();var x=(ev.clientX-r.left)/r.width*W;var best=0;for(var i=1;i<14;i++)if(Math.abs(XS[i]-x)<Math.abs(XS[best]-x))best=i;state.auto=false;clearTimeout(state.idle);state.idle=setTimeout(function(){state.auto=true;},4000);setIdx(best);});
  });
  var legend=h('div','anilegend',host);
  MODELS.forEach(function(m){var s=h('span','',legend);var i=h('i','',s);i.style.background=MCOL[m];h('b','',s,{LLaMA:'LLaMA-3.1-8B',Qwen:'Qwen3.5-9B',Gemma:'Gemma-3-12B'}[m]);});
  h('span','',legend,'dashed + circles: probing (AUROC) · solid + squares: steering (S/S(Δμ) at κ₀) · large marker: one-standard-error plateau');
  function lab(i){return i===13?'Δμ':('λ/τ = 10^'+(LOG[i]%1?LOG[i].toFixed(1):LOG[i]));}
  function setIdx(i){state.i=i;panels.forEach(function(p){p.cursor.setAttribute('x1',XS[i]);p.cursor.setAttribute('x2',XS[i]);
    MODELS.forEach(function(m){p.marks[m].probe.forEach(function(c,j){c.classList.toggle('on',j===i);});p.marks[m].steer.forEach(function(c,j){c.classList.toggle('on',j===i);});});
    var pr=MODELS.map(function(m){return m+' '+f2(D.dial[p.key][m].probe[i]);}).join(' · ');
    var st=MODELS.map(function(m){return m+' '+f2(D.dial[p.key][m].steer[i]);}).join(' · ');
    p.read.innerHTML='<b>'+lab(i)+'</b><br>probing AUROC: '+pr+'<br>steering, relative to Δμ: '+st;});}
  function reveal(){
    panels.forEach(function(p){p.svg.classList.add('go');if(!reduce)p.curves.forEach(function(c){drawOn(c[0],c[1],c[2]);});});
    setIdx(7);
    if(reduce) return;
    setTimeout(function(){setInterval(function(){if(state.auto)setIdx((state.i+1)%14);},900);},2600);
  }
  onView(host,reveal);
})();

/* ============================ two laws ============================ */
(function(){
  var host=document.getElementById('lawsFig'); if(!host) return;
  var W=250,H=250,ml=40,mr=12,mt=22,mb=40, iw=W-ml-mr, ih=H-mt-mb;
  var PANELS=[
    {key:'p1',title:'probe law follows the source',xl:"A's own Δμ AUROC (in A)",yl:'AUROC in B: probe law',x:[0.55,0.92],y:[0.48,0.92],xt:[0.6,0.8],yt:[0.5,0.6,0.7,0.8,0.9],note:['r = 0.98','top-right cluster: the 8 pairs','with source LLaMA or Qwen']},
    {key:'p2',title:'steering law follows the target',xl:"B's own Δμ AUROC (in B)",yl:'AUROC in B: steering law',x:[0.55,0.92],y:[0.42,0.92],xt:[0.6,0.8],yt:[0.5,0.6,0.7,0.8,0.9],note:['r = 0.95','top-right cluster: the 8 pairs','with target LLaMA or Qwen']},
    {key:'p3',title:'steering in B',xl:'S in B: probe law (/ own Δμ)',yl:'S in B: steering law (/ own Δμ)',x:[-0.3,1.1],y:[-0.1,1.1],xt:[0,0.5,1.0],yt:[0,0.25,0.5,0.75,1.0],note:['steering law higher:','12 of 12 pairs'],low:true}
  ];
  var row=h('div','anirow three',host), all=[], state={k:0,auto:true,idle:null};
  var PAIRS=['L→Q','L→G','Q→L','Q→G','G→L','G→Q'];
  PANELS.forEach(function(P){
    var wrap=h('div','anipanel',row), svg=el('svg',{viewBox:'0 0 '+W+' '+H,'class':'laws'},wrap);
    function X(v){return ml+iw*(v-P.x[0])/(P.x[1]-P.x[0]);} function Y(v){return mt+ih*(1-(v-P.y[0])/(P.y[1]-P.y[0]));}
    el('text',{x:W/2,y:13,'class':'ttl','text-anchor':'middle',text:P.title},svg);
    el('rect',{x:ml,y:mt,width:iw,height:ih,'class':'frame'},svg);
    P.xt.forEach(function(t){el('line',{x1:X(t),x2:X(t),y1:mt+ih,y2:mt+ih+4,'class':'tick'},svg);el('text',{x:X(t),y:mt+ih+15,'class':'tl','text-anchor':'middle',text:(P.key==='p3'?t.toFixed(1):t.toFixed(1))},svg);});
    P.yt.forEach(function(t){el('line',{x1:ml-4,x2:ml,y1:Y(t),y2:Y(t),'class':'tick'},svg);el('text',{x:ml-6,y:Y(t)+3.5,'class':'tl','text-anchor':'end',text:(P.key==='p3'?t.toFixed(2):t.toFixed(1))},svg);});
    el('text',{x:ml+iw/2,y:H-6,'class':'al','text-anchor':'middle',text:P.xl},svg);
    el('text',{x:11,y:mt+ih/2,'class':'al','text-anchor':'middle',transform:'rotate(-90 11 '+(mt+ih/2)+')',text:P.yl},svg);
    // diagonal y = x within the frame
    var lo=Math.max(P.x[0],P.y[0]), hi=Math.min(P.x[1],P.y[1]);
    var diag=el('path',{d:'M'+X(lo)+' '+Y(lo)+' L'+X(hi)+' '+Y(hi),'class':'diag','data-dash':'4 3'},svg);
    P.note.forEach(function(t,i){el('text',{x:P.low?ml+iw-4:ml+6,y:P.low?mt+ih-18+i*11:mt+14+i*(i?9:11),'class':(i===0&&!P.low)?'note r':'note','text-anchor':P.low?'end':'start',text:t},svg);});
    var pts=[];
    D.laws[P.key].forEach(function(p){
      var g=el('g',{'class':'pt'},svg), cx=X(p.x), cy=Y(p.y);
      if(p.xi) el('line',{x1:X(p.xi[0]),x2:X(p.xi[1]),y1:cy,y2:cy,'class':'eb',stroke:CCOL[p.c]},g);
      if(p.yi) el('line',{x1:cx,x2:cx,y1:Y(p.yi[0]),y2:Y(p.yi[1]),'class':'eb',stroke:CCOL[p.c]},g);
      el('circle',{cx:cx,cy:cy,r:4,fill:CCOL[p.c],'class':'dot'},g);
      var name=p.pair||null;
      if(name&&(P.key==='p3'||name.indexOf('G')>=0)){
        var left=(P.key==='p1'&&name==='G→L'), below=(P.key==='p1'&&name==='G→Q')||(P.key==='p2'&&name==='Q→G');
        el('text',{x:left?cx-6:cx+6,y:below?cy+10:cy-4,'class':'pl','text-anchor':left?'end':'start',text:name},g);}
      var tip=p.pair?p.pair:(p.src?'source '+p.src:'target '+p.tgt);
      g.setAttribute('data-pair',p.pair||'');
      g.addEventListener('pointerenter',function(){state.auto=false;clearTimeout(state.idle);state.idle=setTimeout(function(){state.auto=true;},5000);pin(p.pair||null,tip,p);});
      pts.push({g:g,p:p});
    });
    all.push({P:P,svg:svg,diag:diag,pts:pts});
  });
  var legend=h('div','anilegend',host);
  [['T','truthfulness'],['S','sentiment']].forEach(function(c){var s=h('span','',legend);var i=h('i','',s);i.style.background=CCOL[c[0]];h('b','',s,c[1]);});
  h('span','',legend,'L = LLaMA, Q = Qwen, G = Gemma · A → B: carried from A into B · bars in the right panel: 95% intervals');
  var read=h('div','aniread',host);
  function pin(pair,tip,p){
    all.forEach(function(a){a.pts.forEach(function(q){var on=pair?q.p.pair===pair:false;q.g.classList.toggle('dim',!!pair&&!on);q.g.classList.toggle('hi',on);});});
    if(!pair){read.innerHTML='<b>'+tip+'</b> · '+(p.c==='T'?'truthfulness':'sentiment')+' · x '+f2(p.x)+', y '+f2(p.y)+' (the figure does not label this pair)';return;}
    var parts=[];
    all.forEach(function(a){a.pts.forEach(function(q){if(q.p.pair===pair)parts.push((q.p.c==='T'?'truth.':'sent.')+' '+a.P.key.replace('p','panel ')+': '+f2(q.p.x)+' → '+f2(q.p.y));});});
    var p3=D.laws.p3.filter(function(q){return q.pair===pair;});
    var s3=p3.map(function(q){return (q.c==='T'?'truthfulness':'sentiment')+': probe law '+f2(q.x)+', steering law '+f2(q.y);}).join(' · ');
    read.innerHTML='<b>'+pair+'</b> · steering effect in B relative to its own Δμ: '+s3;
  }
  function reveal(){
    all.forEach(function(a){a.svg.classList.add('go');if(!reduce)drawOn(a.diag,0,0.8);
      a.pts.forEach(function(q,i){var k=Math.max(0,PAIRS.indexOf(q.p.pair));var delay=reduce?0:0.6+0.12*(q.p.pair?k:i)+(q.p.c==='S'?0.06:0);q.g.style.transitionDelay=delay+'s';q.g.classList.add('in');});});
    pin(PAIRS[0]);
    if(reduce) return;
    setTimeout(function(){setInterval(function(){if(state.auto){state.k=(state.k+1)%PAIRS.length;pin(PAIRS[state.k]);}},1600);},2400);
  }
  onView(host,reveal);
})();
})();
