/**
 * =========================================
 * TOAST NOTIFICATION
 * =========================================
 */

function showToast(
  message,
  type = 'success'
) {

  /**
   * Hapus toast lama
   */
  const oldToast =
    document.getElementById(
      'app-toast'
    );

  if (oldToast) {

    oldToast.remove();

  }

  /**
   * Warna toast
   */
  let bgColor =
    'bg-green-600';

  if (type === 'error') {

    bgColor =
      'bg-red-600';

  }

  /**
   * Create toast
   */
  const toast =
    document.createElement(
      'div'
    );

  toast.id =
    'app-toast';

  toast.className = `
    fixed
    top-5
    left-1/2
    -translate-x-1/2
    ${bgColor}
    text-white
    px-5
    py-3
    rounded-2xl
    shadow-lg
    z-50
    text-sm
    font-medium
  `;

  toast.innerText =
    message;

  /**
   * Tambah ke body
   */
  document.body.appendChild(
    toast
  );

  /**
   * Auto remove
   */
  setTimeout(() => {

    toast.remove();

  }, 2500);

}
