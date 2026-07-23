// Single-Page Survey Form - Vanilla JavaScript

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('surveyForm');
  const modal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Form Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      modal.classList.add('active');

      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  });

  // Validation Engine
  function validateForm() {
    let isValid = true;
    let firstInvalidField = null;

    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const container = field.closest('.field');
      if (!container) return;

      let fieldValid = true;

      if (field.type === 'radio') {
        const checked = form.querySelector(`input[name="${field.name}"]:checked`);
        fieldValid = !!checked;
      } else if (field.type === 'checkbox' && field.name === 'features') {
        const checked = form.querySelectorAll('input[name="features"]:checked');
        fieldValid = checked.length > 0;
      } else if (field.type === 'checkbox') {
        fieldValid = field.checked;
      } else if (field.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        fieldValid = emailPattern.test(field.value.trim());
      } else {
        fieldValid = field.value.trim() !== '';
      }

      if (!fieldValid) {
        container.classList.add('invalid');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = container;
      } else {
        container.classList.remove('invalid');
      }
    });

    // Auto-scroll to the first invalid field
    if (!isValid && firstInvalidField) {
      firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
  }

  // Clear invalid styling as user types or selects
  form.addEventListener('input', (e) => {
    const container = e.target.closest('.field');
    if (container) container.classList.remove('invalid');
  });

  form.addEventListener('change', (e) => {
    const container = e.target.closest('.field');
    if (container) container.classList.remove('invalid');
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      form.querySelectorAll('.field').forEach(c => c.classList.remove('invalid'));
    }, 10);
  });

  // Modal Close Button
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    form.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
