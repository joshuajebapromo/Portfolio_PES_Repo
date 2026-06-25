function switchPage(id){
  document.querySelectorAll('.page-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('[data-page]').forEach(a=>a.classList.remove('active'));
  const sec=document.getElementById(id);
  if(sec){sec.classList.add('active');window.scrollTo(0,0);}
  document.querySelectorAll('[data-page="'+id+'"]').forEach(a=>a.classList.add('active'));
}
document.querySelectorAll('[data-page]').forEach(link=>{
  link.addEventListener('click',function(e){
    e.preventDefault();
    switchPage(this.getAttribute('data-page'));
  });
});
function toggleDetail(id){
  const el=document.getElementById(id);
  if(el) el.classList.toggle('open');
}
const hint=document.getElementById('editHint');
setTimeout(()=>hint.style.opacity='0',5000);
setTimeout(()=>hint.style.display='none',5600);
