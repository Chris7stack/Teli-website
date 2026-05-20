import { FC } from 'react';

interface TeliLogoProps {
  className?: string;
  theme?: 'light' | 'dark' | 'footer';
  showText?: boolean;
}

export const TeliLogo: FC<TeliLogoProps> = ({
  className = 'h-12',
  theme = 'light',
  showText = true,
}) => {
  // Define colors based on theme
  const isDark = theme === 'dark' || theme === 'footer';
  const textColorHex = isDark ? '#ffffff' : '#1a365d'; // Brand Primary Navy
  const taglineColorHex = isDark ? '#cbd5e1' : '#1a365d'; // Brand Primary Navy

  // Slender, organic, perfectly proportioned Leaf Path (vesica piscis)
  // Height = 60 (from -30 to 30), Width = 22 (from -11 to 11). Perfect 36% ratio!
  const leafPath = 'M 0,-30 C 11,-15 11,15 0,30 C -11,15 -11,-15 0,-30 Z';

  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox={showText ? "0 0 380 100" : "0 0 100 100"}
        width="100%"
        height="100%"
        preserveAspectRatio="xMinYMid meet"
        className="h-full w-auto shrink-0 select-none overflow-visible"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <defs>
          {/* Top-Left Leaf: Soft mint green/teal to deeper marine-teal */}
          <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78c5af" />
            <stop offset="100%" stopColor="#237784" />
          </linearGradient>

          {/* Top-Right Leaf: Bright sunshine-yellow/gold to tangerine amber */}
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed563" />
            <stop offset="100%" stopColor="#e99232" />
          </linearGradient>

          {/* Bottom Leaf: Deep sapphire blue to cyan-slate-blue */}
          <linearGradient id="blue-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1c4e6c" />
            <stop offset="100%" stopColor="#4a889e" />
          </linearGradient>

          {/* Soft shadow for premium corporate look */}
          <filter id="subtle-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodOpacity="0.08" />
          </filter>
        </defs>

        <g filter="url(#subtle-shadow)">
          {/* Layer 1: Bottom Leaf (Deep sapphire blue pointing straight down) */}
          <path
            d={leafPath}
            fill="url(#blue-gradient)"
            opacity="0.9"
            className="transition-opacity duration-300 hover:opacity-100"
            transform="translate(50, 60) rotate(180)"
          />

          {/* Layer 2: Left Leaf (Mint green to turquoise rotated CCW) */}
          <path
            d={leafPath}
            fill="url(#teal-gradient)"
            opacity="0.85"
            className="transition-opacity duration-300 hover:opacity-100"
            transform="translate(39, 44) rotate(-38)"
          />

          {/* Layer 3: Right Leaf (Bright gold to tangerine rotated CW) */}
          <path
            d={leafPath}
            fill="url(#gold-gradient)"
            opacity="0.85"
            className="transition-opacity duration-300 hover:opacity-100"
            transform="translate(61, 44) rotate(38)"
          />
        </g>

        {showText && (
          <g>
            {/* Main TELI Typography: Elegant serif text, perfectly left-aligned */}
            <text
              x="125"
              y="38"
              textAnchor="start"
              fill={textColorHex}
              style={{
                fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
                fontSize: '34px',
                fontWeight: 'bold',
                letterSpacing: '0.04em',
              }}
            >
              TELI
            </text>

            {/* Custom left-aligned, spacious corporate taglines */}
            <text
              x="125"
              y="58"
              textAnchor="start"
              fill={taglineColorHex}
              style={{
                fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                fontSize: '9px',
                fontWeight: '700',
                letterSpacing: '0.22em',
              }}
            >
              TRANSFORMATIVE
            </text>

            <text
              x="125"
              y="71"
              textAnchor="start"
              fill={taglineColorHex}
              style={{
                fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                fontSize: '7.5px',
                fontWeight: '600',
                letterSpacing: '0.15em',
              }}
            >
              EDUCATION LEADERSHIP
            </text>

            <text
              x="125"
              y="84"
              textAnchor="start"
              fill={taglineColorHex}
              style={{
                fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                fontSize: '9px',
                fontWeight: '700',
                letterSpacing: '0.22em',
              }}
            >
              INSTITUTE
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
