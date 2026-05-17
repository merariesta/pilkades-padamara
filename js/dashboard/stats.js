/**
 * =========================================
 * DASHBOARD STATISTICS
 * =========================================
 */

/**
 * Mengambil statistik dashboard
 */
async function getDashboardStats() {

  /**
   * Total data
   */
  const totalQuery = await supabaseClient
    .from('warga')
    .select('*', { count: 'exact', head: true });

  /**
   * Total siap
   */
  const siapQuery = await supabaseClient
    .from('warga')
    .select('*', { count: 'exact', head: true })
    .eq('status', STATUS.SIAP)
    .eq('approval_status', APPROVAL_STATUS.APPROVED);

  /**
   * Total ragu
   */
  const raguQuery = await supabaseClient
    .from('warga')
    .select('*', { count: 'exact', head: true })
    .eq('status', STATUS.RAGU)
    .eq('approval_status', APPROVAL_STATUS.APPROVED);

  /**
   * Total tolak
   */
  const tolakQuery = await supabaseClient
    .from('warga')
    .select('*', { count: 'exact', head: true })
    .eq('status', STATUS.TOLAK)
    .eq('approval_status', APPROVAL_STATUS.APPROVED);

  /**
   * Total pending
   */
  const pendingQuery = await supabaseClient
    .from('warga')
    .select('*', { count: 'exact', head: true })
    .eq('approval_status', APPROVAL_STATUS.PENDING);

  return {
    total: totalQuery.count || 0,
    siap: siapQuery.count || 0,
    ragu: raguQuery.count || 0,
    tolak: tolakQuery.count || 0,
    pending: pendingQuery.count || 0
  };
}