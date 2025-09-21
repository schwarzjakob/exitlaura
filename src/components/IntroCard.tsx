import RatselTemplate from '../imports/RatselTemplate-1-35';

export function IntroCard() {
  return (
    <div className="w-[535px] h-[368px] relative">
      <RatselTemplate />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        {/* Title */}
        <h1 className="font-['Jim_Nightshade'] text-[32px] text-[#8B4513] mb-6 leading-tight">
          Die Prüfungen der Göttin
        </h1>
        
        {/* Main Text */}
        <div className="font-['Jim_Nightshade'] text-[16px] text-[#2B2B2B] leading-relaxed space-y-4 max-w-[400px]">
          <p>
            Laura, die Göttin von Hyrule hat dir Geschenke hinterlassen. Doch sie sind mit Prüfungen versiegelt.
          </p>
          <p>
            Jede gelöste Aufgabe bricht ein Siegel. Jede Wahrheit, die du findest, öffnet einen Pfad.
          </p>
          <p>
            Gehe Schritt für Schritt – und nimm nur, was dir gewährt wird.
          </p>
        </div>
        
        {/* Footer Hint */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="font-['Jim_Nightshade'] text-[12px] text-[#666] italic text-center">
            Nach jeder Prüfung darfst du – und nur dann – das benannte Päckchen öffnen.
          </p>
        </div>
      </div>
    </div>
  );
}