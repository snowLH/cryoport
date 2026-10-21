import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  vx: number;
  vy: number;
  colorType: 'orange' | 'amber' | 'purple' | 'ice';
  isEmoji?: boolean;
  emoji?: string;
  emojiSize?: number;
}

interface SnowParticlesProps {
  isHalloween?: boolean;
}

export function SnowParticles({ isHalloween = true }: SnowParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150, // Repulsion area
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Initialize particles (more plentiful for rich Halloween atmosphere)
    const particleCount = Math.min(140, Math.floor((width * height) / 9500));
    const particles: Particle[] = [];

    // Halloween spooky emojis
    const spookyEmojis = ['🎃', '🎃', '🎃', '🦇', '🎃', '👻', '🎃', '🕸️'];
    // Normal Cryo & Cyber Dice emojis
    const normalEmojis = ['🎲', '❄️', '💠', '✨', '🎲'];

    for (let i = 0; i < particleCount; i++) {
      // 1 in 4 in Halloween, 1 in 10 in Normal mode
      const isEmoji = isHalloween ? i % 4 === 0 : i % 10 === 0;
      const randColor = Math.random();
      const colorType: 'orange' | 'amber' | 'purple' | 'ice' = !isHalloween
        ? 'ice'
        : randColor < 0.65
        ? 'orange'
        : randColor < 0.85
        ? 'amber'
        : 'purple';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isEmoji ? 14 : Math.random() * 2.2 + 1,
        emojiSize: Math.floor(Math.random() * 8) + (isHalloween ? 18 : 16),
        // In Halloween, embers and pumpkins gently float upwards; in normal snow, drifts downwards
        speedY: isHalloween ? -(Math.random() * 0.7 + 0.25) : Math.random() * 0.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.45,
        opacity: isEmoji ? Math.random() * 0.45 + 0.35 : Math.random() * 0.6 + 0.25,
        vx: 0,
        vy: 0,
        colorType,
        isEmoji,
        emoji: isHalloween
          ? spookyEmojis[Math.floor(Math.random() * spookyEmojis.length)]
          : normalEmojis[Math.floor(Math.random() * normalEmojis.length)],
      });
    }

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift movement
        p.y += p.speedY + p.vy;
        p.x += p.speedX + p.vx;

        // Subtle floating sway
        if (isHalloween) {
          p.x += Math.sin(Date.now() * 0.0018 + p.y * 0.012) * 0.35;
        }

        // Mouse repulsion physics
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 4;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }

        // Velocity damping (friction)
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Wrap around boundaries
        if (isHalloween) {
          // Floating upwards
          if (p.y < -30) {
            p.y = height + 20;
            p.x = Math.random() * width;
            p.vx = 0;
            p.vy = 0;
          }
        } else {
          // Falling downwards
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
            p.vx = 0;
            p.vy = 0;
          }
        }

        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        // Render particle
        if (p.isEmoji && p.emoji) {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.font = `${p.emojiSize || 22}px sans-serif`;
          ctx.shadowColor = isHalloween ? 'rgba(249, 115, 22, 0.85)' : 'rgba(56, 189, 248, 0.85)';
          ctx.shadowBlur = 12;
          ctx.fillText(p.emoji, p.x, p.y);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          if (p.colorType === 'orange') {
            ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
            ctx.shadowColor = 'rgba(249, 115, 22, 0.8)';
            ctx.shadowBlur = 8;
          } else if (p.colorType === 'amber') {
            ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
            ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
            ctx.shadowBlur = 6;
          } else if (p.colorType === 'purple') {
            ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
            ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(224, 242, 254, ${p.opacity})`;
            ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
            ctx.shadowBlur = 4;
          }

          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHalloween]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
