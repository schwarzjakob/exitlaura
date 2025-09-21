import RatselTemplate from '../imports/RatselTemplate-1-35';

interface PermissionCardProps {
  variant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
}

export function PermissionCard({ variant }: PermissionCardProps) {
  const getTitle = () => {
    if (variant === 'F') {
      return 'Letzter Weg offenbart';
    }
    if (variant === 'E') {
      return 'Letztes Siegel gebrochen';
    }
    return 'Siegel gebrochen';
  };

  return (
    <div className="w-[535px] h-[368px] relative">
      <RatselTemplate />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        {/* Key/Lock Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#FFD700] to-[#B8860B] flex items-center justify-center shadow-lg">
            <div className="font-['Jim_Nightshade'] text-[24px] text-[#8B4513]">🗝️</div>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="font-['Jim_Nightshade'] text-[28px] text-[#8B4513] mb-8 leading-tight">
          {getTitle()}
        </h2>
        
        {/* Permission Text */}
        <div className="font-['Jim_Nightshade'] text-[18px] text-[#2B2B2B] leading-relaxed">
          <p>
            Die Göttin gewährt dir: Du darfst jetzt{' '}
            <span className="font-bold text-[#8B4513] text-[22px]">
              Päckchen {variant}
            </span>{' '}
            öffnen.
          </p>
        </div>
        
        {/* Decorative Border */}
        <div className="absolute bottom-8 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#C8A75E] to-transparent"></div>
      </div>
    </div>
  );
}