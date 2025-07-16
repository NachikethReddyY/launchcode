gsap.from(".cta-buttons .glass-button", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2, // Stagger the button animations
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".cta-section",
        start: "top center+=10%",
    }
});
// ===== BUTTON RIPPLE EFFECT =====
// Adds a ripple effect when glass buttons are clicked
function addButtonRippleEffect() {
    document.querySelectorAll('.glass-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Remove any existing ripple
            const oldRipple = btn.querySelector('.ripple');
            if (oldRipple) oldRipple.remove();
            
            // Calculate position for ripple effect
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size/2;
            const y = e.clientY - rect.top - size/2;
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            btn.appendChild(ripple);
            
            // Remove ripple after animation completes
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
}
addButtonRippleEffect();

// ===== GLASS BUTTON CURSOR GLOW EFFECT =====
// Adds a yellow glow effect that follows the cursor on glass buttons
function addGlassButtonCursorGlow() {
    document.querySelectorAll('.glass-button').forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btn.style.setProperty('--glass-x', x + 'px');
            btn.style.setProperty('--glass-y', y + 'px');
        });
        
        btn.addEventListener('mouseleave', function() {
            // Reset glow position when mouse leaves
            btn.style.setProperty('--glass-x', '50%');
            btn.style.setProperty('--glass-y', '50%');
        });
    });
}
addGlassButtonCursorGlow();

// ===== GLASS BUTTON CLICK COMPRESS ANIMATION =====
document.querySelectorAll('.glass-button').forEach(btn => {
    btn.addEventListener('click', function() {
        btn.classList.add('clicked');
        // Remove .clicked immediately after next frame for instant return
        requestAnimationFrame(() => btn.classList.remove('clicked'));
    });
});