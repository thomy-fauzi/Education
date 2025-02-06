function formatTanggal(tanggalAwal) {
    const date = new Date(tanggalAwal);
    const tahun = date.getFullYear();
    const bulan = String(date.getMonth() + 1).padStart(2, '0');
    const hari = String(date.getDate()).padStart(2, '0');
  
    return `${tahun}-${bulan}-${hari}`;
  }

  module.exports = formatTanggal