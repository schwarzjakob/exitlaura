import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

export function StickerCard() {
  // Anime-Sticker Rätsel-Daten
  const stickerHints = [
    { character: '🦸', anime: 'My Hero Academia', position: 1, letter: 'Ö' },
    { character: '🗡️', anime: 'Attack on Titan', position: 2, letter: 'F' },
    { character: '👑', anime: 'Zelda Series', position: 3, letter: 'F' },
    { character: '🌟', anime: 'Sailor Moon', position: 4, letter: 'N' },
    { character: '⚡', anime: 'Pokemon', position: 5, letter: 'E' },
    { character: '🔥', anime: 'Demon Slayer', position: 6, letter: ' ' },
    { character: '🌸', anime: 'Cardcaptor Sakura', position: 7, letter: 'D' },
    { character: '❄️', anime: 'Frozen/Elsa', position: 8, letter: 'A' },
    { character: '🌙', anime: 'Sailor Moon', position: 9, letter: 'S' },
    { character: '🎭', anime: 'Persona', position: 10, letter: ' ' },
    { character: '🏔️', anime: 'Attack on Titan', position: 11, letter: 'K' },
    { character: '🗝️', anime: 'Kingdom Hearts', position: 12, letter: 'Ü' },
    { character: '🎯', anime: 'Hunter x Hunter', position: 13, letter: 'H' },
    { character: '🌈', anime: 'Pretty Cure', position: 14, letter: 'L' },
    { character: '💎', anime: 'Steven Universe', position: 15, letter: 'R' },
    { character: '🌺', anime: 'Moana', position: 16, letter: 'E' },
    { character: '🎪', anime: 'Circus Theme', position: 17, letter: 'I' },
    { character: '🔮', anime: 'Magic Girl', position: 18, letter: 'C' },
    { character: '🦋', anime: 'Butterfly Theme', position: 19, letter: 'H' }
  ];

  const solution = "ÖFFNE DAS KÜHLREICH";

  return (
    <div className="flex gap-8 items-start">
      {/* Instruktions-Karte (Pergament) */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[350px] w-[260px] rounded-[10px]" 
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[350px] overflow-clip relative w-[260px]">
            <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] h-[310px] leading-[16px] left-[15px] not-italic text-[12px] text-black top-[20px] w-[230px]">
              <p className="mb-2">
                Das Triforce hat dir den Weg bereitet.
                <br />
                {` Nun wartet eine andere Art der Magie.`}
              </p>
              <p className="mb-2">
                In deiner Box liegen bunte Sticker
                <br />
                {` aus den Welten der Anime und Manga.`}
              </p>
              <p className="mb-2">
                Jeder trägt auf seiner Rückseite
                <br />
                {` einen Buchstaben als Geheimnis.`}
              </p>
              <p className="mb-2">
                Ordne sie nach den Symbolen unten,
                <br />
                {` in der richtigen Reihenfolge.`}
              </p>
              <p className="mb-2">
                Die Buchstaben formen eine Botschaft,
                <br />
                {` die dich zum kühlen Schatz führt.`}
              </p>
              <p className="text-center italic text-[10px] mt-3">
                ※ Schaue auf die Rückseiten der Sticker ※
                <br />
                ※ Nutze die Symbole als Reihenfolge ※
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>

      {/* Sticker-Rätsel-Karte */}
      <div className="relative">
        <div 
          className="bg-center bg-cover bg-no-repeat h-[450px] w-[380px] rounded-[10px]"
          style={{ backgroundImage: `url('${imgComponent4}')` }}
        >
          <div className="h-[450px] overflow-clip relative w-[380px] flex flex-col items-center justify-center p-4">
            {/* Titel */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[20px] text-black mb-4 text-center">
              <p>Die Sticker der Anime-Welten</p>
            </div>
            
            {/* Sticker-Gitter */}
            <div className="bg-white/90 p-4 rounded-lg shadow-inner max-h-[320px] overflow-y-auto">
              <div className="grid grid-cols-5 gap-2">
                {stickerHints.map((sticker, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:shadow-md transition-all relative group"
                    title={`${sticker.anime} - Position ${sticker.position}`}
                  >
                    {/* Symbol/Emoji */}
                    <div className="text-lg">
                      {sticker.character}
                    </div>
                    
                    {/* Position */}
                    <div className="text-[8px] text-gray-600 absolute bottom-0 right-1">
                      {sticker.position}
                    </div>
                    
                    {/* Versteckter Buchstabe (Tooltip-Simulation) */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-200 border border-yellow-600 px-2 py-1 rounded text-[10px] font-bold text-red-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {sticker.letter}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lösungsbereich */}
            <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[11px] text-black mt-3 text-center leading-[13px]">
              <p>In der richtigen Reihenfolge ergibt sich:</p>
              <p className="italic text-red-600 text-[12px] mt-1">{solution}</p>
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
          className="bg-center bg-cover bg-no-repeat h-[350px] rounded-[10px] w-[260px]" 
          style={{ backgroundImage: `url('${imgBackground}')` }}
        >
          <div className="box-border content-stretch flex flex-col font-['Jim_Nightshade:Regular',_sans-serif] h-[350px] items-center justify-between leading-[0] not-italic overflow-clip px-[18px] py-[25px] relative text-black text-center w-[260px]">
            <div className="relative shrink-0 text-[24px] w-full">
              <p className="leading-[28px]">Sticker der Anime-Welten</p>
            </div>
            <div className="relative shrink-0 text-[56px] w-full">
              <p className="leading-[50px]">C</p>
            </div>
            <div className="relative shrink-0 text-[14px] w-full">
              <p className="leading-[16px]">Rätsel der bunten Magie</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </div>
      </div>
    </div>
  );
}