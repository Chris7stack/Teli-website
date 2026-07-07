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
  const isDark = theme === 'dark' || theme === 'footer';
  
  // Cleanly encoded GitHub raw image URL for the requested logo
  const logoUrl = 'https://raw.githubusercontent.com/Chris7stack/Teli-website/813c0684fe46dfe15412d206d35d17d486ae5d8d/public/images/TELI%20Logo%20white%20background%20Logo%20on%20left.png';

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoUrl}
        alt="TELI Logo"
        referrerPolicy="no-referrer"
        className={`h-full w-auto object-contain transition-all duration-300 ${
          isDark 
            ? 'bg-white py-1.5 px-3.5 rounded-xl shadow-sm border border-slate-200/50 hover:bg-slate-50' 
            : 'hover:opacity-90'
        }`}
      />
    </div>
  );
};
