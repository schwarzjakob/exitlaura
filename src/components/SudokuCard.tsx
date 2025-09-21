import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

export function SudokuCard() {
  return (
    <div className="flex gap-8 items-start">
      {/* Instruktions-Karte (Pergament) */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[288px] w-[203px] rounded-[10px]" 
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[288px] overflow-clip relative w-[203px]">
            <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] h-[227px] leading-[20px] left-[11px] not-italic text-[14px] text-black top-[18px] w-[181px]">
              <p className="mb-0">
                Fünf Zeichen trägt dein Name,
                <br aria-hidden="true" />
                {` doch mehr als ein Name sind sie nicht.`}
                <br aria-hidden="true" />
                {` Jeder Buchstabe hat Gewicht,`}
                <br aria-hidden="true" />
                {` zusammen weisen sie dir die Seite, die dich ruft.`}
              </p>
              <p className="mb-0">&nbsp;</p>
              <p>
                Dort – im Reich der Kästchen –
                <br aria-hidden="true" />
                {` bewahren drei Wächter ihren Blick.`}
                <br aria-hidden="true" />
                {` Sie nennen sich A · B · C`}
                <br aria-hidden="true" />
                {` und zeigen dir, was als Nächstes geschieht.`}
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Sudoku-Gitter-Karte */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[400px] w-[320px] rounded-[10px]"
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[400px] overflow-clip relative w-[320px] flex flex-col items-center justify-center p-6">
            {/* Titel */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[24px] text-black mb-4 text-center">
              <p>Die Prüfung der Zahlen</p>
            </div>
            
            {/* Sudoku Grid */}
            <div className="bg-white/90 p-3 rounded-lg shadow-inner">
              <div className="grid grid-cols-9 gap-[1px] bg-black p-2">
                {Array.from({ length: 81 }, (_, i) => {
                  const row = Math.floor(i / 9);
                  const col = i % 9;
                  const isMiddleColumn = col === 4; // Mittlere Spalte (Index 4)
                  const isMarkedField = isMiddleColumn && (row === 2 || row === 4 || row === 6); // A, B, C Felder
                  const markerLetter = isMarkedField 
                    ? row === 2 ? 'A' 
                    : row === 4 ? 'B' 
                    : 'C' 
                    : '';
                  
                  return (
                    <div
                      key={i}
                      className={`
                        w-6 h-6 bg-white border border-gray-300 flex items-center justify-center text-xs
                        ${isMiddleColumn ? 'bg-blue-50' : ''}
                        ${isMarkedField ? 'bg-yellow-200 border-2 border-yellow-600' : ''}
                      `}
                    >
                      {isMarkedField && (
                        <span className="text-red-600 font-bold text-[10px]">{markerLetter}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Anleitung */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[12px] text-black mt-3 text-center leading-[14px]">
              <p>Die markierten Felder A, B, C</p>
              <p>ergeben zusammen den Code</p>
            </div>

            {/* Rätsel-Kennzeichnung */}
            <div className="absolute bottom-4 right-4 font-['Jim_Nightshade:Regular',_sans-serif] text-[32px] text-black">
              <p>A</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Fantasy-Karte (Rückseite) */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[288px] rounded-[10px] w-[203px]" 
          style={{ backgroundImage: `url('${imgBackground}')` }}
        >
          <div className="box-border content-stretch flex flex-col font-['Jim_Nightshade:Regular',_sans-serif] h-[288px] items-center justify-between leading-[0] not-italic overflow-clip px-[18px] py-[20px] relative text-black text-center w-[203px]">
            <div className="relative shrink-0 text-[32px] w-full">
              <p className="leading-[35px]">Sudoku des Wächters</p>
            </div>
            <div className="relative shrink-0 text-[64px] w-full">
              <p className="leading-[45px]">A</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>
    </div>
  );
}