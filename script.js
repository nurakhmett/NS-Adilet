/* ================================================
   CYBERWORLD — script.js
   Барлық интерактивті функционал
   ================================================ */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
setInterval(() => {
  tx += (mx - tx) * 0.15;
  ty += (my - ty) * 0.15;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
}, 16);

document.querySelectorAll('a, button, .chip, .c-chip, .filter-btn, .pl-item, .game-card, .team-card')
  .forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  nav.style.boxShadow = window.scrollY > 60
    ? '0 4px 30px rgba(0,255,209,0.08)' : 'none';
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.sec-block').forEach(el => revealObs.observe(el));

// ===== HERO COUNTERS =====
function animateCounters() {
  document.querySelectorAll('.hnum').forEach(el => {
    const target = parseInt(el.dataset.count);
    let cur = 0;
    const step = target / 70;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { el.textContent = target; clearInterval(t); }
      else el.textContent = Math.floor(cur);
    }, 20);
  });
}
const heroObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) animateCounters(); });
}, { threshold: 0.5 });
const heroEl = document.querySelector('.hero-section');
if (heroEl) heroObs.observe(heroEl);

// ===== TYPED TEXT EFFECT =====
const typedWords = ['ӘЛЕМІ', 'ТУРНИРЛЕРІ', 'КОМАНДАЛАРЫ', 'МӘДЕНИЕТІ', 'БОЛАШАҒЫ'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
function typeEffect() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const word = typedWords[wordIndex];
  if (isDeleting) {
    el.textContent = word.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; wordIndex = (wordIndex + 1) % typedWords.length; setTimeout(typeEffect, 400); return; }
  } else {
    el.textContent = word.substring(0, charIndex++);
    if (charIndex > word.length) { isDeleting = true; setTimeout(typeEffect, 1800); return; }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}
setTimeout(typeEffect, 1000);

// ===== MATRIX CANVAS =====
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cols = Math.floor(canvas.width / 20);
  const drops = Array(cols).fill(1);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アイウエオカキクケコ';
  function drawMatrix() {
    ctx.fillStyle = 'rgba(5,11,20,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FFD1';
    ctx.font = '14px Share Tech Mono';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 20, y * 20);
      if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(drawMatrix, 60);
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== GAMES DATA =====
const gamesData = [
  { name: 'Counter-Strike 2', genre: 'FPS', cat: 'fps', emoji: '🎯', desc: 'Дүниежүзілік ең танымал тактикалық шутер. Командалар 5×5 форматында жарысады.', players: '35M+ ойыншы', tag: 'ТОП 1' },
  { name: 'Dota 2', genre: 'MOBA', cat: 'moba', emoji: '⚔️', desc: 'The International турниріндегі $40M+ жүлде қоры бар стратегиялық ойын.', players: '12M+ ойыншы', tag: 'КЛАССИКА' },
  { name: 'League of Legends', genre: 'MOBA', cat: 'moba', emoji: '🏆', desc: 'Riot Games-тің флагмандық ойыны. Әлемде ең көп ойналатын MOBA.', players: '180M+ тіркелген', tag: 'ТОП 2' },
  { name: 'Valorant', genre: 'FPS', cat: 'fps', emoji: '🔫', desc: 'Тактикалық шутер + агент қабілеттері. Жаңа буын киберспортының символы.', players: '22M+ ойыншы', tag: 'ТРЕНДТІ' },
  { name: 'PUBG', genre: 'Battle Royale', cat: 'battle', emoji: '🪖', desc: 'Battle Royale жанрының атасы. 100 ойыншы — 1 жеңімпаз.', players: '75M+ сатылды', tag: 'ЛЕГЕНДА' },
  { name: 'Fortnite', genre: 'Battle Royale', cat: 'battle', emoji: '🌀', desc: 'Epic Games-тің ақысыз Battle Royale ойыны. Жастар арасында ең танымал.', players: '350M+ тіркелген', tag: 'ӘЛЕМДІК' },
  { name: 'StarCraft II', genre: 'Стратегия', cat: 'strategy', emoji: '🛸', desc: 'Нақты уақыт стратегиясының шыңы. Корея киберспортының символы.', players: '5M+ белсенді', tag: 'КЛАСС' },
  { name: 'Street Fighter 6', genre: 'Жекпе-жек', cat: 'fighting', emoji: '🥊', desc: 'Capcom-ның жаңартылған жекпе-жек ойыны. EVO турнирінің негізгі дисциплинасы.', players: '8M+ сатылды', tag: 'EVO 2024' },
  { name: 'Apex Legends', genre: 'Battle Royale', cat: 'battle', emoji: '⚡', desc: 'EA-ның динамикалық Battle Royale ойыны. Легендалар жүйесі ерекшелендіреді.', players: '130M+ тіркелген', tag: 'ЖЫЛДАМ' },
  { name: 'Warcraft III', genre: 'Стратегия', cat: 'strategy', emoji: '🏰', desc: 'RTS жанрының классигі. Dota жанрының туған жері. Киберспорт тарихы.', players: 'Классика', tag: 'ICON' },
  { name: 'Tekken 8', genre: 'Жекпе-жек', cat: 'fighting', emoji: '👊', desc: '3D жекпе-жек ойынының королі. Бандай Намко-ның флагманы.', players: '2M+ ойыншы', tag: 'ЖАҢА' },
  { name: 'Rocket League', genre: 'Спорт', cat: 'battle', emoji: '🚀', desc: 'Машиналармен футбол! Бірегей геймплей — физика + командалық ойын.', players: '110M+ тіркелген', tag: 'БІРЕГЕЙ' },
];

function renderGames(filter = 'all') {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;
  const filtered = filter === 'all' ? gamesData : gamesData.filter(g => g.cat === filter);
  grid.innerHTML = filtered.map((g, i) => `
    <div class="game-card" style="animation-delay:${i * 0.05}s">
      <div class="gc-emoji">${g.emoji}</div>
      <div class="gc-tag">${g.tag}</div>
      <div class="gc-name">${g.name}</div>
      <div class="gc-genre">${g.genre.toUpperCase()}</div>
      <div class="gc-desc">${g.desc}</div>
      <div class="gc-players">👥 ${g.players}</div>
    </div>`).join('');
}

function filterGames(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGames(cat);
}

// ===== TEAMS DATA =====
const teamsData = [
  { name: 'Natus Vincere', country: '🇺🇦 Украина', logo: '🐻', games: ['CS2', 'Dota 2'], wins: 47, titles: 12 },
  { name: 'Team Liquid', country: '🇳🇱 Нидерланды', logo: '💧', games: ['CS2', 'Dota 2', 'LoL'], wins: 89, titles: 23 },
  { name: 'Cloud9', country: '🇺🇸 АҚШ', logo: '☁️', games: ['CS2', 'Valorant'], wins: 61, titles: 15 },
  { name: 'Virtus.pro', country: '🇷🇺 Ресей / KZ', logo: '🐻‍❄️', games: ['CS2', 'Dota 2'], wins: 55, titles: 18 },
  { name: 'T1', country: '🇰🇷 Корея', logo: '⚡', games: ['LoL', 'Valorant'], wins: 112, titles: 34 },
  { name: 'Astralis', country: '🇩🇰 Дания', logo: '⭐', games: ['CS2'], wins: 73, titles: 21 },
  { name: 'KZ Cyber Team', country: '🇰🇿 Қазақстан', logo: '🦅', games: ['CS2', 'Dota 2', 'PUBG'], wins: 28, titles: 6 },
  { name: 'FURIA', country: '🇧🇷 Бразилия', logo: '🐆', games: ['CS2', 'Valorant'], wins: 44, titles: 9 },
];

function renderTeams() {
  const grid = document.getElementById('teamsGrid');
  if (!grid) return;
  grid.innerHTML = teamsData.map(t => `
    <div class="team-card">
      <div class="team-head">
        <div class="team-logo">${t.logo}</div>
        <div>
          <div class="team-name">${t.name}</div>
          <div class="team-country">${t.country}</div>
        </div>
      </div>
      <div class="team-games">
        ${t.games.map(g => `<span class="team-game-tag">${g}</span>`).join('')}
      </div>
      <div class="team-stats">
        <div class="ts-item"><div class="ts-num">${t.wins}</div><div class="ts-lbl">ЖЕҢІС</div></div>
        <div class="ts-item"><div class="ts-num">${t.titles}</div><div class="ts-lbl">ТИТУЛ</div></div>
        <div class="ts-item"><div class="ts-num">${Math.round(t.wins / t.titles * 10) / 10}</div><div class="ts-lbl">КЖ/ТИТУЛ</div></div>
      </div>
    </div>`).join('');
}

// ===== TOURNAMENTS DATA =====
const tournamentsData = [
  { icon: '🏆', name: 'The International 2026', game: 'DOTA 2', prize: '$40,000,000', status: 'upcoming' },
  { icon: '🎯', name: 'IEM Katowice 2026', game: 'CS2', prize: '$1,000,000', status: 'live' },
  { icon: '⚔️', name: 'Worlds 2026', game: 'LEAGUE OF LEGENDS', prize: '$2,225,000', status: 'upcoming' },
  { icon: '🔫', name: 'VCT Masters Tokyo', game: 'VALORANT', prize: '$600,000', status: 'live' },
  { icon: '🦅', name: 'KZ Esports Championship', game: 'CS2 / DOTA 2', prize: '₸5,000,000', status: 'upcoming' },
  { icon: '🪖', name: 'PUBG Global Series', game: 'PUBG', prize: '$3,000,000', status: 'past' },
  { icon: '⭐', name: 'ESL Pro League S21', game: 'CS2', prize: '$850,000', status: 'past' },
];

function renderTournaments() {
  const list = document.getElementById('tournamentsList');
  if (!list) return;
  const statusLabel = { live: '🔴 ТІКЕЛЕЙ ЭФИР', upcoming: '🟢 ЖАҚЫНДА', past: '⬜ АЯҚТАЛДЫ' };
  list.innerHTML = tournamentsData.map(t => `
    <div class="tourn-card">
      <div class="tourn-icon">${t.icon}</div>
      <div>
        <div class="tourn-name">${t.name}</div>
        <div class="tourn-game">${t.game}</div>
      </div>
      <div class="tourn-prize">${t.prize}</div>
      <div class="tourn-status ${t.status}">${statusLabel[t.status]}</div>
    </div>`).join('');
}

// ===== AI IMAGE GENERATOR =====
function setP(text) {
  document.getElementById('imgPrompt').value = text;
}

function generateImage() {
  const prompt = document.getElementById('imgPrompt').value.trim();
  if (!prompt) { showToast('⚠ Сипаттама жазыңыз!'); return; }
  const res = document.getElementById('imgResult');
  res.innerHTML = `
    <div class="img-ph">
      <div class="a-dots"><span></span><span></span><span></span><span></span></div>
      <p style="margin-top:16px;font-family:var(--font-mono);font-size:.8rem;letter-spacing:2px;color:var(--muted)">AI СУРЕТ ЖАСАЛУДА...</p>
    </div>`;

  const keyMap = {
    'cs2': 'esports,gaming,fps', 'dota': 'esports,fantasy,gaming',
    'league': 'esports,arena,champion', 'valorant': 'esports,tactical,shooter',
    'стадион': 'esports,stadium,arena', 'gaming': 'gaming,setup,neon',
    'чемпион': 'esports,trophy,winner', 'турнир': 'esports,tournament',
    'ойыншы': 'gamer,esports,professional', 'команда': 'esports,team',
    'киберспорт': 'esports,gaming,competitive',
  };
  let kw = 'esports,gaming,competitive';
  for (const [k, v] of Object.entries(keyMap)) {
    if (prompt.toLowerCase().includes(k)) { kw = v; break; }
  }

  const seed = Math.floor(Math.random() * 9999);
  const url = `https://source.unsplash.com/900x500/?${encodeURIComponent(kw)}&sig=${seed}`;
  const img = new Image();
  img.onload = () => {
    res.innerHTML = `
      <div style="position:relative">
        <img src="${url}" alt="${prompt}" class="gen-img">
        <div style="position:absolute;top:12px;left:12px;background:var(--neon);color:var(--bg);
          font-family:var(--font-head);font-size:.65rem;font-weight:700;letter-spacing:2px;
          padding:4px 12px;border-radius:2px">AI GENERATED</div>
      </div>
      <div class="img-label">// ПРОМПТ: "${prompt}" • DALL-E 3 стилінде (демо)</div>`;
    showToast('✓ СУРЕТ ЖАСАЛДЫ');
  };
  img.onerror = () => {
    res.innerHTML = `
      <div style="background:linear-gradient(135deg,rgba(123,47,255,.3),rgba(0,255,209,.2));
        border:1px solid var(--border2);border-radius:8px;padding:60px 30px;text-align:center;position:relative">
        <div style="font-size:5rem;margin-bottom:16px">🎮</div>
        <div style="font-family:var(--font-head);font-size:1.5rem;color:var(--neon);letter-spacing:4px">${prompt.toUpperCase()}</div>
        <div style="font-family:var(--font-mono);font-size:.72rem;color:var(--muted);margin-top:8px">AI GENERATED • CYBERWORLD</div>
        <div style="position:absolute;top:12px;left:12px;background:var(--neon);color:var(--bg);
          font-family:var(--font-head);font-size:.65rem;font-weight:700;letter-spacing:2px;padding:4px 12px;border-radius:2px">AI GENERATED</div>
      </div>`;
    showToast('✓ СУРЕТ ЖАСАЛДЫ');
  };
  img.src = url;
}

// ===== AI AGENT NEWS =====
const newsDB = {
  breaking: [
    { emoji: '🔴', title: 'IEM Katowice финалы', text: 'NAVI vs Virtus.pro гранд-финалы бүгін басталды. 14,000 адам стадионда, 2 млн+ онлайн көрермен.', tag: 'tag-red', label: 'ТІКЕЛЕЙ' },
    { emoji: '⚡', title: 'Valorant чемпионы анықталды', text: 'Team Liquid VCT Masters Istanbul турнирінде $600,000 жүлдені жеңіп алды.', tag: 'tag-green', label: 'НӘТИЖЕ' },
    { emoji: '🚨', title: 'TI2026 жүлде қоры $40M асты', text: 'The International 2026 турнирінің жүлде қоры рекордтық деңгейге жетті — crowd-funding жалғасуда.', tag: 'tag-purple', label: 'РЕКОРД' },
    { emoji: '🇰🇿', title: 'KZ Cyber Team жеңісі', text: 'Қазақстандық команда Central Asia Qualifier турнирінде бірінші орынды иеленді.', tag: 'tag-green', label: 'ҚАЗ' },
  ],
  tournaments: [
    { emoji: '🏆', title: 'The International 2026', text: 'Dota 2-нің басты турниріне 16 команда қатысады. $40M+ жүлде қоры. Желтоқсан 2026.', tag: 'tag-purple', label: 'ЖЕЛТОҚСАН' },
    { emoji: '🎯', title: 'ESL Pro League S22', text: 'CS2 бойынша ең беделді лига. 24 команда, $1M жүлде. Мамыр-маусым 2026.', tag: 'tag-green', label: 'МАМЫР' },
    { emoji: '⚔️', title: 'LoL Worlds 2026', text: 'League of Legends Дүниежүзілік чемпионаты Сеулде өтеді. $2.2M жүлде.', tag: 'tag-red', label: 'ҚЫРКҮЙЕК' },
    { emoji: '🦅', title: 'KZ Esports Cup 2026', text: 'Қазақстандағы ең ірі киберспорт турниріне 64 команда қатысады. Алматы, наурыз.', tag: 'tag-green', label: 'АЛМАТЫ' },
  ],
  transfers: [
    { emoji: '🔄', title: 's1mple — зейнет', text: 'Дүние жүзінің ең үздік CS2 ойыншысы Alexander "s1mple" Kostyliev командасын тастады.', tag: 'tag-red', label: 'ШОК' },
    { emoji: '💰', title: 'Faker контрактісі', text: 'T1-дің аңызы Faker 2026 жылға дейін контракт ұзартты. Жалдыру сомасы: $10M/жыл.', tag: 'tag-purple', label: 'КОНТРАКТ' },
    { emoji: '🌟', title: 'Rain NAVI-ге өтті', text: 'FaZe Clan-нан Rain Natus Vincere командасына трансфер болды. Сумма жарияланбады.', tag: 'tag-green', label: 'ТРАНСФЕР' },
    { emoji: '🏹', title: 'KZ ойыншысы халықаралық команда', text: 'Алматылық киберспортшы Arman "DestinY" европалық командаға шақырылды.', tag: 'tag-green', label: '🇰🇿 МАҚТАНЫШ' },
  ],
  games: [
    { emoji: '🎮', title: 'CS2 жаңа патч', text: 'Valve CS2-ге үлкен жаңарту шығарды: 3 жаңа карта, қару балансы өзгерді, pro-лар пікірі белсенді.', tag: 'tag-green', label: 'ПАТЧ 1.38' },
    { emoji: '⚔️', title: 'Dota 2 7.38 патч', text: 'IceFrog жаңа патч шығарды: 12 герой өзгерді, 2 жаңа зат қосылды.', tag: 'tag-purple', label: 'DOTA 2' },
    { emoji: '🏆', title: 'LoL 14.8 сезон', text: 'Riot Games ойынды түбегейлі өзгертті — Map, items, рейтинг жүйесі жаңартылды.', tag: 'tag-red', label: 'LOL' },
    { emoji: '🔫', title: 'Valorant Episode 9', text: 'Riot Games жаңа агент Cypher нерф + 2 жаңа карта қосты. Meta түбегейлі өзгерді.', tag: 'tag-green', label: 'VALORANT' },
  ],
  kz: [
    { emoji: '🇰🇿', title: 'Алматы Киберспорт Чемпионаты', text: '2026 жылдың наурызында Алматыда ірі турнир өтеді. 64 команда, ₸5M жүлде қоры.', tag: 'tag-green', label: 'АЛМАТЫ' },
    { emoji: '🎓', title: 'SDU University киберспорт', text: 'Алматыдағы жоғары оқу орны киберспорт бакалавр бағдарламасын ашты. Қазақстанда алғашқы рет.', tag: 'tag-purple', label: 'БІЛІМ' },
    { emoji: '🏅', title: 'Virtus.pro — Қазақстан', text: 'VP командасының бірнеше қазақстандық ойыншысы бар. Олар мақтанышымыз!', tag: 'tag-green', label: 'ВП' },
    { emoji: '💻', title: 'KZ Esports федерациясы', text: 'Қазақстан Киберспорт Федерациясы халықаралық IESF-ке мүше болды. Олимпиадалық статус жолында.', tag: 'tag-red', label: 'ФЕДЕРАЦИЯ' },
  ],
};

function loadNews(type, btn) {
  document.querySelectorAll('.atab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const loader = document.getElementById('agentLoader');
  const out = document.getElementById('agentOut');
  loader.style.display = 'block';
  out.innerHTML = '';
  setTimeout(() => {
    loader.style.display = 'none';
    const items = newsDB[type] || [];
    out.innerHTML = `<div class="news-grid">${items.map((n, i) => `
      <div class="news-card" style="animation-delay:${i * 0.08}s">
        <div class="news-emoji">${n.emoji}</div>
        <div class="news-title">${n.title}</div>
        <div class="news-text">${n.text}</div>
        <span class="news-tag ${n.tag}">${n.label}</span>
      </div>`).join('')}</div>`;
  }, 1000);
}

// ===== DYNAMIC TABLE =====
let players = [
  { nick: 's1mple', game: 'CS2', country: '🇺🇦 UA', rating: 9850, wins: 847, role: 'AWPer' },
  { nick: 'Faker', game: 'LoL', country: '🇰🇷 KR', rating: 9920, wins: 1200, role: 'IGL' },
  { nick: 'Miracle-', game: 'Dota 2', country: '🇯🇴 JO', rating: 9780, wins: 620, role: 'Carry' },
  { nick: 'DestinY', game: 'CS2', country: '🇰🇿 KZ', rating: 7400, wins: 310, role: 'Entry' },
  { nick: 'ZywOo', game: 'CS2', country: '🇫🇷 FR', rating: 9760, wins: 540, role: 'AWPer' },
  { nick: 'Molodoy', game: 'CS2', country: '🇰🇿 KZ', rating: 6800, wins: 150, role: 'AWPer' },
];
let showingAll = true;

function getRankBadge(i) {
  const cls = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-n';
  const labels = ['1', '2', '3'];
  return `<div class="rank-badge ${cls}">${labels[i] || i + 1}</div>`;
}

function getLevel(rating) {
  const pct = Math.round((rating / 10000) * 100);
  const label = rating >= 9500 ? 'PRO' : rating >= 8000 ? 'MASTER' : rating >= 6000 ? 'DIAMOND' : 'GOLD';
  return `<div class="level-bar"><div class="l-bar"><div class="l-fill" style="width:${pct}%"></div></div>
    <span style="font-family:var(--font-mono);font-size:.65rem;color:var(--neon);white-space:nowrap">${label}</span></div>`;
}

function renderTable() {
  const tbody = document.getElementById('tBody');
  if (!tbody) return;
  tbody.innerHTML = players.map((p, i) => `
    <tr>
      <td>${getRankBadge(i)}</td>
      <td><span style="font-family:var(--font-head);color:var(--white);letter-spacing:1px">${p.nick}</span></td>
      <td><span style="font-family:var(--font-mono);color:var(--neon);font-size:.8rem">${p.game}</span></td>
      <td style="font-size:1rem">${p.country}</td>
      <td><span style="font-family:var(--font-head);color:var(--neon3);font-size:1rem">${p.rating.toLocaleString()}</span></td>
      <td style="color:rgba(200,216,232,.7)">${p.wins}</td>
      <td><span style="font-family:var(--font-mono);font-size:.72rem;color:var(--muted)">${p.role}</span></td>
      <td>${getLevel(p.rating)}</td>
      <td><button class="btn-del" onclick="deletePlayer(${i})">✕</button></td>
    </tr>`).join('');
  updateSummary();
}

function addPlayer() {
  const nick = document.getElementById('tNick').value.trim();
  const game = document.getElementById('tGame').value.trim();
  const country = document.getElementById('tCountry').value.trim() || '🌍';
  const rating = parseInt(document.getElementById('tRating').value) || 5000;
  const wins = parseInt(document.getElementById('tWins').value) || 0;
  const role = document.getElementById('tRole').value;
  if (!nick || !game) { showToast('⚠ НИК және ОЙЫН жазыңыз!'); return; }
  players.push({ nick, game, country, rating, wins, role });
  players.sort((a, b) => b.rating - a.rating);
  renderTable();
  ['tNick','tGame','tCountry','tRating','tWins'].forEach(id => document.getElementById(id).value = '');
  showToast(`✓ ${nick} ҚОСЫЛДЫ`);
}

function deletePlayer(i) {
  const name = players[i].nick;
  players.splice(i, 1);
  renderTable();
  showToast(`✕ ${name} ӨШІРІЛДІ`);
}

function sortPlayers() {
  players.sort((a, b) => b.rating - a.rating);
  renderTable();
  showToast('⇅ РЕЙТИНГ БОЙЫНША СОРТТАНДЫРЫЛДЫ');
}

function filterTop5() {
  showingAll = false;
  const top = [...players].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const tbody = document.getElementById('tBody');
  tbody.innerHTML = top.map((p, i) => `
    <tr>
      <td>${getRankBadge(i)}</td>
      <td><span style="font-family:var(--font-head);color:var(--white);letter-spacing:1px">${p.nick}</span></td>
      <td><span style="font-family:var(--font-mono);color:var(--neon);font-size:.8rem">${p.game}</span></td>
      <td style="font-size:1rem">${p.country}</td>
      <td><span style="font-family:var(--font-head);color:var(--neon3);font-size:1rem">${p.rating.toLocaleString()}</span></td>
      <td style="color:rgba(200,216,232,.7)">${p.wins}</td>
      <td><span style="font-family:var(--font-mono);font-size:.72rem;color:var(--muted)">${p.role}</span></td>
      <td>${getLevel(p.rating)}</td>
      <td>—</td>
    </tr>`).join('');
  showToast('🏆 ТОП 5 КӨРСЕТІЛДІ');
}

function resetFilter() { showingAll = true; renderTable(); showToast('↺ БАРЛЫҒЫ'); }

function clearPlayers() {
  if (confirm('Кестені тазалайсыз ба?')) { players = []; renderTable(); }
}

function updateSummary() {
  const s = document.getElementById('tSummary');
  if (!s) return;
  const avg = players.length ? Math.round(players.reduce((a, p) => a + p.rating, 0) / players.length) : 0;
  const top = players.length ? players.reduce((a, p) => p.rating > a.rating ? p : a, players[0]) : null;
  s.innerHTML = `
    <div class="sum-item">Барлық ойыншы: <span>${players.length}</span></div>
    <div class="sum-item">Орташа рейтинг: <span>${avg.toLocaleString()}</span></div>
    ${top ? `<div class="sum-item">Көшбасшы: <span>${top.nick} (${top.rating.toLocaleString()})</span></div>` : ''}
    <div class="sum-item">Ойындар: <span>${[...new Set(players.map(p => p.game))].join(', ') || '—'}</span></div>`;
}

// ===== MUSIC PLAYER =====
const tracks = [
  { name: 'Cyber Arena',    artist: 'Mixkit • Gaming Beat',    emoji: '🎮', dur: '1:30', secs: 90,  url: 'media/track1.mp3' },
  { name: 'Neon Overdrive', artist: 'Mixkit • Hip-Hop',        emoji: '⚡', dur: '1:45', secs: 105, url: 'media/track2.mp3' },
  { name: 'Ranked Match',   artist: 'Mixkit • Tech House',     emoji: '🏆', dur: '1:30', secs: 90,  url: 'media/track3.mp3' },
  { name: 'Boss Fight',     artist: 'Mixkit • Driving Action', emoji: '💀', dur: '2:00', secs: 120, url: 'media/track4.mp3' },
  { name: 'Victory Screen', artist: 'Mixkit • Triumph',        emoji: '🥇', dur: '1:15', secs: 75,  url: 'media/track5.mp3' },
];
let curTrack = 0, isPlaying = false, mockTime = 0, mockTimer = null, shuffleOn = false;

function buildPlaylist() {
  const pl = document.getElementById('playlist');
  if (!pl) return;
  pl.innerHTML = tracks.map((t, i) => `
    <div class="pl-item ${i === 0 ? 'active' : ''}" id="pl-${i}" onclick="selectTrack(${i})">
      <span class="pl-num">${String(i + 1).padStart(2, '0')}</span>
      <div class="pl-info">
        <div class="pl-name">${t.emoji} ${t.name}</div>
        <div class="pl-genre">${t.artist}</div>
      </div>
      <span class="pl-dur">${t.dur}</span>
    </div>`).join('');
}

function selectTrack(i) {
  document.querySelectorAll('.pl-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('pl-' + i);
  if (el) el.classList.add('active');
  curTrack = i;
  const t = tracks[i];
  document.getElementById('nowTrack').textContent = t.emoji + ' ' + t.name;
  document.getElementById('nowArtist').textContent = t.artist;
  const em = document.getElementById('nowEmoji');
  if (em) em.textContent = t.emoji;
  document.getElementById('totTime').textContent = t.dur;
  document.getElementById('pFill').style.width = '0%';
  document.getElementById('curTime').textContent = '0:00';
  mockTime = 0;
  const audio = document.getElementById('audio');
  audio.src = t.url;
  audio.load();
  if (isPlaying) audio.play().catch(() => startMock());
}

function togglePlay() {
  const btn = document.getElementById('playBtn');
  const player = document.querySelector('.music-player');
  const audio = document.getElementById('audio');
  if (isPlaying) {
    isPlaying = false;
    btn.textContent = '▶️';
    player.classList.remove('playing');
    audio.pause();
    clearInterval(mockTimer);
  } else {
    isPlaying = true;
    btn.textContent = '⏸️';
    player.classList.add('playing');
    audio.play().catch(() => startMock());
  }
}

function startMock() {
  clearInterval(mockTimer);
  const total = tracks[curTrack].secs;
  mockTimer = setInterval(() => {
    if (!isPlaying) return;
    mockTime++;
    if (mockTime >= total) { nextT(); return; }
    document.getElementById('pFill').style.width = (mockTime / total * 100) + '%';
    document.getElementById('curTime').textContent = fmt(mockTime);
  }, 1000);
}

function fmt(s) { return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }

function updateP() {
  const a = document.getElementById('audio');
  if (!a.duration) return;
  document.getElementById('pFill').style.width = (a.currentTime / a.duration * 100) + '%';
  document.getElementById('curTime').textContent = fmt(Math.floor(a.currentTime));
}

function updateD() {
  const a = document.getElementById('audio');
  document.getElementById('totTime').textContent = fmt(Math.floor(a.duration));
}

function nextT() {
  const next = shuffleOn
    ? Math.floor(Math.random() * tracks.length)
    : (curTrack + 1) % tracks.length;
  selectTrack(next);
}

function prevT() { selectTrack((curTrack - 1 + tracks.length) % tracks.length); }

function toggleShuffle() {
  shuffleOn = !shuffleOn;
  const btn = document.getElementById('shuffleBtn');
  if (btn) btn.classList.toggle('active', shuffleOn);
  showToast(shuffleOn ? '⇄ КЕЗДЕЙСОҚ ҚОСЫЛДЫ' : '⇄ КЕЗДЕЙСОҚ ӨШІРІЛДІ');
}

function seekT(e) {
  const bar = e.currentTarget;
  const pct = e.offsetX / bar.offsetWidth;
  const audio = document.getElementById('audio');
  if (audio.duration) { audio.currentTime = pct * audio.duration; }
  else { mockTime = Math.floor(pct * tracks[curTrack].secs); }
}

// ===== CHATBOT =====
const botDB = {
  'cs2': [
    'CS2 (Counter-Strike 2) — дүниежүзіндегі ең танымал тактикалық шутер! 🎯\n\n• 5 vs 5 формат\n• Картада: бомба қою / болдырмау\n• Ең жақсы ойыншылар: s1mple, ZywOo, NiKo\n• Ең беделді турнир: IEM, ESL Pro League\n\nПК ойыны, Steam-де ақысыз!'
  ],
  'dota': [
    'Dota 2 — Valve-дің MOBA шедеврі! ⚔️\n\n• 5 vs 5, 2 команда, 1 мақсат — Throne жою\n• 124+ герой бар, әрқайсысы бірегей\n• The International турниріндегі жүлде: $40M+\n• Ең жақсы қазақ: Virtus.pro командасы\n\nАқысыз, Steam-де жүктеп алыңыз!'
  ],
  'league': [
    'League of Legends — MOBA жанрының патшасы! 🏆\n\n• Riot Games жасаған, 2009 жылдан бері\n• 165+ чемпион, Map: Summoner\'s Rift\n• Worlds — ең үлкен жылдық турнир\n• Корея T1 командасы — 4× Дүниежүзілік чемпион\n• Faker — ойынның тірі аңызы!'
  ],
  'valorant': [
    'Valorant — Riot Games-тің тактикалық шутері! 🔫\n\n• CS2 + герой қабілеттері = Valorant\n• 25+ агент, әрқайсысының бірегей қабілеті бар\n• VCT — ресми турнир жүйесі\n• Тегін, PC-да жұмыс істейді\n\nЖаңадан бастаушыларға өте қолайлы!'
  ],
  'pubg': [
    'PUBG — Battle Royale жанрының атасы! 🪖\n\n• 100 ойыншы, 1 жеңімпаз\n• Карталар: Erangel, Miramar, Sanhok\n• PUBG Global Series — $3M жүлде\n• Мобайл нұсқасы: PUBG Mobile (Тегін!)\n\nҚазақстанда өте танымал!'
  ],
  'fortnite': [
    'Fortnite — Epic Games-тің феномені! 🌀\n\n• Battle Royale + Құрылыс механикасы\n• Сезондар жүйесі, 350M+ тіркелген\n• Ақысыз, барлық платформада\n• Crossover: Marvel, DC, Nike қосылып кетті!'
  ],
  'про': [
    'Киберспорт про болу жолы:\n\n🎯 1. Бір ойынды таңдаңыз\n⏰ 2. Күніне 4-6 сағат жаттығыңыз\n📊 3. Replays талдаңыз, қателерді түзетіңіз\n👥 4. Команда тапқыңыз — командалық ойын маңызды\n🏆 5. Жергілікті турнирлерге қатысыңыз\n💪 6. Физикалық денсаулықты ұмытпаңыз!\n\nҚазақстанда: KZ Esports Cup — бастауыш деңгей'
  ],
  'қазақстан': [
    'Қазақстан Киберспорты 🇰🇿\n\n🏆 Virtus.pro — КЗ ойыншылары бар халықаралық команда\n🦅 KZ Cyber Team — ел командасы\n🏟️ Алматы Киберспорт Чемпионаты — жылдық турнир\n🎓 SDU University — киберспорт бакалавриат\n📡 IESF мүшесі — халықаралық федерация\n\nБолашақ өте жарқын!'
  ],
  'рейтинг': [
    'Дүниежүзілік рейтинг:\n\n🥇 Faker (LoL) — 9,920 ұпай\n🥈 s1mple (CS2) — 9,850 ұпай\n🥉 Miracle- (Dota 2) — 9,780 ұпай\n4. ZywOo (CS2) — 9,760 ұпай\n5. Yatoro (Dota 2) — 9,720 ұпай\n\nҚазақстандық үздік: DestinY (CS2) — 7,400'
  ],
  'турнир': [
    'Үлкен турнирлер:\n\n🏆 The International 2025 — $40M (Dota 2)\n🎯 IEM Katowice — $1M (CS2)\n⚔️ Worlds 2025 — $2.2M (LoL)\n🔫 VCT Masters — $600K (Valorant)\n🦅 KZ Esports Cup — ₸5M (Алматы)\n\nКатысу үшін: онлайн квалификация → лига → гранд-финал'
  ],
  'сәлем': [
    'Сәлем! 👾 Мен CyberBot — кез келген ойын, команда, турнир туралы сұрақ қойыңыз!\n\nТипті сұрақтар:\n• "CS2 туралы айт"\n• "Қазақстан киберспорты"\n• "Про болу жолы"\n• "Дүниежүзілік рейтинг"'
  ],
};
const defaultReplies = [
  'Қызықты сұрақ! 🎮 CS2, Dota 2, LoL, Valorant, PUBG туралы толық ақпарат беремін. Қайсысы қызықтырады?',
  'Мен киберспорт сарапшысымын! 🏆 Ойындар, командалар, турнирлер туралы сұраңыз.',
  'Бұл тақырыпты тереңірек зерттейін! Ойын атауын нақтырақ жазыңыз 🎯',
];

function getBotReply(msg) {
  const l = msg.toLowerCase();
  for (const [k, v] of Object.entries(botDB)) {
    if (l.includes(k)) return v[Math.floor(Math.random() * v.length)];
  }
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

function getTime() {
  return new Date().toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' });
}

function addMsg(text, isUser) {
  const box = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = `cm ${isUser ? 'cm-user' : 'cm-bot'}`;
  div.innerHTML = `
    <div class="cm-bub">${text.replace(/\n/g, '<br>')}</div>
    <div class="cm-time">${getTime()}</div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function addTyping() {
  const box = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = 'cm cm-bot typing';
  div.id = 'typing';
  div.innerHTML = `<div class="cm-bub"><span class="td"></span><span class="td"></span><span class="td"></span></div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function sendMsg() {
  const inp = document.getElementById('chatIn');
  const msg = inp.value.trim();
  if (!msg) return;
  addMsg(msg, true);
  inp.value = '';
  addTyping();
  setTimeout(() => {
    document.getElementById('typing')?.remove();
    addMsg(getBotReply(msg), false);
  }, 700 + Math.random() * 700);
}

function qs(text) {
  document.getElementById('chatIn').value = text;
  sendMsg();
}

function clearChat() {
  document.getElementById('chatBox').innerHTML = '';
  setTimeout(() => addMsg('Қайта сәлем! 👾 CyberBot дайын. Ойын, команда, турнир туралы сұраңыз!', false), 200);
}

// ===== TOAST =====
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.transform = 'translateY(0)';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.transform = 'translateY(80px)';
    t.style.opacity = '0';
  }, 2800);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderGames();
  renderTeams();
  renderTournaments();
  renderTable();
  buildPlaylist();
  loadNews('breaking', null);
  document.querySelector('.atab')?.classList.add('active');
  // Welcome bot message
  setTimeout(() => {
    addMsg('Сәлем! 👾 Мен CyberBot AI — кез келген ойын, команда, турнир туралы сұрақ қойыңыз!\n\nCS2, Dota 2, LoL, Valorant, PUBG бойынша толық ақпарат беремін 🎮', false);
  }, 600);
});