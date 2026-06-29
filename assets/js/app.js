/**
 * FreeCAD voor Radioamateurs — WLD ON6WL
 * i18n · Profielen (tot 5) · Voortgang per profiel · Interactiviteit
 */
'use strict';

const STORAGE_KEY = 'freecad_cursus';
const TOTAL_CHAPTERS = 23;
const MAX_PROFILES = 5;

/* ── State met profielen ────────────────────────────────── */
function fcLoad(){
  let s={};
  try{ s=JSON.parse(localStorage.getItem(STORAGE_KEY))||{}; }catch{}
  if(!s.profiles){               // migratie van oude opzet
    s.profiles={};
    if(s.callsign){
      const done={},ts={};
      Object.keys(s).forEach(k=>{ if(k.indexOf('done_ts_')===0) ts[k.slice(8)]=s[k]; else if(k.indexOf('done_')===0) done[k.slice(5)]=s[k]; });
      s.profiles[s.callsign]={done,ts}; s.active=s.callsign;
    }
    Object.keys(s).forEach(k=>{ if(k.indexOf('done_')===0) delete s[k]; });
    delete s.callsign;
  }
  if(!s.lang) s.lang='nl';
  if(typeof s.active==='undefined') s.active=null;
  return s;
}
function fcSave(s){ try{ localStorage.setItem(STORAGE_KEY,JSON.stringify(s)); }catch{} }
function fcProfiles(){ return Object.keys(fcLoad().profiles||{}); }
function fcActive(){ return fcLoad().active; }
function fcEnsure(s,cs){ if(!s.profiles[cs]) s.profiles[cs]={done:{},ts:{}}; return s.profiles[cs]; }
function fcAddProfile(cs){ cs=(cs||'').trim().toUpperCase(); if(!cs) return false;
  const s=fcLoad();
  if(!s.profiles[cs] && Object.keys(s.profiles).length>=MAX_PROFILES) return false;
  fcEnsure(s,cs); s.active=cs; fcSave(s); return true; }
function fcSwitch(cs){ const s=fcLoad(); if(s.profiles[cs]){ s.active=cs; fcSave(s); } }
function fcDone(id){ const s=fcLoad(); return !!(s.active && s.profiles[s.active] && s.profiles[s.active].done[id]); }
function fcMarkDone(id){ const s=fcLoad(); if(!s.active) return; const p=fcEnsure(s,s.active); p.done[id]=true; p.ts[id]=Date.now(); fcSave(s); refreshAllUI(); }
function fcDoneCount(){ const s=fcLoad(); if(!s.active||!s.profiles[s.active]) return 0; return Object.values(s.profiles[s.active].done).filter(Boolean).length; }

/* ── UI-strings (zonder emoji; emoji staat in de HTML) ──── */
const T = {
  nl:{ progress:'Voortgang', completed:'voltooid', of:'van', chapters:'hoofdstukken',
    mark_done:'✓ Markeer als voltooid', marked_done:'✓ Voltooid!',
    show_solution:'▼ Toon oplossing', hide_solution:'▲ Verberg oplossing',
    prev:'← Vorige', next:'Volgende →', objectives:'Na dit hoofdstuk kun je',
    summary_title:'Samenvatting', memory_title:'Onthoud dit', key_title:'Kernregel',
    warning_title:'Let op!', tip_title:'Tip', shack_title:'In de shack', print_title:'Voor de print',
    steps_title:'Stappenplan', task_title:'Doe-opdracht', exercises_title:'Oefeningen',
    example_title:'Voorbeeld', mistakes_title:'Veelgemaakte fouten',
    overview:'Overzicht', sources:'Bronnen', switch_profile:'Wissel van profiel', new_profile:'➕ Nieuwe roepnaam' },
  fr:{ progress:'Progression', completed:'terminé(s)', of:'sur', chapters:'chapitres',
    mark_done:'✓ Marquer comme terminé', marked_done:'✓ Terminé !',
    show_solution:'▼ Voir la solution', hide_solution:'▲ Cacher la solution',
    prev:'← Précédent', next:'Suivant →', objectives:'Après ce chapitre, vous serez capable de',
    summary_title:'Résumé', memory_title:'À retenir', key_title:'Règle clé',
    warning_title:'Attention !', tip_title:'Astuce', shack_title:'En pratique', print_title:'Pour l\'impression',
    steps_title:'Procédure', task_title:'Exercice pratique', exercises_title:'Exercices',
    example_title:'Exemple', mistakes_title:'Erreurs fréquentes',
    overview:'Aperçu', sources:'Sources', switch_profile:'Changer de profil', new_profile:'➕ Nouvel indicatif' },
  en:{ progress:'Progress', completed:'completed', of:'of', chapters:'chapters',
    mark_done:'✓ Mark as completed', marked_done:'✓ Completed!',
    show_solution:'▼ Show solution', hide_solution:'▲ Hide solution',
    prev:'← Previous', next:'Next →', objectives:'After this chapter you will be able to',
    summary_title:'Summary', memory_title:'Remember this', key_title:'Key rule',
    warning_title:'Watch out!', tip_title:'Tip', shack_title:'In the shack', print_title:'For printing',
    steps_title:'Step-by-step', task_title:'Hands-on task', exercises_title:'Exercises',
    example_title:'Example', mistakes_title:'Common mistakes',
    overview:'Overview', sources:'Sources', switch_profile:'Switch profile', new_profile:'➕ New callsign' }
};

const CHAPTER_TITLES = {
  nl:{h01:'Wat is FreeCAD & installeren',h02:'Eerste start: voorkeuren & navigatie',h03:'Navigeren in 3D & de feature-boom',h04:'Je eerste schets (Sketcher)',h05:'Volledig bepaalde schets',h06:'Van schets naar bakje + STL-export',h07:'Parametrisch wijzigen',h08:'Constraints in de diepte',h09:'Uitsparingen & gaten',h10:'Afronden & afkanten (fillet/chamfer)',h11:'Externe geometrie',h12:'Deksel: tolerantie & passing',h13:'Patronen & spiegelen',h14:'Hulpvlakken (datum planes)',h15:'Meerdelige behuizingen (multi-body)',h16:'Ontwerpen voor 3D-print (DfAM)',h17:'Frontpaneel met tekst',h18:'Sweep & pipe',h19:'Robuust modelleren & topological naming',h20:'Spreadsheets & parameters',h21:'Varianten & configuraties',h22:'History bewerken & fouten herstellen',h23:'Mesh, STL-controle & slicer'},
  fr:{h01:'Qu\'est-ce que FreeCAD & installation',h02:'Premier lancement : préférences & navigation',h03:'Naviguer en 3D & l\'arbre des fonctions',h04:'Votre premier croquis (Sketcher)',h05:'Croquis entièrement contraint',h06:'Du croquis au boîtier + export STL',h07:'Modification paramétrique',h08:'Les contraintes en profondeur',h09:'Évidements & perçages',h10:'Congés & chanfreins',h11:'Géométrie externe',h12:'Couvercle : tolérance & ajustement',h13:'Répétitions & symétrie',h14:'Plans de référence',h15:'Boîtiers multi-corps',h16:'Conception pour impression 3D (DfAM)',h17:'Façade avec texte',h18:'Balayage & conduite',h19:'Modélisation robuste & topological naming',h20:'Feuilles de calcul & paramètres',h21:'Variantes & configurations',h22:'Modifier l\'historique & corriger les erreurs',h23:'Maillage, contrôle STL & slicer'},
  en:{h01:'What is FreeCAD & installing',h02:'First launch: preferences & navigation',h03:'Navigating in 3D & the feature tree',h04:'Your first sketch (Sketcher)',h05:'Fully constrained sketch',h06:'From sketch to box + STL export',h07:'Parametric editing',h08:'Constraints in depth',h09:'Pockets & holes',h10:'Fillets & chamfers',h11:'External geometry',h12:'Lid: tolerance & fit',h13:'Patterns & mirroring',h14:'Datum planes',h15:'Multi-body enclosures',h16:'Design for 3D printing (DfAM)',h17:'Front panel with text',h18:'Sweep & pipe',h19:'Robust modelling & topological naming',h20:'Spreadsheets & parameters',h21:'Variants & configurations',h22:'Editing history & fixing errors',h23:'Mesh, STL checking & slicer'}
};
const DEEL_TITLES = {
  nl:{1:'Niveau 1 — Basis',2:'Niveau 2 — Medior',3:'Niveau 3 — Gevorderd',4:'Niveau 4 — Expert'},
  fr:{1:'Niveau 1 — Base',2:'Niveau 2 — Médior',3:'Niveau 3 — Avancé',4:'Niveau 4 — Expert'},
  en:{1:'Level 1 — Basics',2:'Level 2 — Medior',3:'Level 3 — Advanced',4:'Level 4 — Expert'}
};

let currentLang='nl';

function setLang(lang){
  currentLang=lang; const s=fcLoad(); s.lang=lang; fcSave(s);
  document.querySelectorAll('.lang-block').forEach(el=>el.classList.toggle('active', el.dataset.lang===lang));
  document.querySelectorAll('.lang-switch-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.dataset.i18n; if(T[lang]&&T[lang][k]!=null) el.textContent=T[lang][k]; });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{ const k=el.dataset.i18nPh; if(T[lang]&&T[lang][k]!=null) el.placeholder=T[lang][k]; });
  document.documentElement.lang=lang;
  buildProfileSwitcher();
  if(typeof renderSidebar==='function'){ const a=document.querySelector('.app-sidebar'); if(a){ const act=a.getAttribute('data-active')||null; renderSidebar(act); } }
}

function refreshAllUI(){
  const done=fcDoneCount(); const pct=Math.round((done/TOTAL_CHAPTERS)*100);
  document.querySelectorAll('.header-progress-fill').forEach(el=>el.style.width=pct+'%');
  document.querySelectorAll('.header-progress-done').forEach(el=>el.textContent=done+' / '+TOTAL_CHAPTERS);
  const circle=document.querySelector('.progress-circle');
  if(circle){ circle.style.background=`conic-gradient(var(--teal) ${pct*3.6}deg, var(--bg-light) 0deg)`;
    const p=circle.querySelector('.progress-pct'); if(p) p.textContent=pct+'%'; }
  document.querySelectorAll('.progress-bar-fill').forEach(el=>el.style.width=pct+'%');
  document.querySelectorAll('.progress-count').forEach(el=>{ el.textContent=done+' '+T[currentLang].of+' '+TOTAL_CHAPTERS+' '+T[currentLang].completed; });
  document.querySelectorAll('[data-chid]').forEach(el=>{ const id=el.dataset.chid;
    const c=el.querySelector('.card-status-done'); if(c) c.style.display=fcDone(id)?'block':'none';
    const s=el.querySelector('.nav-status'); if(s && fcDone(id)){ s.classList.add('done'); s.textContent='✓'; } });
  const btn=document.getElementById('btn-complete');
  if(btn){ const id=btn.dataset.chid;
    if(fcDone(id)){ btn.textContent=T[currentLang].marked_done; btn.classList.add('done'); }
    else { btn.textContent=T[currentLang].mark_done; btn.classList.remove('done'); } }
}

/* ── Profielwisselaar bovenaan ──────────────────────────── */
function loginHref(){ return location.pathname.includes('/chapters/') ? '../login.html' : 'login.html'; }
function buildProfileSwitcher(){
  const el=document.getElementById('hCallsign'); if(!el) return;
  const s=fcLoad(); const active=s.active; const profs=Object.keys(s.profiles||{});
  if(!active){ el.textContent='—'; return; }
  el.innerHTML = active + ' <span class="cs-caret">▾</span>';
  el.classList.add('has-menu');
  let menu=document.getElementById('callsign-menu');
  if(menu) menu.remove();
  menu=document.createElement('div'); menu.id='callsign-menu'; menu.className='callsign-menu';
  let html='<div class="cs-menu-label">'+T[currentLang].switch_profile+'</div>';
  profs.forEach(cs=>{ const done=Object.values(s.profiles[cs].done||{}).filter(Boolean).length;
    html+='<button class="cs-menu-item'+(cs===active?' active':'')+'" data-cs="'+cs+'"><span>'+cs+'</span><span class="cs-prog">'+done+'/'+TOTAL_CHAPTERS+'</span></button>'; });
  html+='<a class="cs-menu-new" href="'+loginHref()+'">'+T[currentLang].new_profile+'</a>';
  menu.innerHTML=html;
  el.parentNode.appendChild(menu);
  el.onclick=(e)=>{ e.stopPropagation(); menu.classList.toggle('open'); };
  menu.querySelectorAll('.cs-menu-item').forEach(b=>b.addEventListener('click',function(){ fcSwitch(this.dataset.cs); location.reload(); }));
  document.addEventListener('click',()=>menu.classList.remove('open'));
}

/* ── Interactiviteit ────────────────────────────────────── */
function initSolutionToggles(){
  document.querySelectorAll('.solution-btn').forEach(btn=>{
    btn.addEventListener('click',function(){ const t=document.getElementById(this.dataset.target); if(!t)return;
      const v=t.classList.toggle('visible'); this.textContent=v?T[currentLang].hide_solution:T[currentLang].show_solution; });
  });
}
function initCompleteBtn(){
  const btn=document.getElementById('btn-complete'); if(!btn)return;
  btn.addEventListener('click',function(){ fcMarkDone(this.dataset.chid);
    this.style.transform='scale(1.06)'; setTimeout(()=>this.style.transform='',300); });
}
function initMobileMenu(){
  const t=document.getElementById('menu-toggle'); const sb=document.querySelector('.app-sidebar'); if(!t||!sb)return;
  t.addEventListener('click',e=>{ e.stopPropagation(); sb.classList.toggle('open'); });
  document.addEventListener('click',e=>{ if(sb.classList.contains('open')&&!sb.contains(e.target)&&e.target!==t) sb.classList.remove('open'); });
}
function guard(){ if(!fcActive()){ window.location.href=loginHref(); return false; } return true; }

document.addEventListener('DOMContentLoaded',()=>{
  if(!location.pathname.endsWith('login.html')){ if(!guard()) return; }
  currentLang=fcLoad().lang||'nl';
  setLang(currentLang); initSolutionToggles(); initCompleteBtn(); initMobileMenu(); refreshAllUI();
  document.querySelectorAll('.lang-switch-btn').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
});
