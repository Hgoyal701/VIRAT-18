// Theme presets: 'arg' = Argentinian blue, 'india' = India/RCB
function applyTheme(name){
  document.documentElement.classList.remove('theme-arg','theme-india');
  if(name === 'arg') document.documentElement.classList.add('theme-arg');
  if(name === 'india') document.documentElement.classList.add('theme-india');
  localStorage.setItem('siteTheme', name);
}
document.getElementById('themeToggle')?.addEventListener('click', ()=>{
  const cur = localStorage.getItem('siteTheme') || 'arg';
  const next = cur === 'arg' ? 'india' : 'arg';
  applyTheme(next);
});
document.addEventListener('DOMContentLoaded', ()=> {
  applyTheme(localStorage.getItem('siteTheme') || 'arg');
});
