/**
 * =========================================
 * PROFILE SERVICE
 * =========================================
 */

/**
 * Mengambil profile user aktif
 */
async function getCurrentProfile() {

  /**
   * Ambil user login
   */
  const user = await getCurrentUser();

  if (!user) {

    return null;
  }

  /**
   * Query profile
   */
  const {
    data,
    error
  } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {

    console.error(error);

    return null;
  }

  return data;
}