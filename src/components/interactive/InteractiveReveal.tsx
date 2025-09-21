import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import type { GameState } from "../GameEngine";

interface InteractiveRevealProps {
  gameState: GameState;
  variant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  onComplete: () => void;
}

export function InteractiveReveal({ variant, onComplete }: InteractiveRevealProps) {
  const getContent = () => {
    switch (variant) {
      case 'A':
        return {
          title: 'Zwei Schilde im Licht',
          body: 'Oh – zwei Schilde glänzen im Licht. Dein altes zerbrach im letzten Kampf; jetzt bist du wieder geschützt.',
          icon: '🛡️',
          background: 'from-green-400 to-emerald-600'
        };
      case 'B':
        return {
          title: 'Zeichen aus einer anderen Welt',
          body: 'Diese Zeichen stammen aus einer anderen Welt, fremd und doch faszinierend. Bewahre sie gut; vielleicht tragen sie Kraft in sich.',
          icon: '✨',
          background: 'from-purple-400 to-indigo-600'
        };
      case 'C':
        return {
          title: 'Segen der Ruhe',
          body: 'Die Göttin schenkt dir Ruhe. Lege die Maske an, wenn die Kämpfe zu laut werden. Im Kühlen der Stille kehren deine Kräfte zurück.',
          icon: '❄️',
          background: 'from-cyan-400 to-blue-600'
        };
      case 'D':
        return {
          title: 'Eine sanfte Gabe',
          body: 'Manchmal ist der größte Mut die zarte Seite. Folge diesem Pfad des Herzens und entdecke Abenteuer auf Papier.',
          icon: '💝',
          background: 'from-pink-400 to-rose-600'
        };
      case 'E':
        return {
          title: 'Das Relikt vereinigt die Kräfte',
          body: 'Du hast alle Prüfungen bestanden. Vor dir erscheint das mächtigste Relikt – ein Kristall der Macht, der deine Kräfte bündelt.',
          icon: '💎',
          background: 'from-yellow-400 to-orange-600'
        };
      case 'F':
        return {
          title: 'Gefährte aus dem Norden',
          body: 'Und doch… ein letzter Weg bleibt. Weit im Norden, in den stillen Wäldern Schwedens, offenbart sich dir ein Gefährte: ein kleiner Elch. Erinnere dich – er hat sich einst vor euch verborgen, doch nun reist er mit dir.',
          icon: '🦌',
          background: 'from-emerald-400 to-sky-600'
        };
      default:
        return {
          title: 'Unbekannte Gabe',
          body: 'Ein Geheimnis wartet...',
          icon: '❓',
          background: 'from-gray-400 to-gray-600'
        };
    }
  };

  const content = getContent();

  const handleContinue = () => {
    toast.success(`Geschenk ${variant} wurde gewürdigt! ✨`);
    setTimeout(() => onComplete(), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        className="bg-center bg-cover bg-no-repeat h-[500px] w-[700px] rounded-[15px] mx-auto relative"
        style={{ backgroundImage: `url('${imgComponent4}')` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Warning Banner */}
        <motion.div 
          className="absolute top-4 left-4 right-4 bg-[#FFE4B5] border-2 border-[#C8A75E] rounded-lg p-2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-['Jim_Nightshade'] text-[12px] text-[#8B4513] text-center italic">
            Du hast Päckchen {variant} geöffnet und das Geschenk erhalten.
          </p>
        </motion.div>
        
        <div className="h-[500px] overflow-clip relative w-[700px] flex flex-col items-center justify-center p-8 pt-16">
          <motion.div
            className="font-['Jim_Nightshade:Regular',_sans-serif] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Icon with magical effect */}
            <motion.div 
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", duration: 1 }}
            >
              <motion.div 
                className={`w-24 h-24 rounded-full bg-gradient-to-b ${content.background} flex items-center justify-center shadow-xl mx-auto relative`}
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                    "0 0 40px rgba(255, 255, 255, 0.6)",
                    "0 0 20px rgba(255, 255, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-[40px]">{content.icon}</div>
                
                {/* Sparkle effect */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      scale: 0 
                    }}
                    animate={{ 
                      x: Math.cos(i * 60 * Math.PI / 180) * 40,
                      y: Math.sin(i * 60 * Math.PI / 180) * 40,
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
            
            {/* Title */}
            <motion.h2 
              className="text-[28px] text-red-800 mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {content.title}
            </motion.h2>
            
            {/* Story Text */}
            <motion.div 
              className="font-['Jim_Nightshade'] text-[16px] text-black leading-relaxed max-w-[500px] mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p>{content.body}</p>
            </motion.div>
            
            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <Button
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-['Jim_Nightshade'] text-[18px] shadow-lg"
              >
                {variant === 'F' ? '🏆 Spiel beenden' : '➡️ Weiter zur nächsten Prüfung'}
              </Button>
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-center">
              <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C8A75E] to-transparent"></div>
            </div>
          </motion.div>
        </div>
        <div
          aria-hidden="true"
          className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_8px_0px_#9db3ce]"
        />
      </motion.div>
    </div>
  );
}
