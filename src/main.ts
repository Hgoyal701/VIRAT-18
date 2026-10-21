import './styles.css'
import metadata from '../metadata.json'

const gallery: string[] = Array.isArray((metadata as any).gallery) ? (metadata as any).gallery : []

const FALLBACKS = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505842465776-3d1a1d1a1a1a?auto=format&fit=crop&w=800&q=80'
]

function createCanvasBG() {
  const existing = document.getElementById('bgCanvas') as HTMLCanvasElement | null
  if (existing) return

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
  let w = 0
  let h = 0
  const DPR = Math.max(1, window.devicePixelRatio || 1)

  const blobs: Array<{ x: number; y: number; vx: number; vy: number; r: number; color: string; phase: number }> = []
  const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = []

  let mouseX = 0
  let mouseY = 0
  const parallaxFactor = 30

  function resize() {
    w = Math.max(320, window.innerWidth)
    h = Math.max(320, window.innerHeight)
    canvas.width = Math.floor(w * DPR)
    canvas.height = Math.floor(h * DPR)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
  }

  function init() {
    blobs.length = 0
    particles.length = 0

    const bcount = Math.max(3, Math.round((w * h) / 600000))
    const palette = ['rgba(217,28,38,0.38)', 'rgba(242,199,110,0.28)', 'rgba(255,255,255,0.12)', 'rgba(255,61,77,0.24)']
    for (let i = 0; i < bcount; i++) {
      blobs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.max(w, h) * (0.18 + Math.random() * 0.18),
        color: palette[i % palette.length],
        phase: Math.random() * Math.PI * 2
      })
    }

    const pcount = Math.round((w * h) / 80000)
    for (let i = 0; i < pcount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.4
      })
    }
  }

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
  })

  window.addEventListener('resize', () => {
    resize()
    init()
  })

  resize()
  init()

  let t = 0

  function draw() {
    t += 0.01
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'screen'

    for (const blob of blobs) {
      blob.x += blob.vx + Math.sin(t + blob.phase) * 0.05
      blob.y += blob.vy + Math.cos(t + blob.phase) * 0.05

      if (blob.x < -blob.r) blob.x = w + blob.r
      if (blob.x > w + blob.r) blob.x = -blob.r
      if (blob.y < -blob.r) blob.y = h + blob.r
      if (blob.y > h + blob.r) blob.y = -blob.r

      const px = ((mouseX - w / 2) / w) * parallaxFactor
      const py = ((mouseY - h / 2) / h) * parallaxFactor
      const gradient = ctx.createRadialGradient(blob.x + px, blob.y + py, blob.r * 0.05, blob.x + px, blob.y + py, blob.r)

      try {
        gradient.addColorStop(0, blob.color.replace(/,[^,]+\)/, ',1)'))
        gradient.addColorStop(0.25, blob.color)
        gradient.addColorStop(1, blob.color.replace(/,[^,]+\)/, ',0)'))
      } catch {
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, blob.color)
      }

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(blob.x + px, blob.y + py, blob.r, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalCompositeOperation = 'lighter'
    for (const particle of particles) {
      particle.x += particle.vx
      particle.y += particle.vy
      if (particle.x < 0) particle.x = w
      if (particle.x > w) particle.x = 0
      if (particle.y < 0) particle.y = h
      if (particle.y > h) particle.y = 0
    }

    ctx.lineWidth = 0.6
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i]
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d = Math.sqrt(dx * dx + dy * dy)

        if (d < 120) {
          ctx.beginPath()
          const alpha = (1 - d / 120) * 0.08
          ctx.strokeStyle = `rgba(242,199,110,${alpha.toFixed(3)})`
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    for (const particle of particles) {
      ctx.beginPath()
      ctx.fillStyle = 'rgba(255,255,255,0.95)'
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalCompositeOperation = 'source-over'
    requestAnimationFrame(draw)
  }

  draw()
}

function createSidebar() {
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
    <button id="themeToggle" class="theme-btn" aria-label="Toggle theme">🌙</button>
  `
  return aside
}

function createHero() {
  const section = document.createElement('section')
  section.id = 'home'
  section.className = 'hero'

  const heroImg = gallery[0] || FALLBACKS[0]

  section.innerHTML = `
    <div class="hero-text">
      <div class="status-row">
        <span class="status-pill">Official Player Profile</span>
        <span class="status-pill muted">RCB • India</span>
      </div>
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

function createShowcaseBanner() {
  const sec = document.createElement('section')
  sec.className = 'showcase-banner'
  sec.innerHTML = `
    <div class="showcase-shell">
      <div class="showcase-copy">
        <p class="mini-kicker">Legacy in red & blue</p>
        <h3>RCB fire meets Indian pride</h3>
        <p>Half red RCB intensity. Half Indian jersey passion. One bat-wielding legend built for the big stage, celebrated for fearless chasing and elite consistency.</p>
      </div>
      <div class="split-jersey" aria-label="Virat Kohli jersey split design">
        <div class="half half-red"><span>RCB</span></div>
        <div class="half half-blue"><span>IND</span></div>
        <div class="crest">VK</div>
      </div>
    </div>
  `
  return sec
}

function createCareer() {
  const events = [
    {
      year: '2006',
      label: 'Junior Breakthrough',
      title: 'U19 India and early promise',
      description: 'Virat Kohli emerged as a standout youth prospect, showing rare temperament, technical control, and a fearless hunger to score at all times.'
    },
    {
      year: '2008',
      label: 'International Debut',
      title: 'India call-up',
      description: 'He made his international debut and began a steady climb toward becoming one of India’s most dependable batsmen across all formats.'
    },
    {
      year: '2011',
      label: 'World Cup Impact',
      title: 'ICC Cricket World Cup',
      description: 'Kohli’s sharp strokeplay and calm under pressure helped India’s campaign, becoming a symbol of confidence in the batting order.'
    },
    {
      year: '2013',
      label: 'Global Star',
      title: 'The modern batting era',
      description: 'He turned into a world-class run machine, setting the standard for chasing, consistency, and high-value ODI innings.'
    },
    {
      year: '2016',
      label: 'Captaincy',
      title: 'India Test captaincy era',
      description: 'Kohli transformed India into a more fearless and intense side, leading with personality, aggression, and a relentless drive to win.'
    },
    {
      year: '2018',
      label: 'BGT Masterclass',
      title: 'Australia heroics',
      description: 'His performances in difficult overseas conditions cemented his reputation as an elite red-ball batter and a pressure-proof match-winner.'
    },
    {
      year: '2021',
      label: 'T20 Leadership',
      title: 'Chase specialist era',
      description: 'He remained one of the most feared T20 batters in the world, combining power, technique, and game awareness to control chases.'
    },
    {
      year: '2022',
      label: 'Record Breaker',
      title: 'Run-scoring dominance',
      description: 'Kohli continued to dominate the international scene with a blend of tempo, elegance, and unmatched consistency in high-pressure moments.'
    },
    {
      year: '2025',
      label: 'Legend Status',
      title: 'Modern cricket great',
      description: 'His legacy is firmly established as one of the greatest modern batsmen, admired for fitness, hunger, and match-winning brilliance.'
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

function createAchievements() {
  const sec = document.createElement('section')
  sec.id = 'achievements'
  sec.className = 'section'
  sec.innerHTML = `
    <div class="section-heading">
      <p class="section-tag">Recognition</p>
      <h2>Achievements</h2>
    </div>
    <div class="cards">
      <div class="card"><h3>ICC Awards</h3><p>Multiple ICC Player of the Year and ODI of the Year accolades across his career.</p></div>
      <div class="card"><h3>Centuries</h3><p>One of the most prolific century scorers in world cricket with elite consistency across formats.</p></div>
      <div class="card"><h3>Records</h3><p>Fastest to several major ODI and international milestones, breaking records with a bat in hand.</p></div>
      <div class="card"><h3>Captaincy</h3><p>Led India with relentless ambition, fearless intent, and a strong winning mentality.</p></div>
    </div>
  `
  return sec
}

function createStats() {
  const s = document.createElement('section')
  s.id = 'stats'
  s.className = 'section'

  s.innerHTML = `
    <div class="section-heading">
      <p class="section-tag">Performance Snapshot</p>
      <h2>Career Stats</h2>
    </div>

    <div class="filter-bar" aria-label="Career filters">
      <button class="filter-btn active" data-filter="all" type="button">All</button>
      <button class="filter-btn" data-filter="Tests" type="button">Tests</button>
      <button class="filter-btn" data-filter="ODIs" type="button">ODIs</button>
      <button class="filter-btn" data-filter="T20Is" type="button">T20Is</button>
      <button class="filter-btn" data-filter="IPL" type="button">IPL</button>
    </div>

    <div class="stats-grid">
      <div class="stat-box" data-format="all">
        <span class="num" id="runsCount">0</span>
        <label>International Runs</label>
      </div>
      <div class="stat-box" data-format="all">
        <span class="num" id="centuriesCount">0</span>
        <label>International 100s</label>
      </div>
      <div class="stat-box" data-format="all">
        <span class="num" id="odisCount">0</span>
        <label>ODIs Played</label>
      </div>
      <div class="stat-box" data-format="Tests">
        <span class="num" id="testsMatches">0</span>
        <label>Test Matches</label>
      </div>
      <div class="stat-box" data-format="ODIs">
        <span class="num" id="odisMatches">0</span>
        <label>ODI Matches</label>
      </div>
      <div class="stat-box" data-format="T20Is">
        <span class="num" id="t20Matches">0</span>
        <label>T20I Matches</label>
      </div>
      <div class="stat-box" data-format="IPL">
        <span class="num" id="iplMatches">0</span>
        <label>IPL Matches</label>
      </div>
    </div>

    <div class="format-table">
      <table>
        <thead>
          <tr><th>Format</th><th>Matches</th><th>Runs</th><th>Avg</th><th>100s</th></tr>
        </thead>
        <tbody>
          <tr data-format-row="Tests"><td>Tests</td><td id="testsMatchesRow"></td><td id="testsRuns"></td><td id="testsAvg"></td><td id="tests100s"></td></tr>
          <tr data-format-row="ODIs"><td>ODIs</td><td id="odisMatchesRow"></td><td id="odisRuns"></td><td id="odisAvg"></td><td id="odis100s"></td></tr>
          <tr data-format-row="T20Is"><td>T20Is</td><td id="t20MatchesRow"></td><td id="t20Runs"></td><td id="t20Avg"></td><td id="t20100s"></td></tr>
          <tr data-format-row="IPL"><td>IPL</td><td id="iplMatchesRow"></td><td id="iplRuns"></td><td id="iplAvg"></td><td id="ipl100s"></td></tr>
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
      const iv = setInterval(() => {
        start += step
        if (start >= to) {
          el.textContent = String(to)
          clearInterval(iv)
        } else {
          el.textContent = String(start)
        }
      }, 16)
    }

    animate('runsCount', stats.internationalRuns || 0)
    animate('centuriesCount', stats.internationalCenturies || 0)
    animate('odisCount', stats.odisPlayed || 0)

    const fill = (id: string, value: any) => {
      const el = document.getElementById(id)
      if (el) el.textContent = String(value ?? '-')
    }

    fill('testsMatches', stats.tests?.matches)
    fill('testsMatchesRow', stats.tests?.matches)
    fill('testsRuns', stats.tests?.runs)
    fill('testsAvg', stats.tests?.avg)
    fill('tests100s', stats.tests?.hundreds)

    fill('odisMatches', stats.odis?.matches)
    fill('odisMatchesRow', stats.odis?.matches)
    fill('odisRuns', stats.odis?.runs)
    fill('odisAvg', stats.odis?.avg)
    fill('odis100s', stats.odis?.hundreds)

    fill('t20Matches', stats.t20is?.matches)
    fill('t20MatchesRow', stats.t20is?.matches)
    fill('t20Runs', stats.t20is?.runs)
    fill('t20Avg', stats.t20is?.avg)
    fill('t20100s', stats.t20is?.hundreds)

    fill('iplMatches', 252)
    fill('iplMatchesRow', 252)
    fill('iplRuns', 8164)
    fill('iplAvg', 38.67)
    fill('ipl100s', 8)
  }

  setTimeout(fillStats, 50)

  return s
}

async function createGallery() {
  const sec = document.createElement('section')
  sec.id = 'gallery'
  sec.className = 'section'
  sec.innerHTML = `<div class="section-heading"><p class="section-tag">Visual Story</p><h2>Gallery</h2></div>`

  const grid = document.createElement('div')
  grid.className = 'gallery-grid'

  const checkImage = (url: string) => new Promise<string | null>((resolve) => {
    const img = new Image()
    img.onload = () => resolve(url)
    img.onerror = () => resolve(null)
    img.src = url
  })

  const imgsToUse: string[] = []

  for (let i = 0; i < Math.max(gallery.length, FALLBACKS.length); i++) {
    const candidate = gallery[i] || FALLBACKS[i % FALLBACKS.length]
    try {
      const ok = await checkImage(candidate)
      if (ok) {
        imgsToUse.push(ok)
      } else {
        imgsToUse.push(FALLBACKS[i % FALLBACKS.length])
      }
    } catch {
      imgsToUse.push(FALLBACKS[i % FALLBACKS.length])
    }
  }

  imgsToUse.forEach((src, idx) => {
    const card = document.createElement('figure')
    card.className = 'gallery-item'

    const img = document.createElement('img')
    img.src = src
    img.alt = `Virat Kohli gallery ${idx + 1}`

    const fig = document.createElement('figcaption')
    fig.textContent = idx % 2 === 0 ? 'Elite performance' : 'Legacy moments'

    card.appendChild(img)
    card.appendChild(fig)
    grid.appendChild(card)
  })

  sec.appendChild(grid)
  return sec
}

function createFooter() {
  const footer = document.createElement('footer')
  footer.className = 'site-footer'
  footer.innerHTML = `<div>crafted with ⚡ by <span class="credit">Dodo</span></div>`
  return footer
}

function bindTiltEffect() {
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

function bindFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn')
  const statBoxes = document.querySelectorAll('.stat-box')
  const rows = document.querySelectorAll('[data-format-row]')

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = (button as HTMLElement).dataset.filter || 'all'

      filterButtons.forEach((item) => item.classList.toggle('active', item === button))

      statBoxes.forEach((box) => {
        const format = (box as HTMLElement).dataset.format || 'all'
        const shouldShow = filter === 'all' || format === filter
        ;(box as HTMLElement).style.display = shouldShow ? '' : 'none'
      })

      rows.forEach((row) => {
        const format = (row as HTMLElement).dataset.formatRow || 'all'
        ;(row as HTMLElement).style.display = filter === 'all' || format === filter ? '' : 'none'
      })
    })
  })
}

async function mount() {
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
  bindFilters()

  const themeToggle = document.getElementById('themeToggle')
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('light')
    })
  }
}

mount()
