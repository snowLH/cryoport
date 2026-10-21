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
      radius: 140, // Repulsion area
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

    // Initialize particles
    const particleCount = Math.min(100, Math.floor((width * height) / 13000));
    const particles: Particle[] = [];

    const spookyEmojis = ['🎃', '🦇', '✨', '🎃', '👻'];

    for (let i = 0; i < particleCount; i++) {
      const isEmoji = isHalloween && i % 14 === 0;
      const randColor = Math.random();
      const colorType: 'orange' | 'amber' | 'purple' | 'ice' = !isHalloween
        ? 'ice'
        : randColor < 0.6
        ? 'orange'
        : randColor < 0.85
        ? 'amber'
        : 'purple';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isEmoji ? 10 : Math.random() * 2 + 1,
        // In Halloween, embers float upwards slightly or drift in waves; in snow, falls down
        speedY: isHalloween ? -(Math.random() * 0.7 + 0.2) : Math.random() * 0.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: isEmoji ? 0.35 : Math.random() * 0.6 + 0.25,
        vx: 0,
        vy: 0,
        colorType,
        isEmoji,
        emoji: spookyEmojis[Math.floor(Math.random() * spookyEmojis.length)],
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
          p.x += Math.sin(Date.now() * 0.0015 + p.y * 0.01) * 0.25;
        }

        // Mouse repulsion physics
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 3.5;
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
          if (p.y < -20) {
            p.y = height + 10;
            p.x = Math.random() * width;
            p.vx = 0;
            p.vy = 0;
          }
        } else {
          // Falling downwards
          if (p.y > height + 20) {
            p.y = -10;
            p.x = Math.random() * width;
            p.vx = 0;
            p.vy = 0;
          }
        }

        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        // Render particle
        if (p.isEmoji && p.emoji) {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.font = '14px sans-serif';
          ctx.fillText(p.emoji, p.x, p.y);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          if (p.colorType === 'orange') {
            ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
            ctx.shadowColor = 'rgba(249, 115, 22, 0.7)';
            ctx.shadowBlur = 8;
          } else if (p.colorType === 'amber') {
            ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
            ctx.shadowColor = 'rgba(251, 191, 36, 0.7)';
            ctx.shadowBlur = 6;
          } else if (p.colorType === 'purple') {
            ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
            ctx.shadowColor = 'rgba(168, 85, 247, 0.7)';
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
