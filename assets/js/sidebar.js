/** FreeCAD voor Radioamateurs — Sidebar builder (per-profiel voortgang) */
const CHAPTER_FILES = {
  h01:'h01-wat-is-freecad.html',h02:'h02-eerste-start.html',h03:'h03-navigeren-3d.html',h04:'h04-eerste-schets.html',h05:'h05-volledig-bepaald.html',h06:'h06-bakje-export-stl.html',
  h07:'h07-parametrisch-wijzigen.html',h08:'h08-constraints.html',h09:'h09-uitsparingen-gaten.html',h10:'h10-fillet-chamfer.html',h11:'h11-externe-geometrie.html',h12:'h12-deksel-tolerantie.html',
  h13:'h13-patronen-spiegelen.html',h14:'h14-hulpvlakken.html',h15:'h15-multibody.html',h16:'h16-dfam.html',h17:'h17-frontpaneel-tekst.html',h18:'h18-sweep-pipe.html',
  h19:'h19-robuust-topological-naming.html',h20:'h20-spreadsheets.html',h21:'h21-varianten.html',h22:'h22-history-fouten.html',h23:'h23-mesh-stl-slicer.html'
};
const SIDEBAR_CHAPTERS = [
  { deel:1, chapters:['h01','h02','h03','h04','h05','h06'] },
  { deel:2, chapters:['h07','h08','h09','h10','h11','h12'] },
  { deel:3, chapters:['h13','h14','h15','h16','h17','h18'] },
  { deel:4, chapters:['h19','h20','h21','h22','h23'] },
];
function renderSidebar(activeId){
  const s=fcLoad(); const lang=s.lang||'nl';
  const prof=(s.active && s.profiles[s.active])?s.profiles[s.active]:{done:{}};
  const inChapters=window.location.pathname.includes('/chapters/');
  const base=inChapters?'../':'';
  let html='';
  SIDEBAR_CHAPTERS.forEach(section=>{
    const dTitle=(DEEL_TITLES[lang]||DEEL_TITLES.nl)[section.deel];
    html+=`<div class="sidebar-section"><div class="sidebar-section-label"><span class="sidebar-section-num">0${section.deel}</span>${dTitle}</div><ul class="sidebar-nav">`;
    section.chapters.forEach(id=>{
      const title=(CHAPTER_TITLES[lang]||CHAPTER_TITLES.nl)[id]||id;
      const num=id.replace('h','H');
      const done=!!prof.done[id];
      const isActive=id===activeId;
      const href=`${base}chapters/${CHAPTER_FILES[id]||(id+'.html')}`;
      const statusIcon=done?'<span class="nav-status done">✓</span>':`<span class="nav-status${isActive?' active':''}"></span>`;
      html+=`<li data-chid="${id}"><a href="${href}"${isActive?' class="active"':''}><span class="nav-ch-num">${num}</span><span>${title}</span>${statusIcon}</a></li>`;
    });
    html+=`</ul></div>`;
  });
  const refLabel={nl:'Sneltoetsen-spiekfiche',fr:'Aide-mémoire raccourcis',en:'Shortcuts cheat sheet'}[lang]||'Sneltoetsen';
  html+=`<div class="sidebar-section"><div class="sidebar-section-label" style="color:var(--teal);border-color:rgba(0,180,204,.3)"><span class="sidebar-section-num" style="background:rgba(0,180,204,.12);color:var(--teal)">⌨</span>Referentie</div><ul class="sidebar-nav"><li><a href="${base}sneltoetsen.html"><span class="nav-ch-num" style="color:var(--teal)">⌨</span><span>${refLabel}</span></a></li></ul></div>`;
  const srcLabel={nl:'Bronnen & licenties',fr:'Sources & licences',en:'Sources & licences'}[lang]||'Bronnen';
  html+=`<div class="sidebar-section"><div class="sidebar-section-label" style="color:var(--orange);border-color:rgba(255,107,53,.3)"><span class="sidebar-section-num" style="background:rgba(255,107,53,.12);color:var(--orange)">©</span>Bronnen</div><ul class="sidebar-nav"><li><a href="${base}bronnen.html"><span class="nav-ch-num" style="color:var(--orange)">B</span><span>${srcLabel}</span></a></li></ul></div>`;
  const el=document.querySelector('.app-sidebar');
  if(el){ el.innerHTML=html; el.setAttribute('data-active', activeId||''); }
}
