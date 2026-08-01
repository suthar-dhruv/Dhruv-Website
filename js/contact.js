/* ═══════════ CONTACT FORM ═══════════ */
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(()=>{
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#10b981)';
      form.reset();
      setTimeout(()=>{
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 2500);
    }, 1200);
  });
})();