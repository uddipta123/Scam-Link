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
const finalPage = document.getElementById("finalPage");
const bookDateBtn = document.getElementById("bookDateBtn");
const celebrationObject = document.getElementById("celebrationObject");
const finalParticles = document.getElementById("finalParticles");
const finalMessage = document.getElementById("finalMessage");
const readyText = document.getElementById("readyText");
const replayBtn = document.getElementById("replayBtn");

const EMAIL_CONFIG = {
  publicKey: "YOUR_PUBLIC_KEY",
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  toEmail: "uddiptachoudhury682@gmail.com"
};

let selectedDate = "";
let selectedFood = "";

setDateBtn.disabled = true;

function updateSetDateButton() {
  setDateBtn.disabled = !dateInput.value;
}

dateInput.addEventListener("input", function () {
  selectedDate = dateInput.value;
  updateSetDateButton();
});

// Create lots of paper pieces and animate them flying out from the center of the card

function createPaperBurst() {
  const burst = document.createElement("div");
  burst.className = "paper-burst";

  const colors = ["#ffb8cf", "#ffd9ea", "#191919", "#f7c0d5", "#2d2d2d", "#ffc0d5","#ffb8cf",
    "#ffd9ea",
    "#191919",
    "#f7c0d5",
    "#2d2d2d",
    "#ffc0d5",
    "#ffffff",
    "#ff8fbd"];
  const cardRect = document.querySelector(".card").getBoundingClientRect();
  const centerX = cardRect.left + cardRect.width / 2;
  const centerY = cardRect.top + cardRect.height / 2;

  for (let i = 0; i < 180; i++) {
    const piece = document.createElement("span");
    piece.className = "paper-piece";
    piece.style.left = `${centerX}px`;
    piece.style.top = `${centerY}px`;
    const angle = Math.random() * Math.PI * 2;
    const distance =
      Math.max(window.innerWidth, window.innerHeight) *
      (0.8 + Math.random() * 1.2);

    const dx = Math.cos(angle) * distance;
    const dy =
      Math.sin(angle) * distance +
      window.innerHeight * (0.5 + Math.random());


    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--dx", `${(Math.random() - 0.5) * 500}px`);
    piece.style.setProperty("--dy", `${(Math.random() - 0.5) * 420}px`);
    piece.style.setProperty("--rot", `${(Math.random() * 360 - 180).toFixed(2)}deg`);
    burst.appendChild(piece);
  }

  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 2200);
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
    selectedFood = foodItem.dataset.food || foodItem.textContent.trim();
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

    for (let i = 0; i < 18; i++) {
      const particle = document.createElement("span");
      particle.className = "blast-item";
      particle.textContent = emojis[i % emojis.length];

      const angle = (Math.PI * 2 * i) / 18;
      const radius = 80 + Math.random() * 260;

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

function fallbackMailto(summary) {
  const subject = encodeURIComponent("Date Confirmation Summary");
  const body = encodeURIComponent(
    "Date Summary\n\n" +
    `Date: ${summary.date}\n` +
    `Food: ${summary.food}\n` +
    `Status: ${summary.status}\n` +
    `Payment: ${summary.payment}\n` +
    `Gift opened: ${summary.giftOpened}\n`
  );

  window.location.href = `mailto:${EMAIL_CONFIG.toEmail}?subject=${subject}&body=${body}`;
}

function sendSummaryToEmail() {
  const summary = {
    date: selectedDate || "Not selected",
    food: selectedFood || "Not selected",
    status: "Confirmed",
    payment: "$200",
    giftOpened: "Yes"
  };

  const emailReady =
    EMAIL_CONFIG.publicKey !== "YOUR_PUBLIC_KEY" &&
    EMAIL_CONFIG.serviceId !== "YOUR_SERVICE_ID" &&
    EMAIL_CONFIG.templateId !== "YOUR_TEMPLATE_ID";

  if (emailReady && window.emailjs) {
    emailjs.init({ publicKey: EMAIL_CONFIG.publicKey });

    emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, {
      to_email: EMAIL_CONFIG.toEmail,
      date: summary.date,
      food: summary.food,
      status: summary.status,
      payment: summary.payment,
      gift_opened: summary.giftOpened
    })
      .then(() => {
        alert("Saved to your email.");
      })
      .catch(() => {
        fallbackMailto(summary);
      });
  } else {
    fallbackMailto(summary);
  }
}

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
  doneBtn.disabled = true;
  qrCard.classList.add("hidden");
  finalPage.classList.remove("hidden");
});

const celebrationEmojis = ["🎉", "💖", "💕", "✨", "🎊", "🥳", "💗", "🌸"];

function createFinalParticles() {
  finalParticles.innerHTML = "";

  for (let index = 0; index < 110; index += 1) {
    const particle = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 48;
    particle.className = index % 3 === 0 ? "final-particle emoji-particle" : "final-particle confetti-particle";
    particle.textContent = index % 3 === 0 ? celebrationEmojis[index % celebrationEmojis.length] : "";
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}vw`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance}vh`);
    particle.style.setProperty("--depth", `${Math.random() * 520 - 260}px`);
    particle.style.setProperty("--rot", `${Math.random() * 720 - 360}deg`);
    particle.style.setProperty("--delay", `${Math.random() * 0.35}s`);
    particle.style.setProperty("--size", `${0.55 + Math.random() * 1.2}`);
    particle.style.background = ["#ff6f9f", "#ffc1d8", "#ffffff", "#ff9dbd", "#f45f91"][index % 5];
    finalParticles.appendChild(particle);
  }
}

function runCelebration() {
  bookDateBtn.disabled = true;
  readyText.classList.add("hidden");
  bookDateBtn.classList.add("hidden");
  replayBtn.classList.add("hidden");
  finalMessage.classList.add("hidden");
  celebrationObject.classList.remove("object-arriving", "object-celebrating");
  finalPage.classList.remove("is-celebrating");
  void celebrationObject.offsetWidth;
  celebrationObject.classList.add("object-arriving");

  setTimeout(() => {
    celebrationObject.classList.add("object-celebrating");
    finalPage.classList.add("is-celebrating");
    createFinalParticles();
  }, 2400);

  setTimeout(() => {
    finalMessage.classList.remove("hidden");
  }, 3150);

  setTimeout(() => {
    replayBtn.classList.remove("hidden");
    bookDateBtn.disabled = false;
  }, 5100);
}

bookDateBtn.addEventListener("click", runCelebration);
replayBtn.addEventListener("click", runCelebration);
