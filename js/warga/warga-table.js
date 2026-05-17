/**
 * =========================================
 * WARGA TABLE UI
 * FINAL STABLE VERSION
 * =========================================
 */

/**
 * Global filter state
 */
let wargaFilters = {
  search: '',
  rw: '',
  approval_status: ''
};

/**
 * Render list data warga
 */
async function renderWargaTable() {

  const dashboardContent =
    document.getElementById(
      'dashboard-content'
    );

  /**
   * Loading state
   */
  dashboardContent.innerHTML = `
    <p>Loading data...</p>
  `;

  /**
   * Ambil data warga
   */
  const warga =
    await getWarga(wargaFilters);

  /**
   * Empty state
   */
  if (warga.length === 0) {

    dashboardContent.innerHTML = `
    ${
  isAdmin(currentProfile)

    ? `

      <div class="mb-4">

        <button
          onclick="exportWargaCSV()"
          class="
            w-full
            bg-green-600
            text-white
            py-3
            rounded-2xl
            font-medium
            shadow-sm
          "
        >
          Export Excel CSV
        </button>

      </div>

    `
    : ''
}
      ${renderFilterSection()}



      <div class="
        bg-white
        rounded-xl
        p-6
        text-center
        shadow-sm
      ">

        <p class="text-gray-500">
          Data tidak ditemukan
        </p>

      </div>

    `;

    setupWargaFilters();

    return;
  }

  /**
   * Render data list
   */
/**
 * Render data list
 */
dashboardContent.innerHTML = `
  
  ${renderFilterSection()}

  ${
    isAdmin(currentProfile)

      ? `

        <div class="mb-4">

          <button
            onclick="exportWargaCSV()"
            class="
              w-full
              bg-green-600
              text-white
              py-3
              rounded-2xl
              font-medium
              shadow-sm
            "
          >
            Export Excel CSV
          </button>

        </div>

      `
      : ''
  }

  <div class="space-y-3">

    ${warga.map(item =>
      renderWargaCard(item)
    ).join('')}

  </div>

`;
  /**
   * Setup filter listeners
   */
  setupWargaFilters();
}

/**
 * Render filter section
 */
function renderFilterSection() {

  return `
  
    <div class="
      bg-white
      rounded-2xl
      shadow-sm
      p-4
      mb-4
    ">

      <!-- Search -->
      <input
        type="text"
        id="search-input"
        placeholder="Cari nama warga..."
        value="${wargaFilters.search}"
        class="
          w-full
          border
          rounded-xl
          px-4
          py-3
          mb-3
        "
      />

      <!-- Filters -->
      <div class="grid grid-cols-2 gap-3">

        <!-- RW -->
        <select
          id="filter-rw"
          class="
            border
            rounded-xl
            px-3
            py-3
          "
        >

          <option value="">
            Semua RW
          </option>

          <option
            value="1"
            ${
              wargaFilters.rw === '1'
              ? 'selected'
              : ''
            }
          >
            RW 1
          </option>

          <option
            value="2"
            ${
              wargaFilters.rw === '2'
              ? 'selected'
              : ''
            }
          >
            RW 2
          </option>

          <option
            value="3"
            ${
              wargaFilters.rw === '3'
              ? 'selected'
              : ''
            }
          >
            RW 3
          </option>

        </select>

        <!-- Approval -->
        <select
          id="filter-approval"
          class="
            border
            rounded-xl
            px-3
            py-3
          "
        >

          <option value="">
            Semua Status
          </option>

          <option
            value="pending"
            ${
              wargaFilters.approval_status
              === 'pending'
              ? 'selected'
              : ''
            }
          >
            Pending
          </option>

          <option
            value="approved"
            ${
              wargaFilters.approval_status
              === 'approved'
              ? 'selected'
              : ''
            }
          >
            Approved
          </option>

          <option
            value="rejected"
            ${
              wargaFilters.approval_status
              === 'rejected'
              ? 'selected'
              : ''
            }
          >
            Rejected
          </option>

        </select>

      </div>

    </div>

  `;
}

/**
 * Render card data warga
 */
function renderWargaCard(item) {

  return `
  
    <div class="
      bg-white
      rounded-2xl
      shadow-sm
      p-4
    ">

      <!-- Top -->
      <div class="
        flex
        justify-between
        items-start
        gap-3
      ">

        <!-- Left -->
        <div class="flex-1">

          <h3 class="
            font-bold
            text-base
            leading-tight
          ">
            ${item.nama}
          </h3>

          <p class="
            text-xs
            text-gray-400
            mt-1
          ">
            ${formatDate(item.created_at)}
          </p>
          ${
            item.nomor_hp

              ? `

                <p class="
                  text-xs
                  text-gray-500
                  mt-1
                ">
                  ${item.nomor_hp}
                </p>

              `
              : ''
          }
        </div>

<!-- Actions -->
<div class="
  flex
  gap-2
">

  <!-- Edit -->
  <button
    onclick='openEditModal(
      ${JSON.stringify(item)}
    )'
    class="
      bg-blue-600
      text-white
      text-xs
      px-3
      py-1.5
      rounded-lg
    "
  >
    Edit
  </button>

  ${
    isAdmin(currentProfile)

      ? `

        <!-- Delete -->
        <button
          onclick="
            confirmDeleteWarga(
              '${item.id}'
            )
          "
          class="
            bg-red-600
            text-white
            text-xs
            px-3
            py-1.5
            rounded-lg
          "
        >
          Hapus
        </button>

      `
      : ''
  }

</div>

      </div>

      <!-- Middle -->
      <div class="
        mt-4
        flex
        items-center
        justify-between
      ">

        <!-- Wilayah -->
        <div>

          <p class="
            text-sm
            font-medium
          ">
            RW ${item.rw}
          </p>

          <p class="
            text-xs
            text-gray-500
          ">
            RT ${item.rt}
          </p>

        </div>
        <!-- Status -->
        <div class="
          flex
          gap-2
          flex-wrap
          justify-end
        ">

          ${renderStatusBadge(
            item.status
          )}

          ${renderApprovalBadge(
            item.approval_status
          )}

        </div>

      </div>

      <!-- Approval Actions -->
      ${
        isAdmin(currentProfile)
        && item.approval_status === 'pending'

          ? `

            <div class="
              mt-4
              flex
              gap-2
            ">

              <button
                onclick="
                  approveWarga(
                    '${item.id}'
                  )
                "
                class="
                  flex-1
                  bg-green-600
                  text-white
                  py-2
                  rounded-xl
                  text-sm
                  font-medium
                "
              >
                Approve
              </button>

              <button
                onclick="
                  rejectWarga(
                    '${item.id}'
                  )
                "
                class="
                  flex-1
                  bg-red-600
                  text-white
                  py-2
                  rounded-xl
                  text-sm
                  font-medium
                "
              >
                Reject
              </button>

            </div>

          `
          : ''
      }

    </div>

  `;
}

/**
 * Setup filter listeners
 */
function setupWargaFilters() {

  const searchInput =
    document.getElementById(
      'search-input'
    );

  const filterRW =
    document.getElementById(
      'filter-rw'
    );

  const filterApproval =
    document.getElementById(
      'filter-approval'
    );

  /**
   * Search realtime
   */
  searchInput.addEventListener(
    'input',
    debounce(async (event) => {

      wargaFilters.search =
        event.target.value;

      await renderWargaTable();

    }, 400)
  );

  /**
   * Filter RW
   */
  filterRW.addEventListener(
    'change',
    async (event) => {

      wargaFilters.rw =
        event.target.value;

      await renderWargaTable();

    }
  );

  /**
   * Filter approval
   */
  filterApproval.addEventListener(
    'change',
    async (event) => {

      wargaFilters.approval_status =
        event.target.value;

      await renderWargaTable();

    }
  );
}

/**
 * Badge status dukungan
 */
function renderStatusBadge(status) {

  const styles = {
    siap: 'bg-green-100 text-green-700',
    ragu: 'bg-yellow-100 text-yellow-700',
    tolak: 'bg-red-100 text-red-700'
  };

  return `
  
    <span class="
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      whitespace-nowrap
      ${styles[status]}
    ">
      ${status}
    </span>

  `;
}

/**
 * Badge approval
 */
function renderApprovalBadge(status) {

  const styles = {
    pending: 'bg-gray-100 text-gray-700',
    approved: 'bg-blue-100 text-blue-700',
    rejected: 'bg-red-100 text-red-700'
  };

  return `
  
    <span class="
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      whitespace-nowrap
      ${styles[status]}
    ">
      ${status}
    </span>

  `;
}

/**
 * Debounce helper
 */
function debounce(callback, delay) {

  let timeout;

  return (...args) => {

    clearTimeout(timeout);

    timeout = setTimeout(() => {

      callback(...args);

    }, delay);
  };
}

/**
 * Approve data warga
 */
async function approveWarga(wargaId) {

  const result =
    await updateApprovalStatus(
      wargaId,
      APPROVAL_STATUS.APPROVED,
      currentProfile.id
    );

  if (!result.success) {

    alert('Gagal approve data');

    return;
  }

  await renderWargaTable();
}

/**
 * Reject data warga
 */
async function rejectWarga(wargaId) {

  const result =
    await updateApprovalStatus(
      wargaId,
      APPROVAL_STATUS.REJECTED,
      currentProfile.id
    );

  if (!result.success) {

    alert('Gagal reject data');

    return;
  }

  await renderWargaTable();
}

/**
 * Open edit modal
 */
function openEditModal(item) {

  const existingModal =
    document.getElementById(
      'edit-modal'
    );

  if (existingModal) {

    existingModal.remove();
  }

  const modal =
    document.createElement(
      'div'
    );

  modal.id = 'edit-modal';

  modal.innerHTML = `
  
    <div class="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      p-4
    ">

      <div class="
        bg-white
        rounded-2xl
        p-5
        w-full
        max-w-md
      ">

        <h2 class="
          text-lg
          font-bold
          mb-4
        ">
          Edit Data
        </h2>

        <form
          id="edit-form"
          class="space-y-4"
        >

          <input
            type="text"
            id="edit-nama"
            value="${item.nama}"
            class="
              w-full
              border
              rounded-xl
              px-3
              py-2
            "
          />


        <select
          id="edit-rw"
          class="w-full border rounded-xl px-4 py-3"
        >
          <option value="1" ${item.rw == 1 ? 'selected' : ''}>
            RW 1
          </option>

          <option value="2" ${item.rw == 2 ? 'selected' : ''}>
            RW 2
          </option>

          <option value="3" ${item.rw == 3 ? 'selected' : ''}>
            RW 3
          </option>
        </select>

        <select
          id="edit-rt"
          class="w-full border rounded-xl px-4 py-3"
        >
          <option value="1" selected>
            RT 1
          </option>

          <option value="2">
            RT 2
          </option>

          <option value="3">
            RT 3
          </option>

          <option value="4">
            RT 4
          </option>
        </select>



          <!-- Nomor HP -->
          <input
            type="text"
            id="edit-nomor-hp"
            value="${item.nomor_hp || ''}"
            placeholder="08xxxxxxxxxx"
            class="
              w-full
              border
              rounded-xl
              px-3
              py-2
            "
          />
          <select
            id="edit-status"
            class="
              w-full
              border
              rounded-xl
              px-3
              py-2
            "
          >

            <option
              value="siap"
              ${
                item.status === 'siap'
                ? 'selected'
                : ''
              }
            >
              Siap
            </option>

            <option
              value="ragu"
              ${
                item.status === 'ragu'
                ? 'selected'
                : ''
              }
            >
              Ragu
            </option>

            <option
              value="tolak"
              ${
                item.status === 'tolak'
                ? 'selected'
                : ''
              }
            >
              Tolak
            </option>

          </select>

          <textarea
            id="edit-catatan"
            rows="3"
            class="
              w-full
              border
              rounded-xl
              px-3
              py-2
            "
          >${item.catatan || ''}</textarea>

          <div class="
            flex
            gap-2
          ">

            <button
              type="submit"
              class="
                flex-1
                bg-blue-600
                text-white
                py-2.5
                rounded-xl
              "
            >
              Simpan
            </button>

            <button
              type="button"
              onclick="closeEditModal()"
              class="
                flex-1
                bg-gray-200
                py-2.5
                rounded-xl
              "
            >
              Batal
            </button>

          </div>

        </form>

      </div>

    </div>

  `;

  document.body.appendChild(
    modal
  );

  /**
   * Submit edit
   */
  document.getElementById(
    'edit-form'
  ).addEventListener(
    'submit',
    async (event) => {

      event.preventDefault();

      const payload = {

        nama:
          document.getElementById(
            'edit-nama'
          ).value,

        rw:
          document.getElementById(
            'edit-rw'
          ).value,

        rt:
          document.getElementById(
            'edit-rt'
          ).value,

        status:
          document.getElementById(
            'edit-status'
          ).value,
        nomor_hp:
          document.getElementById(
            'edit-nomor-hp'
          ).value,
        catatan:
          document.getElementById(
            'edit-catatan'
          ).value
      };

      const result =
        await updateWarga(
          item.id,
          payload
        );

      if (!result.success) {

        alert(
          'Gagal update data'
        );

        return;
      }

      closeEditModal();

      await renderWargaTable();

    }
  );
}

/**
 * Close modal
 */
function closeEditModal() {

  const modal =
    document.getElementById(
      'edit-modal'
    );

  if (modal) {

    modal.remove();
  }
}

/**
 * Format tanggal
 */
function formatDate(dateString) {

  const date =
    new Date(dateString);

  return date.toLocaleDateString(
    'id-ID'
  );
}
/**
 * Confirm delete warga
 */
async function confirmDeleteWarga(
  wargaId
) {

  const confirmed = confirm(
    'Yakin ingin menghapus data ini?'
  );

  if (!confirmed) {

    return;
  }

  const result =
    await deleteWarga(
      wargaId
    );

  if (!result.success) {

    alert(
      'Gagal menghapus data'
    );

    return;
  }

  alert(
    'Data berhasil dihapus'
  );

  await renderWargaTable();
}