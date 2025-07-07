window.onload = () => {let count = 0;
let locked = false;
let firstTouch = true;
let currentRank = "普通ニキビ";
const godThreshold = Math.floor(Math.random() * 20) + 30; // 30〜49

const nikibiImg = document.getElementById("nikibi");
const msg = document.getElementById("message");
const shareBtn = document.getElementById("share-button");
const retryBtn = document.getElementById("retry-button");
const tsuntsunSound = document.getElementById("tsuntsun-sound");
const godSound = document.getElementById("god-sound");
const evilSound = document.getElementById("evil-sound");
const deathSound = document.getElementById("death-sound");

// 音量の設定（0.0〜1.0）
tsuntsunSound.volume = 0.5;
godSound.volume = 0.3;
evilSound.volum =0.3;
deathSound.volum =0.3;

// 右クリックや長押しメニューを無効化
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// ニキビ画像クリック時
nikibiImg.addEventListener("click", () => {
  if (locked) return;
  
  count++;
  
 // 特定の進化段階ではぷよん音を鳴らさない
if (
    currentRank !== "神ニキビ" &&
    currentRank !== "超神ニキビ" &&
    currentRank !== "邪神ニキビ" &&
    currentRank !== "死神ニキビ"
  ) {
    tsuntsunSound.currentTime = 0;
    tsuntsunSound.play();
  }
  
  if (firstTouch) {
    shareBtn.style.display = "inline-block";
    firstTouch = false;
  }

  retryBtn.style.display = "inline-block";

  updateState();
});

// シェアボタンを押すとXに投稿
shareBtn.addEventListener("click", () => {
  const text = `私は${count}回つんつんして、${currentRank}を降臨させました🙏 #つんつんニキビ`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});

// もう一回ボタン
retryBtn.addEventListener("click", () => {
  count = 0;
  currentRank = "普通ニキビ";
  msg.textContent = "ニキビをツンツンしてね！";
  nikibiImg.src = "nikibi1.jpg";
  nikibiImg.style.pointerEvents = "auto";
  shareBtn.style.display = "inline-block";
  retryBtn.style.display = "none";
  locked = false;
  firstTouch = true;
});

// 状態を更新する関数
function updateState() {
  if (count < 10) {
    nikibiImg.src = "nikibi1.jpg";
    msg.textContent = "もっとつんつんして〜";
    currentRank = "普通ニキビ";
  } else if (count < 20) {
    nikibiImg.src = "nikibi2.jpg";
    msg.textContent = "うぅ…ちょっと痛いかも…";
    currentRank = "成長ニキビ";
  } else if (count < godThreshold) {
    nikibiImg.src = "nikibi3.jpg";
    msg.textContent = "もう少し…まだまだ…";
    currentRank = "進化ニキビ";
  } else if (count === godThreshold) {
    nikibiImg.src = "nikibi4.jpg";
    msg.textContent = "神ニキビ 降臨…✨";
    currentRank = "神ニキビ";
    
 // 特別な音を鳴らす
 godSound.currentTime = 0;
 godSound.play();

    locked = true;
    setTimeout(() => {
      locked = false;
    }, 3000);
  } else if (count < 80) {
    nikibiImg.src = "nikibi5.jpg";
    msg.textContent = "神のオーラが…さらに…！？";
    currentRank = "超神ニキビ";
  } else if (count < 100) {
    nikibiImg.src = "nikibi6.jpg";
    msg.textContent = "やりすぎた…邪神ニキビが誕生してしまった…";
    currentRank = "邪神ニキビ";

     // 邪神ニキビの音
  evilSound.currentTime = 0;
  evilSound.play();
  
  } else if (count >= 200) {
    nikibiImg.src = "nikibi7.jpg";
    msg.textContent = "……死神ニキビ現る。すべてが終わった。";
    nikibiImg.style.pointerEvents = "none";
    currentRank = "死神ニキビ";

      // 死神ニキビの音
  deathSound.currentTime = 0;
  deathSound.play();
  }
}
};