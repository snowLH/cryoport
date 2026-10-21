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
  isEmoji?: boolean;
  emoji?: string;
  emojiSize?: number;
}

export function SnowParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for interactive repulsion
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
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

    // Initialize particles (crisp snow + cyber dice & ice crystals)
    const particleCount = Math.min(100, Math.floor((width * height) / 11000));
    const particles: Particle[] = [];
    const cyberEmojis = ['🎲', '❄️', '💠', '✨', '🎲'];

    for (let i = 0; i < particleCount; i++) {
      const isEmoji = i % 8 === 0;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isEmoji ? 12 : Math.random() * 2 + 1,
        emojiSize: Math.floor(Math.random() * 6) + 16,
        speedY: Math.random() * 0.7 + 0.35,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: isEmoji ? Math.random() * 0.45 + 0.35 : Math.random() * 0.6 + 0.25,
        vx: 0,
        vy: 0,
        isEmoji,
        emoji: cyberEmojis[Math.floor(Math.random() * cyberEmojis.length)],
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
        p.x += Math.sin(Date.now() * 0.0012 + p.y * 0.01) * 0.2;

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

        // Wrap around boundaries (falling downwards)
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.vx = 0;
          p.vy = 0;
        }

        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        // Render particle
        if (p.isEmoji && p.emoji) {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.font = `${p.emojiSize || 18}px sans-serif`;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.85)';
          ctx.shadowBlur = 10;
          ctx.fillText(p.emoji, p.x, p.y);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 242, 254, ${p.opacity})`;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
          ctx.shadowBlur = 4;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
