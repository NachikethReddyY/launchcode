const menuBtn = document.getElementById('menuBtn');
    const glassCard = document.getElementById('glassCard');
    const links = glassCard.querySelectorAll('a');
    let isOpen = false;

    // --- CHANGE: Make menuBtn always stay at top right of glassCard and allow pointer events ---
    menuBtn.style.position = 'absolute';
    menuBtn.style.top = '15px';
    menuBtn.style.right = '15px';
    menuBtn.style.zIndex = '10';
    menuBtn.style.pointerEvents = 'auto'; // CHANGE: Enable pointer events for the icon itself

    // --- CHANGE: Only toggle menu on menuBtn click, not glassCard ---
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (!isOpen) {
        menuBtn.classList.add('menu-open');
        gsap.to(glassCard, {
          width: '300px',
          height: '360px',
          borderRadius: '20px',
          duration: 0.4,
          ease: 'power2.out',
          onStart: () => glassCard.classList.add('open'),
          onComplete: () => {
            gsap.to(links, { opacity: 1, stagger: 0.1 });
          }
        });
      } else {
        gsap.to(links, {
          opacity: 0,
          duration: 0.2
        });
        gsap.to(glassCard, {
          width: '60px',
          height: '60px',
          borderRadius: '60px',
          duration: 0.3,
          ease: 'power2.in',
          onStart: () => menuBtn.classList.remove('menu-open'),
          onComplete: () => {
            glassCard.classList.remove('open');
          }
        });
      }
      isOpen = !isOpen;
    });

    // Animated underline for nav links (desktop)
    document.addEventListener('DOMContentLoaded', function() {
      const navLinks = document.querySelectorAll('.nav-links .nav-item');
      const underline = document.getElementById('navUnderline');
      if (!navLinks.length || !underline) return;

      function moveUnderline(target) {
        const rect = target.getBoundingClientRect();
        const parentRect = target.parentElement.getBoundingClientRect();
        underline.style.left = (rect.left - parentRect.left) + 'px';
        underline.style.width = rect.width + 'px';
      }

      navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
          moveUnderline(link);
        });
        link.addEventListener('focus', function() {
          moveUnderline(link);
        });
      });
      document.querySelector('.nav-links').addEventListener('mouseleave', function() {
        underline.style.width = 0;
      });
    });