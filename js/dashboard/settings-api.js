/**
 * =========================================
 * SETTINGS API
 * =========================================
 */

/**
 * Ambil target kemenangan
 */
async function getTargetKemenangan() {

  const {
    data,
    error
  } = await supabaseClient
    .from('settings')
    .select('*')
    .limit(1)
    .single();

  if (error) {

    console.error(error);

    return null;
  }

  return data;
}

/**
 * Update target kemenangan
 */
async function updateTargetKemenangan(
  value
) {

  const settings =
    await getTargetKemenangan();

  const {
    error
  } = await supabaseClient
    .from('settings')
    .update({
      target_kemenangan:
        value
    })
    .eq('id', settings.id);

  if (error) {

    console.error(error);

    return false;
  }

  return true;
}