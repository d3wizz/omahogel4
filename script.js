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
  const track = document.getElementById('vidTrack');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.vid-slide'));
  const dots   = Array.from(document.querySelectorAll('.vid-dot'));
  const btnPrev = document.getElementById('vidPrev');
  const btnNext = document.getElementById('vidNext');
  let current = 0;

  function getOffset(index) {
    // Center the active slide inside the wrapper
    const wrap = track.parentElement;
    const wrapW = wrap.offsetWidth;
    const slideW = slides[0].offsetWidth;
    const gap = 24;
    // total width of slides before current
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += slides[i].offsetWidth + gap;
    }
    // shift so active slide is centered
    const center = offset - (wrapW / 2) + (slideW / 2);
    return Math.max(0, center);
  }

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    track.style.transform = `translateX(-${getOffset(current)}px)`;
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === slides.length - 1;
  }

  btnPrev.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  btnNext.addEventListener('click', () => { if (current < slides.length - 1) goTo(current + 1); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.dot)));
  });

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => { if (i !== current) goTo(i); });
  });

  // Recalc on resize
  window.addEventListener('resize', () => goTo(current));

  // Init
  goTo(0);
})();
