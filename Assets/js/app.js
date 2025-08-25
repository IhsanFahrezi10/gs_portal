// document.addEventListener("DOMContentLoaded", function () {
//   const hamburgerBtn = document.getElementById("hamburger-btn");
//   const sidebar = document.getElementById("sidebar");
//   const overlay = document.getElementById("overlay");

//   function toggleSidebar() {
//     sidebar.classList.toggle("active");
//     overlay.classList.toggle("active");
//   }

//   if (hamburgerBtn && sidebar && overlay) {
//     hamburgerBtn.addEventListener("click", toggleSidebar);
//     overlay.addEventListener("click", toggleSidebar);
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const dotsContainer = document.getElementById("pagination-dots");

  // Check if elements exist
  if (!track || !prevBtn || !nextBtn || !dotsContainer) {
    console.error("Carousel elements not found!");
    return;
  }

  const cards = Array.from(track.children);
  let cardWidth = 0;
  let cardsToShow = 4; // Default for desktop
  let currentIndex = 0;
  let totalPages = 0;

  function calculateCarousel() {
    // Recalculate dimensions
    cardWidth = cards[0].getBoundingClientRect().width;
    const containerWidth = track.parentElement.offsetWidth;

    // Adjust cards to show based on screen size
    if (window.innerWidth < 768) {
      cardsToShow = 1;
    } else {
      // On larger screens, calculate how many can fit
      cardsToShow = Math.max(1, Math.floor(containerWidth / (cardWidth + 16))); // 16 for margin
    }

    totalPages = Math.ceil(cards.length / cardsToShow);

    // Clear and recreate dots
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.classList.add("w-2", "h-2", "bg-white", "rounded-full", "transition-opacity");
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }

    // Ensure currentIndex is not out of bounds
    if (currentIndex >= totalPages) {
      currentIndex = totalPages - 1;
    }

    updateCarousel();
  }

  // --- Update Carousel Function ---
  const updateCarousel = () => {
    const dots = Array.from(dotsContainer.children);
    const containerWidth = track.parentElement.offsetWidth;
    const offset = -currentIndex * (containerWidth + 16); // Slide by container width + gap

    track.style.transform = `translateX(${offset}px)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.style.opacity = index === currentIndex ? "1" : "0.5";
    });

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    prevBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
    nextBtn.disabled = currentIndex >= totalPages - 1;
    nextBtn.style.opacity = currentIndex >= totalPages - 1 ? "0.3" : "1";
  };

  // --- Event Listeners ---
  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalPages - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // --- Recalculate on Resize ---
  window.addEventListener("resize", calculateCarousel);

  // --- Initial Load ---
  calculateCarousel();
});

// Asumsikan sidebar adalah elemen yang akan memicu event
const sidebar = document.getElementById("sidebar");
const container = document.querySelector(".contain");

// Saat kursor masuk ke area sidebar, tambahkan class
sidebar.addEventListener("mouseenter", () => {
  container.classList.add("sidebar-open");
});

// Saat kursor keluar dari area sidebar, hapus class
sidebar.addEventListener("mouseleave", () => {
  container.classList.remove("sidebar-open");
});
