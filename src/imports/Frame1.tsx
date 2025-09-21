import imgFrame1 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgImage4 from "figma:asset/9f446e54b55aa881ebabe6a2196e85a268994948.png";

export default function Frame1() {
  return (
    <div className="bg-center bg-cover bg-no-repeat relative size-full" style={{ backgroundImage: `url('${imgFrame1}')` }}>
      <div className="absolute font-['Jim_Nightshade:Regular',_sans-serif] leading-[27px] left-[31px] not-italic text-[19px] text-black top-[24px] w-[401px]">
        <p className="mb-0">Laura, die Göttin von Hyrule hat dir Geschenke hinterlassen. Doch sie hat sie mit Prüfungen versiegelt, um zu erkennen, ob du ihrer würdig bist. Jede Lösung ist ein Schlüssel, der dich tiefer in das Geheimnis führt. Nur wer alle Siegel bricht, wird den Schatz der Göttin empfangen.</p>
        <p className="mb-0">&nbsp;</p>
        <p>Deine Reise beginnt hier. Die erste Prüfung erwartet dich – finde die verborgenen Zahlen, die den Pfad öffnen…</p>
      </div>
      <div className="absolute bg-center bg-cover bg-no-repeat h-[60px] left-[389px] top-[221px] w-[43px]" data-name="image 4" style={{ backgroundImage: `url('${imgImage4}')` }} />
    </div>
  );
}