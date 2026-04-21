// Intersection Observer for fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  const btn = document.getElementById("donateBtn");

  btn.addEventListener("click", function(e) {
    e.preventDefault();

    // Ubah teks
    btn.innerHTML = "💛 Terima Kasih Sudah Peduli";

    // Disable klik ulang
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.8";

    // Scroll ke donasi
    document.querySelector("#donasi").scrollIntoView({
      behavior: "smooth"
    });
  });

  const track = document.querySelector(".carousel-track");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: 320, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -320, behavior: "smooth" });
  });

// ===== VIDEO CAROUSEL =====
(function() {
  const stage   = document.getElementById('vidStage');
  const slides  = Array.from(document.querySelectorAll('.vid-slide'));
  const dots    = Array.from(document.querySelectorAll('.vid-dot'));
  const btnPrev = document.getElementById('vidPrev');
  const btnNext = document.getElementById('vidNext');
  if (!slides.length || !stage) return;

  let current = 0;

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;

    // Pause current video
    const curVideo = slides[current].querySelector('video');
    if (curVideo) curVideo.pause();

    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');

    // Play new video from start
    const newVideo = slides[current].querySelector('video');
    if (newVideo) {
      newVideo.currentTime = 0;
      newVideo.play().catch(() => {});
    }

    if (btnPrev) btnPrev.disabled = current === 0;
    if (btnNext) btnNext.disabled = current === slides.length - 1;
  }

  // Button clicks
  if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
  if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));

  // Dot clicks
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // ===== TOUCH SWIPE SUPPORT =====
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping   = false;

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = true;
  }, { passive: true });

  stage.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const diffX = touchStartX - e.touches[0].clientX;
    const diffY = touchStartY - e.touches[0].clientY;
    // Jika gerak horizontal lebih dominan, cegah scroll vertikal
    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
    }
  }, { passive: false });

  stage.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const THRESHOLD = 50; // minimal jarak swipe (px)

    if (Math.abs(diffX) < THRESHOLD) return; // tap biasa, abaikan

    if (diffX > 0) {
      // Swipe ke kiri → slide berikutnya
      goTo(current + 1);
    } else {
      // Swipe ke kanan → slide sebelumnya
      goTo(current - 1);
    }
  }, { passive: true });

  // Init — play first video
  goTo(0);
})();
