import React from 'react';

interface BackgroundBoxProps {
  backgroundImage?: string;
  children: React.ReactNode;
}

export function BackgroundBox({ backgroundImage, children }: BackgroundBoxProps) {
  // If no background image, just render children without styling
  if (!backgroundImage) {
    return <>{children}</>;
  }

  return (
    <div className="relative rounded-[15px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      {/* Background image layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* White border overlay with 6px border effect */}
      <div className="absolute inset-0 border-[6px] border-white rounded-[15px]" />

      {/* Content wrapper */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-[9px] m-[6px] p-6">
        {children}
      </div>
    </div>
  );
}