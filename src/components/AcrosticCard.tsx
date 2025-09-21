import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

export function AcrosticCard() {
  const acrosticLines = [
    "Manche Wege verlangen Einkehr.",
    "Auch Helden brauchen Dunkelheit und Stille,",
    "Sanft wie der Abend, der die Augen schließt.",
    "Kehrt dann Ruhe ein, wird Klarheit geboren.",
    "Erst dann darfst du weiterziehen."
  ];

  return (
    <div className="flex gap-8 items-start">
      {/* Instruktions-Karte (Pergament) */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[320px] w-[240px] rounded-[10px]" 
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[320px] overflow-clip relative w-[240px]">
            <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] h-[280px] leading-[18px] left-[15px] not-italic text-[14px] text-black top-[20px] w-[210px]">
              <div className="space-y-2">
                {acrosticLines.map((line, index) => (
                  <p key={index} className="mb-0">
                    <span className="text-[#8B4513] font-bold text-[16px]">
                      {line.charAt(0)}
                    </span>
                    <span className="text-[12px]">
                      {line.slice(1)}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Puzzle-Karte */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[400px] w-[320px] rounded-[10px]"
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[400px] overflow-clip relative w-[320px] flex flex-col items-center justify-center p-6">
            {/* Titel */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[22px] text-black mb-6 text-center">
              <p>Die Stille der Maske</p>
            </div>
            
            {/* Acrostic Display */}
            <div className="bg-white/90 p-4 rounded-lg shadow-inner w-full max-w-[280px]">
              <div className="space-y-3">
                {acrosticLines.map((line, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-[#FFD700] border-2 border-[#C8A75E] rounded flex items-center justify-center">
                      <span className="font-['Jim_Nightshade'] text-[16px] font-bold text-[#8B4513]">
                        {line.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 font-['Jim_Nightshade'] text-[11px] text-black leading-[13px] pt-1">
                      {line.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hint */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[11px] text-black mt-4 text-center leading-[13px]">
              <p>Die ersten Buchstaben weisen den Weg</p>
            </div>

            {/* Rätsel-Kennzeichnung */}
            <div className="absolute bottom-4 right-4 font-['Jim_Nightshade:Regular',_sans-serif] text-[32px] text-black">
              <p>C</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Fantasy-Karte (Rückseite) */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[320px] rounded-[10px] w-[240px]" 
          style={{ backgroundImage: `url('${imgBackground}')` }}
        >
          <div className="box-border content-stretch flex flex-col font-['Jim_Nightshade:Regular',_sans-serif] h-[320px] items-center justify-between leading-[0] not-italic overflow-clip px-[18px] py-[25px] relative text-black text-center w-[240px]">
            <div className="relative shrink-0 text-[24px] w-full">
              <p className="leading-[28px]">Die Stille der Maske</p>
            </div>
            <div className="relative shrink-0 text-[56px] w-full">
              <p className="leading-[50px]">C</p>
            </div>
            <div className="relative shrink-0 text-[14px] w-full">
              <p className="leading-[16px]">Acrostic der Ruhe</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>
    </div>
  );
}