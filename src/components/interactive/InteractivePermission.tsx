import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import type { GameState } from "../GameEngine";

interface InteractivePermissionProps {
  gameState: GameState;
  variant: 'A' | 'B' | 'C' | 'D' | 'E';
  onComplete: () => void;
}

export function InteractivePermission({ variant, onComplete }: InteractivePermissionProps) {
  const getTitle = () => {
    if (variant === 'E') {
      return 'Letztes Siegel gebrochen';
    }
    return 'Siegel gebrochen';
  };

  const handleOpenPackage = () => {
    toast.success(`Päckchen ${variant} wurde geöffnet! 🎁`);
    setTimeout(() => onComplete(), 1000); // Verkürzt auf 1 Sekunde
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        className="bg-center bg-cover bg-no-repeat min-h-[500px] w-[600px] rounded-[15px] mx-auto relative"
        style={{ backgroundImage: `url('${imgComponent4}')` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="min-h-[500px] relative w-[600px] flex flex-col items-center justify-center p-8">
          <motion.div
            className="font-['Jim_Nightshade:Regular',_sans-serif] text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Key/Lock Icon */}
            <motion.div 
              className="mb-4"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#FFD700] to-[#B8860B] flex items-center justify-center shadow-lg mx-auto">
                <div className="text-[24px]">🗝️</div>
              </div>
            </motion.div>
            
            {/* Title */}
            <h2 className="text-[28px] text-red-800 mb-6 leading-tight">
              {getTitle()}
            </h2>
            
            {/* Permission Text */}
            <div className="font-['Jim_Nightshade'] text-[18px] text-black leading-relaxed mb-6">
              <p>
                Die Göttin gewährt dir: Du darfst jetzt{' '}
                <span className="font-bold text-red-800 text-[20px]">
                  Päckchen {variant}
                </span>{' '}
                öffnen.
              </p>
            </div>

            {/* Package Preview */}
            <motion.div 
              className="bg-white/90 p-3 rounded-lg shadow-inner mb-6 max-w-[300px] mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-[36px] mb-1">📦</div>
              <p className="font-['Jim_Nightshade'] text-[14px] text-black font-bold">
                Päckchen {variant}
              </p>
              <p className="text-[10px] text-gray-600 italic">
                Bereit zum Öffnen
              </p>
            </motion.div>
            
            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                onClick={handleOpenPackage}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-['Jim_Nightshade'] text-[18px] shadow-lg"
              >
                🎁 Päckchen {variant} öffnen
              </Button>
            </motion.div>
            
            {/* Decorative Border */}
            <div className="absolute bottom-6 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#C8A75E] to-transparent"></div>
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