document.addEventListener('DOMContentLoaded', function(){
  var yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();
});

/* ── Page loader ── */
(function(){
  var spinner = document.getElementById('page-spinner');
  var body = document.getElementById('page-body');
  if(!spinner || !body) return;
  body.style.filter = 'blur(6px)';
  var MIN_MS = 900, loaded = false, timerDone = false;
  function dismiss(){
    if(!loaded || !timerDone) return;
    spinner.classList.add('done');
    body.style.transition = 'filter 0.7s ease';
    body.style.filter = 'none';
  }
  setTimeout(function(){ timerDone = true; dismiss(); }, MIN_MS);
  window.addEventListener('load', function(){ loaded = true; dismiss(); });
  setTimeout(function(){ loaded = true; dismiss(); }, 2200);
})();

/* ── Particle network background ── */
(function(){
  var canvas = document.getElementById('bg-canvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var mouse = { x:-9999, y:-9999 };
  var W, H, pts;
  var COUNT = 80, MAX_DIST = 130;
  var COLORS = ['#C99A3F','#C99A3F','rgba(201,154,63,0.5)','rgba(201,154,63,0.3)','rgba(18,24,43,0.35)','rgba(18,24,43,0.2)'];

  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  function make(){
    return { x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
      r:Math.random()*1.7+0.9, c:COLORS[Math.floor(Math.random()*COLORS.length)] };
  }
  pts = []; for(var i=0;i<COUNT;i++) pts.push(make());

  function frame(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<pts.length;i++){
      var p = pts[i];
      var dx = p.x-mouse.x, dy = p.y-mouse.y, d = Math.sqrt(dx*dx+dy*dy);
      if(d<100 && d>0){ var f=(100-d)/100*0.6; p.vx += dx/d*f; p.vy += dy/d*f; }
      p.vx *= 0.98; p.vy *= 0.98;
      var spd = Math.sqrt(p.vx*p.vx+p.vy*p.vy);
      if(spd>1.3){ p.vx = p.vx/spd*1.3; p.vy = p.vy/spd*1.3; }
      p.x += p.vx; p.y += p.vy;
      if(p.x<0){ p.x=0; p.vx=Math.abs(p.vx); } if(p.x>W){ p.x=W; p.vx=-Math.abs(p.vx); }
      if(p.y<0){ p.y=0; p.vy=Math.abs(p.vy); } if(p.y>H){ p.y=H; p.vy=-Math.abs(p.vy); }
    }
    for(var i=0;i<pts.length;i++){
      for(var j=i+1;j<pts.length;j++){
        var a=pts[i], b=pts[j];
        var dist = Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
        if(dist<MAX_DIST){
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = 'rgba(201,154,63,' + ((1-dist/MAX_DIST)*0.16) + ')';
          ctx.lineWidth = 0.8; ctx.stroke();
        }
      }
    }
    for(var i=0;i<pts.length;i++){
      ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, 6.2832);
      ctx.fillStyle = pts[i].c; ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  document.addEventListener('mousemove', function(e){ mouse.x=e.clientX; mouse.y=e.clientY; });
  document.addEventListener('mouseleave', function(){ mouse.x=-9999; mouse.y=-9999; });
  frame();
})();

/* ── Mobile nav ── */
document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', function(){ links.classList.toggle('open'); });
  }
});

/* ── Contact modal: Draft -> Sending -> Sent ── */
function cmSetStep(n){
  [1,2,3].forEach(function(i){
    var el = document.getElementById('cms-'+i);
    if(!el) return;
    el.classList.remove('active','done');
    if(i<n) el.classList.add('done'); else if(i===n) el.classList.add('active');
  });
  var c12 = document.getElementById('cmc-12'), c23 = document.getElementById('cmc-23');
  if(c12) c12.classList.toggle('done', n>2);
  if(c23) c23.classList.toggle('done', n>3);
  [1,2,3].forEach(function(i){ var el = document.getElementById('cm-s'+i); if(el) el.style.display = (i===n?'':'none'); });
}
function cmOpen(){ cmReset(); document.getElementById('cm-overlay').classList.add('open'); }
function cmClose(){ document.getElementById('cm-overlay').classList.remove('open'); }
document.addEventListener('DOMContentLoaded', function(){
  var overlay = document.getElementById('cm-overlay');
  if(overlay){
    overlay.addEventListener('click', function(e){ if(e.target===this) cmClose(); });
  }
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') cmClose(); });
});

function cmSubmit(){
  var name = document.getElementById('cm-name').value.trim();
  var email = document.getElementById('cm-email').value.trim();
  var subj = document.getElementById('cm-subj').value;
  var msg = document.getElementById('cm-msg').value.trim();
  var err = document.getElementById('cm-err');
  err.style.display = 'none';
  if(!name || !email || !subj || !msg){ err.textContent='Please complete all fields.'; err.style.display='block'; return; }
  if(!/^[^@]+@[^@]+\.[^@]+$/.test(email)){ err.textContent='Please enter a valid email address.'; err.style.display='block'; return; }

  cmSetStep(2);
  var steps = [
    { t:400, m:'Preparing your message...', s:'Formatting for delivery' },
    { t:1100, m:'Opening your email client...', s:'Almost there' }
  ];
  steps.forEach(function(x){
    setTimeout(function(){
      document.getElementById('cm-route-msg').textContent = x.m;
      document.getElementById('cm-route-sub').textContent = x.s;
    }, x.t);
  });

  var body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
  setTimeout(function(){
    window.location.href = 'mailto:deepshikha@example.com?subject=' + encodeURIComponent(subj) + '&body=' + body;
  }, 900);

  setTimeout(function(){
    cmSetStep(3);
    var ts = new Date().toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' });
    document.getElementById('cm-receipt').innerHTML =
      '<strong>Message summary</strong><br>From: ' + name + ' &lt;' + email + '&gt;<br>Subject: ' + subj + '<br>Prepared: ' + ts;
  }, 1900);
}
function cmReset(){
  ['cm-name','cm-email','cm-msg'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
  var s = document.getElementById('cm-subj'); if(s) s.value='';
  var e = document.getElementById('cm-err'); if(e) e.style.display='none';
  cmSetStep(1);
}

/* ── Chat widget: rule-based KB, no external API / no keys ── */
var KB = [
  { k:['project','built','build','work on'], a:"Deepshikha has delivered a BI Publisher SOAP wrapper for automated reporting, a full OIC integration architecture connecting VBCS, Fusion, and ATP, and an enterprise BI Publisher reporting suite for Finance, Procurement, and HR. See the Projects page for details." },
  { k:['skill','tech','stack','know'], a:"Core skills: Oracle VBCS, OIC integration, ATP & PL/SQL, BI Publisher, Oracle Fusion ERP, and applying AI agent automation to cloud workflows." },
  { k:['experience','deloitte','alithya','job','role','company'], a:"Deepshikha leads the Reports & Extensions Track at Deloitte on Oracle Cloud programs for Fortune 500 clients, and previously handled production managed support for integrations, reports, and VBCS at Alithya." },
  { k:['contact','email','phone','reach','hire'], a:"You can reach Deepshikha via the Contact page — email, phone, or the message form." },
  { k:['education','degree','study','mba','bca'], a:"Deepshikha holds an MBA and a BCA." },
  { k:['impact','result','metric','number'], a:"Highlights: 60% reduction in manual workload and 80% faster business cycles delivered for Fortune 500 Oracle Cloud clients." },
  { k:['certification','cert','certified'], a:"Completed: OIC Certification, Oracle HCM Essentials, and Oracle Agentic AI. Currently working on a cloud certification. See the Certifications page." },
  { k:['learning','exploring','fdi'], a:"Deepshikha is currently exploring FDI (Fusion Data Intelligence) alongside her core Oracle Cloud stack." }
];
var chatOpen = false, chatBusy = false;
function chatToggle(){
  chatOpen = !chatOpen;
  document.getElementById('chat-panel').classList.toggle('open', chatOpen);
  if(chatOpen) setTimeout(function(){ var i=document.getElementById('chatInput'); if(i) i.focus(); }, 200);
}
document.addEventListener('DOMContentLoaded', function(){
  var bubble = document.getElementById('chat-bubble');
  if(bubble) bubble.addEventListener('click', chatToggle);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && chatOpen) chatToggle(); });
});

function addChatMsg(text, role){
  var box = document.getElementById('chatMsgs');
  var div = document.createElement('div');
  div.className = 'cm-msg ' + (role==='user' ? 'user' : 'bot');
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  var chips = document.getElementById('chatChips');
  if(role==='user' && chips) chips.style.display = 'none';
}
function showTyping(){
  var box = document.getElementById('chatMsgs');
  var el = document.createElement('div');
  el.className = 'typing-ind'; el.id = 'typing-ind';
  el.innerHTML = '<span></span><span></span><span></span>';
  box.appendChild(el); box.scrollTop = box.scrollHeight;
}
function hideTyping(){ var el = document.getElementById('typing-ind'); if(el) el.remove(); }

function answerFor(q){
  var lower = q.toLowerCase();
  for(var i=0;i<KB.length;i++){
    for(var j=0;j<KB[i].k.length;j++){
      if(lower.indexOf(KB[i].k[j]) !== -1) return KB[i].a;
    }
  }
  return "I don't have a canned answer for that yet — try the chips below, or reach out directly through the Contact page.";
}
function chatAsk(preset){
  if(chatBusy) return;
  var input = document.getElementById('chatInput');
  var text = preset ? ({
    projects:'Tell me about her projects', skills:'What are her skills?',
    experience:'Tell me about her experience', contact:'How do I contact her?'
  })[preset] : input.value.trim();
  if(!text) return;
  addChatMsg(text, 'user');
  if(!preset) input.value = '';
  chatBusy = true;
  var sendBtn = document.getElementById('chatSendBtn');
  if(sendBtn) sendBtn.disabled = true;
  showTyping();
  setTimeout(function(){
    hideTyping();
    addChatMsg(answerFor(text), 'bot');
    chatBusy = false;
    if(sendBtn) sendBtn.disabled = false;
  }, 700);
}
