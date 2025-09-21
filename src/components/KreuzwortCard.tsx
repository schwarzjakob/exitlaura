import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

export function KreuzwortCard() {
  // Kreuzworträtsel-Daten für Zelda-Begriffe
  const crosswordClues = [
    { number: 1, direction: 'horizontal', clue: 'Grüne Kleidung des Helden (5)', answer: 'TUNIC' },
    { number: 2, direction: 'horizontal', clue: 'Vogelvolk in Hyrule (4)', answer: 'RITO' },
    { number: 3, direction: 'horizontal', clue: 'Weise Beschützerin von Zelda (4)', answer: 'IMPA' },
    { number: 4, direction: 'horizontal', clue: 'Gefährtin mit Feenstaub (5)', answer: 'FAIRY' },
    { number: 5, direction: 'horizontal', clue: 'Klassischer Gegner, spuckt Felsen (7)', answer: 'OCTOROK' },
    { number: 6, direction: 'horizontal', clue: 'Währung in Hyrule (5)', answer: 'RUPEE' },
    { number: 7, direction: 'horizontal', clue: 'Hühnerlegende – fass sie nicht! (5)', answer: 'CUCCO' },
    { number: 8, direction: 'horizontal', clue: 'Links treues Pferd (5)', answer: 'EPONA' }
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
            <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] h-[280px] leading-[16px] left-[15px] not-italic text-[12px] text-black top-[20px] w-[210px]">
              <p className="mb-2">
                Wo Zeichen sich kreuzen, ruht ein Wort von Macht.
                <br />
                {` Finde es – und ein weiteres Siegel fällt.`}
              </p>
              <div className="mt-4 p-2 bg-black/10 rounded">
                <p className="text-[10px] leading-[12px]">
                  <strong>Hinweise:</strong><br />
                  1→ Grüne Kleidung des Helden (5)<br />
                  2→ Vogelvolk in Hyrule (4)<br />
                  3→ Weise Beschützerin von Zelda (4)<br />
                  4→ Gefährtin mit Feenstaub (5)<br />
                  5→ Klassischer Gegner, spuckt Felsen (7)<br />
                  6→ Währung in Hyrule (5)<br />
                  7→ Hühnerlegende – fass sie nicht! (5)<br />
                  8→ Links treues Pferd (5)
                </p>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Kreuzworträtsel-Gitter-Karte */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[400px] w-[350px] rounded-[10px]"
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[400px] overflow-clip relative w-[350px] flex flex-col items-center justify-center p-6">
            {/* Titel */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[22px] text-black mb-4 text-center">
              <p>Das Netz der Symbole</p>
            </div>
            
            {/* Kreuzworträtsel Grid */}
            <div className="bg-white/90 p-4 rounded-lg shadow-inner">
              <div className="grid grid-cols-8 gap-[1px] bg-black p-2">
                {Array.from({ length: 64 }, (_, i) => {
                  const row = Math.floor(i / 8);
                  const col = i % 8;
                  
                  // Definiere die Kreuzwort-Struktur basierend auf dem 8x8 Raster
                  const isActive = 
                    // TUNIC (row 0, cols 0-4)
                    (row === 0 && col >= 0 && col <= 4) ||
                    // RITO (row 1, cols 0-3)
                    (row === 1 && col >= 0 && col <= 3) ||
                    // IMPA (row 2, cols 0-3)
                    (row === 2 && col >= 0 && col <= 3) ||
                    // FAIRY (row 3, cols 0-4)
                    (row === 3 && col >= 0 && col <= 4) ||
                    // OCTOROK (row 4, cols 0-6)
                    (row === 4 && col >= 0 && col <= 6) ||
                    // RUPEE (row 5, cols 0-4)
                    (row === 5 && col >= 0 && col <= 4) ||
                    // CUCCO (row 6, cols 0-4)
                    (row === 6 && col >= 0 && col <= 4) ||
                    // EPONA (row 7, cols 0-4)
                    (row === 7 && col >= 0 && col <= 4);
                  
                  // Zahlen für den Start der Wörter
                  const hasNumber = 
                    (row === 0 && col === 0) ? '1' :
                    (row === 1 && col === 0) ? '2' :
                    (row === 2 && col === 0) ? '3' :
                    (row === 3 && col === 0) ? '4' :
                    (row === 4 && col === 0) ? '5' :
                    (row === 5 && col === 0) ? '6' :
                    (row === 6 && col === 0) ? '7' :
                    (row === 7 && col === 0) ? '8' : '';
                  
                  // Markiere die Lösung TRIFORCE (erste Spalte)
                  const isTriforce = col === 0;
                  
                  return (
                    <div
                      key={i}
                      className={`
                        w-6 h-6 flex items-center justify-center text-[10px] relative
                        ${isActive ? 'bg-white border border-gray-400' : 'bg-gray-800'}
                        ${isTriforce ? 'bg-yellow-100 border-yellow-600' : ''}
                      `}
                    >
                      {hasNumber && (
                        <span className="absolute top-0 left-0 text-[8px] text-blue-600 leading-none">
                          {hasNumber}
                        </span>
                      )}
                      {isActive && !hasNumber && (
                        <span className="text-gray-400">_</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lösungshinweis */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[11px] text-black mt-3 text-center leading-[13px]">
              <p>Aus den ersten Buchstaben wird das Triforce geboren</p>
            </div>

            {/* Rätsel-Kennzeichnung */}
            <div className="absolute bottom-4 right-4 font-['Jim_Nightshade:Regular',_sans-serif] text-[32px] text-black">
              <p>B</p>
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
            <div className="relative shrink-0 text-[26px] w-full">
              <p className="leading-[30px]">Kästchen des Wissens</p>
            </div>
            <div className="relative shrink-0 text-[56px] w-full">
              <p className="leading-[50px]">B</p>
            </div>
            <div className="relative shrink-0 text-[14px] w-full">
              <p className="leading-[16px]">Kreuzwort der Helden</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>
    </div>
  );
}