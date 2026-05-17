/**
 * =========================================
 * LOGIN SYSTEM
 * =========================================
 */

const loginForm = document.getElementById('login-form');

const messageElement = document.getElementById('message');

/**
 * Handle login form submit
 */
loginForm.addEventListener('submit', async (event) => {

  event.preventDefault();

  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;

  messageElement.textContent = 'Loading...';

  /**
   * Login ke Supabase
   */
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  /**
   * Jika gagal login
   */
  if (error) {

    messageElement.textContent = error.message;

    messageElement.classList.add('text-red-600');

    return;
  }

  /**
   * Login berhasil
   */
  messageElement.textContent = 'Login berhasil';

  messageElement.classList.remove('text-red-600');

  messageElement.classList.add('text-green-600');

  console.log(data);

  /**
   * Redirect ke dashboard
   */
  setTimeout(() => {

    window.location.href = '../index.html';

  }, 1000);

});