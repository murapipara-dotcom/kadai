// ==========================================
// 1. スライドショー制御機能 (手動切替 + 自動再生)
// ==========================================
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
const slideCount = slides.length;
let slideInterval;
const autoSlideDelay = 6000; // 自動切替の間隔 (6秒)

// 指定インデックスのスライドを表示
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (dots[i]) dots[i].classList.remove("active");
  });

  // 0〜2の範囲をループさせる
  currentSlide = (index + slideCount) % slideCount;

  slides[currentSlide].classList.add("active");
  if (dots[currentSlide]) dots[currentSlide].classList.add("active");

  // 切り替わったスライドの中に動画がある場合、最初から再生させる
  const currentVideo = slides[currentSlide].querySelector("video");
  if (currentVideo) {
    currentVideo.currentTime = 0;
    currentVideo.play().catch((e) => console.log("Video play error:", e));
  }
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// 自動スライドタイマー
function startAutoSlide() {
  stopAutoSlide();
  slideInterval = setInterval(nextSlide, autoSlideDelay);
}

function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

// ボタンクリック時の挙動設定
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoSlide(); // 操作後タイマーリセット
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoSlide();
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const slideIndex = parseInt(e.target.getAttribute("data-slide"));
    showSlide(slideIndex);
    startAutoSlide();
  });
});

// 初期化（1枚目を表示＋自動スライド開始）
showSlide(0);
startAutoSlide();

// ==========================================
// 2. カウントダウンタイマー機能
// ==========================================
const targetDate = new Date(2026, 7, 22, 19, 0, 0).getTime(); // 2026年8月22日 19:00

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    const container = document.querySelector(".countdown-container");
    if (container) {
      container.innerHTML =
        '<p class="countdown-label" style="font-size:1.2rem; color:#ffda79;">本日開催！</p>';
    }
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("minutes");
  const sEl = document.getElementById("seconds");

  if (dEl) dEl.textContent = String(days).padStart(2, "0");
  if (hEl) hEl.textContent = String(hours).padStart(2, "0");
  if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
  if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
