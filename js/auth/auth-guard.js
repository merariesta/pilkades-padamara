/**
 * =========================================
 * AUTH GUARD
 * =========================================
 */

/**
 * Cek apakah user sudah login
 */
async function requireAuth() {

  const session = await getSession();

  /**
   * Jika belum login
   */
  if (!session) {

    window.location.href = './pages/login.html';

    return;
  }

  console.log('User authenticated');
}