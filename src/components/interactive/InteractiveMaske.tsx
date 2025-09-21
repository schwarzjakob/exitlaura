import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { FlippableRatselCard } from '../FlippableRatselCard';
import type { GameState } from "../GameEngine";

interface InteractiveMaskeProps {
  gameState: GameState;
  onComplete: () => void;
}

// Maske-Rätselkarten Inhalt
const MaskeRatselContent = () => (
  <>
    <p className="mb-3">
      Wenn die Welt zu laut wird,
      <br />
      suche Ruhe im Kühlen.
      <br />
      Doch wo gehört die Maske hin?
    </p>
    
    <p className="mb-3">
      Betrachte das Muster,
      <br />
      finde die Logik.
      <br />
      Die richtige Position
      <br />
      bringt dir den Frieden.
    </p>
    
    <div className="text-center mt-4 p-2 bg-white/80 rounded text-[10px] text-gray-700">
      <strong>Logik:</strong> Wo sollte die kühlende Maske in einem 3x3-Gitter stehen?
    </div>
  </>
);

export function InteractiveMaske({ onComplete }: InteractiveMaskeProps) {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // 3x3 Grid mit verschiedenen Objekten
  const gridItems = [
    { id: 0, icon: '🔥', name: 'Feuer', isHot: true },
    { id: 1, icon: '☀️', name: 'Sonne', isHot: true }, 
    { id: 2, icon: '⚡', name: 'Blitz', isHot: true },
    { id: 3, icon: '🌡️', name: 'Hitze', isHot: true },
    { id: 4, icon: '❄️', name: 'Eis', isHot: false }, // Richtige Position für Maske
    { id: 5, icon: '💥', name: 'Explosion', isHot: true },
    { id: 6, icon: '🔥', name: 'Flamme', isHot: true },
    { id: 7, icon: '⚡', name: 'Donner', isHot: true },
    { id: 8, icon: '🌋', name: 'Vulkan', isHot: true }
  ];

  const correctPosition = 4; // Mittlere Position mit dem Eis-Symbol

  const handlePositionSelect = (position: number) => {
    setSelectedPosition(position);
    setShowResult(true);
    
    if (position === correctPosition) {
      toast.success("❄️ Richtig! Die Maske gehört zur kühlenden Ruhe!");
      setTimeout(() => onComplete(), 2000);
    } else {
      toast.error("Das ist zu heiß! Die Maske braucht einen ruhigen, kühlen Platz...");
      setTimeout(() => {
        setShowResult(false);
        setSelectedPosition(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-8 items-start">
        {/* Rätselkarte links */}
        <div className="flex-shrink-0">
          <FlippableRatselCard
            puzzleId="C"
            title="Stille der Maske"
            content={<MaskeRatselContent />}
            className="transform scale-125"
          />
        </div>

        {/* Spielfeld rechts */}
        <motion.div
          className="bg-center bg-cover bg-no-repeat h-[600px] w-[700px] rounded-[15px] relative"
          style={{ backgroundImage: `url('${imgComponent4}')` }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-[600px] relative w-[700px] flex flex-col items-center justify-center p-8">
            <motion.div
              className="font-['Jim_Nightshade:Regular',_sans-serif] text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-[28px] text-red-800 mb-6">
                Die Stille der Maske
              </h2>
              
              <p className="text-[14px] text-black mb-8 max-w-[500px]">
                Die kühlende Maske bringt Ruhe in die hitzigen Kämpfe. 
                Aber wo gehört sie hin? Betrachte das Muster...
              </p>

              {/* 3x3 Logik-Grid */}
              <div className="bg-white/90 p-6 rounded-lg shadow-inner mb-6">
                <p className="font-['Jim_Nightshade'] text-[14px] text-black text-center mb-4">
                  Klicke auf die richtige Position für die 🎭 Maske:
                </p>
                
                <div className="grid grid-cols-3 gap-4 max-w-[300px] mx-auto">
                  {gridItems.map((item, index) => {
                    const isSelected = selectedPosition === item.id;
                    const isCorrect = item.id === correctPosition;
                    
                    return (
                      <motion.div
                        key={item.id}
                        className={`relative cursor-pointer w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all ${
                          showResult && isSelected
                            ? isCorrect 
                              ? 'border-green-500 bg-green-100' 
                              : 'border-red-500 bg-red-100'
                            : 'border-gray-400 bg-white hover:bg-gray-50'
                        }`}
                        onClick={() => !showResult && handlePositionSelect(item.id)}
                        whileHover={{ scale: showResult ? 1 : 1.05 }}
                        whileTap={{ scale: showResult ? 1 : 0.95 }}
                      >
                        {/* Hintergrund-Symbol */}
                        <div className="text-[24px] mb-1">{item.icon}</div>
                        <div className="text-[8px] text-gray-600">{item.name}</div>
                        
                        {/* Maske bei Auswahl */}
                        {isSelected && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="text-[32px] drop-shadow-lg">🎭</div>
                          </motion.div>
                        )}
                        
                        {/* Position Label */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                          {index + 1}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Logik-Hinweis */}
                <div className="mt-4 p-3 bg-blue-50 rounded text-[12px] text-blue-800">
                  <p className="font-bold mb-1">Logik:</p>
                  <p>Die Maske bringt Ruhe und Kühlung. Wo passt sie am besten hin?</p>
                </div>
              </div>

              {/* Ergebnis */}
              {showResult && selectedPosition === correctPosition && (
                <motion.div
                  className="bg-green-100 border-2 border-green-600 rounded-lg p-4 mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-[20px] mb-2">🎭❄️</div>
                  <p className="font-['Jim_Nightshade'] text-[16px] text-green-800 font-bold">
                    Perfekt! Die Maske findet Ruhe im Kühlen!
                  </p>
                  <p className="text-[12px] text-green-700 mt-2">
                    Zwischen all der Hitze und den Kämpfen bringt nur die Kälte wahren Frieden.
                  </p>
                </motion.div>
              )}

              {/* Zurücksetzen Button */}
              {showResult && selectedPosition !== correctPosition && (
                <Button
                  onClick={() => {
                    setShowResult(false);
                    setSelectedPosition(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-['Jim_Nightshade'] text-[16px]"
                >
                  Nochmal versuchen
                </Button>
              )}
            </motion.div>
          </div>
          <div
            aria-hidden="true"
            className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_8px_0px_#9db3ce]"
          />
        </motion.div>
      </div>
    </div>
  );
}