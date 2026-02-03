const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const response = document.getElementById("response");
const celebration = document.getElementById("celebration");
const capybaraGif = document.getElementById("capybaraGif");
const confetti = document.getElementById("confetti");

let yesScale = 1;

const updateYesScale = () => {
  yesButton.style.transform = `scale(${yesScale})`;
  yesButton.style.boxShadow = `0 16px 30px rgba(255, 45, 111, ${Math.min(
    0.5,
    0.15 + yesScale / 6
  )})`;
};

const moveNoButton = () => {
  const wrap = noButton.parentElement;
  const wrapRect = wrap.getBoundingClientRect();
  const btnRect = noButton.getBoundingClientRect();
  const maxX = wrapRect.width - btnRect.width;
  const maxY = wrapRect.height - btnRect.height;
  const newX = Math.max(0, Math.min(maxX, Math.random() * maxX));
  const newY = Math.max(0, Math.min(maxY, Math.random() * maxY));

  noButton.style.position = "absolute";
  noButton.style.left = `${newX}px`;
  noButton.style.top = `${newY}px`;
};

const growYes = () => {
  yesScale = Math.min(4.2, yesScale + 0.45);
  updateYesScale();
};

let pulseInterval = setInterval(() => {
  yesScale = Math.min(4.2, yesScale + 0.08);
  updateYesScale();
}, 500);

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("focus", moveNoButton);
noButton.addEventListener("click", () => {
  moveNoButton();
  response.textContent = "Nuh-uh, nice try!";
});

const capybaraGifUrl =
  "https://media.giphy.com/media/dQLtlj7f2OhpiRObb3/giphy.gif";

capybaraGif.src = capybaraGifUrl;

const releaseConfetti = () => {
  confetti.innerHTML = "";
  const colors = ["#ff7eb3", "#ff758c", "#ffd670", "#8be9fd", "#b197fc"];
  for (let i = 0; i < 40; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[i % colors.length];
    piece.style.setProperty("--duration", `${1.4 + Math.random() * 1.2}s`);
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.appendChild(piece);
  }
};

yesButton.addEventListener("click", () => {
  growYes();
  response.textContent = "Yay! 💖";
  celebration.classList.add("active");
  releaseConfetti();
});

updateYesScale();
