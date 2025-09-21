import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

export function PrufCard() {
  // Die versteckte Nachricht "ÖFFNE UMSCHLAG B" - aufgeteilt auf A=5, B=7, C=9
  const hiddenMessages = {
    A: { correctNumber: 5, message: "ÖFF" },
    B: { correctNumber: 7, message: "NE " },
    C: { correctNumber: 9, message: "UMS" },
    full: "ÖFFNE UMSCHLAG B"
  };

  return (
    <div className="flex gap-8 items-start">
      {/* Instruktions-Karte (Pergament) */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[350px] w-[250px] rounded-[10px]" 
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[350px] overflow-clip relative w-[250px]">
            <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] h-[290px] leading-[18px] left-[15px] not-italic text-[13px] text-black top-[20px] w-[220px]">
              <p className="mb-2">
                Nun, da du die Zahlen gefunden hast,
                <br />
                {` prüfe deinen Mut vor den drei Wächtern.`}
              </p>
              <p className="mb-2">
                Jeder bewacht eine Ziffer,
                <br />
                {` nur die wahren öffnen das Tor.`}
              </p>
              <p className="mb-2">
                Drücke die gefundenen Zahlen
                <br />
                {` in der Reihenfolge A, B, C.`}
              </p>
              <p className="mb-2">
                Hinter den richtigen Pfaden
                <br />
                {` wartet die nächste Botschaft.`}
              </p>
              <p className="text-center italic">
                ※ Schneide die Laschen auf ※
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Prüfkarte mit Flaps */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[400px] w-[350px] rounded-[10px]"
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[400px] overflow-clip relative w-[350px] flex flex-col items-center justify-center p-6">
            {/* Titel */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[28px] text-black mb-6 text-center">
              <p>Die drei Wächter</p>
            </div>
            
            {/* Wächter-Spalten */}
            <div className="flex gap-8 justify-center">
              {['A', 'B', 'C'].map((watcher) => (
                <div key={watcher} className="flex flex-col items-center">
                  {/* Wächter-Titel */}
                  <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[20px] text-black mb-3">
                    <p>Wächter {watcher}</p>
                  </div>
                  
                  {/* Zahlen-Flaps */}
                  <div className="flex flex-col gap-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
                      const isCorrect = hiddenMessages[watcher as keyof typeof hiddenMessages]?.correctNumber === number;
                      
                      return (
                        <div
                          key={number}
                          className={`
                            w-8 h-6 border border-gray-400 bg-white flex items-center justify-center text-sm cursor-pointer
                            hover:bg-gray-100 transition-colors relative overflow-hidden
                            ${isCorrect ? 'bg-yellow-100 border-yellow-600' : ''}
                          `}
                          title={isCorrect ? `Versteckt: "${hiddenMessages[watcher as keyof typeof hiddenMessages]?.message}"` : ''}
                        >
                          <span className="font-['Jim_Nightshade:Regular',_sans-serif] text-black">
                            {number}
                          </span>
                          
                          {/* Versteckte Nachricht (als Tooltip-Simulation) */}
                          {isCorrect && (
                            <div className="absolute top-0 left-0 w-full h-full bg-yellow-200 border border-yellow-600 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-[10px] font-bold text-red-800">
                              {hiddenMessages[watcher as keyof typeof hiddenMessages]?.message}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Hinweis für Vollständige Nachricht */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[12px] text-black mt-4 text-center leading-[14px]">
              <p>Zusammengesetzt ergibt sich:</p>
              <p className="italic text-red-800">{hiddenMessages.full}</p>
            </div>

            {/* Rätsel-Kennzeichnung */}
            <div className="absolute bottom-4 right-4 font-['Jim_Nightshade:Regular',_sans-serif] text-[20px] text-black">
              <p>Prüfung</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Fantasy-Karte (Rückseite) */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[350px] rounded-[10px] w-[250px]" 
          style={{ backgroundImage: `url('${imgBackground}')` }}
        >
          <div className="box-border content-stretch flex flex-col font-['Jim_Nightshade:Regular',_sans-serif] h-[350px] items-center justify-between leading-[0] not-italic overflow-clip px-[18px] py-[30px] relative text-black text-center w-[250px]">
            <div className="relative shrink-0 text-[28px] w-full">
              <p className="leading-[32px]">Prüfung der Wächter</p>
            </div>
            <div className="relative shrink-0 text-[48px] w-full">
              <p className="leading-[40px]">✦</p>
            </div>
            <div className="relative shrink-0 text-[16px] w-full">
              <p className="leading-[18px]">Code-Kontrolle</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>
    </div>
  );
}