/**
 * =========================================
 * SESSION MANAGEMENT
 * =========================================
 */

/**
 * Mengambil session aktif
 */
async function getSession() {

  const {
    data,
    error
  } = await supabaseClient.auth.getSession();

  if (error) {

    console.error(error);

    return null;
  }

  return data.session;
}

/**
 * Mengambil user login aktif
 */
async function getCurrentUser() {

  const {
    data,
    error
  } = await supabaseClient.auth.getUser();

  if (error) {

    console.error(error);

    return null;
  }

  return data.user;
}