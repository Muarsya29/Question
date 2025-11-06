function playAnimation(speedMultiplier = 1) {
  document.querySelectorAll('.line').forEach(el => {
    el.classList.remove('revealed');
    const delay = Number(el.getAttribute('data-delay') || 0);
    setTimeout(() => el.classList.add('revealed'), delay * speedMultiplier);
  });
}

playAnimation(1);

document.getElementById('replay').addEventListener('click', () => {
  playAnimation(currentSpeed);
});

let slow = false; let currentSpeed = 1;
document.getElementById('toggleSlow').addEventListener('click', function () {
  slow = !slow; currentSpeed = slow ? 1.8 : 1; this.textContent = slow ? 'Speed' : 'Slow'; playAnimation(currentSpeed);
});

let highContrast = false;
document.getElementById('toggleContrast').addEventListener('click', function () {
  highContrast = !highContrast;
  if (highContrast) {
    document.documentElement.style.setProperty('--bg1', '#020617');
    document.documentElement.style.setProperty('--bg2', '#07102a');
    document.documentElement.style.setProperty('--accent', '#ff6b24');
    this.textContent = 'Normal';
  } else {
    document.documentElement.style.setProperty('--bg1', '#0f172a');
    document.documentElement.style.setProperty('--bg2', '#1e293b');
    document.documentElement.style.setProperty('--accent', '#f97316');
    this.textContent = 'Kontras';
  }
});

document.querySelectorAll('.floater').forEach((f, i) => {
  f.style.transform = `translateY(${(Math.random() * 8 - 4)}px) rotate(${(Math.random() * 10 - 5)}deg)`;
  f.style.opacity = 0.9 - Math.random() * 0.25;
});

window.addEventListener('keydown', (e) => { if (e.code === 'Space') { e.preventDefault(); playAnimation(currentSpeed); } });

// Musik piano
const audio = document.getElementById('pianoAudio');

window.addEventListener('load', () => {
    // mulai play, tapi muted untuk izin autoplay
    audio.muted = true;
    audio.volume = 0;
    audio.play().then(() => {

        // setelah mulai muted → fade-in
        setTimeout(() => {
            audio.muted = false;

            let vol = 0;
            const maxVol = 0.6;     // ubah volume max kalau mau
            const fadeStep = 0.01;  
            const fadeSpeed = 50;   // makin kecil makin cepat

            const fadeIn = setInterval(() => {
                vol += fadeStep;
                if (vol >= maxVol) {
                    vol = maxVol;
                    clearInterval(fadeIn);
                }
                audio.volume = vol;
            }, fadeSpeed);

        }, 300);

    }).catch(err => {
        console.log("Autoplay tertolak browser → menunggu klik pertama", err);

        // backup: jika autoplay ditolak, kita aktifkan setelah klik pertama
        document.addEventListener("click", function firstClick() {
            audio.muted = false;
            audio.volume = 0;
            audio.play();

            let vol = 0;
            const maxVol = 0.6;
            const fadeIn = setInterval(() => {
                vol += 0.01;
                if (vol >= maxVol) {
                    clearInterval(fadeIn);
                }
                audio.volume = vol;
            }, 50);

            document.removeEventListener("click", firstClick);
        });
    });
});

