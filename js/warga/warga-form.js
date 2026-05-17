/**
 * =========================================
 * WARGA FORM LOGIC
 * =========================================
 */

let wilayahData = [];

/**
 * Setup dropdown RT
 */
function setupRTDropdown(data) {

  wilayahData = data;

  const rwSelect = document.getElementById('rw');

  const rtSelect = document.getElementById('rt');

  rwSelect.addEventListener('change', () => {

    const selectedRW = rwSelect.value;

    /**
     * Filter RT berdasarkan RW
     */
    const filteredRT = wilayahData.filter(
      item => item.rw === selectedRW
    );

    rtSelect.innerHTML = `
      <option value="">
        Pilih RT
      </option>
    `;

    filteredRT.forEach(item => {

      rtSelect.innerHTML += `
      
        <option value="${item.rt}">
          RT ${item.rt}
        </option>

      `;
    });

  });
}

/**
 * Setup submit form warga
 */
function setupWargaForm() {

  const form = document.getElementById(
    'warga-form'
  );

  form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const messageElement = document.getElementById(
      'form-message'
    );

    /**
     * Ambil profile login
     */
    const profile = await getCurrentProfile();

    /**
     * Payload data
     */
    const payload = {
      nama: document.getElementById('nama').value,
      rw: document.getElementById('rw').value,
      rt: document.getElementById('rt').value,
      status: document.getElementById('status').value,
      nomor_hp:
      document.getElementById(
        'nomor-hp'
      ).value,
      catatan: document.getElementById('catatan').value,
      input_by: profile.id
    };

    /**
     * Insert database
     */
    /**
 * Check duplicate
 */
const duplicateResult =
  await checkDuplicateWarga(
    payload.nama,
    payload.rw,
    payload.rt
  );

if (
  duplicateResult.duplicate
) {

  const confirmed = confirm(
    'Data dengan nama dan wilayah yang sama sudah ada. Tetap simpan data?'
  );

  if (!confirmed) {

    return;
  }
}
    const result = await insertWarga(payload);

    /**
     * Error
     */
    if (!result.success) {

      messageElement.textContent =
        'Gagal menyimpan data';

      messageElement.className =
        'text-red-600 text-sm mt-4';

      return;
    }

    /**
     * Success
     */
    messageElement.textContent =
      'Data berhasil disimpan';

    messageElement.className =
      'text-green-600 text-sm mt-4';

showToast(
  'Data warga berhasil disimpan'
);

    form.reset();

  });
}