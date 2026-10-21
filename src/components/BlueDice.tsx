import { useState } from 'react';

interface BlueDiceProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  allowSpin?: boolean;
}

export function BlueDice({ size = 'md', className = '', allowSpin = true }: BlueDiceProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer transition-all duration-700 ease-out ${sizeClasses[size]} ${
        isHovered && allowSpin ? 'rotate-[360deg] scale-125' : ''
      } ${className}`}
      title="Dado Cyber Azul (Koga Aesthetic) • Passe o mouse para rodar!"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_10px_rgba(56,189,248,0.75)] filter"
      >
        <defs>
          <linearGradient id="diceTopGrad" x1="8" y1="6" x2="56" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#0284c7" stopOpacity="0.95" />
            <stop offset="1" stopColor="#0369a1" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="diceLeftGrad" x1="8" y1="20" x2="32" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0369a1" stopOpacity="0.95" />
            <stop offset="1" stopColor="#082f49" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id="diceRightGrad" x1="32" y1="20" x2="56" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284c7" stopOpacity="0.9" />
            <stop offset="1" stopColor="#0c4a6e" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Top Face */}
        <path
          d="M32 6L56 20L32 32L8 20Z"
          fill="url(#diceTopGrad)"
          stroke="#7dd3fc"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Left Face */}
        <path
          d="M8 20L32 32V58L8 44Z"
          fill="url(#diceLeftGrad)"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Right Face */}
        <path
          d="M32 32L56 20V44L32 58Z"
          fill="url(#diceRightGrad)"
          stroke="#0284c7"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Dots on Top Face (3 diagonal pips) */}
        <ellipse cx="20" cy="15" rx="2.2" ry="1.3" fill="#ffffff" />
        <ellipse cx="32" cy="19" rx="2.2" ry="1.3" fill="#ffffff" />
        <ellipse cx="44" cy="23" rx="2.2" ry="1.3" fill="#ffffff" />

        {/* Dots on Left Face (2 pips) */}
        <circle cx="20" cy="31" r="2.2" fill="#e0f2fe" />
        <circle cx="20" cy="47" r="2.2" fill="#e0f2fe" />

        {/* Dots on Right Face (6 pips) */}
        <circle cx="40" cy="29" r="1.8" fill="#e0f2fe" />
        <circle cx="40" cy="38" r="1.8" fill="#e0f2fe" />
        <circle cx="40" cy="47" r="1.8" fill="#e0f2fe" />
        <circle cx="48" cy="25" r="1.8" fill="#e0f2fe" />
        <circle cx="48" cy="34" r="1.8" fill="#e0f2fe" />
        <circle cx="48" cy="43" r="1.8" fill="#e0f2fe" />

        {/* Inner Glass Highlight Edges */}
        <path d="M32 6L32 32" stroke="#bae6fd" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="32" cy="32" r="1.2" fill="#ffffff" />
      </svg>
    </div>
  );
}
