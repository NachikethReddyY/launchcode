// ===== "WHAT YOU'LL DISCOVER" SECTION ANIMATIONS =====
// Animates the offering section elements with staggered timing
gsap.from(".offering-section .why-learn-icon-container", { opacity: 0, y: 30, duration: 1, delay: 1.0 });
gsap.from(".offering-heading", { opacity: 0, y: 30, duration: 1, delay: 1.2 });
gsap.from(".offering-paragraph", { opacity: 0, y: 20, duration: 1, delay: 1.4 });
gsap.from(".offering-card", {
    opacity: 0,
    y: 50,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.2, // Stagger the animation for each card
    ease: "back.out(1.7)", // A nice bouncy ease
    delay: 1.6 // Start after previous elements
});
gsap.from(".offering-buttons", { opacity: 0, y: 20, duration: 1, delay: 2.2 }); // After cards

// ===== SCROLLTRIGGER SETUP =====
// Register the ScrollTrigger plugin for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

// ===== "YOUR LEARNING JOURNEY" SECTION ANIMATIONS =====
// Animate the main heading and paragraph
gsap.from(".journey-heading", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: ".journey-section",
        start: "top center+=10%", // Trigger when section hits 10% below center
        // markers: true, // Uncomment to see trigger points
    }
});

gsap.from(".journey-paragraph", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
        trigger: ".journey-section",
        start: "top center+=10%",
    }
});

// ===== TIMELINE LINE FILL ANIMATION =====
// Animates the timeline line filling up as you scroll
gsap.to(".timeline-line-fill", {
    height: "100%", // Animate height to 100%
    ease: "none", // Linear animation for smooth filling
    scrollTrigger: {
        trigger: ".journey-timeline-wrapper",
        start: "top center", // Start filling when timeline wrapper hits center
        end: "bottom center", // End filling when timeline wrapper leaves center
        scrub: true, // Link animation directly to scroll position
        // markers: true, // Uncomment to see trigger points
    }
});

// ===== TIMELINE ITEMS ANIMATION =====
// Animates each timeline item (card and dot) individually
document.querySelectorAll(".journey-timeline-item").forEach((item, i) => {
    const card = item.querySelector(".journey-card");
    const dot = item.querySelector(".timeline-dot");

    // Animate the dot with a bouncy effect
    gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: item,
            start: "top center+=15%", // Trigger dot slightly before card
            toggleActions: "play none none reverse", // Play on enter, reverse on leave
        }
    });

    // Animate the card with conditional direction based on screen size
    gsap.to(card, {
        opacity: 1,
        // Conditional x based on screen size: always from right on mobile, alternate on desktop
        x: () => {
            if (window.matchMedia("(max-width: 767.98px)").matches) {
                return 0; // Animate from right on mobile
            } else {
                return i % 2 === 0 ? 0 : 0; // Alternate on desktop
            }
        },
        y: 0, // Slight vertical slide
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top center", // Trigger card when its top hits center of viewport
            toggleActions: "play none none reverse",
        }
    });
});

// ===== "MEET THE TEAM" SECTION ANIMATIONS =====
gsap.from(".team-heading", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: ".team-section",
        start: "top center+=10%",
        // markers: true, // Uncomment to see trigger points
    }
});

gsap.from(".team-paragraph", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
        trigger: ".team-section",
        start: "top center+=10%",
    }
});

// ===== MENTOR SECTION ANIMATIONS =====
gsap.from(".mentor-section .animated-icon", {
    opacity: 0,
    y: 30,
    scale: 0.8,
    duration: 1,
    scrollTrigger: {
        trigger: ".mentor-section",
        start: "top center+=10%",
    }
});

gsap.from(".mentor-section h2", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.2,
    scrollTrigger: {
        trigger: ".mentor-section",
        start: "top center+=10%",
    }
});

gsap.from(".mentor-section .lead", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.4,
    scrollTrigger: {
        trigger: ".mentor-section",
        start: "top center+=10%",
    }
});

gsap.from(".video-container", {
    opacity: 0,
    y: 50,
    scale: 0.9,
    duration: 1,
    delay: 0.6,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".mentor-section",
        start: "top center+=10%",
    }
});

gsap.from(".video-info", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.8,
    scrollTrigger: {
        trigger: ".mentor-section",
        start: "top center+=10%",
    }
});

// ===== "BY THE NUMBERS" STATS SECTION ANIMATIONS =====
// Removed animation for .stats-heading, .stats-paragraph, and icon as requested
// gsap.from(".stats-heading", { ... });
// gsap.from(".stats-paragraph", { ... });
// gsap.from(".stats-section .why-learn-icon-container", { ... });

gsap.from(".stats-card", {
    opacity: 0,
    y: 50,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.2, // Stagger each card animation
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".stats-section",
        start: "top center+=10%",
    }
});

// ===== TESTIMONIALS SECTION ANIMATIONS =====
gsap.from(".testimonials-heading", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top center+=10%",
    }
});

gsap.from(".testimonials-paragraph", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top center+=10%",
    }
});

gsap.from(".testimonial-card", {
    opacity: 0,
    y: 50,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.2, // Stagger each testimonial card
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top center+=10%",
    }
});

// ===== COMMUNITY SECTION ANIMATIONS =====
gsap.from(".community-section .animated-icon", {
    opacity: 0,
    y: 30,
    scale: 0.8,
    duration: 1,
    scrollTrigger: {
        trigger: ".community-section",
        start: "top center+=10%",
    }
});

gsap.from(".community-heading", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.2,
    scrollTrigger: {
        trigger: ".community-section",
        start: "top center+=10%",
    }
});

gsap.from(".community-paragraph", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.4,
    scrollTrigger: {
        trigger: ".community-section",
        start: "top center+=10%",
    }
});

gsap.from(".community-card", {
    opacity: 0,
    y: 50,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.2, // Stagger each community card
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".community-section",
        start: "top center+=10%",
    }
});

gsap.from(".community-highlight", {
    opacity: 0,
    y: 40,
    scale: 0.9,
    duration: 1,
    delay: 0.6,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".community-section",
        start: "top center+=10%",
    }
});

// ===== CALL TO ACTION SECTION ANIMATIONS =====
gsap.from(".cta-heading", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: ".cta-section",
        start: "top center+=10%",
    }
});

gsap.from(".cta-paragraph", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
        trigger: ".cta-section",
        start: "top center+=10%",
    }
});


// ===== NUMBER COUNTER ANIMATION =====
// Animates the statistics numbers counting up when they come into view
const counters = document.querySelectorAll('.highlight-number');

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        let count = parseFloat(counter.innerText); // Use parseFloat for potential '+'

        const increment = target / (4 * 60); // 4 seconds at ~60fps

        if (count < target) {
            count += increment;
            // Add '+' symbol for specific stats
            if (counter.parentElement.querySelector('.lead').textContent.includes('Months Experience')) {
                counter.innerText = Math.ceil(count) + '+';
            } else if (counter.parentElement.querySelector('.lead').textContent.includes('Students Registered')) {
                counter.innerText = Math.ceil(count) + '+';
            } else {
                counter.innerText = Math.ceil(count);
            }
            requestAnimationFrame(updateCount);
        } else {
            // Set final value with '+' if needed
            if (counter.parentElement.querySelector('.lead').textContent.includes('Months Experience')) {
                counter.innerText = target + '+';
            } else if (counter.parentElement.querySelector('.lead').textContent.includes('Students Registered')) {
                counter.innerText = target + '+';
            } else {
                counter.innerText = target;
            }
        }
    };

    // Trigger animation when element enters view
    ScrollTrigger.create({
        trigger: counter,
        start: "top center+=50",
        onEnter: updateCount,
        once: true // Only trigger once
    });
});



// ===== FOOTER ANIMATION =====
// Animates the footer when it comes into view
gsap.from(".footer", {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".footer",
        start: "top 90%", // Trigger when footer is 90% from top
        toggleActions: "play none none none"
    }
});
