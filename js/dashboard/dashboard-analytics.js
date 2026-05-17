/**
 * =========================================
 * ANALYTICS PAGE
 * =========================================
 */

async function renderAnalyticsPage() {

  const dashboardContent =
    document.getElementById(
      'dashboard-content'
    );

  /**
   * Loading
   */
  dashboardContent.innerHTML = `
    <p>Loading analytics...</p>
  `;

  /**
   * Get stats
   */
  const stats =
    await getDashboardStats();

  /**
   * Get target
   */
  const settings =
    await getTargetKemenangan();

  const target =
    settings?.target_kemenangan || 0;

  /**
   * Progress
   */
  const progress =
    target > 0

      ? Math.round(
          (stats.siap / target) * 100
        )

      : 0;

/**
 * Statistik per RW
 */
const rwStats = {

  rw1: 0,
  rw2: 0,
  rw3: 0

};

/**
 * Ambil data warga
 */
const wargaData =
  await getWarga();

/**
 * Hitung data siap per RW
 */
wargaData.forEach((item) => {

  if (
    item.status === 'siap'
  ) {

    if (item.rw == 1) {

      rwStats.rw1++;

    }

    else if (
      item.rw == 2
    ) {

      rwStats.rw2++;

    }

    else if (
      item.rw == 3
    ) {

      rwStats.rw3++;

    }

  }

});

  /**
   * Render UI
   */
  dashboardContent.innerHTML = `
  
    <div class="space-y-4">

      <!-- Hero -->
      <div class="
        bg-gradient-to-r
        from-red-600
        to-red-500
        rounded-2xl
        p-5
        text-white
      ">

        <p class="text-sm opacity-80">
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

        <p class="mt-2">
          ${progress}% tercapai
        </p>

      </div>

      <!-- Statistik -->
      <div class="
        grid
        grid-cols-2
        gap-3
      ">

        <div class="
          bg-white
          rounded-2xl
          p-4
          shadow-sm
        ">
          <p class="text-sm text-gray-500">
            Siap
          </p>

          <h2 class="
            text-2xl
            font-bold
            text-green-600
          ">
            ${stats.siap}
          </h2>
        </div>

        <div class="
          bg-white
          rounded-2xl
          p-4
          shadow-sm
        ">
          <p class="text-sm text-gray-500">
            Ragu
          </p>

          <h2 class="
            text-2xl
            font-bold
            text-yellow-500
          ">
            ${stats.ragu}
          </h2>
        </div>

        <div class="
          bg-white
          rounded-2xl
          p-4
          shadow-sm
        ">
          <p class="text-sm text-gray-500">
            Tolak
          </p>

          <h2 class="
            text-2xl
            font-bold
            text-red-600
          ">
            ${stats.tolak}
          </h2>
        </div>

        <div class="
          bg-white
          rounded-2xl
          p-4
          shadow-sm
        ">
          <p class="text-sm text-gray-500">
            Pending
          </p>

          <h2 class="
            text-2xl
            font-bold
            text-gray-600
          ">
            ${stats.pending}
          </h2>
        </div>

      </div>

      <!-- Pie Chart -->
      <div class="
        bg-white
        rounded-2xl
        p-4
        shadow-sm
      ">

        <h2 class="
          text-lg
          font-bold
          mb-4
        ">
          Grafik Dukungan
        </h2>

        <canvas
          id="support-chart"
        ></canvas>

      </div>

    </div>

<!-- RW Chart -->
<div class="
  bg-white
  rounded-2xl
  p-4
  shadow-sm
">

  <h2 class="
    text-lg
    font-bold
    mb-4
  ">
    Dukungan per RW
  </h2>

  <canvas
    id="rw-chart"
  ></canvas>

</div>
  
  `;

  /**
   * Render chart
   */
  const ctx =
    document.getElementById(
      'support-chart'
    );

  new Chart(ctx, {

    type: 'pie',

    data: {

      labels: [
        'Siap',
        'Ragu',
        'Tolak'
      ],

      datasets: [

        {

          data: [

            stats.siap,
            stats.ragu,
            stats.tolak

          ],

          backgroundColor: [

            '#16a34a',
            '#f59e0b',
            '#dc2626'

          ]

        }

      ]

    },

    options: {

      responsive: true,

      plugins: {

        legend: {

          position: 'bottom'

        }

      }

    }

  });
/**
 * RW Chart
 */
const rwCtx =
  document.getElementById(
    'rw-chart'
  );

new Chart(rwCtx, {

  type: 'bar',

  data: {

    labels: [
      'RW 1',
      'RW 2',
      'RW 3'
    ],

    datasets: [

      {

        label: 'Dukungan Siap',

        data: [

          rwStats.rw1,
          rwStats.rw2,
          rwStats.rw3

        ]

      }

    ]

  },

  options: {

    responsive: true

  }

});
}



