import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

export function FinaleCard() {
  return (
    <div className="flex gap-8 items-start">
      {/* Epilog-Karte (Pergament) */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[380px] w-[280px] rounded-[10px]" 
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[380px] overflow-clip relative w-[280px]">
            <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] h-[340px] leading-[18px] left-[20px] not-italic text-[14px] text-black top-[20px] w-[240px]">
              <div className="text-center mb-4">
                <p className="text-[20px] leading-[24px] text-red-800">
                  ✦ Epilog der Göttin ✦
                </p>
              </div>
              
              <p className="mb-3">
                Tapfere Laura,
              </p>
              
              <p className="mb-3">
                du hast alle Prüfungen gemeistert
                <br />
                {` und die Siegel gebrochen.`}
              </p>
              
              <p className="mb-3">
                Das Reich der Kästchen gab dir Zahlen,
                <br />
                {` die Wächter öffneten dir Tore,`}
                <br />
                {` das Wissen der Helden führte dich weiter,`}
                <br />
                {` und die bunten Sticker verrieten dir`}
                <br />
                {` das letzte Geheimnis.`}
              </p>
              
              <p className="mb-3">
                Nun, da alle Pfade beschritten sind,
                <br />
                {` überreiche ich dir den finalen Schatz:`}
                <br />
                {` Die Wundertüte der Göttin!`}
              </p>
              
              <p className="mb-3">
                Darin verborgen liegt das Wertvollste —
                <br />
                {` nicht Gold oder Juwelen,`}
                <br />
                {` sondern die Liebe desjenigen,`}
                <br />
                {` der dir diese Reise bereitet hat.`}
              </p>
              
              <div className="text-center mt-4">
                <p className="text-[12px] italic text-red-600">
                  Mögen deine Abenteuer niemals enden,
                  <br />
                  deine Reise niemals zu Ende sein.
                </p>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-[16px] text-red-800">
                  ✦ Die Göttin von Hyrule ✦
                </p>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Wundertüten-Karte */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[380px] w-[280px] rounded-[10px]"
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[380px] overflow-clip relative w-[280px] flex flex-col items-center justify-center p-6">
            {/* Titel */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[24px] text-black mb-6 text-center">
              <p>Die Wundertüte der Göttin</p>
            </div>
            
            {/* Wundertüte Darstellung */}
            <div className="bg-gradient-to-br from-purple-200 to-pink-200 p-6 rounded-lg shadow-lg border-4 border-gold-400 mb-4">
              <div className="text-center">
                <div className="text-6xl mb-2">🎁</div>
                <div className="text-2xl mb-1">✨</div>
                <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[16px] text-purple-800">
                  <p>Der finale Schatz</p>
                </div>
              </div>
            </div>

            {/* Anweisungen */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[12px] text-black text-center leading-[14px] mb-4">
              <p>Öffne nun die Wundertüte</p>
              <p>und entdecke das letzte Geschenk</p>
              <p>der Göttin von Hyrule!</p>
            </div>

            {/* Sammlung aller gefundenen Gegenstände */}
            <div className="bg-white/80 p-3 rounded-lg text-[10px] text-gray-700 leading-[12px]">
              <p className="font-['Jim_Nightshade:Regular',_sans-serif] text-[12px] text-black mb-2 text-center">
                Deine Belohnungen:
              </p>
              <div className="space-y-1">
                <div>🎮 Nintendo Controller</div>
                <div>🏰 Zelda-Spielhüllen</div>
                <div>❄️ Magische Kühlmaske</div>
                <div>🌟 Anime-Sticker</div>
                <div>🎁 Finale Wundertüte</div>
              </div>
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
          className="bg-center bg-cover bg-no-repeat h-[380px] rounded-[10px] w-[280px]" 
          style={{ backgroundImage: `url('${imgBackground}')` }}
        >
          <div className="box-border content-stretch flex flex-col font-['Jim_Nightshade:Regular',_sans-serif] h-[380px] items-center justify-between leading-[0] not-italic overflow-clip px-[18px] py-[30px] relative text-black text-center w-[280px]">
            <div className="relative shrink-0 text-[28px] w-full">
              <p className="leading-[32px]">Epilog der Göttin</p>
            </div>
            <div className="relative shrink-0 text-[72px] w-full">
              <p className="leading-[60px]">✦</p>
            </div>
            <div className="relative shrink-0 text-[16px] w-full">
              <p className="leading-[18px]">Der finale Schatz</p>
            </div>
            <div className="relative shrink-0 text-[48px] w-full">
              <p className="leading-[40px]">D</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>
    </div>
  );
}