/* ============================================================
   SCRIPT.JS — NTWALI Gideon Web Development Practical
   Tasks: Form Validation (Task 4) + Interactivity (Task 5)
   ============================================================ */

/* ── Utility: Run code after the DOM is fully loaded ── */
document.addEventListener('DOMContentLoaded', function () {

  /* ==================================================
     TASK 5: DISPLAY CURRENT DATE AND TIME
     Updates every second in the hero section
  ================================================== */
  const datetimeEl = document.getElementById('datetime');
  if (datetimeEl) {
    function updateDateTime() {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      datetimeEl.textContent = '🕐 ' + now.toLocaleDateString('en-US', options);
    }
    updateDateTime();
    // Refresh every second
    setInterval(updateDateTime, 1000);
  }


  /* ==================================================
     TASK 5: TOGGLE LIGHT / DARK MODE
  ================================================== */
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    // Check saved preference in session
    if (document.body.classList.contains('light-mode')) {
      themeBtn.textContent = '🌙 Dark Mode';
    }

    themeBtn.addEventListener('click', function () {
      document.body.classList.toggle('light-mode');
      if (document.body.classList.contains('light-mode')) {
        themeBtn.textContent = '🌙 Dark Mode';
      } else {
        themeBtn.textContent = '☀️ Light Mode';
      }
    });
  }


  /* ==================================================
     TASK 5: BUTTON CLICK ALERT
  ================================================== */
  const alertBtn = document.getElementById('alertBtn');
  if (alertBtn) {
    alertBtn.addEventListener('click', function () {
      alert('👋 Hello! I am NTWALI Gideon, an aspiring web developer from Rwanda. Thanks for visiting my practical project!');
    });
  }


  /* ==================================================
     TASK 5: CHANGE TEXT WHEN BUTTON IS CLICKED
  ================================================== */
  const textBtn = document.getElementById('textBtn');
  const changeText = document.getElementById('changeText');
  let textToggled = false;

  if (textBtn && changeText) {
    textBtn.addEventListener('click', function () {
      if (!textToggled) {
        changeText.textContent = '🚀 Text changed! Web development is the future — and I am building mine right here in Rwanda!';
        changeText.style.color = '#00ff88';
        changeText.style.borderColor = '#00ff88';
        textBtn.textContent = 'Reset Text 🔄';
        textToggled = true;
      } else {
        changeText.textContent = 'This text will change when you click the button above!';
        changeText.style.color = '';
        changeText.style.borderColor = '';
        textBtn.textContent = 'Change This Text ✏️';
        textToggled = false;
      }
    });
  }


  /* ==================================================
     TASK 5: CHANGE BACKGROUND COLOR
  ================================================== */
  const colorBtn = document.getElementById('colorBtn');
  // Array of accent background colors
  const bgColors = [
    { bg: '#0d0d0d', label: 'Change Color ✨' },
    { bg: '#0a1628', label: 'Ocean Dark 🌊' },
    { bg: '#1a0a28', label: 'Purple Night 🌌' },
    { bg: '#0a2818', label: 'Forest Dark 🌿' },
    { bg: '#28100a', label: 'Ember Dark 🔥' },
  ];
  let colorIndex = 0;

  if (colorBtn) {
    colorBtn.addEventListener('click', function () {
      colorIndex = (colorIndex + 1) % bgColors.length;
      document.body.style.backgroundColor = bgColors[colorIndex].bg;
      colorBtn.textContent = bgColors[colorIndex].label;
    });
  }


  /* ==================================================
     TASK 5: SHOW / HIDE A SECTION
  ================================================== */
  const toggleBtn = document.getElementById('toggleSection');
  const hiddenSection = document.getElementById('hiddenSection');

  if (toggleBtn && hiddenSection) {
    toggleBtn.addEventListener('click', function () {
      hiddenSection.classList.toggle('visible');
      if (hiddenSection.classList.contains('visible')) {
        toggleBtn.textContent = 'Hide Info 🙈';
      } else {
        toggleBtn.textContent = 'Show/Hide Info 👁️';
      }
    });
  }


  /* ==================================================
     TASK 4: FORM VALIDATION
     - Validates Full Name, Email, Message
     - Checks fields are not empty
     - Checks email contains @
     - Shows success or error alert messages
  ================================================== */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Prevent default form submission
      e.preventDefault();

      // Get form field values
      const fullName = document.getElementById('fullName').value.trim();
      const email    = document.getElementById('email').value.trim();
      const message  = document.getElementById('message').value.trim();

      // Get error display elements
      const nameError    = document.getElementById('nameError');
      const emailError   = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');
      const formAlert    = document.getElementById('formAlert');

      // Clear previous errors
      nameError.textContent    = '';
      emailError.textContent   = '';
      messageError.textContent = '';
      formAlert.className      = 'form-alert hidden';
      formAlert.textContent    = '';

      let isValid = true;

      /* ── Validate Full Name: must not be empty ── */
      if (fullName === '') {
        nameError.textContent = '⚠️ Full name is required.';
        isValid = false;
      }

      /* ── Validate Email: must not be empty & must contain @ ── */
      if (email === '') {
        emailError.textContent = '⚠️ Email address is required.';
        isValid = false;
      } else if (!email.includes('@')) {
        emailError.textContent = '⚠️ Please enter a valid email address (must contain @).';
        isValid = false;
      } else if (!email.includes('.')) {
        emailError.textContent = '⚠️ Email address appears invalid (missing domain).';
        isValid = false;
      }

      /* ── Validate Message: must not be empty ── */
      if (message === '') {
        messageError.textContent = '⚠️ Message cannot be empty.';
        isValid = false;
      } else if (message.length < 10) {
        messageError.textContent = '⚠️ Message is too short (minimum 10 characters).';
        isValid = false;
      }

      /* ── Show Result ── */
      if (isValid) {
        // SUCCESS message
        formAlert.textContent = '✅ Message sent successfully! Thank you, ' + fullName + '. I will get back to you soon!';
        formAlert.classList.remove('hidden');
        formAlert.classList.add('success');
        // Reset form
        contactForm.reset();
      } else {
        // ERROR message
        formAlert.textContent = '❌ Please fix the errors above and try again.';
        formAlert.classList.remove('hidden');
        formAlert.classList.add('error');
      }

      // Scroll to alert
      formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    /* ── Live validation on input (UX improvement) ── */
    document.getElementById('fullName').addEventListener('input', function () {
      const nameError = document.getElementById('nameError');
      if (this.value.trim() !== '') {
        nameError.textContent = '';
      }
    });

    document.getElementById('email').addEventListener('input', function () {
      const emailError = document.getElementById('emailError');
      if (this.value.includes('@')) {
        emailError.textContent = '';
      }
    });

    document.getElementById('message').addEventListener('input', function () {
      const messageError = document.getElementById('messageError');
      if (this.value.trim().length >= 10) {
        messageError.textContent = '';
      }
    });
  }

}); // End DOMContentLoaded