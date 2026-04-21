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
  const slides = Array.from(document.querySelectorAll('.vid-slide'));
  const dots   = Array.from(document.querySelectorAll('.vid-dot'));
  const btnPrev = document.getElementById('vidPrev');
  const btnNext = document.getElementById('vidNext');
  if (!slides.length) return;

  let current = 0;

  function goTo(index) {
    // Pause the current video
    const curVideo = slides[current].querySelector('video');
    if (curVideo) curVideo.pause();

    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');

    // Play and autoplay the new slide's video
    const newVideo = slides[current].querySelector('video');
    if (newVideo) {
      newVideo.currentTime = 0;
      newVideo.play().catch(() => {});
    }

    if (btnPrev) btnPrev.disabled = current === 0;
    if (btnNext) btnNext.disabled = current === slides.length - 1;
  }

  if (btnPrev) btnPrev.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  if (btnNext) btnNext.addEventListener('click', () => { if (current < slides.length - 1) goTo(current + 1); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Init — play first video
  goTo(0);
})();
