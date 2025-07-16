// FAQ Accordion logic
$(document).ready(function() {
  // FAQ Accordion with jQuery slideUp/slideDown (fast, smooth)
  $('.faq-section .accordion-item .accordion-button').on('click', function() {
    var $item = $(this).closest('.accordion-item');
    var $body = $item.find('.accordion-body');
    if ($item.hasClass('open')) {
      $item.removeClass('open');
      $body.slideUp(220);
    } else {
      $item.siblings('.accordion-item').removeClass('open').find('.accordion-body').slideUp(220);
      $item.addClass('open');
      $body.slideDown(220);
    }
  });

  // Toast utility
  function showFaqToast(msg, isSuccess) {
    var $toast = $('#faqToast');
    var $msg = $('#faqToastMsg');
    $msg.text(msg);
    $toast.removeClass('text-bg-success text-bg-danger').addClass(isSuccess ? 'text-bg-success' : 'text-bg-danger');
    var toast = new bootstrap.Toast($toast[0]);
    toast.show();
  }

  // FAQ contact form validation with toast
  $('#faqContactForm').on('submit', function(e) {
    e.preventDefault();
    var valid = true;
    var $form = $(this);
    $form.find('input, textarea').removeClass('is-invalid');
    // Name
    if (!$('#faqName').val().trim()) {
      $('#faqName').addClass('is-invalid');
      showFaqToast('Please enter your name.', false);
      valid = false;
      return;
    }
    // Email
    var email = $('#faqEmail').val().trim();
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      $('#faqEmail').addClass('is-invalid');
      showFaqToast('Please enter a valid email address.', false);
      valid = false;
      return;
    }
    // Message
    if (!$('#faqMessage').val().trim()) {
      $('#faqMessage').addClass('is-invalid');
      showFaqToast('Please enter your message.', false);
      valid = false;
      return;
    }
    if (valid) {
      showFaqToast('Thank you! We\'ll get back to you soon 🚀', true);
      $form[0].reset();
    }
  });

  // GSAP animation for .gsap-animate and .glassy-heading
  if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray('.gsap-animate').forEach(function(section) {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
    gsap.utils.toArray('.glassy-heading').forEach(function(heading) {
      gsap.fromTo(heading, {opacity: 0, y: 40}, {opacity: 1, y: 0, duration: 0.9, ease: 'power1.out', scrollTrigger: {
        trigger: heading,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }});
    });
  }
});
