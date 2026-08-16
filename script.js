
const firstCard = document.getElementById("firstCard");
const thankYouCard = document.getElementById("thankYouCard");
const dateCard = document.getElementById("dateCard");
const foodCard = document.getElementById("foodCard");
const celebrationCard = document.getElementById("celebrationCard");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const okayBtn = document.getElementById("okayBtn");
const setDateBtn = document.getElementById("setDateBtn");
const dateInput = document.getElementById("dateInput");
const giftBox = document.getElementById("giftBox");
const acceptBtn = document.getElementById("acceptBtn");
const blastLayer = document.getElementById("blastLayer");
const paymentCard = document.getElementById("paymentCard");
const payBtn = document.getElementById("payBtn");
const goBackBtn = document.getElementById("goBackBtn");
const qrCard = document.getElementById("qrCard");
const doneBtn = document.getElementById("doneBtn");

setDateBtn.disabled = true;

function updateSetDateButton() {
  setDateBtn.disabled = !dateInput.value;
}

dateInput.addEventListener("input", updateSetDateButton);

function createPaperBurst() {
  const burst = document.createElement("div");
  burst.className = "paper-burst";

  const colors = ["#ffb8cf", "#ffd9ea", "#191919", "#f7c0d5", "#2d2d2d", "#ffc0d5"];
  const cardRect = document.querySelector(".card").getBoundingClientRect();
  const centerX = cardRect.left + cardRect.width / 2;
  const centerY = cardRect.top + cardRect.height / 2;

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("span");
    piece.className = "paper-piece";
    piece.style.left = `${centerX}px`;
    piece.style.top = `${centerY}px`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--dx", `${(Math.random() - 0.5) * 1400}px`);
    piece.style.setProperty("--dy", `${(Math.random() - 0.5) * 1000}px`);
    piece.style.setProperty("--rot", `${(Math.random() * 720 - 360).toFixed(2)}deg`);
    burst.appendChild(piece);
  }

  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 3500);
}

function moveNoButton() {
  const padding = 16;
  const maxX = Math.max(10, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(10, window.innerHeight - noBtn.offsetHeight - padding);

  const nextX = Math.random() * maxX;
  const nextY = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;
  noBtn.style.right = "auto";
  noBtn.style.transform = "translateY(-8px) scale(1.04)";
  noBtn.style.transition = "left 0.28s ease, top 0.28s ease, transform 0.18s ease";

  setTimeout(() => {
    noBtn.style.transform = "translateY(0) scale(1)";
  }, 180);
}

noBtn.addEventListener("mouseenter", function () {
  moveNoButton();
});

noBtn.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  moveNoButton();
});

yesBtn.addEventListener("click", function () {
  createPaperBurst();
  firstCard.classList.add("hidden");
  thankYouCard.classList.remove("hidden");
});

okayBtn.addEventListener("click", function () {
  thankYouCard.classList.add("hidden");
  dateCard.classList.remove("hidden");
});

setDateBtn.addEventListener("click", function () {
  if (!dateInput.value) return;

  dateCard.classList.add("hidden");
  foodCard.classList.remove("hidden");
});

document.querySelectorAll(".food-item").forEach((foodItem) => {
  foodItem.addEventListener("click", () => {
    foodCard.classList.add("hidden");
    celebrationCard.classList.remove("hidden");
  });
});

giftBox.addEventListener("click", () => {
  if (giftBox.classList.contains("opened")) return;

  giftBox.classList.add("opened");

  setTimeout(() => {
    celebrationCard.classList.add("exploded");

    const emojis = ["💖", "🎁", "🧸", "💌", "✨", "🌷", "🎀", "💝", "🎉", "🫶", "💗", "🎈", "💞", "🩷", "🌹"];
    blastLayer.innerHTML = "";

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("span");
      particle.className = "blast-item";
      particle.textContent = emojis[i % emojis.length];

      const angle = (Math.PI * 2 * i) / 18;
      const radius = 250 + Math.random() * 700;

      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius - 30;

      particle.style.setProperty("--dx", `${dx}px`);
      particle.style.setProperty("--dy", `${dy}px`);
      particle.style.setProperty("--rot", `${(Math.random() * 360 - 180).toFixed(2)}deg`);
      particle.style.setProperty("--scale", `${(0.8 + Math.random() * 1.7).toFixed(2)}`);

      blastLayer.appendChild(particle);
    }
  }, 700);
});

acceptBtn.addEventListener("click", () => {
  celebrationCard.classList.add("hidden");
  paymentCard.classList.remove("hidden");
});

function dodgeGoBack() {
  const cardRect = paymentCard.getBoundingClientRect();
  const btnRect = goBackBtn.getBoundingClientRect();

  const maxX = Math.max(10, cardRect.width - btnRect.width - 20);
  const maxY = Math.max(10, cardRect.height - btnRect.height - 20);

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  goBackBtn.style.left = `${randomX - 80}px`;
  goBackBtn.style.top = `${randomY - 24}px`;
}

goBackBtn.addEventListener("pointerenter", (e) => {
  e.preventDefault();
  dodgeGoBack();
});

goBackBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dodgeGoBack();
});

goBackBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dodgeGoBack();
});

payBtn.addEventListener("click", () => {
  payBtn.textContent = "paid and confirmed 💖";
  payBtn.disabled = true;
  payBtn.style.opacity = "0.9";

  paymentCard.classList.add("hidden");
  qrCard.classList.remove("hidden");
});

const qrFrame = document.getElementById("qrFrame");

if (qrFrame) {
  qrFrame.addEventListener("pointermove", (event) => {
    const rect = qrFrame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 18;
    const rotateX = (0.5 - y) * 18;

    qrFrame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    qrFrame.style.boxShadow = `
      inset 0 1px 0 rgba(255,255,255,0.95),
      inset 0 -12px 16px rgba(255, 170, 203, 0.2),
      0 24px 30px rgba(216, 103, 148, 0.24),
      0 0 20px rgba(255, 168, 202, 0.38)
    `;
  });

  qrFrame.addEventListener("pointerleave", () => {
    qrFrame.style.transform = "rotateX(16deg) rotateY(-14deg)";
    qrFrame.style.boxShadow = `
      inset 0 1px 0 rgba(255,255,255,0.9),
      inset 0 -12px 16px rgba(255, 170, 203, 0.18),
      0 20px 28px rgba(216, 103, 148, 0.16),
      0 0 18px rgba(255, 168, 202, 0.2)
    `;
  });
}

doneBtn.addEventListener("click", () => {
  qrCard.classList.add("hidden");
  paymentCard.classList.remove("hidden");
});
