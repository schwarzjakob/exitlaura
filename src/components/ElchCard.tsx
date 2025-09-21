import RatselTemplate from '../imports/RatselTemplate-1-35';

export function ElchCard() {
  return (
    <div className="w-[535px] h-[368px] relative">
      <RatselTemplate />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        {/* Title */}
        <h2 className="font-['Jim_Nightshade'] text-[32px] text-[#8B4513] mb-8 leading-tight">
          Das Geweih des Nordens
        </h2>
        
        {/* Animal Silhouettes */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Bear */}
          <div className="text-center cursor-pointer hover:scale-110 transition-transform">
            <div className="w-20 h-20 bg-black rounded-lg mb-2 flex items-center justify-center shadow-lg">
              <div className="text-white text-[28px]">🐻</div>
            </div>
            <div className="font-['Jim_Nightshade'] text-[12px] text-[#8B4513]">A</div>
          </div>
          
          {/* Elk */}
          <div className="text-center cursor-pointer hover:scale-110 transition-transform">
            <div className="w-20 h-20 bg-black rounded-lg mb-2 flex items-center justify-center shadow-lg">
              <div className="text-white text-[28px]">🦌</div>
            </div>
            <div className="font-['Jim_Nightshade'] text-[12px] text-[#8B4513]">B</div>
          </div>
          
          {/* Wolf */}
          <div className="text-center cursor-pointer hover:scale-110 transition-transform">
            <div className="w-20 h-20 bg-black rounded-lg mb-2 flex items-center justify-center shadow-lg">
              <div className="text-white text-[28px]">🐺</div>
            </div>
            <div className="font-['Jim_Nightshade'] text-[12px] text-[#8B4513]">C</div>
          </div>
        </div>
        
        {/* Instruction */}
        <div className="font-['Jim_Nightshade'] text-[14px] text-[#2B2B2B] leading-relaxed max-w-[400px] mb-6">
          <p>In den Wäldern des Nordens versteckt sich ein Gefährte.</p>
          <p>Doch nur einer trägt das Geweih.</p>
          <p>Finde ihn – und du erhältst den letzten Schatz.</p>
        </div>
        
      </div>
    </div>
  );
}
