/**
 * =========================================
 * APPLICATION NAVIGATION
 * =========================================
 */

/**
 * Render bottom navigation
 */
function renderBottomNavigation() {

  return `
  
    <nav class="
      fixed
      bottom-0
      left-0
      right-0
      bg-white
      border-t
      shadow-lg
      px-2
      py-2
    ">

    <div class="grid grid-cols-5 gap-2">

        <!-- Dashboard -->
        <button
          onclick="navigateTo('dashboard')"
          class="flex flex-col items-center text-sm"
        >
          <span>📊</span>
          <span>Dashboard</span>
        </button>

        <!-- Input -->
        <button
          onclick="navigateTo('input')"
          class="flex flex-col items-center text-sm"
        >
          <span>➕</span>
          <span>Input</span>
        </button>

        <!-- Data -->
        <button
          onclick="navigateTo('data')"
          class="flex flex-col items-center text-sm"
        >
          <span>📋</span>
          <span>Data</span>
        </button>
    
      <!-- Analytics -->
      <button
        onclick="navigateTo('analytics')"
        class="
          flex
          flex-col
          items-center
          text-sm
        "
      >
        <span>📈</span>
        <span>Analytics</span>
      </button>

        <!-- Account -->
        <button
          onclick="navigateTo('account')"
          class="flex flex-col items-center text-sm"
        >
          <span>👤</span>
          <span>Akun</span>
        </button>

      </div>

    </nav>

  `;
}

/**
 * Handle navigation
 */
async function navigateTo(page) {

  switch (page) {

    case 'dashboard':

      const profileDashboard =
        await getCurrentProfile();

      await renderDashboard(
        profileDashboard
      );

      break;

    case 'input':

      await renderWargaForm();

      break;

    case 'data':

      await renderWargaTable();

      break;

    case 'account':

      await renderAccountPage();

      break;

    default:

      console.warn('Page tidak ditemukan');
  }
}

