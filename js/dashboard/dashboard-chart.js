```javascript
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
   * Loading state
   */
  dashboardContent.innerHTML = `
    <p>Loading analytics...</p>
  `;

  /**
   * Get dashboard stats
   */
  const stats =
    await getDashboardStats();

  /**
   * Render analytics UI
   */
  dashboardContent.innerHTML = `
  
    <div class="
      bg-white
      rounded-2xl
      shadow-sm
      p-4
    ">

      <h2 class="
        text-lg
        font-bold
        mb-4
      ">
        Statistik Dukungan
      </h2>

      <canvas
        id="status-chart"
        height="300"
      ></canvas>

    </div>

  `;

  /**
   * Chart element
   */
  const ctx =
    document.getElementById(
      'status-chart'
    );

  /**
   * Render pie chart
   */
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

}
```
