/**
 * =========================================
 * WARGA API
 * =========================================
 */

/**
 * Insert data warga baru
 */
async function insertWarga(payload) {

  const {
    data,
    error
  } = await supabaseClient
    .from('warga')
    .insert([payload])
    .select();

  if (error) {

    console.error(error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true,
    data
  };
}

/**
 * Mengambil data wilayah
 */
async function getWilayah() {

  const {
    data,
    error
  } = await supabaseClient
    .from('wilayah')
    .select('*')
    .order('rw')
    .order('rt');

  if (error) {

    console.error(error);

    return [];
  }

  return data;
}

/**
 * Mengambil data warga
 */
async function getWarga(filters = {}) {

  let query = supabaseClient
    .from('warga')
    .select('*')
    .order('created_at', {
      ascending: false
    });

  /**
   * Filter nama
   */
  if (filters.search) {

    query = query.ilike(
      'nama',
      `%${filters.search}%`
    );
  }

  /**
   * Filter RW
   */
  if (filters.rw) {

    query = query.eq(
      'rw',
      filters.rw
    );
  }

  /**
   * Filter approval
   */
  if (filters.approval_status) {

    query = query.eq(
      'approval_status',
      filters.approval_status
    );
  }

  /**
   * Execute query
   */
  const {
    data,
    error
  } = await query;

  if (error) {

    console.error(error);

    return [];
  }

  return data;
}

/**
 * Update approval status
 */
async function updateApprovalStatus(
  wargaId,
  approvalStatus,
  approvedBy
) {

  const {
    data,
    error
  } = await supabaseClient
    .from('warga')
    .update({
      approval_status: approvalStatus,
      approved_by: approvedBy
    })
    .eq('id', wargaId)
    .select();

  if (error) {

    console.error(error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true,
    data
  };
}

/**
 * Update data warga
 */
async function updateWarga(
  wargaId,
  payload
) {

  const {
    data,
    error
  } = await supabaseClient
    .from('warga')
    .update(payload)
    .eq('id', wargaId)
    .select();

  if (error) {

    console.error(error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true,
    data
  };
}
/**
 * Delete data warga
 */
async function deleteWarga(
  wargaId
) {

  const {
    error
  } = await supabaseClient
    .from('warga')
    .delete()
    .eq('id', wargaId);

  if (error) {

    console.error(error);

    return {
      success: false,
      error
    };
  }

  return {
    success: true
  };
}
/**
 * Check duplicate warga
 */
async function checkDuplicateWarga(
  nama,
  rw,
  rt
) {

  const {
    data,
    error
  } = await supabaseClient
    .from('warga')
    .select(`
      id,
      nama,
      rw,
      rt
    `)
    .ilike(
      'nama',
      nama
    )
    .eq('rw', rw)
    .eq('rt', rt)
    .limit(1);

  if (error) {

    console.error(error);

    return {
      duplicate: false
    };
  }

  return {
    duplicate:
      data.length > 0,
    data
  };
}