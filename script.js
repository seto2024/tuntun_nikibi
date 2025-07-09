window.onload = () => {
  let count = 0;
  let locked = false;
  let firstTouch = true;
  let currentRank = "普通ニキビ";
  const godThreshold = Math.floor(Math.random() * 20) + 30;

  const nikibiImg = document.getElementById("nikibi");
  const msg = document.getElementById("message");
  const shareBtn = document.getElementById("share-button");
  const retryBtn = document.getElementById("retry-button");
  const soundToggleBtn = document.getElementById("sound-toggle");

  document.querySelector(".button-area").style.display = "none";

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  let soundOn = true;

  // 音の事前読み込み
  const soundMap = {
    puyon: "puyon.mp3",
    god: new Audio("kirakira4.mp3"),
    evil: new Audio("shock1.mp3"),
    death: new Audio("shock3.mp3"),
  };

  // 1回だけ鳴らすフラグ
  let godPlayed = false;
  let evilPlayed = false;
  let deathPlayed = false;

  // 音量設定
  soundMap.god.volume = 0.5;
  soundMap.evil.volume = 0.5;
  soundMap.death.volume = 0.5;

  nikibiImg.addEventListener("click", () => {
    if (locked) return;

    count++;

    nikibiImg.classList.add("shake");
    setTimeout(() => {
      nikibiImg.classList.remove("shake");
    }, 300);

    updateState();

// === クリック時の音再生部分を以下のように変更！ ===

if (!soundOn) return;

// 神ニキビ：1回だけ鳴らす
if (currentRank === "神ニキビ" && !godPlayed) {
  playFixed(soundMap.god);
  godPlayed = true;
}
// 悪神ニキビ：1回だけ鳴らす（その後はぷよん）
else if (currentRank === "悪神ニキビ") {
  if (!evilPlayed) {
    playFixed(soundMap.evil);
    evilPlayed = true;
  } else {
    playCloned(soundMap.puyon);
  }
}
// 死神ニキビ：1回だけ鳴らす
else if (currentRank === "死神ニキビ" && !deathPlayed) {
  playFixed(soundMap.death);
  deathPlayed = true;
}
// それ以外：ぷよん鳴らす
else {
  playCloned(soundMap.puyon);
}

    if (firstTouch) {
      document.querySelector(".button-area").style.display = "flex";
      firstTouch = false;
      shareBtn.style.display = "inline-block";
    }

    retryBtn.style.display = "inline-block";
  });

  shareBtn.addEventListener("click", () => {
    const text = `私は${count}回つんつんして、${currentRank}を降臨させました🙏 #つんつんニキビ`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });

  retryBtn.addEventListener("click", () => {
    count = 0;
    currentRank = "普通ニキビ";
    msg.textContent = "ニキビをツンツンしてね！";
    nikibiImg.src = "nikibi1.PNG";
    nikibiImg.style.pointerEvents = "auto";
    shareBtn.style.display = "inline-block";
    retryBtn.style.display = "none";
    locked = false;
    firstTouch = true;

    // フラグリセット
    godPlayed = false;
    evilPlayed = false;
    deathPlayed = false;
  });

  soundToggleBtn.addEventListener("click", () => {
    soundOn = !soundOn;
    soundToggleBtn.textContent = soundOn ? "OFF" : "ON";
  });

  // 複製で鳴らす（ぷよん用）
  function playCloned(src, volume = 0.5) {
    const sound = new Audio(src);
    sound.volume = volume;
    sound.play().catch((e) => console.warn("ぷよん再生エラー:", e));
  }

  // 固定オーディオを鳴らす（神・悪神・死神用）
  function playFixed(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch((e) => console.warn("固定音再生エラー:", e));
  }

  function updateState() {
    if (currentRank !== "邪神ニキビ") {
    nikibiImg.style.marginTop = "20px";
    }

    if (count < 10) {
      nikibiImg.src = "nikibi1.PNG";
      msg.textContent = "もっとつんつんして〜";
      currentRank = "普通ニキビ";
    } else if (count < 20) {
      nikibiImg.src = "nikibi2.PNG";
      msg.textContent = "うぅ…ちょっと痛いかも…";
      currentRank = "成長ニキビ";
      nikibiImg.style.marginTop = "80px";
    } else if (count < godThreshold) {
      nikibiImg.src = "nikibi3.PNG";
      msg.textContent = "もう少し…まだまだ…";
      currentRank = "進化ニキビ";
      nikibiImg.style.marginTop = "-10px";
    } else if (count === godThreshold) {
      nikibiImg.src = "nikibi4.PNG";
      msg.textContent = "神ニキビ 降臨…✨";
      currentRank = "神ニキビ";
      locked = true;
      setTimeout(() => {
        locked = false;
      }, 3000);
    } else if (count < 100) {
      nikibiImg.src = "nikibi5.PNG";
      msg.textContent = "あ…悪くなっちゃった…！";
      currentRank = "悪神ニキビ";
    } else if (count < 120) {
      nikibiImg.src = "nikibi6.PNG";
      msg.textContent = "やりすぎた…邪神ニキビが誕生してしまった…";
      currentRank = "邪神ニキビ";
      nikibiImg.style.marginTop = "90px";
    } else if (count >= 200) {
      nikibiImg.src = "nikibi7.PNG";
      msg.textContent = "……死神ニキビ現る。すべてが終わった。";
      nikibiImg.style.pointerEvents = "none";
      currentRank = "死神ニキビ";
    }
  }
};