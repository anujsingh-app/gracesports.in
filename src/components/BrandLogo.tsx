import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  showBadge?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = false, showBadge = true }) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3.5 select-none shrink-0">
      {/* GS Brand Logo Image */}
      <div className={`relative flex items-center justify-center shrink-0 ${
        isSmall ? 'w-8 h-8 sm:w-9 sm:h-9 p-1' : isLarge ? 'w-12 h-12 sm:w-14 sm:h-14 p-1.5' : 'w-10 h-10 sm:w-11 sm:h-11 p-1'
      } rounded-xl bg-white shadow-[0_0_20px_rgba(229,32,44,0.25)] border border-white/20 overflow-hidden`}>
        <img
          src="/images/gslogo/logo.webp"
          alt="Grace Sport Logo"
          width={48}
          height={48}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col shrink-0 justify-center">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`font-display font-extrabold tracking-wider ${
            isSmall ? 'text-base sm:text-xl' : isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          } whitespace-nowrap leading-none`}>
            <span style={{ color: '#CB2522' }} className="text-[#CB2522]">GRACE</span>{' '}
            <span style={{ color: '#FFFFFF' }} className="text-white">SPORT</span>
          </span>
        </div>

        {showSubtitle && (
          <span className="hidden xl:block text-[11px] text-slate-400 font-medium tracking-wide whitespace-nowrap mt-1">
            Table Tennis Manufacturer & Exporter
          </span>
        )}
      </div>
    </div>
  );
};

