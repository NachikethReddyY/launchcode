 // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // --- Mobile Menu Toggle ---
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            mobileMenu.classList.toggle('show');
        });

        // --- Video Play/Pause on Scroll ---
        const introVideo = document.getElementById('introVideo');
        const videoOverlay = document.getElementById('videoOverlay');

        // Play video when it enters viewport, pause when it leaves
        ScrollTrigger.create({
            trigger: "#videoIntro",
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                // Only show overlay, do not autoplay to avoid NotAllowedError
                if (introVideo.paused) {
                    videoOverlay.classList.remove('hidden');
                }
            },
            onLeave: () => {
                introVideo.pause();
                videoOverlay.classList.remove('hidden'); // Show overlay when video pauses
            },
            onEnterBack: () => {
                // Only show overlay, do not autoplay to avoid NotAllowedError
                if (introVideo.paused) {
                    videoOverlay.classList.remove('hidden');
                }
            },
            onLeaveBack: () => {
                introVideo.pause();
                videoOverlay.classList.remove('hidden');
            }
        });

        // Click overlay to play/pause manually
        videoOverlay.addEventListener('click', () => {
            if (introVideo.paused) {
                introVideo.play().then(() => {
                    videoOverlay.classList.add('hidden');
                }).catch(error => {
                    console.error("Failed to play video:", error);
                    // Optionally, show a message to the user that autoplay is blocked
                });
            } else {
                introVideo.pause();
                videoOverlay.classList.remove('hidden');
            }
        });


        // --- Course Data for Modals ---
        const coursesData = {
            html: {
                title: "Atomic HTML",
                description: "Build your first website from scratch! Learn HTML5 and create web pages that actually work. Perfect for complete beginners!",
                modules: [
                    "HTML Basics: Your First Tags!",
                    "Semantic HTML: Smart & Clean Code!",
                    "Forms & Input: Make It Interactive!",
                    "Media Elements: Add Some Flair!",
                    "HTML5 APIs: Unlock Web Superpowers!",
                    "Best Practices: Code Like a Pro!"
                ],
                projects: [
                    "Your very first personal website",
                    "A cool blog layout",
                    "An online resume"
                ]
            },
            css: {
                title: "Dope with CSS",
                description: "Transform plain HTML into stunning visual masterpieces! Learn how to style your web pages with colors, fonts, layouts, and amazing animations. Master responsive design to make your sites look great on any device, from phones to desktops.",
                modules: [
                    "CSS Fundamentals: Styling Basics!",
                    "Selectors & Specificity: Pinpoint Precision!",
                    "Box Model & Layout: Master Spacing!",
                    "Flexbox & Grid: Responsive Layouts Made Easy!",
                    "Transitions & Animations: Bring It to Life!",
                    "Responsive Design: Adapt to Any Screen!"
                ],
                projects: [
                    "A stylish portfolio website",
                    "An animated landing page",
                    "A responsive e-commerce product card"
                ]
            },
            javascript: {
                title: "Interactive JavaScript",
                description: "Make your websites come alive! This course teaches you JavaScript, the language of the web, to add dynamic behavior, handle user input, and create interactive elements like games, quizzes, and single-page applications. Get ready to code real logic!",
                modules: [
                    "JS Basics: Variables & Data Types!",
                    "Control Flow: Logic & Decisions!",
                    "Functions & Scope: Reusable Code!",
                    "DOM Manipulation: Interact with HTML!",
                    "Events & Asynchronous JS: React to Users!",
                    "Modern JS: ES6+ Features!"
                ],
                projects: [
                    "A fun 'Guess the Number' game",
                    "A dynamic to-do list app",
                    "An interactive image gallery"
                ]
            },
            uiux: {
                title: "UI/UX Design",
                description: "Learn the art and science of creating user-friendly and aesthetically pleasing digital experiences. This course covers user research, wireframing, prototyping, and visual design principles to build interfaces that delight users and solve real problems.",
                modules: [
                    "Introduction to UI/UX: Why It Matters!",
                    "User Research & Personas: Know Your Users!",
                    "Information Architecture: Organize Your Content!",
                    "Wireframing & Prototyping: Sketch Your Ideas!",
                    "Visual Design Principles: Color, Typography, Layout!",
                    "Usability Testing: Get Feedback & Iterate!"
                ],
                projects: [
                    "Redesign a popular app's interface",
                    "Create a prototype for a new social media app",
                    "Design a complete website mock-up"
                ]
            },
            bootstrap: {
                title: "Easy Road with Bootstrap",
                description: "Speed up your web development with Bootstrap! Learn this popular CSS framework to quickly build responsive, mobile-first websites with pre-built components and a powerful grid system. Perfect for rapid prototyping and professional-looking sites.",
                modules: [
                    "Bootstrap Grid System: Responsive Layouts!",
                    "Navigation & Components: Ready-Made UI!",
                    "Forms & Inputs: Stylish Data Entry!",
                    "Utilities & Helpers: Quick Styling!",
                    "Customization: Make It Your Own!",
                    "Integrating with JS: Dynamic Bootstrap!"
                ],
                projects: [
                    "A responsive landing page",
                    "A personal portfolio using Bootstrap components",
                    "A simple blog template"
                ]
            },
            react: {
                title: "React Apps",
                description: "Master React, the most popular JavaScript library for building modern, single-page applications. Learn component-based architecture, state management, and routing to create dynamic, high-performance web apps like Instagram or TikTok.",
                modules: [
                    "React Basics: Components & JSX!",
                    "State & Props: Dynamic Data!",
                    "Hooks: useState, useEffect, useContext!",
                    "Conditional Rendering & Lists: Show What Matters!",
                    "Component Lifecycle: When Things Happen!",
                    "Routing & API Calls: Full App Development!"
                ],
                projects: [
                    "A simple e-commerce product listing app",
                    "A basic social media feed clone",
                    "A weather application with API integration"
                ]
            }
        };

        // --- Course Modal Logic ---
        const courseCards = document.querySelectorAll('.course-card');
        const courseModal = document.getElementById('courseModal');
        const modalCloseButton = document.getElementById('modalCloseButton');
        const modalCourseTitle = document.getElementById('modalCourseTitle');
        const modalCourseDescription = document.getElementById('modalCourseDescription');
        const modalCourseModules = document.getElementById('modalCourseModules');
        const modalCourseProjects = document.getElementById('modalCourseProjects');

        courseCards.forEach(card => {
            card.addEventListener('click', () => {
                const courseId = card.dataset.courseId;
                const course = coursesData[courseId];

                if (course) {
                    // Populate modal content
                    modalCourseTitle.textContent = course.title;
                    modalCourseDescription.innerHTML = course.description; /* Use innerHTML to render span */

                    modalCourseModules.innerHTML = '';
                    course.modules.forEach(module => {
                        const li = document.createElement('li');
                        li.textContent = module;
                        modalCourseModules.appendChild(li);
                    });

                    modalCourseProjects.innerHTML = '';
                    course.projects.forEach(project => {
                        const li = document.createElement('li');
                        li.textContent = project;
                        modalCourseProjects.appendChild(li);
                    });

                    // Animate modal open
                    gsap.to(courseModal, {
                        opacity: 1,
                        pointerEvents: 'auto',
                        duration: 0.3,
                        ease: "power2.out",
                        onStart: () => {
                            // Blur background elements
                            gsap.to('body > *:not(.course-modal)', {
                                filter: 'blur(10px)',
                                duration: 0.3
                            });
                        }
                    });
                    gsap.fromTo('.modal-content-wrapper', {
                        scale: 0.8,
                        opacity: 0
                    }, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                    });
                }
            });
        });

        modalCloseButton.addEventListener('click', () => {
            // Animate modal close
            gsap.to('.modal-content-wrapper', {
                scale: 0.8,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
            gsap.to(courseModal, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    // Remove blur from background elements
                    gsap.to('body > *:not(.course-modal)', {
                        filter: 'blur(0px)',
                        duration: 0.3
                    });
                }
            });
        });
