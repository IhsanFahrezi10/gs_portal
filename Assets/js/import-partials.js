// File: import-partials.js

// Fungsi ini akan dijalankan setelah semua konten partials berhasil dimuat
function setupEventListeners() {
  // Sekarang kita 100% yakin semua elemen ini sudah ada di halaman
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const sidebar = document.getElementById("sidebar"); // Ini adalah elemen <aside> dari sidebar.html
  const overlay = document.getElementById("overlay");

  function toggleSidebar() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  if (hamburgerBtn && sidebar && overlay) {
    hamburgerBtn.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);
    console.log("Event listeners berhasil dipasang!");
  } else {
    // Jika ada yang null, kita bisa tahu dari sini
    console.error("Salah satu elemen tidak ditemukan:", { hamburgerBtn, sidebar, overlay });
  }
}

// Fungsi utama untuk memuat semua partials
async function loadAllPartials() {
  try {
    // 1. Siapkan semua 'janji' fetch dalam satu array
    const [sidebarRes, headerRes] = await Promise.all([fetch("/Layout/Partials/sidebar.html"), fetch("/Layout/Partials/header.html")]);

    // 2. Ambil konten teks dari setiap respons
    const sidebarHtml = await sidebarRes.text();
    const headerHtml = await headerRes.text();

    // 3. Masukkan HTML ke dalam DOM
    // Pastikan di file HTML utamamu ada <div id="sidebar-placeholder"></div> dan <div id="header-placeholder"></div>
    document.getElementById("sidebar-placeholder").innerHTML = sidebarHtml;
    document.getElementById("header-placeholder").innerHTML = headerHtml;

    // 4. Setelah SEMUA partials dijamin sudah ada di DOM, baru kita pasang event listener-nya
    setupEventListeners();
  } catch (error) {
    console.error("Gagal memuat partials:", error);
  }
}

// Jalankan fungsi utama saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", loadAllPartials);
