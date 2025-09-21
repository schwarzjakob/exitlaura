import RatselTemplate from '../imports/RatselTemplate-1-35';

interface RevealCardProps {
  variant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
}

export function RevealCard({ variant }: RevealCardProps) {
  const getContent = () => {
    switch (variant) {
      case 'A':
        return {
          title: 'Zelda-Hüllen',
          body: 'Oh – zwei Schilde glänzen im Licht. Dein altes zerbrach im letzten Kampf; jetzt bist du wieder geschützt.',
          icon: '🛡️'
        };
      case 'B':
        return {
          title: 'Sticker',
          body: 'Diese Zeichen stammen aus einer anderen Welt, fremd und doch faszinierend. Bewahre sie gut; vielleicht tragen sie Kraft in sich.',
          icon: '✨'
        };
      case 'C':
        return {
          title: 'Maske',
          body: 'Die Göttin schenkt dir Ruhe. Lege die Maske an, wenn die Kämpfe zu laut werden. Im Kühlen der Stille kehren deine Kräfte zurück.',
          icon: '❄️'
        };
      case 'D':
        return {
          title: 'Wundertüte',
          body: 'Manchmal ist der größte Mut die zarte Seite. Folge diesem Pfad des Herzens und entdecke Abenteuer auf Papier.',
          icon: '💝'
        };
      case 'E':
        return {
          title: 'Controller (Finale)',
          body: 'Du hast alle Prüfungen bestanden. Vor dir erscheint das mächtigste Relikt – ein Kristall der Macht, der deine Kräfte bündelt.',
          icon: '🎮'
        };
      case 'F':
        return {
          title: 'Elch (Epilog)',
          body: 'Und doch… ein letzter Weg bleibt. Weit im Norden, in den stillen Wäldern Schwedens, offenbart sich dir ein Gefährte: ein kleiner Elch. Erinnere dich – er hat sich einst vor euch verborgen, doch nun reist er mit dir.',
          icon: '🦌'
        };
      default:
        return {
          title: 'Unbekannte Gabe',
          body: 'Ein Geheimnis wartet...',
          icon: '❓'
        };
    }
  };

  const content = getContent();

  return (
    <div className="w-[535px] h-[368px] relative">
      <RatselTemplate />
      
      {/* Warning Banner */}
      <div className="absolute top-4 left-4 right-4 bg-[#FFE4B5] border-2 border-[#C8A75E] rounded-lg p-2">
        <p className="font-['Jim_Nightshade'] text-[12px] text-[#8B4513] text-center italic">
          Nur lesen, nachdem Päckchen {variant} geöffnet wurde.
        </p>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pt-16">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#FFD700] to-[#B8860B] flex items-center justify-center shadow-lg">
            <div className="text-[32px]">{content.icon}</div>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="font-['Jim_Nightshade'] text-[24px] text-[#8B4513] mb-6 leading-tight">
          {content.title}
        </h2>
        
        {/* Story Text */}
        <div className="font-['Jim_Nightshade'] text-[16px] text-[#2B2B2B] leading-relaxed max-w-[400px]">
          <p>{content.body}</p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-center">
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C8A75E] to-transparent"></div>
        </div>
      </div>
    </div>
  );
}