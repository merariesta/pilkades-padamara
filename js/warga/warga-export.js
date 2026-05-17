/**
 * =========================================
 * EXPORT WARGA CSV
 * =========================================
 */

/**
 * Export warga ke CSV
 */
async function exportWargaCSV() {

  /**
   * Hanya admin
   */
  if (!isAdmin(currentProfile)) {

    alert(
      'Hanya admin yang dapat export data'
    );

    return;
  }

  /**
   * Ambil data sesuai filter aktif
   */
  const warga =
    await getWarga(
      wargaFilters
    );

  /**
   * Empty state
   */
  if (warga.length === 0) {

    alert(
      'Tidak ada data untuk di export'
    );

    return;
  }

  /**
   * Header CSV
   */
  const headers = [
    'Nama',
    'RW',
    'RT',
    'Status',
    'Nomor HP',
    'Catatan',
    'Tanggal'
  ];

  /**
   * Rows CSV
   */
  const rows = warga.map(
    item => [

      cleanCSV(item.nama),

      item.rw,

      item.rt,

      item.status,

      cleanCSV(
        item.nomor_hp || ''
      ),

      cleanCSV(
        item.catatan || ''
      ),

      formatDateCSV(
        item.created_at
      )
    ]
  );

  /**
   * Gabungkan CSV
   */
  const csvContent = [

    headers.join(','),

    ...rows.map(
      row => row.join(',')
    )

  ].join('\n');

  /**
   * BOM UTF-8
   * agar Excel aman
   */
  const blob = new Blob(
    [
      '\uFEFF' + csvContent
    ],
    {
      type:
        'text/csv;charset=utf-8;'
    }
  );

  /**
   * Buat filename
   */
  const today =
    new Date()
      .toISOString()
      .split('T')[0];

  const filename =
    wargaFilters.rw

      ? `data-rw-${wargaFilters.rw}-${today}.csv`

      : `data-warga-${today}.csv`;

  /**
   * Download file
   */
  const link =
    document.createElement(
      'a'
    );

  link.href =
    URL.createObjectURL(blob);

  link.download =
    filename;

  link.click();
}

/**
 * Clean CSV text
 */
function cleanCSV(text) {

  return `"${String(text)
    .replace(/"/g, '""')
  }"`;
}

/**
 * Format tanggal Indonesia
 */
function formatDateCSV(
  dateString
) {

  return new Date(
    dateString
  ).toLocaleDateString(
    'id-ID'
  );
}