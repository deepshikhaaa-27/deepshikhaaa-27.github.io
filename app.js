/* ═══════════════════════════════════════════════════════════ */
var $=function(i){return document.getElementById(i)};
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
$('hName').textContent=P.name;$('hRole').textContent=P.role;document.title=P.name;
document.querySelectorAll('.cfgEmail').forEach(function(e){e.textContent=P.email});

var panes={
 Home:'<div class="card feat hero heroflex"><div id="ph" role="button" tabindex="0" aria-label="Add your photo"></div><div><h2>'+esc(P.name)+'</h2><div class="meta">'+esc(P.role)+'</div><p>'+esc(P.summary)+'</p><button class="btn" onclick="cpOpen()">Get in touch</button> <a class="btn ghost" style="text-decoration:none;display:inline-block" href="'+esc(P.linkedin)+'">LinkedIn</a> <a class="btn ghost" style="text-decoration:none;display:inline-block" href="'+esc(P.github)+'">GitHub</a></div></div><div class="sec">At a glance</div><div class="stats">'+P.stats.map(function(s){return '<div class="card stat"><b>'+esc(s[0])+'</b>'+esc(s[1])+'</div>'}).join('')+'</div>',
 Experience:'<div class="sec">Career timeline</div>'+P.experience.map(function(e,i){return '<div class="card'+(i?'':' feat')+'"><h2>'+esc(e.title)+'</h2><div class="meta">'+esc(e.org)+' · '+esc(e.when)+'</div><ul>'+e.points.map(function(p){return '<li>'+esc(p)+'</li>'}).join('')+'</ul></div>'}).join(''),
 Projects:'<div class="sec">Selected work</div><div class="grid">'+P.projects.map(function(p){return '<div class="card'+(p.feat?' feat':'')+'"><h2>'+esc(p.name)+'</h2><p>'+esc(p.desc)+'</p><div class="chips">'+p.tags.map(function(t){return '<span class="chip">'+esc(t)+'</span>'}).join('')+'</div></div>'}).join('')+'</div>',
 Skills:'<div class="sec">Core skills</div><div class="card">'+P.skills.map(function(s){return '<div class="row"><span>'+esc(s[0])+'</span><span>'+s[1]+'%</span></div><div class="bar"><i style="width:'+s[1]+'%"></i></div>'}).join('')+'</div><div class="sec">Also works with</div><div class="chips">'+P.tags.map(function(t){return '<span class="chip">'+esc(t)+'</span>'}).join('')+'</div>',
 Contact:'<div class="sec">Contact</div><div class="card"><h2>Let\'s talk</h2><p>Open to roles, consulting and integration architecture conversations.</p><button class="btn" onclick="cpOpen()">Send a message</button></div>'
};
panes.Experience+='<div class="sec">Education</div>'+P.education.map(function(e){return '<div class="card"><h2>'+esc(e.deg)+'</h2><div class="meta">'+esc(e.org)+' · '+esc(e.when)+'</div></div>'}).join('')+'<div class="sec">Certifications</div><div class="chips">'+P.certs.map(function(t){return '<span class="chip">'+esc(t)+'</span>'}).join('')+'</div>';
panes.Articles='<div class="sec">Articles</div><div class="grid">'+P.articles.map(function(a){return '<div class="card"><h2>'+esc(a.t)+'</h2><p>'+esc(a.d)+'</p></div>'}).join('')+'</div>';
var order=['Home','Experience','Projects','Skills','Articles','Contact'];panes=order.reduce(function(o,k){o[k]=panes[k];return o},{});
var names=Object.keys(panes);
$('main').innerHTML=names.map(function(n){return '<section class="pane" id="p-'+n+'" role="tabpanel">'+panes[n]+'</section>'}).join('');
$('tabs').innerHTML=names.map(function(n){return '<button role="tab" data-n="'+n+'">'+n+'</button>'}).join('');
function show(n){names.forEach(function(k){$('p-'+k).classList.toggle('on',k===n)});
 document.querySelectorAll('#tabs button').forEach(function(b){b.setAttribute('aria-selected',b.dataset.n===n)});
 try{history.replaceState(null,'','#'+n)}catch(e){}}
$('tabs').addEventListener('click',function(e){if(e.target.dataset.n)show(e.target.dataset.n)});
var h=location.hash.slice(1);show(names.indexOf(h)>-1?h:'Home');

/* contact popup — opens the visitor's email app (no keys or backend needed) */
function step(n){[1,2,3].forEach(function(i){$('d'+i).className='dot'+(i<n?' done':i===n?' act':'');$('s'+i).style.display=i===n?'':'none'});
 $('l1').classList.toggle('done',n>1);$('l2').classList.toggle('done',n>2)}
window.cpOpen=function(){['cn','ce','cm','cs'].forEach(function(i){$(i).value=''});$('ce2').style.display='none';step(1);$('ov').classList.add('open');$('cn').focus()};
window.cpClose=function(){$('ov').classList.remove('open')};
$('ov').addEventListener('click',function(e){if(e.target===this)cpClose()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')cpClose()});
window.cpSubmit=function(){
 var n=$('cn').value.trim(),e=$('ce').value.trim(),s=$('cs').value,m=$('cm').value.trim(),er=$('ce2');
 if(!n||!e||!s||!m){er.textContent='Fill in every field before sending.';er.style.display='block';return}
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)){er.textContent='Enter a valid email address, like name@company.com.';er.style.display='block';return}
 step(2);var msgs=['Routing to '+P.name+'…','Verifying approval criteria…','Request approved'];
 msgs.forEach(function(t,i){setTimeout(function(){$('rm').textContent=t},i*900)});
 setTimeout(function(){step(3);
  location.href='mailto:'+P.email+'?subject='+encodeURIComponent(s)+'&body='+encodeURIComponent(m+'\n\n— '+n+' ('+e+')')},2800)};

/* particle network */
(function(){var c=$('bg'),x=c.getContext('2d'),W,H,m={x:-9e3,y:-9e3},p=[],N=80,D=130;
 function rs(){W=c.width=innerWidth;H=c.height=innerHeight}addEventListener('resize',rs);rs();
 for(var i=0;i<N;i++)p.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.6+.8});
 addEventListener('mousemove',function(e){m.x=e.clientX;m.y=e.clientY});
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)N=0;
 function f(){x.clearRect(0,0,W,H);
  p.forEach(function(a){var dx=a.x-m.x,dy=a.y-m.y,d=Math.sqrt(dx*dx+dy*dy);if(d<100&&d>0){a.vx+=dx/d*.05;a.vy+=dy/d*.05}
   a.vx*=.99;a.vy*=.99;a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1});
  for(var i=0;i<p.length;i++){for(var j=i+1;j<p.length;j++){var a=p[i],b=p[j],d=Math.hypot(a.x-b.x,a.y-b.y);
   if(d<D){x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.strokeStyle='rgba(199,70,52,'+(1-d/D)*.18+')';x.stroke()}}
   x.beginPath();x.arc(p[i].x,p[i].y,p[i].r,0,6.283);x.fillStyle='rgba(199,70,52,.55)';x.fill()}
  requestAnimationFrame(f)}f()})();
/* photo: click or press Enter to preview a photo from your device (kept in memory only) */
function setPh(src){var e=$('ph');if(src){e.style.backgroundImage='url("'+src+'")';e.textContent=''}else{e.textContent='Click to add your photo'}}
setPh(P.photo);
var fi=document.createElement('input');fi.type='file';fi.accept='image/*';
fi.onchange=function(){var f=fi.files[0];if(!f)return;var r=new FileReader();r.onload=function(){setPh(r.result)};r.readAsDataURL(f)};
$('ph').onclick=function(){fi.click()};$('ph').onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fi.click()}};
$('rdw').addEventListener('click',function(e){if(e.target===this)this.classList.remove('open')});
/* assistant: answers from the P block, no server needed */
var qs=['Projects','Skills','Experience','Availability'];
$('sb-c').innerHTML=qs.map(function(q){return '<button onclick="sbS(\''+q+'\')">'+q+'</button>'}).join('');
function ans(q){q=q.toLowerCase();
 if(/project|built|work on/.test(q))return P.projects.map(function(p){return p.name}).join(', ')+'.';
 if(/skill|tech|stack|know/.test(q))return P.skills.map(function(s){return s[0]}).join(', ')+'.';
 if(/experience|career|role|year/.test(q))return P.summary;
 if(/avail|open|hire|opportun/.test(q))return P.open+'. Use the Contact tab to reach out.';
 if(/educat|degree|study/.test(q))return P.education.map(function(e){return e.deg+', '+e.org}).join('; ')+'.';
 if(/email|contact|reach/.test(q))return 'Use the Contact tab, or email '+P.email+'.';
 return "I'm not sure about that. Please reach out at "+P.email+".";}
window.sbT=function(){$('sb-p').classList.toggle('open')};
window.sbS=function(t){var i=$('sb-t');t=(t||i.value).trim();if(!t)return;i.value='';
 var m=$('sb-m');[['u',t],['b',ans(t)]].forEach(function(x){var d=document.createElement('div');d.className='mg '+x[0];d.textContent=x[1];m.appendChild(d)});m.scrollTop=m.scrollHeight;$('sb-c').style.display='none'};
$('sb-t').addEventListener('keydown',function(e){if(e.key==='Enter')sbS()});
setTimeout(function(){$('load').classList.add('gone')},900);
