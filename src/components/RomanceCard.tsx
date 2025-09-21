import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

export function RomanceCard() {
  // Heart puzzle - following hearts in the right order reveals hidden letters
  const hearts = [
    { id: 1, x: 50, y: 80, letter: 'R', correct: 1 },
    { id: 2, x: 150, y: 60, letter: 'O', correct: 2 },
    { id: 3, x: 220, y: 100, letter: 'M', correct: 3 },
    { id: 4, x: 180, y: 150, letter: 'A', correct: 4 },
    { id: 5, x: 100, y: 170, letter: 'N', correct: 5 },
    { id: 6, x: 70, y: 130, letter: 'C', correct: 6 },
    { id: 7, x: 190, y: 200, letter: 'E', correct: 7 }
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
            <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] h-[280px] leading-[16px] left-[15px] not-italic text-[14px] text-black top-[20px] w-[210px]">
              <p className="mb-4">
                Nicht jede Kraft ist aus Stahl geschmiedet.
              </p>
              <p className="mb-4">
                Folge den Herzen, verbinde sie, wie sie dich führen.
              </p>
              <p className="mb-4">
                Was bleibt, wenn die Linien enden, ist dein Wort.
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Puzzle-Karte */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[400px] w-[350px] rounded-[10px]"
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[400px] overflow-clip relative w-[350px] flex flex-col items-center justify-center p-6">
            {/* Titel */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[22px] text-black mb-4 text-center">
              <p>Der Pfad des Herzens</p>
            </div>
            
            {/* Heart Puzzle */}
            <div className="bg-white/90 p-4 rounded-lg shadow-inner w-full max-w-[300px] h-[250px] relative">
              {/* Hearts scattered around */}
              {hearts.map((heart) => (
                <div 
                  key={heart.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${heart.x}px`, top: `${heart.y}px` }}
                >
                  <div className="relative">
                    {/* Heart shape */}
                    <div className="w-8 h-8 bg-gradient-to-b from-[#FF69B4] to-[#DC143C] rounded-t-full transform rotate-45 relative">
                      <div className="w-8 h-8 bg-gradient-to-b from-[#FF69B4] to-[#DC143C] rounded-t-full absolute -left-4 top-0"></div>
                      <div className="w-8 h-8 bg-gradient-to-b from-[#FF69B4] to-[#DC143C] rounded-t-full absolute left-0 -top-4"></div>
                    </div>
                    {/* Letter */}
                    <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
                      <span className="font-['Jim_Nightshade'] text-[12px] font-bold text-white">
                        {heart.letter}
                      </span>
                    </div>
                    {/* Order number (subtle) */}
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#FFD700] border border-[#C8A75E] rounded-full flex items-center justify-center">
                      <span className="font-['Jim_Nightshade'] text-[8px] text-[#8B4513]">
                        {heart.id}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Connecting lines (faint) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {hearts.slice(0, -1).map((heart, index) => {
                  const nextHeart = hearts[index + 1];
                  return (
                    <line 
                      key={index}
                      x1={heart.x} 
                      y1={heart.y} 
                      x2={nextHeart.x} 
                      y2={nextHeart.y}
                      stroke="#FFB6C1" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                      opacity="0.5"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Hint */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[11px] text-black mt-4 text-center leading-[13px]">
              <p>Verbinde die Herzen in der richtigen Reihenfolge</p>
            </div>

            {/* Rätsel-Kennzeichnung */}
            <div className="absolute bottom-4 right-4 font-['Jim_Nightshade:Regular',_sans-serif] text-[32px] text-black">
              <p>D</p>
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
              <p className="leading-[28px]">Der Pfad des Herzens</p>
            </div>
            <div className="relative shrink-0 text-[56px] w-full">
              <p className="leading-[50px]">D</p>
            </div>
            <div className="relative shrink-0 text-[14px] w-full">
              <p className="leading-[16px]">Romance-Rätsel</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>
    </div>
  );
}