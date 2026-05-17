/**
 * =========================================
 * DASHBOARD UI
 * =========================================
 */

/**
 * Render dashboard utama
 */
async function renderDashboard(profile) {

  const dashboardContent = document.getElementById(
    'dashboard-content'
  );

  /**
   * Loading state
   */
  dashboardContent.innerHTML = `
    <p>Loading dashboard...</p>
  `;

  /**
   * Ambil statistik dashboard
   */
  const stats = await getDashboardStats();
const settings =
  await getTargetKemenangan();

const target =
  settings?.target_kemenangan || 0;

const progress =
  target > 0

    ? Math.round(
        (stats.siap / target) * 100
      )

    : 0;
  /**
   * Render statistik cards
   */
  dashboardContent.innerHTML = `
  <div class="
  bg-gradient-to-r
  from-red-600
  to-red-500
  rounded-2xl
  p-5
  text-white
  mb-4
">

  <p class="
    text-sm
    opacity-80
  ">
    Progress Kemenangan
  </p>

  <h2 class="
    text-3xl
    font-bold
    mt-2
  ">
    ${stats.siap}
    / ${target}
  </h2>

  <p class="
    text-sm
    mt-2
  ">
    ${progress}% tercapai
  </p>
${
  isAdmin(profile)

    ? `

      <button
        onclick="
          editTargetKemenangan(
            ${target}
          )
        "
        class="
          mt-4
          bg-white/20
          px-4
          py-2
          rounded-xl
          text-sm
        "
      >
        Edit Target
      </button>

    `
    : ''
}
</div>
    <div class="grid grid-cols-2 gap-3">

      ${renderStatCard(
        'Total',
        stats.total,
        'bg-blue-600'
      )}

      ${renderStatCard(
        'Siap',
        stats.siap,
        'bg-green-600'
      )}

      ${renderStatCard(
        'Ragu',
        stats.ragu,
        'bg-yellow-500'
      )}

      ${renderStatCard(
        'Tolak',
        stats.tolak,
        'bg-red-600'
      )}

      ${renderStatCard(
        'Pending',
        stats.pending,
        'bg-gray-600'
      )}

    </div>

  `;
}

/**
 * Render compact stat card
 */
function renderStatCard(
  title,
  value,
  colorClass = 'bg-gray-500'
) {

  return `
  
    <div class="
      ${colorClass}
      text-white
      rounded-xl
      p-3
      h-24
      flex
      flex-col
      justify-between
      shadow-sm
    ">

      <p class="text-xs font-medium opacity-90">
        ${title}
      </p>

      <h2 class="text-2xl font-bold">
        ${value}
      </h2>

    </div>

  `;
}
/**
 * Edit target kemenangan
 */
async function editTargetKemenangan(
  currentValue
) {

  const value = prompt(
    'Masukkan target kemenangan',
    currentValue
  );

  if (!value) {

    return;
  }

  const success =
    await updateTargetKemenangan(
      Number(value)
    );

  if (!success) {

    alert(
      'Gagal update target'
    );

    return;
  }

  alert(
    'Target berhasil diupdate'
  );

  renderDashboard(
    currentProfile
  );
}