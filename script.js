let count = 0;
let locked = false;
let currentRank = "普通ニキビ"; // シェア用に使う
const godThreshold = Math.floor(Math.random() * 20) + 30; // 30〜49

const nikibiImg = document.getElementById("nikibi");
const msg = document.getElementById("message");
const shareBtn = document.getElementById("share-button");
const retryBtn = document.getElementById("retry-button");

// ↓ ニキビ画像をつんつん（クリック）したら発動！
nikibiImg.addEventListener("click", () => {
  if (locked) return; // ロックされてたら無視！
  count++;
  updateState();
});

// ツンツンが初めてかどうか
let firstTouch = true;

nikibiImg.addEventListener("click", () => {
  if (locked) return;
  count++;

  // 最初のツンツンでシェアボタン表示
  if (firstTouch) {
    shareBtn.style.display = "inline-block";
    firstTouch = false;
  }
    retryBtn.style.display = "inline-block";
    firstTouch = false;
    

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
  nikibiImg.style.pointerEvents = "auto"; // 押せるように戻す
  shareBtn.style.display = "inline-block";
  retryBtn.style.display = "none";
  locked = false;
});

function updateState() {
  if (count < 10) {
    nikibiImg.src = "nikibi1.jpg";
    msg.textContent = "もっとつんつんして〜";
    currentRank = "普通ニキビ";
  } else if (count >= 10 && count < 20) {
    nikibiImg.src = "nikibi2.jpg";
    msg.textContent = "うぅ…ちょっと痛いかも…";
    currentRank = "成長ニキビ";
  } else if (count >= 20 && count < godThreshold) {
    nikibiImg.src = "nikibi3.jpg";
    msg.textContent = "もう少し…まだまだ…";
    currentRank = "進化ニキビ";
  } else if (count === godThreshold) {
    nikibiImg.src = "nikibi4.jpg";
    msg.textContent = "神ニキビ 降臨…✨";
    currentRank = "神ニキビ";
    retryBtn.style.display = "inline-block";
    locked = true; // ロックする！
    setTimeout(() => {
      locked = false; // 3秒後に解除
    }, 3000);
  } else if (count > godThreshold && count < 80) {
    nikibiImg.src = "nikibi5.jpg";
    msg.textContent = "神のオーラが…さらに…！？";
    currentRank = "超神ニキビ";
  } else if (count >= 80 && count < 100) {
    nikibiImg.src = "nikibi6.jpg";
    msg.textContent = "やりすぎた…邪神ニキビが誕生してしまった…";
    currentRank = "邪神ニキビ";
  } else if (count >= 200) {
    nikibiImg.src = "nikibi7.jpg";
    msg.textContent = "……死神ニキビ現る。すべてが終わった。";
    nikibiImg.style.pointerEvents = "none"; // もう押せないように
    currentRank = "死神ニキビ";
  }
}