import './styles.css'
import metadata from '../metadata.json'

// Images are referenced via metadata.gallery; import them so Vite bundles them
import image1 from './assets/image1.jpg'
import image2 from './assets/image2.jpg'
import image3 from './assets/image3.jpg'

const images = [image1, image2, image3]

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

  section.innerHTML = `
    <div class="hero-text">
      <p class="eyebrow">THE CHASE MASTER</p>
      <h1>${metadata.hero.headline}</h1>
      <p>${metadata.hero.tagline}</p>
      <div class="cta-row">
        <a href="#stats" class="primary-btn">View Stats</a>
        <a href="#career" class="secondary-btn">Career Timeline</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="player-card">
        <img id="heroImg" src="${images[0]}" alt="player" />
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
  // fill numbers from metadata
  setTimeout(()=>{
    (document.getElementById('runsCount') as HTMLElement).textContent = String(metadata.stats.internationalRuns)
    (document.getElementById('centuriesCount') as HTMLElement).textContent = String(metadata.stats.internationalCenturies)
    (document.getElementById('odisCount') as HTMLElement).textContent = String(metadata.stats.odisPlayed)

    (document.getElementById('testsMatches') as HTMLElement).textContent = String(metadata.stats.tests.matches)
    (document.getElementById('testsRuns') as HTMLElement).textContent = String(metadata.stats.tests.runs)
    (document.getElementById('testsAvg') as HTMLElement).textContent = String(metadata.stats.tests.avg)
    (document.getElementById('tests100s') as HTMLElement).textContent = String(metadata.stats.tests.hundreds)

    (document.getElementById('odisMatches') as HTMLElement).textContent = String(metadata.stats.odis.matches)
    (document.getElementById('odisRuns') as HTMLElement).textContent = String(metadata.stats.odis.runs)
    (document.getElementById('odisAvg') as HTMLElement).textContent = String(metadata.stats.odis.avg)
    (document.getElementById('odis100s') as HTMLElement).textContent = String(metadata.stats.odis.hundreds)

    (document.getElementById('t20Matches') as HTMLElement).textContent = String(metadata.stats.t20is.matches)
    (document.getElementById('t20Runs') as HTMLElement).textContent = String(metadata.stats.t20is.runs)
    (document.getElementById('t20Avg') as HTMLElement).textContent = String(metadata.stats.t20is.avg)
    (document.getElementById('t20100s') as HTMLElement).textContent = String(metadata.stats.t20is.hundreds)

  }, 0)

  return s
}

function createGallery(){
  const sec = document.createElement('section')
  sec.id = 'gallery'
  sec.className = 'section'
  sec.innerHTML = `<h2>Gallery</h2>`
  const grid = document.createElement('div')
  grid.className = 'gallery-grid'

  images.forEach((src)=>{
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
