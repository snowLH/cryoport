import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface SocialWidgetProps {
  title: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
  accentColor?: string;
  hoverBorder?: string;
  isAction?: boolean;
  onActionClick?: () => void;
}

export function SocialWidget({
  title,
  handle,
  href,
  icon,
  accentColor = "text-white",
  hoverBorder = "hover:border-white/20",
  isAction = false,
  onActionClick,
}: SocialWidgetProps) {
  const content = (
    <div className={`h-full w-full relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 ${hoverBorder} group cursor-pointer shadow-sm`}>
      {/* Subtle top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* External link indicator */}
      <div className="absolute top-3.5 right-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors">
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>

      {/* Centered Large Icon */}
      <div className={`mb-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.08] transition-colors ${accentColor}`}>
        {icon}
      </div>

      {/* Title & Handle */}
      <div>
        <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-cyan-100 transition-colors">
          {title}
        </h3>
        <p className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-300 mt-0.5 transition-colors">
          {handle}
        </p>
      </div>
    </div>
  );

  if (isAction) {
    return (
      <button
        onClick={onActionClick}
        type="button"
        className="col-span-1 md:col-span-1 md:row-span-1 text-left w-full h-full block"
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="col-span-1 md:col-span-1 md:row-span-1 block w-full h-full"
    >
      {content}
    </a>
  );
}

// Brand SVG Icons
export const GithubLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const InstagramLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const RobloxLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* Official Roblox Tilted Cube Icon */}
    <path d="M5.38 0L0 18.62L18.62 24L24 5.38L5.38 0ZM13.88 14.54L9.46 13.31L10.69 8.89L15.11 10.12L13.88 14.54Z" />
  </svg>
);

export const DiscordLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);
