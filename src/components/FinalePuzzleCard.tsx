import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

export function FinalePuzzleCard() {
  // Fragment symbols representing the previous puzzles
  const fragments = [
    { symbol: '🛡️', name: 'Schild', order: 'A', description: 'Sudoku' },
    { symbol: '⚔️', name: 'Zeichen', order: 'B', description: 'Kreuzwort' },
    { symbol: '🌙', name: 'Maske', order: 'C', description: 'Stille' },
    { symbol: '💝', name: 'Herz', order: 'D', description: 'Romance' }
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
                Alle Siegel sind gefallen – fast.
              </p>
              <p className="mb-4">
                Blicke zurück: Was du gefunden hast, weist nach vorn.
              </p>
              <p className="mb-4">
                Setze die Fragmente in Ordnung – und das Relikt erscheint.
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
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[22px] text-black mb-6 text-center">
              <p>Der Kristall der Macht</p>
            </div>
            
            {/* Fragment Assembly */}
            <div className="bg-white/90 p-6 rounded-lg shadow-inner w-full max-w-[300px]">
              <p className="font-['Jim_Nightshade'] text-[12px] text-black text-center mb-4">
                Ordne die Fragmente deiner Reise:
              </p>
              
              {/* Fragments scattered (unsorted) */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[...fragments].sort(() => Math.random() - 0.5).map((fragment, index) => (
                  <div key={fragment.order} className="flex flex-col items-center p-3 border-2 border-dashed border-[#C8A75E] rounded">
                    <div className="text-[24px] mb-2">{fragment.symbol}</div>
                    <div className="font-['Jim_Nightshade'] text-[10px] text-black text-center">
                      <div className="font-bold">{fragment.name}</div>
                      <div className="text-gray-600">{fragment.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Assembly area */}
              <div className="border-2 border-[#FFD700] rounded-lg p-4 bg-[#FFF8DC]">
                <p className="font-['Jim_Nightshade'] text-[10px] text-center text-[#8B4513] mb-2">
                  Richtige Reihenfolge: A → B → C → D
                </p>
                <div className="flex justify-between">
                  {['A', 'B', 'C', 'D'].map((letter) => (
                    <div key={letter} className="w-12 h-12 border border-[#C8A75E] rounded flex items-center justify-center bg-white">
                      <span className="font-['Jim_Nightshade'] text-[16px] text-[#8B4513] font-bold">
                        {letter}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hint */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[11px] text-black mt-4 text-center leading-[13px]">
              <p>Die Ordnung deiner Prüfungen offenbart das letzte Geheimnis</p>
            </div>

            {/* Rätsel-Kennzeichnung */}
            <div className="absolute bottom-4 right-4 font-['Jim_Nightshade:Regular',_sans-serif] text-[32px] text-black">
              <p>E</p>
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
            <div className="relative shrink-0 text-[22px] w-full">
              <p className="leading-[26px]">Der Kristall der Macht</p>
            </div>
            <div className="relative shrink-0 text-[56px] w-full">
              <p className="leading-[50px]">E</p>
            </div>
            <div className="relative shrink-0 text-[14px] w-full">
              <p className="leading-[16px]">Finale Prüfung</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>
    </div>
  );
}