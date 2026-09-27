const gallery=document.getElementById("gallery");
const cards=[...document.querySelectorAll(".card")];
const filters=[...document.querySelectorAll(".filter")];
const empty=document.getElementById("empty");
const viewer=document.getElementById("viewer");
const viewerContent=document.getElementById("viewerContent");
const viewerCaption=document.getElementById("viewerCaption");
let visibleCards=[];
let current=0;

function applyFilter(type){
  filters.forEach(b=>b.classList.toggle("active",b.dataset.filter===type));
  visibleCards=cards.filter(c=>type==="todos"||c.dataset.type===type);
  cards.forEach(c=>c.classList.toggle("hidden",!visibleCards.includes(c)));
  empty.style.display=visibleCards.length?"none":"block";
}
filters.forEach(b=>b.addEventListener("click",()=>applyFilter(b.dataset.filter)));

function openViewer(card){
  visibleCards=cards.filter(c=>!c.classList.contains("hidden"));
  current=Math.max(0,visibleCards.indexOf(card));
  renderViewer();
  viewer.classList.add("show");
  viewer.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function renderViewer(){
  const card=visibleCards[current];
  if(!card)return;
  const type=card.dataset.type;
  const title=card.dataset.title||"";
  const img=card.querySelector("img");
  viewerContent.innerHTML="";
  if(type==="video"){
    const v=document.createElement("video");
    v.controls=true; v.autoplay=true; v.playsInline=true;
    v.src=card.dataset.src||"";
    viewerContent.appendChild(v);
  }else{
    const i=document.createElement("img");
    i.src=img.src; i.alt=img.alt;
    viewerContent.appendChild(i);
  }
  viewerCaption.textContent=title+" · "+(card.dataset.date||"");
}
cards.forEach(c=>c.addEventListener("click",()=>openViewer(c)));
document.getElementById("closeViewer").onclick=closeViewer;
function closeViewer(){viewer.classList.remove("show");viewer.setAttribute("aria-hidden","true");document.body.style.overflow="";viewerContent.innerHTML=""}
document.getElementById("prev").onclick=()=>{if(!visibleCards.length)return;current=(current-1+visibleCards.length)%visibleCards.length;renderViewer()};
document.getElementById("next").onclick=()=>{if(!visibleCards.length)return;current=(current+1)%visibleCards.length;renderViewer()};
viewer.addEventListener("click",e=>{if(e.target===viewer)closeViewer()});
document.addEventListener("keydown",e=>{if(!viewer.classList.contains("show"))return;if(e.key==="Escape")closeViewer();if(e.key==="ArrowLeft")document.getElementById("prev").click();if(e.key==="ArrowRight")document.getElementById("next").click()});

const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("nav");
menuBtn.onclick=()=>nav.classList.toggle("open");
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));

document.querySelectorAll(".moment").forEach(m=>m.addEventListener("click",()=>{
  const key=m.dataset.filterMoment;
  if(key==="2026"){applyFilter("todos");document.getElementById("galeria").scrollIntoView()}
  else {document.getElementById("galeria").scrollIntoView();applyFilter("todos")}
}));

applyFilter("todos");
