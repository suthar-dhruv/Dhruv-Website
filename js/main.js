
/* ═══════════ MAIN — NAV + LOADER + TYPED + LENIS ═══════════ */
(function(){
  // Loader
  addEventListener('load', ()=>{
    setTimeout(()=>document.querySelector('.loader')?.classList.add('done'), 600);
  });

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', ()=>links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>links.classList.remove('open')));
  }

  // Active page
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === page || (page==='' && href==='index.html')) a.classList.add('active');
  });

  // Typed.js
  if(window.Typed){
    const el = document.getElementById('typed');
    if(el){
      new Typed('#typed', {
        strings:[
          'Full Stack Freelancer',
          'Web Development Specialist',
          'Freelance Graphic Designer',
          'UI/UX Designer',
          'Creative Technologist'
        ],
        typeSpeed:60, backSpeed:40, backDelay:1800, loop:true
      });
    }
  }

  // Lenis smooth scroll
  if(window.Lenis){
    const lenis = new Lenis({duration:1.2, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true});
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time=>lenis.raf(time*1000));
    gsap.ticker.lagSmoothing(0);
  }
})();