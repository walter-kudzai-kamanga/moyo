import confetti from 'canvas-confetti';

export function fireHeartConfetti(originX = 0.5, originY = 0.6) {
  // Burst of heart and rose colored particles
  const count = 45;
  const defaults = {
    origin: { x: originX, y: originY },
    colors: ['#f43f5e', '#fb7185', '#e11d48', '#fda4af', '#fecdd3', '#ffe4e6', '#ffd700'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 35,
    startVelocity: 45,
    shapes: ['circle'],
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.1,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.3,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireRosePetalShower() {
  const end = Date.now() + 3.5 * 1000;
  const colors = ['#e11d48', '#f43f5e', '#be123c', '#fda4af', '#881337'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.3 },
      colors: colors,
      shapes: ['square'],
      scalar: 1.2,
      gravity: 0.8,
      drift: 0.2,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.3 },
      colors: colors,
      shapes: ['square'],
      scalar: 1.2,
      gravity: 0.8,
      drift: -0.2,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
