/**
 * =========================================
 * ROLE UTILITIES
 * =========================================
 */

/**
 * Cek apakah role admin
 */
function isAdmin(profile) {

  return profile.role === ROLES.ADMIN;
}

/**
 * Cek apakah role relawan
 */
function isRelawan(profile) {

  return profile.role === ROLES.RELAWAN;
}

/**
 * Cek apakah role pengawas
 */
function isPengawas(profile) {

  return profile.role === ROLES.PENGAWAS;
}