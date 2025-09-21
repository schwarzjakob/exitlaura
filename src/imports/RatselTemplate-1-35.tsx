import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

function Component4() {
  return (
    <div className="absolute bg-center bg-cover bg-no-repeat h-[288px] left-[40px] rounded-[10px] top-[40px] w-[203px]" data-name="Component 4" style={{ backgroundImage: `url('${imgComponent4}')` }}>
      <div className="h-[288px] overflow-clip relative w-[203px]">
        <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] h-[227px] leading-[20px] left-[11px] not-italic text-[14px] text-black top-[18px] w-[181px]">
          <p className="mb-0">
            Fünf Zeichen trägt dein Name,
            <br aria-hidden="true" />
            {` doch mehr als ein Name sind sie nicht.`}
            <br aria-hidden="true" />
            {` Jeder Buchstabe hat Gewicht,`}
            <br aria-hidden="true" />
            {` zusammen ergeben sie die Seite, die dich ruft.`}
          </p>
          <p className="mb-0">&nbsp;</p>
          <p>
            Dort im Reich der Kästchen
            <br aria-hidden="true" />
            {` wartet der Schlüssel.`}
            <br aria-hidden="true" />
            {` Die mittlere Säule birgt die Zahl,`}
            <br aria-hidden="true" />
            {` nur ihre Summe weist den Weg.`}
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-center bg-cover bg-no-repeat h-[286px] left-[292px] rounded-[10px] top-[40px] w-[203px]" data-name="Background" style={{ backgroundImage: `url('${imgBackground}')` }}>
      <div className="box-border content-stretch flex flex-col font-['Jim_Nightshade:Regular',_sans-serif] h-[286px] items-center justify-between leading-[0] not-italic overflow-clip px-[18px] py-[20px] relative text-black text-center w-[203px]">
        <div className="relative shrink-0 text-[41px] w-full">
          <p className="leading-[45px]">Rätsel-Karte</p>
        </div>
        <div className="relative shrink-0 text-[64px] w-full">
          <p className="leading-[45px]">A</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
    </div>
  );
}

export default function RatselTemplate() {
  return (
    <div className="bg-white relative size-full" data-name="Rätsel Template">
      <Component4 />
      <Background />
    </div>
  );
}