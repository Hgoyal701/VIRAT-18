import './styles.css'
import metadata from '../metadata.json'

// Use local assets if present (metadata may reference /assets/imageX.jpg)
const gallery: string[] = Array.isArray((metadata as any).gallery) ? (metadata as any).gallery : []

// fallback remote images (used when local files 404)
const FALLBACKS = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505842465776-3d1a1d1a1a1a?auto=format&fit=crop&w=800&q=80'
]

// Enhanced Canvas background for a lively wallpaper: moving color blobs + particle network + parallax
function createCanvasBG(){
  const existing = document.getElementById('bgCanvas') as HTMLCanvasElement | null
  if(existing) return

  const canvas = document.createElement('canvas')
  canvas.id = 'bgCanvas'
  canvas.style.position = 'fixed'
  canvas.style.left = '0'
  canvas.style.top = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.zIndex = '0'
  canvas.style.pointerEvents = 'none'
  canvas.style.filter = 'blur(18px)'
  canvas.style.opacity = '0.95'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')!
  let w = 0, h = 0, DPR = Math.max(1, window.devicePixelRatio || 1)

  // blobs for colorful moving gradients
  const blobs: {x:number;y:number;vx:number;vy:number;r:number;color:string;phase:number}[] = []
  // particles for network
  const particles: {x:number;y:number;vx:number;vy:number;r:number}[] = []

  let mouseX = 0, mouseY = 0
  const parallaxFactor = 30 // how much the mouse moves the background blobs

  function resize(){
    w = Math.max(320, window.innerWidth)
    h = Math.max(320, window.innerHeight)
    canvas.width = Math.floor(w * DPR)
    canvas.height = Math.floor(h * DPR)
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.setTransform(DPR,0,0,DPR,0,0)
  }

  function init(){
    blobs.length = 0
    particles.length = 0

    const bcount = Math.max(3, Math.round((w*h)/600000))
    const palette = ['rgba(255,61,77,0.42)','rgba(255,214,102,0.32)','rgba(160,32,40,0.26)','rgba(255,255,255,0.10)']
    for(let i=0;i<bcount;i++){
      blobs.push({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-0.5)*0.2,
        vy: (Math.random()-0.5)*0.2,
        r: Math.max(w,h)* (0.18 + Math.random()*0.18),
        color: palette[i % palette.length],
        phase: Math.random()*Math.PI*2
      })
    }

    const pcount = Math.round((w*h) / 80000)
    for(let i=0;i<pcount;i++){
      particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,r:Math.random()*1.6+0.4})
    }
  }

  window.addEventListener('mousemove', (e)=>{ mouseX = e.clientX; mouseY = e.clientY })
  window.addEventListener('resize', ()=>{ resize(); init() })
  resize(); init()

  let t = 0
  function draw(){
    t += 0.01
    ctx.clearRect(0,0,w,h)
    ctx.globalCompositeOperation = 'screen'
    for(const b of blobs){
      b.x += b.vx + Math.sin(t + b.phase)*0.05
      b.y += b.vy + Math.cos(t + b.phase)*0.05
      if(b.x < -b.r) b.x = w + b.r
      if(b.x > w + b.r) b.x = -b.r
      if(b.y < -b.r) b.y = h + b.r
      if(b.y > h + b.r) b.y = -b.r

      const px = (mouseX - w/2)/w * parallaxFactor
      const py = (mouseY - h/2)/h * parallaxFactor

      const grd = ctx.createRadialGradient(b.x+px, b.y+py, b.r*0.05, b.x+px, b.y+py, b.r)
      try{
        grd.addColorStop(0, b.color.replace(/,[^,]+\)/, ',1)'))
        grd.addColorStop(0.25, b.color)
        grd.addColorStop(1, b.color.replace(/,[^,]+\)/, ',0)'))
      }catch(e){
        grd.addColorStop(0, b.color)
        grd.addColorStop(1, b.color)
      }

      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(b.x+px, b.y+py, b.r, 0, Math.PI*2)
      ctx.fill()
    }

    ctx.globalCompositeOperation = 'lighter'
    for(const p of particles){
      p.x += p.vx
      p.y += p.vy
      if(p.x<0) p.x = w
      if(p.x> w) p.x = 0
      if(p.y<0) p.y = h
      if(p.y> h) p.y = 0
    }

    ctx.lineWidth = 0.6
    for(let i=0;i<particles.length;i++){
      const a = particles[i]
      for(let j=i+1;j<particles.length;j++){
        const b = particles[j]
        const dx = a.x-b.x, dy = a.y-b.y
        const d = Math.sqrt(dx*dx+dy*dy)
        if(d<120){
          ctx.beginPath()
          const alpha = (1 - d/120) * 0.08
          ctx.strokeStyle = `rgba(255,214,102,${alpha.toFixed(3)})`
          ctx.moveTo(a.x,a.y)
          ctx.lineTo(b.x,b.y)
          ctx.stroke()
        }
      }
    }

    for(const p of particles){
      ctx.beginPath()
      ctx.fillStyle = 'rgba(255,255,255,0.95)'
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
      ctx.fill()
    }

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(0,0,0,0)'
    requestAnimationFrame(draw)
  }

  draw()
}

function createSidebar(){
  const aside = document.createElement('aside')
  aside.className = 'sidebar'
  aside.innerHTML = `
    <div class="brand">VK</div>
    <nav class="nav">
      <a href="#home" class="active">Home</a>
      <a href="#career">Career</a>
      <a href="#achievements">Achievements</a>
      <a href="#stats">Stats</a>
      <a href="#gallery">Gallery</a>
    </nav>
    <button id="themeToggle" class="theme-btn">🌙</button>
  `
  return aside
}

function createHero(){
  const section = document.createElement('section')
  section.id = 'home'
  section.className = 'hero'

  const heroImg = gallery[0] || FALLBACKS[0]

  section.innerHTML = `
    <div class="hero-text">
      <p class="eyebrow">THE CHASE MASTER</p>
      <h1 class="glitch" data-text="${(metadata as any).hero.headline}"><span>${(metadata as any).hero.headline}</span></h1>
      <p class="hero-tagline">${(metadata as any).hero.tagline}</p>
      <div class="cta-row">
        <a href="#stats" class="primary-btn">View Stats</a>
        <a href="#career" class="secondary-btn">Career Timeline</a>
      </div>

      <div class="quick-metrics">
        <div class="metric-box">
          <span class="metric-number">35K+</span>
          <span class="metric-label">Runs</span>
        </div>
        <div class="metric-box">
          <span class="metric-number">785</span>
          <span class="metric-label">Matches</span>
        </div>
        <div class="metric-box">
          <span class="metric-number">80+</span>
          <span class="metric-label">100s</span>
        </div>
      </div>
    </div>

    <div class="hero-visual">
      <div class="player-card tilt-card" aria-label="Virat Kohli profile card">
        <img id="heroImg" src="${heroImg}" alt="Virat Kohli" />
        <div class="card-glow"></div>
      </div>
    </div>
  `
  return section
}

function createShowcaseBanner(){
  const sec = document.createElement('section')
  sec.className = 'showcase-banner'
  sec.innerHTML = `
    <div class="showcase-shell">
      <div class="showcase-copy">
        <p class="mini-kicker">Legacy in red & blue</p>
        <h3>RCB fire meets Indian pride</h3>
        <p>Half red RCB intensity. Half Indian jersey passion. One bat-wielding legend built for the big stage.</p>
      </div>
      <div class="split-jersey" aria-label="Virat Kohli jersey split design">
        <div class="half half-red">
          <span>RCB</span>
        </div>
        <div class="half half-blue">
          <span>IND</span>
        </div>
        <div class="crest">VK</div>
      </div>
    </div>
  `
  return sec
}

function createCareer(){
  const events = [
    {
      year: '2006',
      label: 'Junior Breakthrough',
      title: 'U19 India and early promise',
      description: 'Virat Kohli started to stand out as a highly talented young batter, showing the temperament and technique that would later define his international career.'
    },
    {
      year: '2008',
      label: 'International Debut',
      title: 'India call-up',
      description: 'He made his international debut and began the climb toward becoming a dependable performer in India’s batting line-up across formats.'
    },
    {
      year: '2011',
      label: 'World Cup Impact',
      title: 'ICC Cricket World Cup',
      description: 'Kohli’s rise continued through the 2011 World Cup, where he gave India critical batting depth and confidence in pressure moments.'
    },
    {
      year: '2013',
      label: 'Global Star',
      title: 'The modern batting era',
      description: 'He established himself as one of the world’s premier run-scorers and became the face of India’s aggressive middle-order batting.'
    },
    {
      year: '2016',
      label: 'Captaincy',
      title: 'India Test captaincy era',
      description: 'As captain, Kohli transformed India into a fearless, high-intensity team that played with greater aggression and intent across conditions.'
    },
    {
      year: '2018',
      label: 'BGT Masterclass',
      title: 'Border-Gavaskar Trophy heroics',
      description: 'His performances in Australia under pressure cemented his reputation as a world-class overseas batter, especially in difficult conditions.'
    },
    {
      year: '2021',
      label: 'T20 World Cup',
      title: 'Leadership and batting class',
      description: 'Kohli remained one of the most feared T20 batters globally, continuing to lead from the front with his power, shot selection, and chase control.'
    },
    {
      year: '2022',
      label: 'Record Breaker',
      title: 'Run-scoring dominance',
      description: 'He continued dominating ODI and Test cricket with remarkable consistency, keeping his standards at an elite level.'
    },
    {
      year: '2025',
      label: 'Legend Status',
      title: 'Modern cricket great',
      description: 'Even in the modern era, Kohli is still regarded as one of cricket’s strongest competitors, admired for fitness, temperament, and chase-winning ability.'
    }
  ]

  const sec = document.createElement('section')
  sec.id = 'career'
  sec.className = 'section'
  sec.innerHTML = `
    <div class="section-heading">
      <p class="section-tag">Career Journey</p>
      <h2>Timeline</h2>
    </div>
    <div class="career-timeline">
      ${events.map((event, index) => `
        <div class="timeline-entry ${index % 2 === 0 ? 'left' : 'right'}">
          <div class="timeline-card">
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-label">${event.label}</div>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
          </div>
          <div class="timeline-dot"></div>
        </div>
      `).join('')}
    </div>
  `
  return sec
}

function createAchievements(){
  const sec = document.createElement('section')
  sec.id = 'achievements'
  sec.className = 'section'
  sec.innerHTML = `
    <h2>Achievements</h2>
    <div class="cards">
      <div class="card"><h3>ICC Awards</h3><p>Multiple ICC Player of the Year and ODI awards.</p></div>
      <div class="card"><h3>Centuries</h3><p>One of the most prolific century scorers in world cricket.</p></div>
      <div class="card"><h3>Records</h3><p>Fastest to several major milestones in international cricket.</p></div>
      <div class="card"><h3>Captaincy</h3><p>Led India with aggressive, fearless intent and passion.</p></div>
    </div>
  `
  return sec
}

function createStats(){
  const s = document.createElement('section')
  s.id = 'stats'
  s.className = 'section'

  s.innerHTML = `
    <h2>Career Stats</h2>
    <div class="stats-grid">
      <div class="stat-box">
        <span class="num" id="runsCount">0</span>
        <label>International Runs</label>
      </div>
      <div class="stat-box">
        <span class="num" id="centuriesCount">0</span>
        <label>International 100s</label>
      </div>
      <div class="stat-box">
        <span class="num" id="odisCount">0</span>
        <label>ODIs Played</label>
      </div>
    </div>

    <div class="format-table">
      <table>
        <thead>
          <tr><th>Format</th><th>Matches</th><th>Runs</th><th>Avg</th><th>100s</th></tr>
        </thead>
        <tbody>
          <tr><td>Tests</td><td id="testsMatches"></td><td id="testsRuns"></td><td id="testsAvg"></td><td id="tests100s"></td></tr>
          <tr><td>ODIs</td><td id="odisMatches"></td><td id="odisRuns"></td><td id="odisAvg"></td><td id="odis100s"></td></tr>
          <tr><td>T20Is</td><td id="t20Matches"></td><td id="t20Runs"></td><td id="t20Avg"></td><td id="t20100s"></td></tr>
        </tbody>
      </table>
    </div>
  `

  const fillStats = () => {
    const stats: any = (metadata as any).stats || {}
    const animate = (id: string, to: number) => {
      const el = document.getElementById(id)
      if (!el) return
      let start = 0
      const duration = 900
      const step = Math.ceil(to / (duration / 16))
      const iv = setInterval(()=>{
        start += step
        if (start >= to){ el.textContent = String(to); clearInterval(iv) }
        else el.textContent = String(start)
      },16)
    }

    animate('runsCount', stats.internationalRuns || 0)
    animate('centuriesCount', stats.internationalCenturies || 0)
    animate('odisCount', stats.odisPlayed || 0)

    const fill = (id: string, value: any) => { const el = document.getElementById(id); if (el) el.textContent = String(value ?? '-') }

    fill('testsMatches', stats.tests?.matches)
    fill('testsRuns', stats.tests?.runs)
    fill('testsAvg', stats.tests?.avg)
    fill('tests100s', stats.tests?.hundreds)

    fill('odisMatches', stats.odis?.matches)
    fill('odisRuns', stats.odis?.runs)
    fill('odisAvg', stats.odis?.avg)
    fill('odis100s', stats.odis?.hundreds)

    fill('t20Matches', stats.t20is?.matches)
    fill('t20Runs', stats.t20is?.runs)
    fill('t20Avg', stats.t20is?.avg)
    fill('t20100s', stats.t20is?.hundreds)
  }

  setTimeout(fillStats, 50)

  return s
}

async function createGallery(){
  const sec = document.createElement('section')
  sec.id = 'gallery'
  sec.className = 'section'
  sec.innerHTML = `<h2>Gallery</h2>`
  const grid = document.createElement('div')
  grid.className = 'gallery-grid'

  const checkImage = (url: string) => new Promise<string|null>((resolve)=>{
    const img = new Image()
    img.onload = () => resolve(url)
    img.onerror = () => resolve(null)
    img.src = url
  })

  const imgsToUse: string[] = []

  for(let i=0;i<Math.max(gallery.length, FALLBACKS.length); i++){
    const candidate = gallery[i] || FALLBACKS[i % FALLBACKS.length]
    try{
      const ok = await checkImage(candidate)
      if(ok) imgsToUse.push(ok)
      else {
        console.warn(`Image not reachable: ${candidate} — using fallback`)
        imgsToUse.push(FALLBACKS[i % FALLBACKS.length])
      }
    }catch(e){
      imgsToUse.push(FALLBACKS[i % FALLBACKS.length])
    }
  }

  imgsToUse.forEach((src, idx)=>{
    const img = document.createElement('img')
    img.src = src
    img.alt = `player-${idx+1}`
    grid.appendChild(img)
  })

  sec.appendChild(grid)
  return sec
}

function createFooter(){
  const f = document.createElement('footer')
  f.className = 'site-footer'
  f.innerHTML = `<div>crafted with ⚡ by <span class="credit">Dodo</span></div>`
  return f
}

function bindTiltEffect(){
  const cards = document.querySelectorAll('.tilt-card')
  cards.forEach((card) => {
    const el = card as HTMLElement
    el.addEventListener('pointermove', (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      const rotateY = (px - 0.5) * 18
      const rotateX = (0.5 - py) * 18
      el.style.setProperty('--rotateX', `${rotateX.toFixed(2)}deg`)
      el.style.setProperty('--rotateY', `${rotateY.toFixed(2)}deg`)
      el.style.setProperty('--glowX', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--glowY', `${(py * 100).toFixed(1)}%`)
    })

    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rotateX', '0deg')
      el.style.setProperty('--rotateY', '0deg')
    })
  })
}

async function mount(){
  createCanvasBG()
  const app = document.getElementById('app')!
  app.innerHTML = ''
  const wrapper = document.createElement('div')
  wrapper.className = 'app'
  wrapper.style.position = 'relative'
  wrapper.style.zIndex = '3'

  wrapper.appendChild(createSidebar())

  const main = document.createElement('main')
  main.className = 'content'
  main.appendChild(createHero())
  main.appendChild(createShowcaseBanner())
  main.appendChild(createCareer())
  main.appendChild(createAchievements())
  main.appendChild(createStats())
  main.appendChild(await createGallery())

  wrapper.appendChild(main)
  wrapper.appendChild(createFooter())

  app.appendChild(wrapper)

  bindTiltEffect()

  const tbtn = document.getElementById('themeToggle')
  if(tbtn){ tbtn.addEventListener('click', ()=>{ document.documentElement.classList.toggle('light') }) }
}

mount()
