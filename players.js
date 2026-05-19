/* ================================================
   CYBERWORLD — players.js  (ЖАҢАРТЫЛҒАН НҰСҚА)
   ✅ Instagram сілтемелер
   ✅ Нақты музыка (Mixkit ақысыз треки)
   ✅ BotFather ақпаратысыз Telegram бот
   ✅ AI құралдар → автоматты өту (жаңа tab)
   ================================================ */

// ===== 1. ОЙЫНШЫ КАРТОЧКАЛАРЫ (Instagram) =====
const playersWithPhotos = [
  {
    nick: 's1mple', real: 'Alexander Kostyliev',
    game: 'CS2', country: '🇺🇦', rating: 9850, role: 'AWPer', team: 'NAVI', wins: 847,
    photo: 'https://www.prosettings.gg/wp-content/uploads/2021/09/s1mple-cs2-player-profile-picture-Natus-Vincere.webp',
    desc: 'CS2 тарихындағы ең үздік ойыншы. 2× MVP, 3× Major чемпионы.',
    instagram: 'https://www.instagram.com/s1mpleo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', ig_handle: '@s1mpleo', followers: '1.7M'
  },
  {
    nick: 'Faker', real: 'Lee Sang-hyeok',
    game: 'League of Legends', country: '🇰🇷', rating: 9920, role: 'Mid Lane', team: 'T1', wins: 1200,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Faker_2020_interview.jpg', 
    instagram: 'https://www.instagram.com/faker?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', ig_handle: '@faker', followers: '2.6M'
  },
  {
    nick: 'Miracle-', real: 'Amer Al-Barkawi',
    game: 'Dota 2', country: '🇯🇴', rating: 9780, role: 'Carry', team: 'Nigma Galaxy', wins: 620,
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA5oR_skJJEwFg580-LOCjxl-z2UMVrS7dKg&s',
    desc: 'Dota 2-нің ең техникалық carry ойыншысы. TI жеңімпазы.',
    instagram: 'https://www.instagram.com/nigmamiracle?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', ig_handle: '@miracle_dota2', followers: '184K'
  },
  {
    nick: 'ZywOo', real: 'Mathieu Herbaut',
    game: 'CS2', country: '🇫🇷', rating: 9760, role: 'AWPer', team: 'Vitality', wins: 540,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Zywoo_in_2022_%28cropped%29.jpg/1280px-Zywoo_in_2022_%28cropped%29.jpg',
    desc: '3× HLTV #1 ойыншы. Франциядың киберспорт жұлдызы.',
    instagram: 'https://www.instagram.com/cs_zywoo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', ig_handle: '@cs_zywoo', followers: '421K'
  },
  {
    nick: 'Molodoy', real: 'Данил Голубенко',
    game: 'CS2', country: '🇰🇿', rating: 7400, role: 'Entry', team: 'Furia', wins: 310,
    photo: 'https://asp.media/app/uploads/2025/11/molodoj-kibersporstmen.webp',
    desc: 'Қазақстанның үздік CS2 ойыншысы. Халықаралық деңгейге шығуда.',
    instagram: 'https://www.instagram.com/danil.molodoy_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', ig_handle: '@danil.molodoy_', followers: '353K'
  },
  {
    nick: 'NiKo', real: 'Nikola Kovač',
    game: 'CS2', country: '🇧🇦', rating: 9700, role: 'Rifler', team: 'G2 Esports', wins: 490,
    photo: 'https://images.cybersport.ru/images/details-photo/plain/22/22e4c87a-c728-42d0-ad33-df9a71d476f3.png',
    desc: 'CS2-нің ең техникалы rifler-і. G2 Esports жұлдызы.',
    instagram: 'https://www.instagram.com/csgoniko?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', ig_handle: '@csgoniko', followers: '677K'
  },
];

function renderPlayerCards() {
  const teamsSection = document.getElementById('teams');
  if (!teamsSection) return;
  const section = document.createElement('section');
  section.id = 'players';
  section.className = 'sec-block';
  section.innerHTML = `
    <div class="container">
      <div class="sec-label">02.5 — ПРО ОЙЫНШЫЛАР</div>
      <h2 class="sec-title">Дүниежүзілік<br><span>Жұлдыз Ойыншылар</span></h2>
      <p class="sec-desc">Киберспорт тарихын жасаушы легендар ойыншылар</p>
      <div class="players-grid" id="playersGrid"></div>
    </div>`;
  teamsSection.insertAdjacentElement('afterend', section);

  const css = document.createElement('style');
  css.textContent = `
    .players-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:28px; }
    .player-card {
      background:var(--card); border:1px solid var(--border); border-radius:16px;
      overflow:hidden; transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275); position:relative;
    }
    .player-card:hover { border-color:var(--border2); transform:translateY(-10px) scale(1.01);
      box-shadow:0 30px 60px rgba(0,0,0,0.6),var(--glow); }
    .player-photo-wrap { position:relative; height:240px; overflow:hidden; }
    .player-photo { width:100%; height:100%; object-fit:cover; object-position:top center;
      transition:transform 0.6s ease; filter:grayscale(15%) brightness(0.82) saturate(1.2); }
    .player-card:hover .player-photo { transform:scale(1.08); filter:grayscale(0%) brightness(1) saturate(1.3); }
    .player-photo-overlay { position:absolute; inset:0;
      background:linear-gradient(180deg,rgba(5,11,20,.1) 0%,transparent 40%,rgba(5,11,20,.98) 100%); }
    .player-flag { position:absolute; top:14px; left:14px; font-size:1.8rem;
      filter:drop-shadow(0 2px 6px rgba(0,0,0,.9)); z-index:2; }
    .player-team-badge { position:absolute; top:14px; right:14px;
      font-family:var(--font-head); font-size:.58rem; font-weight:700; letter-spacing:2px;
      color:var(--bg); background:var(--neon); padding:4px 10px; border-radius:3px; z-index:2;
      box-shadow:var(--glow); }
    .player-rating { position:absolute; bottom:60px; right:14px;
      font-family:var(--font-head); font-size:.9rem; color:var(--neon3); z-index:2;
      text-shadow:0 0 14px rgba(255,45,120,.7); }
    .player-info { padding:20px 22px 22px; }
    .player-nick { font-family:var(--font-head); font-size:1.4rem; font-weight:900;
      color:var(--white); letter-spacing:2px; margin-bottom:2px; }
    .player-real { font-family:var(--font-mono); font-size:.68rem; color:var(--muted);
      letter-spacing:1px; margin-bottom:12px; }
    .player-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; }
    .ptag { font-family:var(--font-mono); font-size:.62rem; letter-spacing:1px; padding:3px 9px; border-radius:3px; }
    .ptag-game { color:var(--neon); border:1px solid rgba(0,255,209,.3); background:rgba(0,255,209,.06); }
    .ptag-role { color:var(--neon2); border:1px solid rgba(123,47,255,.3); background:rgba(123,47,255,.07); }
    .player-desc { font-size:.82rem; color:var(--muted); line-height:1.65; margin-bottom:16px; }
    .player-stats-row { display:flex; padding:12px 0; border-top:1px solid var(--border); margin-bottom:14px; }
    .pstat { flex:1; text-align:center; }
    .pstat+.pstat { border-left:1px solid var(--border); }
    .pstat-num { font-family:var(--font-head); font-size:1.1rem; color:var(--neon); display:block; margin-bottom:2px; }
    .pstat-lbl { font-family:var(--font-mono); font-size:.58rem; color:var(--muted); letter-spacing:1.5px; }
    .player-ig-btn {
      display:flex; align-items:center; justify-content:center; gap:8px; width:100%;
      font-family:var(--font-head); font-size:.72rem; font-weight:700; letter-spacing:2px; color:#fff;
      background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4);
      border:none; border-radius:8px; padding:11px; cursor:pointer;
      transition:all 0.3s; text-decoration:none;
    }
    .player-ig-btn:hover { transform:translateY(-3px); box-shadow:0 12px 28px rgba(221,42,123,.45); color:#fff; opacity:.92; }
    .ig-handle { opacity:.85; font-size:.65rem; }
    .ig-flw { margin-left:auto; font-size:.65rem; opacity:.7; }
  `;
  document.head.appendChild(css);

  document.getElementById('playersGrid').innerHTML = playersWithPhotos.map((p, i) => `
    <div class="player-card" style="animation-delay:${i*.08}s">
      <div class="player-photo-wrap">
        <img class="player-photo" src="${p.photo}" alt="${p.nick}"
          onerror="this.src='https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop'">
        <div class="player-photo-overlay"></div>
        <div class="player-flag">${p.country}</div>
        <div class="player-team-badge">${p.team}</div>
        <div class="player-rating">★ ${p.rating.toLocaleString()}</div>
      </div>
      <div class="player-info">
        <div class="player-nick">${p.nick}</div>
        <div class="player-real">${p.real}</div>
        <div class="player-tags">
          <span class="ptag ptag-game">${p.game}</span>
          <span class="ptag ptag-role">${p.role}</span>
        </div>
        <div class="player-desc">${p.desc}</div>
        <div class="player-stats-row">
          <div class="pstat"><span class="pstat-num">${p.wins}</span><span class="pstat-lbl">ЖЕҢІС</span></div>
          <div class="pstat"><span class="pstat-num">${p.rating.toLocaleString()}</span><span class="pstat-lbl">РЕЙТИНГ</span></div>
          <div class="pstat"><span class="pstat-num">${p.followers}</span><span class="pstat-lbl">ҰСТАУШЫ</span></div>
        </div>
        <a href="${p.instagram}" target="_blank" rel="noopener" class="player-ig-btn">
          <span>📸</span><span class="ig-handle">${p.ig_handle}</span><span class="ig-flw">Instagram →</span>
        </a>
      </div>
    </div>`).join('');

  if (typeof revealObs !== 'undefined') revealObs.observe(section);
}

// ===== 2. НАҚТЫ МУЗЫКА =====
const realTracks = [
  { name:'Cyber Arena',     artist:'Mixkit • Gaming Beat',    emoji:'🎮', dur:'1:30', secs:90,
    media:'track1.mp3' },
  { name:'Neon Overdrive',  artist:'Mixkit • Hip-Hop',        emoji:'⚡', dur:'1:45', secs:105,
    media:'track2.mp3' },
  { name:'Ranked Match',    artist:'Mixkit • Tech House',     emoji:'🏆', dur:'1:30', secs:90,
    media:'track3.mp3' },
  { name:'Boss Fight',      artist:'Mixkit • Driving Action', emoji:'💀', dur:'2:00', secs:120,
    media:'track4.mp3' },
  { name:'Victory Screen',  artist:'Mixkit • Triumph',        emoji:'🥇', dur:'1:15', secs:75,
    media:'track5.mp3' },
];

function upgradeMusic() {
  // Жаһандық tracks массивін жаңарту
  if (typeof tracks !== 'undefined') {
    realTracks.forEach((rt, i) => { if (tracks[i]) Object.assign(tracks[i], rt); });
  }

  // Audio src
  const audio = document.getElementById('audio');
  if (audio) { audio.src = realTracks[0].media; audio.load(); }

  // Playlist UI
  const pl = document.getElementById('playlist');
  if (pl) {
    pl.innerHTML = realTracks.map((t, i) => `
      <div class="pl-item ${i===0?'active':''}" id="pl-${i}" onclick="selectRealTrack(${i})">
        <span class="pl-num">${String(i+1).padStart(2,'0')}</span>
        <div class="pl-info">
          <div class="pl-name">${t.emoji} ${t.name}</div>
          <div class="pl-genre">${t.artist}</div>
        </div>
        <span class="pl-dur">${t.dur}</span>
      </div>`).join('');
  }

  // Now playing
  const nt = document.getElementById('nowTrack');
  const na = document.getElementById('nowArtist');
  if (nt) nt.textContent = realTracks[0].emoji + ' ' + realTracks[0].name;
  if (na) na.textContent = realTracks[0].artist;

  // Бейдж
  const musicSec = document.getElementById('music');
  if (musicSec) {
    const b = document.createElement('div');
    b.style.cssText = 'display:inline-block;font-family:var(--font-mono);font-size:.7rem;letter-spacing:2px;color:var(--neon3);border:1px solid var(--neon3);background:rgba(255,45,120,.08);padding:4px 14px;border-radius:3px;margin-bottom:24px;animation:livePulse 2s infinite;';
    b.textContent = '🎵 НАҚТЫ АУДИО · MIXKIT LICENSED';
    const desc = musicSec.querySelector('.sec-desc');
    if (desc) desc.insertAdjacentElement('afterend', b);
  }
}

window.selectRealTrack = function(i) {
  const t = realTracks[i];
  document.querySelectorAll('.pl-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('pl-' + i);
  if (el) el.classList.add('active');
  if (typeof curTrack !== 'undefined') window.curTrack = i;
  const audio = document.getElementById('audio');
  if (audio) {
    audio.src = t.media; audio.load();
    const nt = document.getElementById('nowTrack');
    const na = document.getElementById('nowArtist');
    const tt = document.getElementById('totTime');
    const pf = document.getElementById('pFill');
    const ct = document.getElementById('curTime');
    if (nt) nt.textContent = t.emoji + ' ' + t.name;
    if (na) na.textContent = t.artist;
    if (tt) tt.textContent = t.dur;
    if (pf) pf.style.width = '0%';
    if (ct) ct.textContent = '0:00';
    if (typeof isPlaying !== 'undefined' && isPlaying) audio.play().catch(() => {});
  }
};

// ===== 3. AI ҚҰРАЛДАР → АВТОМАТТЫ ӨТУ =====
function upgradeAITools() {
  const techStack = document.querySelector('.tech-stack');
  if (!techStack) return;

  const aiTools = [
    { icon:'🎨', name:'DALL-E 3',      desc:'Киберспорт суреттер генерациясы', url:'https://chatgpt.com/',          color:'#10A37F', label:'ChatGPT арқылы ашу ↗' },
    { icon:'🎵', name:'Suno AI',        desc:'Gaming саундтрек жасау',          url:'https://suno.com/',             color:'#7C3AED', label:'Suno.com ашу ↗' },
    { icon:'🤖', name:'HeyGen',         desc:'AI жаттықтырушы аватар',          url:'https://www.heygen.com/',       color:'#2563EB', label:'HeyGen ашу ↗' },
    { icon:'💬', name:'ChatGPT',        desc:'Ойындар бойынша чат-бот',         url:'https://chatgpt.com/',          color:'#10A37F', label:'ChatGPT ашу ↗' },
    { icon:'📡', name:'Perplexity AI',  desc:'Нақты уақыт жаңалықтары',        url:'https://www.perplexity.ai/',    color:'#06B6D4', label:'Perplexity ашу ↗' },
    { icon:'🎬', name:'Runway ML',      desc:'Анимация және видео',             url:'https://runwayml.com/',         color:'#EC4899', label:'Runway ашу ↗' },
  ];

  const css = document.createElement('style');
  css.textContent = `
    .tech-card { position:relative; overflow:hidden; cursor:pointer; }
    .tech-card:hover { border-color:var(--border2) !important; }
    .tc-hover-layer {
      position:absolute; inset:0; display:flex; flex-direction:column;
      align-items:center; justify-content:center; gap:6px;
      background:rgba(5,11,20,.9); opacity:0; transition:opacity .25s;
      border-radius:8px; padding:12px;
    }
    .tech-card:hover .tc-hover-layer { opacity:1; }
    .tc-hover-arrow { font-size:1.6rem; }
    .tc-hover-label {
      font-family:var(--font-head); font-size:.65rem; font-weight:700;
      letter-spacing:1.5px; color:#fff; text-align:center;
    }
    .tc-live-dot {
      position:absolute; top:10px; right:10px;
      width:8px; height:8px; border-radius:50%; animation:pulse 2s infinite;
    }
  `;
  document.head.appendChild(css);

  techStack.innerHTML = aiTools.map(t => `
    <div class="tech-card" onclick="window.open('${t.url}','_blank')"
      style="border-color:rgba(255,255,255,.08)">
      <div class="tc-live-dot" style="background:${t.color};box-shadow:0 0 8px ${t.color}"></div>
      <div class="tc-icon">${t.icon}</div>
      <div class="tc-name" style="color:${t.color}">${t.name}</div>
      <div class="tc-desc">${t.desc}</div>
      <div class="tc-hover-layer">
        <span class="tc-hover-arrow">↗</span>
        <span class="tc-hover-label">${t.label}</span>
      </div>
    </div>`).join('');
}

// ===== 4. TELEGRAM БОТ СЕКЦИЯСЫ =====
function renderTelegramSection() {
  const chatSection = document.getElementById('chatbot');
  if (!chatSection) return;

  const section = document.createElement('section');
  section.id = 'telegram';
  section.className = 'sec-block sec-dark';
  section.innerHTML = `
    <div class="container">
      <div class="sec-label">08.5 — TELEGRAM БОТ</div>
      <h2 class="sec-title light">CyberWorld<br><span>Telegram Боты</span></h2>
      <p class="sec-desc light">Сайт туралы толық ақпарат алу үшін ботымызды қолданыңыз</p>
      <div class="tg-wrap">
        <div class="tg-preview">
          <div class="tg-phone">
            <div class="tg-phone-top">
              <span class="tg-back">‹</span>
              <div class="tg-binfo">
                <div class="tg-bav">🤖</div>
                <div>
                  <div class="tg-bname">@CyberWorldBot</div>
                  <div class="tg-bsub">бот · <span style="color:#4CD964">онлайн</span></div>
                </div>
              </div>
            </div>
            <div class="tg-chat" id="tgChat"></div>
            <div class="tg-cmds-row">
              <span class="tgc" onclick="tgSend('/start')">/start</span>
              <span class="tgc" onclick="tgSend('/games')">/games</span>
              <span class="tgc" onclick="tgSend('/teams')">/teams</span>
              <span class="tgc" onclick="tgSend('/tournaments')">/tournaments</span>
              <span class="tgc" onclick="tgSend('/players')">/players</span>
              <span class="tgc" onclick="tgSend('/news')">/news</span>
              <span class="tgc" onclick="tgSend('/about')">/about</span>
            </div>
            <div class="tg-foot">
              <input class="tg-in" id="tgInput" placeholder="Команда жазыңыз..."
                onkeypress="if(event.key==='Enter')tgSend()">
              <button class="tg-sb" onclick="tgSend()">➤</button>
            </div>
          </div>
        </div>
        <div class="tg-info-panel">
          <div class="tg-panel-title">Бот командалары</div>
          <div class="tg-cmd-list" id="tgCmdList"></div>
          <div class="tg-stats-row">
            <div class="tg-stat"><span>7</span><div>Команда</div></div>
            <div class="tg-stat"><span>24/7</span><div>Онлайн</div></div>
            <div class="tg-stat"><span>🇰🇿</span><div>Тіл</div></div>
          </div>
        </div>
      </div>
    </div>`;
  chatSection.insertAdjacentElement('beforebegin', section);

  // Командалар тізімі
  const cmdDefs = [
    ['/start','Ботты іске қосу · Қош келу хабары'],
    ['/games','Барлық ойындар тізімі мен сипаттамасы'],
    ['/teams','Дүниежүзілік топ командалар статистикасы'],
    ['/tournaments','Ағымдағы турнирлер мен жүлде қорлары'],
    ['/players','Про ойыншылар рейтингі мен Instagram'],
    ['/news','Соңғы киберспорт жаңалықтары'],
    ['/about','CyberWorld сайты туралы толық ақпарат'],
  ];
  document.getElementById('tgCmdList').innerHTML = cmdDefs.map(([cmd, desc]) => `
    <div class="tg-cmd-item" onclick="tgSend('${cmd}')">
      <span class="tg-ci-cmd">${cmd}</span>
      <span class="tg-ci-desc">${desc}</span>
      <span class="tg-ci-arr">→</span>
    </div>`).join('');

  const css = document.createElement('style');
  css.textContent = `
    .tg-wrap { display:grid; grid-template-columns:360px 1fr; gap:48px; align-items:start; }
    .tg-preview { display:flex; justify-content:center; }
    .tg-phone { width:340px; background:#17212B; border-radius:24px; overflow:hidden;
      border:1px solid rgba(42,171,238,.2);
      box-shadow:0 30px 70px rgba(0,0,0,.7),0 0 50px rgba(42,171,238,.08); }
    .tg-phone-top { background:#232E3C; padding:14px 16px; display:flex; align-items:center; gap:12px;
      border-bottom:1px solid rgba(255,255,255,.05); }
    .tg-back { color:#2AABEE; font-size:1.4rem; cursor:pointer; }
    .tg-binfo { display:flex; align-items:center; gap:10px; }
    .tg-bav { width:38px; height:38px; background:linear-gradient(135deg,#2AABEE,#229ED9);
      border-radius:50%; display:flex; align-items:center; justify-content:center;
      font-size:1.1rem; box-shadow:0 0 12px rgba(42,171,238,.4); }
    .tg-bname { font-family:var(--font-head); font-size:.85rem; color:#fff; letter-spacing:.5px; }
    .tg-bsub { font-size:.68rem; color:rgba(255,255,255,.4); margin-top:1px; }
    .tg-chat { height:300px; overflow-y:auto; padding:14px; display:flex; flex-direction:column;
      gap:9px; background:#0E1621; }
    .tg-chat::-webkit-scrollbar { width:3px; }
    .tg-chat::-webkit-scrollbar-thumb { background:#2AABEE33; border-radius:2px; }
    .tg-mu { align-self:flex-end; background:#2B5278; color:#fff;
      padding:8px 14px; border-radius:12px 12px 2px 12px;
      font-size:.8rem; max-width:85%; animation:fadeUp .25s ease; }
    .tg-mb { align-self:flex-start; background:#182533; color:#e8e8e8;
      padding:10px 14px; border-radius:2px 12px 12px 12px;
      font-size:.78rem; max-width:92%; line-height:1.55;
      border:1px solid rgba(42,171,238,.08); animation:fadeUp .25s ease; }
    .tg-mb strong { color:#2AABEE; }
    .tg-cmds-row { display:flex; flex-wrap:wrap; gap:5px; padding:10px 12px;
      background:#17212B; border-top:1px solid rgba(255,255,255,.04); }
    .tgc { font-family:var(--font-mono); font-size:.65rem; letter-spacing:.5px; color:#2AABEE;
      background:rgba(42,171,238,.09); border:1px solid rgba(42,171,238,.22);
      padding:4px 9px; border-radius:10px; cursor:pointer; transition:all .2s; }
    .tgc:hover { background:rgba(42,171,238,.22); }
    .tg-foot { display:flex; padding:10px 12px; background:#17212B;
      border-top:1px solid rgba(255,255,255,.04); }
    .tg-in { flex:1; background:#232E3C; border:none; border-radius:20px 0 0 20px;
      padding:10px 16px; color:#fff; font-size:.8rem; }
    .tg-in:focus { outline:none; background:#2C3A4A; }
    .tg-in::placeholder { color:rgba(255,255,255,.28); }
    .tg-sb { background:#2AABEE; border:none; border-radius:0 20px 20px 0;
      padding:10px 16px; color:#fff; cursor:pointer; font-size:1rem; transition:background .2s; }
    .tg-sb:hover { background:#229ED9; }
    .tg-info-panel { padding-top:4px; }
    .tg-panel-title { font-family:var(--font-head); font-size:1rem; color:var(--white);
      letter-spacing:2px; margin-bottom:16px; }
    .tg-cmd-list { display:flex; flex-direction:column; gap:6px; margin-bottom:24px; }
    .tg-cmd-item { display:flex; align-items:center; gap:14px; padding:12px 16px;
      border-radius:8px; background:rgba(42,171,238,.04); border:1px solid rgba(42,171,238,.1);
      cursor:pointer; transition:all .2s; }
    .tg-cmd-item:hover { background:rgba(42,171,238,.1); border-color:rgba(42,171,238,.3); transform:translateX(4px); }
    .tg-ci-cmd { font-family:var(--font-mono); font-size:.78rem; color:#2AABEE; min-width:110px; }
    .tg-ci-desc { font-size:.78rem; color:var(--muted); flex:1; }
    .tg-ci-arr { color:rgba(42,171,238,.4); }
    .tg-stats-row { display:flex; background:rgba(42,171,238,.06);
      border:1px solid rgba(42,171,238,.15); border-radius:10px; overflow:hidden; }
    .tg-stat { flex:1; text-align:center; padding:16px 8px; }
    .tg-stat+.tg-stat { border-left:1px solid rgba(42,171,238,.12); }
    .tg-stat span { display:block; font-family:var(--font-head); font-size:1.3rem;
      color:#2AABEE; margin-bottom:4px; }
    .tg-stat div { font-family:var(--font-mono); font-size:.65rem; color:var(--muted); letter-spacing:1px; }
    @media(max-width:900px) { .tg-wrap { grid-template-columns:1fr; }
      .tg-phone { width:100%; max-width:360px; margin:0 auto; } }
  `;
  document.head.appendChild(css);
  if (typeof revealObs !== 'undefined') revealObs.observe(section);

  setTimeout(() => {
    tgBot('👾 Сәлем! <strong>CyberWorldBot</strong> — Киберспорт Әлемінің ресми боты!\n\n/start — бастау үшін басыңыз 👆');
  }, 400);
}

const tgReplies = {
  '/start':'🎮 <strong>CyberWorld Botқа қош келдіңіз!</strong>\n\nКиберспорт туралы барлық ақпаратты беремін:\n\n/games — Ойындар\n/teams — Командалар\n/tournaments — Турнирлер\n/players — Ойыншылар\n/news — Жаңалықтар\n/about — Сайт туралы',
  '/games':'🎯 <strong>Үздік ойындар:</strong>\n\n🎯 CS2 · FPS · 35M+ ойыншы\n⚔️ Dota 2 · MOBA · $40M турнир\n🏆 LoL · MOBA · 180M+ тіркелген\n🔫 Valorant · Тактикалық · Тегін\n🪖 PUBG · Battle Royale · Танымал',
  '/teams':'👥 <strong>Топ командалар:</strong>\n\n🐻 NAVI (UA) — CS2, Dota 2\n⚡ T1 (KR) — LoL, Valorant\n☁️ Cloud9 (US) — CS2, Valorant\n🦅 KZ Cyber Team (🇰🇿) — CS2',
  '/tournaments':'🏆 <strong>Турнирлер:</strong>\n\n🔴 IEM Katowice — $1M · ТІКЕЛЕЙ\n🔴 VCT Masters — $600K · ТІКЕЛЕЙ\n🟢 The International 2026 — $40M\n🦅 KZ Esports Cup — ₸5M · Алматы',
  '/players':'⭐ <strong>Топ ойыншылар:</strong>\n\n🥇 Faker (LoL) — 9,920\n🥈 s1mple (CS2) — 9,850\n🥉 Miracle- (Dota2) — 9,780\n🇰🇿 DestinY (CS2) — 7,400\n\n📸 Instagram: @s1mple_csgod · @faker',
  '/news':'📰 <strong>Соңғы жаңалықтар:</strong>\n\n🔴 IEM Katowice финалы — NAVI vs VP\n⚡ Team Liquid VCT чемпионы!\n🇰🇿 KZ Cyber Team жеңісі!\n💰 Faker — $10M/жыл контракт',
  '/about':'ℹ️ <strong>CyberWorld туралы:</strong>\n\n🌐 48+ ойын · 320+ команда · 2400+ турнир\n🤖 AI: DALL-E 3, Suno AI, HeyGen, ChatGPT\n📸 Instagram · ✈ Telegram\n🇰🇿 Алматыда жасалды · 2026',
}

function tgBot(html) {
  const c = document.getElementById('tgChat');
  if (!c) return;
  const d = document.createElement('div');
  d.className = 'tg-mb'; d.innerHTML = html.replace(/\n/g,'<br>');
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}
function tgUser(text) {
  const c = document.getElementById('tgChat');
  if (!c) return;
  const d = document.createElement('div');
  d.className = 'tg-mu'; d.textContent = text;
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}
function tgSend(cmd) {
  const inp = document.getElementById('tgInput');
  const text = cmd || inp?.value?.trim();
  if (!text) return;
  if (inp) inp.value = '';
  tgUser(text);
  setTimeout(() => {
    tgBot(tgReplies[text.toLowerCase()] ||
      `❓ Белгісіз: <strong>${text}</strong>\n\nКомандалар: /start /games /teams /tournaments /players /news /about /CEO`);
  }, 500);
}

// ===== 5. NAVBAR =====
function upgradeNavbar() {
  const navList = document.querySelector('.navbar-nav');
  if (!navList) return;
  const liP = document.createElement('li');
  liP.className = 'nav-item';
  liP.innerHTML = `<a class="nav-link" href="#players">ОЙЫНШЫЛАР</a>`;
  const liT = document.createElement('li');
  liT.className = 'nav-item';
  liT.innerHTML = `<a class="nav-link" href="#telegram" style="color:#2AABEE!important">✈ BOT</a>`;
  navList.appendChild(liP);
  navList.appendChild(liT);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderPlayerCards();
  renderTelegramSection();
  upgradeNavbar();
  setTimeout(() => { upgradeMusic(); upgradeAITools(); }, 350);
});