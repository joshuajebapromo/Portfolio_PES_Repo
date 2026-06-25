function switchPage(id){
  document.querySelectorAll('.page-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('[data-page]').forEach(a=>a.classList.remove('active'));
  const sec=document.getElementById(id);
  if(sec){sec.classList.add('active');window.scrollTo(0,0);}
  document.querySelectorAll('[data-page="'+id+'"]').forEach(a=>a.classList.add('active'));
  // Reset all slide tracks to first slide when navigating
  document.querySelectorAll('.slide-track').forEach(t=>{t.style.transform='translateY(0)';});
}
document.querySelectorAll('[data-page]').forEach(link=>{
  link.addEventListener('click',function(e){
    e.preventDefault();
    switchPage(this.getAttribute('data-page'));
  });
});
function goSlide(trackId,index){
  const track=document.getElementById(trackId);
  if(track) track.style.transform='translateY('+(-index*100)+'%)';
}
function toggleDetail(id){
  const el=document.getElementById(id);
  if(!el)return;
  const isOpen=el.classList.toggle('open');
  const trigger=document.querySelector('[onclick*="\''+id+'\'"]');
  if(trigger){
    if(trigger.tagName==='BUTTON'){
      trigger.textContent=isOpen?'Close ▴':'Learn More';
    } else {
      trigger.innerHTML=isOpen?'Close &#x25B4;':'Learn More &rsaquo;';
    }
  }
}
