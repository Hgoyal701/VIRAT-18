import './styles.css'
import metadata from '../metadata.json'

// Using remote image URLs from metadata so build doesn't fail when local assets are absent
const gallery: string[] = Array.isArray((metadata as any).gallery) ? (metadata as any).gallery : []

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

  const heroImg = gallery[0] || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'

  section.innerHTML = `
    <div class="hero-text">
      <p class="eyebrow">THE CHASE MASTER</p>
      <h1>${(metadata as any).hero.headline}</h1>
      <p>${(metadata as any).hero.tagline}</p>
      <div class="cta-row">
        <a href="#stats" class="primary-btn">View Stats</a>
        <a href="#career" class="secondary-btn">Career Timeline</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="player-card">
        <img id="heroImg" src="${heroImg}" alt="player" />
      </div>
    </div>
  `
  return section
}

function createCareer(){
  const sec = document.createElement('section')
  sec.id = 'career'
  sec.className = 'section'
  sec.innerHTML = `
    <h2>Career Timeline</h2>
    <div class="timeline">
      <div class="timeline-item"><span>2006</span><p>ODI debut for India</p></div>
      <div class="timeline-item"><span>2008</span><p>International breakthrough</p></div>
      <div class="timeline-item"><span>2011</span><p>Important World Cup role</p></div>
      <div class="timeline-item"><span>2013</span><p>Backbone of India’s batting</p></div>
      <div class="timeline-item"><span>2016</span><p>Historic Test performances & captaincy</p></div>
      <div class="timeline-item"><span>2018+</span><p>Peak form across formats</p></div>
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

  // fill numbers from metadata with a small animate counter
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

function createGallery(){
  const sec = document.createElement('section')
  sec.id = 'gallery'
  sec.className = 'section'
  sec.innerHTML = `<h2>Gallery</h2>`
  const grid = document.createElement('div')
  grid.className = 'gallery-grid'

  const fallback = [
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'
  ]

  const imgs = gallery.length ? gallery : fallback

  imgs.forEach((src)=>{
    const img = document.createElement('img')
    img.src = src
    img.alt = 'player'
    grid.appendChild(img)
  })

  sec.appendChild(grid)
  return sec
}

function mount(){
  const app = document.getElementById('app')!
  app.innerHTML = ''
  const wrapper = document.createElement('div')
  wrapper.className = 'app'

  wrapper.appendChild(createSidebar())

  const main = document.createElement('main')
  main.className = 'content'
  main.appendChild(createHero())
  main.appendChild(createCareer())
  main.appendChild(createAchievements())
  main.appendChild(createStats())
  main.appendChild(createGallery())

  wrapper.appendChild(main)
  app.appendChild(wrapper)

  // theme toggle (very small)
  document.getElementById('themeToggle')!.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('light')
  })
}

mount()
