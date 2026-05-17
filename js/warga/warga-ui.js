/**
 * =========================================
 * WARGA UI
 * =========================================
 */

/**
 * Render form input warga
 */
async function renderWargaForm() {

  const dashboardContent = document.getElementById(
    'dashboard-content'
  );

  /**
   * Ambil data wilayah
   */
  const wilayah = await getWilayah();

  /**
   * Generate options RW
   */
  const rwOptions = [...new Set(
    wilayah.map(item => item.rw)
  )];

  dashboardContent.innerHTML = `
  
    <div class="bg-white rounded-xl">

      <h2 class="text-lg font-bold mb-4">
        Input Data Warga
      </h2>

      <form
        id="warga-form"
        class="space-y-4"
      >

        <!-- Nama -->
        <div>

          <label class="block text-sm mb-1">
            Nama Warga
          </label>

          <input
            type="text"
            id="nama"
            class="w-full border rounded-lg px-3 py-2"
            required
          />

        </div>

        <!-- RW -->
        <div>

          <label class="block text-sm mb-1">
            RW
          </label>

          <select
            id="rw"
            class="w-full border rounded-lg px-3 py-2"
            required
          >

            <option value="">
              Pilih RW
            </option>

            ${rwOptions.map(rw => `
              <option value="${rw}">
                RW ${rw}
              </option>
            `).join('')}

          </select>

        </div>

        <!-- RT -->
        <div>

          <label class="block text-sm mb-1">
            RT
          </label>

          <select
            id="rt"
            class="w-full border rounded-lg px-3 py-2"
            required
          >

            <option value="">
              Pilih RT
            </option>

          </select>

        </div>

        <!-- Status -->
        <div>

          <label class="block text-sm mb-1">
            Status Dukungan
          </label>

          <select
            id="status"
            class="w-full border rounded-lg px-3 py-2"
            required
          >

            <option value="siap">
              Siap
            </option>

            <option value="ragu">
              Ragu
            </option>

            <option value="tolak">
              Tolak
            </option>

          </select>

        </div>

        <!-- Catatan -->
        <div>

          <label class="block text-sm mb-1">
            Catatan
          </label>

          <textarea
            id="catatan"
            rows="3"
            class="w-full border rounded-lg px-3 py-2"
          ></textarea>

        </div>
            
      <!-- Nomor HP -->
      <div>

        <label class="
          block
          text-sm
          font-medium
          mb-1
        ">
          Nomor HP
        </label>

        <input
          type="text"
          id="nomor-hp"
          placeholder="08xxxxxxxxxx"
          class="
            w-full
            border
            rounded-xl
            px-3
            py-2
          "
        />

      </div>
        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Simpan Data
        </button>

      </form>

      <!-- Message -->
      <p
        id="form-message"
        class="text-sm mt-4"
      ></p>

    </div>

  `;

  /**
   * Setup RT dropdown
   */
  setupRTDropdown(wilayah);

  /**
   * Setup submit form
   */
  setupWargaForm();
}