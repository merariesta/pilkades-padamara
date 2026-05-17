/**
 * =========================================
 * LOGOUT SYSTEM
 * =========================================
 */

async function logout() {

  const { error } = await supabaseClient.auth.signOut();

  if (error) {

    console.error(error);

    return;
  }

  window.location.href = './pages/login.html';
}