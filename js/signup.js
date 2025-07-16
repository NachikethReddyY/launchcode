document.addEventListener('DOMContentLoaded', function() {
    // --- DOM ELEMENTS AND STATE ---
    const signupForm = document.getElementById('signupForm');
    const successPage = document.getElementById('successPage');
    const courseSignupForm = document.getElementById('courseSignupForm');
    const goalsMotivationTextarea = document.getElementById('goalsMotivation');
    const goalsMotivationCharCount = document.getElementById('goalsMotivationCharCount');
    const backToHomeButton = document.getElementById('backToHomeButton');
    const confettiContainer = document.querySelector('.confetti-container');
    const studyPeriodSlider = document.getElementById('studyPeriodSlider');
    const studyPeriodValue = document.getElementById('studyPeriodValue');

    const formPages = [
        document.getElementById('page1'),
        document.getElementById('page2'),
        document.getElementById('page3')
    ];
    const paginationItems = document.querySelectorAll('.custom-pagination .page-item');
    const stepDots = document.querySelectorAll('.step-timeline-dot');

    let currentPage = 0; // 0-indexed

    // Initial GSAP Animation for Form Entry
    gsap.fromTo(signupForm,
        { opacity: 0, translateY: 30 },
        { opacity: 1, translateY: 0, duration: 1, ease: "power3.out" }
    );

    // --- Pagination and Step Timeline Update Functions ---
    function updatePagination() {
        paginationItems.forEach((item, index) => {
            item.classList.remove('active', 'interacted');
            if (index === currentPage) {
                item.classList.add('active', 'interacted');
            }
        });
    }

    function updateStepTimeline() {
        stepDots.forEach((dot, index) => {
            dot.classList.remove('active', 'completed', 'interacted');
            if (index === currentPage) {
                dot.classList.add('active', 'interacted');
            } else if (index < currentPage) {
                dot.classList.add('completed');
            }
        });
    }

    updatePagination(); // Initial update
    updateStepTimeline(); // Initial update

    // --- 2. Add GSAP hover animation to Experience Level bubbles ---
    document.querySelectorAll('.experience-bubble').forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            gsap.to(bubble, { scale: 1.07, boxShadow: '0 0 18px 2px #00bcd4, 0 0 30px 0 #28a745 inset', duration: 0.2 });
        });
        bubble.addEventListener('mouseleave', function() {
            gsap.to(bubble, { scale: 1, boxShadow: '0 0 0 0 #00bcd4, 0 0 0 0 #28a745 inset', duration: 0.2 });
        });
    });

    // --- 3. Add GSAP animation to form title and main button ---
    if (document.querySelector('.form-title')) {
        gsap.from('.form-title', { opacity: 0, y: -40, duration: 1, ease: 'power2.out' });
    }
    if (document.querySelector('.popping-blue-button')) {
        gsap.from('.popping-blue-button', { opacity: 0, scale: 0.7, duration: 0.7, ease: 'back.out(1.7)', delay: 0.3 });
    }

    // --- 4. Toast logic: Bootstrap-like structure, dynamic title, time, and message ---
    const toast = document.getElementById('customToast');
    const toastTitle = document.getElementById('toastTitle');
    const toastTime = document.getElementById('toastTime');
    const toastBody = document.getElementById('toastBody');
    const closeToastBtn = toast.querySelector('.close-toast');
    if (closeToastBtn) {
        closeToastBtn.onclick = function() {
            toast.classList.remove('show');
            toast.style.display = '';
        };
    }

    // Helper to show a toast with custom content (title, body, time, img)
    function showToast({ title = 'Nachiketh Reddy', body = '', time = 'just now', img = 'assets/me.png' }) {
        toastTitle.textContent = title;
        toastTime.textContent = time;
        toastBody.innerHTML = body;
        toast.querySelector('img').src = img;
        toast.classList.add('show');
        toast.style.display = 'flex';
    }

    // Show type toast ONLY on page 2
    function showTypeToast() {
        if (!document.getElementById('page2').classList.contains('active') || successPage.style.display === 'block') return;
        showToast({
            title: 'Nachiketh Reddy',
            body: "Type by yourself, don’t get help!<br>We want to know your true goals and motivation.",
            time: 'just now',
            img: 'assets/me.png'
        });
    }

    // Show custom thank you toast ONLY on success page
    function showCustomToast() {
        if (successPage.style.display !== 'block') return;
        showToast({
            title: 'Nachiketh Reddy',
            body: "I will contact you over email soon—look out for it!<br>Thank you for signing up. Hope we can change the world together!",
            time: 'just now',
            img: 'assets/me.png'
        });
    }

    // Show error toast for form validation errors
    function showErrorToast(message) {
        showToast({
            title: 'Validation Error',
            body: message,
            time: 'just now',
            img: 'assets/me.png'
        });
    }

    // --- 5. Success div: center, add return to home button, remove cross ---
    const successPageElem = document.getElementById('successPage');
    const formInner = successPageElem.querySelector('.form-inner');
    if (!formInner.querySelector('#backToHomeButton')) {
        const homeBtn = document.createElement('a');
        homeBtn.href = 'index.html';
        homeBtn.id = 'backToHomeButton';
        homeBtn.className = 'popping-blue-button';
        homeBtn.innerHTML = '<i class="fas fa-arrow-left me-2"></i> Return to Home';
        homeBtn.style.marginTop = '1.5rem';
        formInner.appendChild(homeBtn);
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetFormAndGoHome();
        });
    }
    const closeBtn = successPageElem.querySelector('.close-success-modal');
    if (closeBtn) closeBtn.remove();

    // Function to show a specific page with collapse/expand animation
    function showPage(pageIndex) {
        // Validate current page before moving forward
        if (pageIndex > currentPage) {
            if (!validatePage(currentPage)) {
                return; // Stop if validation fails
            }
        }

        const prevPageElement = formPages[currentPage];
        const nextPageElement = formPages[pageIndex];

        // Animate current page out (collapse)
        gsap.to(prevPageElement, {
            opacity: 0,
            height: 0, // Animate height to 0
            paddingTop: 0,
            paddingBottom: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
                prevPageElement.classList.remove('active');
                prevPageElement.style.display = 'none'; // Hide after animation
                prevPageElement.style.height = ''; // Reset height for next time
                prevPageElement.style.paddingTop = '';
                prevPageElement.style.paddingBottom = '';

                currentPage = pageIndex;
                nextPageElement.classList.add('active');
                nextPageElement.style.display = 'block'; // Show before animating in

                // Set initial height for incoming page to its natural height
                const nextPageNaturalHeight = nextPageElement.scrollHeight;
                nextPageElement.style.height = '0px'; // Start from collapsed state
                nextPageElement.style.paddingTop = '0px';
                nextPageElement.style.paddingBottom = '0px';

                // Animate new page in (expand)
                gsap.fromTo(nextPageElement,
                    { opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }, // Start collapsed
                    {
                        opacity: 1,
                        height: nextPageNaturalHeight, // Animate to natural height
                        paddingTop: 10, // Restore original padding (adjust if needed)
                        paddingBottom: 10, // Restore original padding (adjust if needed)
                        duration: 0.4,
                        ease: "power2.inOut",
                        onComplete: () => {
                            nextPageElement.style.height = ''; // Remove fixed height after animation
                            nextPageElement.style.paddingTop = '';
                            nextPageElement.style.paddingBottom = '';
                        }
                    }
                );
                updatePagination();
                updateStepTimeline();
            }
        });
    }

    // Function to validate a single input field or radio group
    function validateField(input) {
        let isValid = true;
        let feedbackElement = input.nextElementSibling; // Default for most inputs
        if (input.id === 'goalsMotivation') {
            if (!input.value || input.value.length < 6) {
                isValid = false;
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                    feedbackElement.style.display = 'block';
                    feedbackElement.textContent = 'Please enter at least 6 characters.';
                }
                showErrorToast('Please enter at least 6 characters for Goals and Motivation.');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                    feedbackElement.style.display = 'none';
                }
            }
            return isValid;
        }

        // Handle radio buttons as a group
        if (input.type === 'radio') {
            const radioGroupName = input.name;
            const radioGroup = document.querySelectorAll(`input[name="${radioGroupName}"]`);
            const isRadioSelected = Array.from(radioGroup).some(radio => radio.checked);
            feedbackElement = document.getElementById(`${radioGroupName}Feedback`); // Specific feedback for radio group

            if (!isRadioSelected) {
                isValid = false;
                showErrorToast('Please select your experience level.');
            }
            radioGroup.forEach(radio => {
                if (isValid) {
                    radio.classList.remove('is-invalid');
                    radio.classList.add('is-valid');
                } else {
                    radio.classList.remove('is-valid');
                    radio.classList.add('is-invalid');
                }
            });
        } else {
            // Standard input/select validation
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                    feedbackElement.style.display = 'none';
                }
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
                if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                    feedbackElement.style.display = 'block';
                    // Custom messages for specific fields
                    if (input.id === 'yourEmail') {
                        feedbackElement.textContent = "Please enter a valid email address.";
                        showErrorToast("Please enter a valid email address with @ and a domain.");
                    } else if (input.id === 'interestedCourse') {
                        feedbackElement.textContent = "Please select an interested course.";
                        showErrorToast("Please select a course before continuing.");
                    } else {
                        feedbackElement.textContent = "This field is required.";
                        showErrorToast("This field is required.");
                    }
                }
                isValid = false;
            }
        }
        return isValid;
    }

    // Function to validate all fields on the current page (used on "Next" button click)
    function validatePage(pageIndex) {
        let pageIsValid = true;
        const currentFormPage = formPages[pageIndex];

        // Clear previous invalid states for radio group feedback
        currentFormPage.querySelectorAll('.invalid-feedback.radio-feedback').forEach(el => el.style.display = 'none');

        // Validate all required inputs on the current page
        const requiredInputs = currentFormPage.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            // For radios, we validate the group once
            if (input.type === 'radio' && input.name && document.querySelector(`input[name="${input.name}"]`) !== input) {
                // Skip if it's not the first radio in its group (to avoid re-validating the group)
                return;
            }
            if (!validateField(input)) {
                pageIsValid = false;
            }
        });

        return pageIsValid;
    }

    // Attach real-time validation listeners
    formPages.forEach(page => {
        page.querySelectorAll('input, select, textarea').forEach(input => {
            // Don't validate on load, only after user interaction
            if (input.type === 'text' || input.type === 'email' || input.tagName === 'TEXTAREA') {
                input.addEventListener('blur', () => validateField(input));
            } else if (input.tagName === 'SELECT' || input.type === 'radio' || input.type === 'checkbox') {
                input.addEventListener('change', () => validateField(input));
            }
        });
    });

    // Character count for Goals and Motivation textarea
    goalsMotivationTextarea.addEventListener('input', function() {
        const currentLength = goalsMotivationTextarea.value.length;
        goalsMotivationCharCount.textContent = `${currentLength}/250 characters`;
        // Show green border and tick if >= 6 characters
        if (currentLength >= 6) {
            goalsMotivationTextarea.classList.remove('is-invalid');
            goalsMotivationTextarea.classList.add('is-valid');
        } else {
            goalsMotivationTextarea.classList.remove('is-valid');
            goalsMotivationTextarea.classList.remove('is-invalid'); // Remove invalid for live typing
        }
    });

    // Study period slider update and fill bar animation
    function updateStudyPeriodDisplay() {
        const sliderValue = studyPeriodSlider.value;
        studyPeriodValue.textContent = `${sliderValue} month${sliderValue > 1 ? 's' : ''}`;
        const max = studyPeriodSlider.max;
        const min = studyPeriodSlider.min;
        const percentage = ((sliderValue - min) / (max - min)) * 100;

        // Update CSS variable for slider track background-size
        studyPeriodSlider.style.setProperty('--fill-percentage', `${percentage}%`);
    }
    studyPeriodSlider.addEventListener('input', updateStudyPeriodDisplay);
    updateStudyPeriodDisplay(); // Initial update

    // Navigation buttons
    document.getElementById('nextPage1').addEventListener('click', () => showPage(1));
    document.getElementById('prevPage2').addEventListener('click', () => showPage(0));
    document.getElementById('nextPage2').addEventListener('click', () => showPage(2));
    document.getElementById('prevPage3').addEventListener('click', () => showPage(1));

    // Pagination clicks
    paginationItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPage = parseInt(this.dataset.page) - 1; // Convert to 0-indexed
            if (targetPage !== currentPage) {
                showPage(targetPage);
            }
        });
    });

    // Experience Level radio: bubble style selection
    document.querySelectorAll('.experience-bubble').forEach(bubble => {
        const input = bubble.querySelector('input[type="radio"]');
        const label = bubble.querySelector('label');
        function updateBubbles() {
            document.querySelectorAll('.experience-bubble').forEach(b => b.classList.remove('selected'));
            if (input.checked) bubble.classList.add('selected');
        }
        label.addEventListener('click', function(e) {
            e.preventDefault();
            input.checked = true;
            updateBubbles();
        });
        input.addEventListener('change', updateBubbles);
        // Initial state
        if (input.checked) bubble.classList.add('selected');
    });

    // Tech bubbles: toggle selected class
    document.querySelectorAll('.tech-bubble').forEach(bubble => {
        const input = bubble.querySelector('input[type="checkbox"]');
        const label = bubble.querySelector('label');
        label.addEventListener('click', function(e) {
            e.preventDefault();
            input.checked = !input.checked;
            bubble.classList.toggle('selected', input.checked);
        });
        // Keyboard accessibility
        input.addEventListener('change', function() {
            bubble.classList.toggle('selected', input.checked);
        });
    });

    // On form submit, show thank you toast only on success page
    courseSignupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        if (!validatePage(currentPage)) {
            return;
        }
        // Simulate form submission success
        gsap.to(signupForm, {
            opacity: 0,
            translateY: -30,
            duration: 0.7,
            ease: "power3.in",
            onComplete: () => {
                signupForm.style.display = 'none';
                successPage.style.display = 'block';
                gsap.fromTo(successPage,
                    { opacity: 0, translateY: 30 },
                    { opacity: 1, translateY: 0, duration: 1, ease: "power3.out" }
                );
                gsap.fromTo('.success-title',
                    { opacity: 0, translateY: 20 },
                    { opacity: 1, translateY: 0, duration: 0.7, ease: "power2.out", delay: 0.8 }
                );
                gsap.fromTo('.success-message',
                    { opacity: 0, translateY: 20 },
                    { opacity: 1, translateY: 0, duration: 0.7, ease: "power2.out", delay: 1 }
                );
                createConfetti(); // Trigger confetti animation
                showCustomToast(); // Show thank you toast
            }
        });
    });

    // Back to Home button functionality (both top and success page)
    function resetFormAndGoHome() {
        gsap.to(successPage, {
            opacity: 0,
            translateY: -30,
            duration: 0.7,
            ease: "power3.in",
            onComplete: () => {
                successPage.style.display = 'none';
                // Reset form
                courseSignupForm.reset();
                goalsMotivationCharCount.textContent = '0/250 characters';
                studyPeriodSlider.value = 3; // Reset slider
                updateStudyPeriodDisplay(); // Update slider fill and text
                // Clear validation states for all inputs
                document.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
                    el.classList.remove('is-invalid', 'is-valid');
                });
                document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');
                
                currentPage = 0; // Reset to first page
                formPages.forEach((page, index) => {
                    page.classList.remove('active');
                    page.style.height = ''; // Ensure height is reset
                    page.style.paddingTop = '';
                    page.style.paddingBottom = '';
                    page.style.opacity = 1; // Ensure opacity is reset
                    if (index === 0) {
                        page.classList.add('active');
                        page.style.display = 'block'; // Ensure first page is visible
                    } else {
                        page.style.display = 'none'; // Hide other pages
                    }
                });
                updatePagination();
                updateStepTimeline();

                signupForm.style.display = 'block';
                gsap.fromTo(signupForm,
                    { opacity: 0, translateY: 30 },
                    { opacity: 1, translateY: 0, duration: 1, ease: "power3.out" }
                );
                // Clear confetti
                confettiContainer.innerHTML = '';
            }
        });
    }

    // Confetti animation function
    function createConfetti() {
        const colors = ['#F6FF00', '#00bcd4', '#EC4899', '#A855F7'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confettiContainer.appendChild(confetti);

            gsap.to(confetti, {
                opacity: 1,
                y: 'random(-200, -500)', // Fly upwards
                x: 'random(-100, 100)', // Spread horizontally
                rotation: 'random(0, 360)',
                scale: 'random(0.5, 1.5)',
                duration: 'random(2, 5)',
                ease: "power1.out",
                delay: 'random(0, 1.5)',
                onComplete: () => confetti.remove() // Remove after animation
            });
        }
    }

    // Make Goals and Motivation required, at least 6 characters, and block paste/cut/copy on all devices
    goalsMotivationTextarea.setAttribute('required', 'required');
    goalsMotivationTextarea.setAttribute('minlength', '6');

    // Disallow copy/paste/cut for Goals and Motivation textarea, show toast (all devices)
    ['cut', 'paste', 'copy'].forEach(evt => {
        goalsMotivationTextarea.addEventListener(evt, function(e) {
            e.preventDefault();
            showTypeToast();
        });
    });

    // GSAP animation for footer on scroll
    gsap.from(".footer", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });
});