/**
 * =========================================
 * ACCOUNT PAGE
 * =========================================
 */

/**
 * Render halaman account
 */
async function renderAccountPage() {

  const dashboardContent = document.getElementById(
    'dashboard-content'
  );

  const profile = await getCurrentProfile();

  dashboardContent.innerHTML = `
  
    <div class="
      bg-white
      rounded-xl
      p-5
      shadow-sm
    ">

      <h2 class="text-xl font-bold mb-4">
        Account
      </h2>

      <div class="space-y-2">

        <p>
          <strong>Nama:</strong>
          ${profile.nama}
        </p>

        <p>
          <strong>Email:</strong>
          ${profile.email}
        </p>

        <p>
          <strong>Role:</strong>
          ${profile.role}
        </p>

      </div>

      <button
        onclick="logout()"
        class="
          mt-6
          w-full
          bg-red-600
          text-white
          py-3
          rounded-xl
        "
      >
        Logout
      </button>

    </div>

  `;
}