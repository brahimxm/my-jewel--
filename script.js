// =========================
// CONFIG
// =========================
const correctPassword = "Only-One"; 
const startDate = new Date("2026-01-20T17:00:00"); 

// =========================
// SAFE GETTER
// =========================
function get(id) { return document.getElementById(id); }

// =========================
// UNLOCK SYSTEM
// =========================
function unlockSite() {
  const input = get("passInput");
  if(!input) return;

  if(input.value.trim() === correctPassword) {
    get("lockScreen").style.display = "none";
    get("mainContent").style.display = "block";

    const voice = get("voice");
    if(voice) voice.play().catch(()=>{});

    playMusic();

    const tag = get("tag");
    if(tag) tag.style.opacity = 1;

    for(let i=0;i<50;i++) setTimeout(createHeart, i*100);

  } else {
    alert("Wrong password 😅 Try again");
  }
}
window.checkPassword = unlockSite;

// =========================
// ENTER KEY
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const input = get("passInput");
  if(input) input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") unlockSite();
  });

  setTitle();
  startTyping();
  startTimer();
  startEffects();
  startSlideshow();
});

// =========================
// TITLE
// =========================
function setTitle() {
  const title = get("title");
  if(title) title.innerText = "For My Queen 💙";
}

// =========================
// TYPING EFFECT
// =========================
function startTyping() {
  const text = "From the moment we met, you’ve filled my world with joy… This little site is my heart for you 💙✨";
  const typing = get("typing");
  if(!typing) return;
  typing.innerHTML = "";
  let i=0;
  function type() {
    if(i < text.length) {
      typing.innerHTML += text[i++];
      setTimeout(type, 35);
    }
  }
  type();
}

// =========================
// TIMER
// =========================
function startTimer() {
  const timer = get("timer");
  if(!timer) return;
  setInterval(()=>{
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60))%24);
    const minutes = Math.floor((diff / (1000*60))%60);
    const seconds = Math.floor((diff / 1000)%60);
    timer.innerText = `💙 Together for ${days} days, ${hours} hrs, ${minutes} mins, ${seconds} secs 💙`;
  },1000);
}

// =========================
// MUSIC
// =========================
function playMusic() {
  const song = get("song");
  if(song) {
    song.volume = 0;
    song.play().then(()=>{
      let vol=0;
      const fade = setInterval(()=>{
        vol+=0.05;
        song.volume=Math.min(vol,1);
        if(vol>=1) clearInterval(fade);
      },200);
    }).catch(()=>{});
  }
}
window.playMusic = playMusic;

// =========================
// HIDDEN MESSAGE
// =========================
function showMessage() {
  const msg = get("hiddenMessage");
  if(msg) msg.classList.add("show");
}
window.showMessage = showMessage;

// =========================
// HEARTS + SPARKLES
// =========================
function startEffects() {
  const hearts = document.querySelector(".hearts");
  const sparkles = document.querySelector(".sparkles");
  if(hearts) setInterval(createHeart, 300);
  if(sparkles) setInterval(createSparkle, 500);
}

function createHeart() {
  const hearts = document.querySelector(".hearts");
  const h = document.createElement("span");
  h.innerHTML = "💙";
  h.style.left = Math.random()*90+"vw";
  h.style.fontSize=(Math.random()*20+12)+"px";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),10000);
}

function createSparkle() {
  const sparkles = document.querySelector(".sparkles");
  const s = document.createElement("span");
  s.innerHTML = "✨";
  s.style.left=Math.random()*90+"vw";
  s.style.top=Math.random()*90+"vh";
  sparkles.appendChild(s);
  setTimeout(()=>s.remove(),5000);
}

// =========================
// SLIDESHOW
// =========================
function startSlideshow() {
  const slides = document.querySelectorAll(".gallery-slideshow .slide");
  if(!slides.length) return;
  let current=0;
  setInterval(()=>{
    slides[current].classList.remove("active");
    current=(current+1)%slides.length;
    slides[current].classList.add("active");
  },3000);
}