const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const captureBtn = document.getElementById('captureBtn');
const result = document.getElementById('result');


// =====================
// カメラ起動
// =====================

navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: 'environment'
  },
  audio: false
})
.then(stream => {

  video.srcObject = stream;

})
.catch(err => {

  alert('カメラ起動失敗: ' + err);

});


// =====================
// 撮影ボタン
// =====================

captureBtn.addEventListener('click', () => {

  // video画像をcanvasへコピー
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);

  // =====================
  // ダミー判定
  // =====================

  const ok = Math.random() > 0.5;

  if (ok) {

    result.innerHTML = 'OK';
    result.style.color = 'blue';

    beep(800, 150);

  } else {

    result.innerHTML = 'NG';
    result.style.color = 'red';

    beep(200, 400);

  }

});


// =====================
// QRコード表示
// =====================

const currentUrl = window.location.href;

document.getElementById('accessUrl').innerText = currentUrl;

new QRCode(document.getElementById('qrcode'), {
  text: currentUrl,
  width: 220,
  height: 220
});


// =====================
// ブザー音
// =====================

function beep(freq, duration) {

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const oscillator = audioCtx.createOscillator();

  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);

  gainNode.connect(audioCtx.destination);

  oscillator.frequency.value = freq;

  oscillator.type = 'sine';

  oscillator.start();

  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

  oscillator.stop(audioCtx.currentTime + duration / 1000);

}