/**
 * =========================================
 * APPLICATION ENTRY POINT
 * =========================================
 */

/**
 * Global current profile
 */
let currentProfile = null;

document.addEventListener(
  'DOMContentLoaded',
  async () => {

    console.log('Application started');

    /**
     * Pastikan user login
     */
    await requireAuth();

    /**
     * Ambil profile user
     */
    currentProfile =
      await getCurrentProfile();

    if (!currentProfile) {

      console.error(
        'Profile tidak ditemukan'
      );

      return;
    }

    /**
     * Render user info
     */
    renderUserInfo(
      currentProfile
    );

    /**
     * Render bottom navigation
     */
    document.getElementById(
      'bottom-navigation'
    ).innerHTML =
      renderBottomNavigation();

    /**
     * Default halaman awal
     */
    await renderDashboard(
      currentProfile
    );

  }
);

/**
 * Render informasi user login
 */
function renderUserInfo(profile) {

  const userInfo =
    document.getElementById(
      'user-info'
    );

  userInfo.textContent = `
    ${profile.nama}
    (${profile.role})
  `;
}

/**
 * =========================================
 * PAGE NAVIGATION
 * =========================================
 */

/**
 * Handle navigation
 */
async function navigateTo(
  page
) {

  /**
   * Dashboard
   */
  if (
    page === 'dashboard'
  ) {

    await renderDashboard(
      currentProfile
    );

  }

/**
 * Analytics
 */
else if (
  page === 'analytics'
) {

  await renderAnalyticsPage();

}

  /**
   * Input data
   */
  else if (
    page === 'input'
  ) {

    renderWargaForm();

  }

  /**
   * Data warga
   */
  else if (
    page === 'data'
  ) {

    await renderWargaTable();

  }

  /**
   * Account
   */
  else if (
    page === 'account'
  ) {

    renderAccountPage();

  }

}

