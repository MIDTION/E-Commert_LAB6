document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const errorBox = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnLoader = document.getElementById('btn-loader');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = form.username.value.trim();
    const password = form.password.value;

    if (!username || !password) return;

    // Loading State
    errorBox.classList.add('hidden');
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');

    try {
      // Send login request
      const response = await fetch('/auth/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success: Redirect to the E-Commerce Store
        submitBtn.style.background = '#10b981'; // emerald-500
        btnLoader.classList.add('hidden');
        btnText.classList.remove('hidden');
        btnText.textContent = 'Success! Redirecting...';
        
        setTimeout(() => {
          // Since the cookie is set, we can just redirect to the root which will proxy to the Next.js app
          // and Next.js middleware will send us to /store
          window.location.href = '/';
        }, 1000);
      } else {
        // Show error
        showError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      showError('Unable to connect to the authentication service');
    } finally {
      if (!submitBtn.style.background) {
        // Reset button state if not successful
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
      }
    }
  });

  function showError(msg) {
    errorText.textContent = msg;
    errorBox.classList.remove('hidden');
  }
});
