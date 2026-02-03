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

const capybaraSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
  <rect width="240" height="180" fill="none"/>
  <g>
    <ellipse cx="120" cy="110" rx="70" ry="45" fill="#c98f5a"/>
    <ellipse cx="65" cy="95" rx="30" ry="26" fill="#d8a36f"/>
    <ellipse cx="175" cy="95" rx="30" ry="26" fill="#d8a36f"/>
    <ellipse cx="120" cy="70" rx="55" ry="40" fill="#d8a36f"/>
    <ellipse cx="95" cy="70" rx="10" ry="8" fill="#3d2b20"/>
    <ellipse cx="145" cy="70" rx="10" ry="8" fill="#3d2b20"/>
    <circle cx="92" cy="68" r="3" fill="#ffffff"/>
    <circle cx="142" cy="68" r="3" fill="#ffffff"/>
    <path d="M105 90 Q120 102 135 90" fill="none" stroke="#3d2b20" stroke-width="6" stroke-linecap="round"/>
    <circle cx="88" cy="92" r="6" fill="#ff9bb8"/>
    <circle cx="152" cy="92" r="6" fill="#ff9bb8"/>
    <rect x="80" y="120" width="25" height="18" rx="6" fill="#b97a46"/>
    <rect x="135" y="120" width="25" height="18" rx="6" fill="#b97a46"/>
  </g>
  <g>
    <circle cx="190" cy="45" r="6" fill="#ff7eb3">
      <animate attributeName="cy" values="45;40;45" dur="1.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="200" cy="60" r="5" fill="#ff758c">
      <animate attributeName="cy" values="60;54;60" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="178" cy="62" r="4" fill="#ff9bb8">
      <animate attributeName="cy" values="62;58;62" dur="1.4s" repeatCount="indefinite" />
    </circle>
  </g>
</svg>`;

capybaraGif.src = `data:image/svg+xml;utf8,${encodeURIComponent(capybaraSvg)}`;

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
