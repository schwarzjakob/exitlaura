import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { FlippableRatselCard } from '../FlippableRatselCard';
import type { GameState } from "../GameEngine";

interface InteractiveElchProps {
  gameState: GameState;
  onComplete: () => void;
}

// Elch-Rätselkarten Inhalt
const ElchRatselContent = () => (
  <>
    <p className="mb-3">
      In den Wäldern des Nordens
      <br />
      versteckt sich ein Gefährte.
      <br />
      Doch nur einer trägt das Geweih.
    </p>
    
    <p className="mb-3">
      Finde den stillen Begleiter,
      <br />
      der sich einst verbarg.
      <br />
      Nun reist er mit dir
      <br />
      durch Schwedens Wälder weit.
    </p>
    
    <div className="text-center mt-4 p-2 bg-white/80 rounded text-[10px] text-gray-700">
      <strong>Tipp:</strong> Welches Tier trägt das charakteristische Geweih?
    </div>
  </>
);

export function InteractiveElch({ onComplete }: InteractiveElchProps) {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Tiere für das Silhouette-Puzzle
  const animals = [
    { id: 'bear', name: 'Bär', emoji: '🐻', letter: 'A', hasAntlers: false },
    { id: 'elk', name: 'Elch', emoji: '🦌', letter: 'B', hasAntlers: true },
    { id: 'wolf', name: 'Wolf', emoji: '🐺', letter: 'C', hasAntlers: false },
    { id: 'rabbit', name: 'Hase', emoji: '🐰', letter: 'D', hasAntlers: false },
    { id: 'fox', name: 'Fuchs', emoji: '🦊', letter: 'E', hasAntlers: false }
  ];

  const correctAnswer = 'elk';

  const handleAnimalSelect = (animalId: string) => {
    setSelectedAnimal(animalId);
    setShowResult(true);
    
    if (animalId === correctAnswer) {
      toast.success("🦌 Richtig! Du hast den Elch gefunden!");
      setTimeout(() => onComplete(), 2000);
    } else {
      toast.error("Das ist nicht der Gefährte mit dem Geweih. Versuche es nochmal...");
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnimal(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-8 items-start">
        {/* Rätselkarte links */}
        <div className="flex-shrink-0">
          <FlippableRatselCard
            puzzleId="F"
            title="Das Geweih des Nordens"
            content={<ElchRatselContent />}
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
                Das Geweih des Nordens
              </h2>
              
              <p className="text-[14px] text-black mb-8 max-w-[500px]">
                In den stillen Wäldern Schwedens verbirgt sich ein Gefährte. 
                Finde das Tier mit dem charakteristischen Geweih!
              </p>

              {/* Tier-Silhouetten */}
              <div className="bg-white/90 p-6 rounded-lg shadow-inner mb-6">
                <div className="grid grid-cols-3 gap-6 max-w-[400px] mx-auto">
                  {animals.slice(0, 3).map((animal) => {
                    const isSelected = selectedAnimal === animal.id;
                    const isCorrect = animal.id === correctAnswer;
                    
                    return (
                      <motion.div
                        key={animal.id}
                        className={`cursor-pointer text-center ${
                          showResult && isSelected
                            ? isCorrect 
                              ? 'bg-green-100 border-2 border-green-500' 
                              : 'bg-red-100 border-2 border-red-500'
                            : 'hover:bg-gray-50'
                        } p-4 rounded-lg transition-all`}
                        onClick={() => !showResult && handleAnimalSelect(animal.id)}
                        whileHover={{ scale: showResult ? 1 : 1.05 }}
                        whileTap={{ scale: showResult ? 1 : 0.95 }}
                      >
                        {/* Silhouette */}
                        <div className="w-20 h-20 bg-black rounded-lg mb-3 flex items-center justify-center shadow-lg mx-auto">
                          <div className="text-white text-[32px]">{animal.emoji}</div>
                        </div>
                        
                        {/* Letter */}
                        <div className="font-['Jim_Nightshade'] text-[18px] text-black font-bold mb-2">
                          {animal.letter}
                        </div>
                        
                        {/* Name (nur nach Auswahl sichtbar) */}
                        {showResult && isSelected && (
                          <motion.div
                            className="font-['Jim_Nightshade'] text-[14px] text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {animal.name}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Zusätzliche Tiere in zweiter Reihe */}
                <div className="grid grid-cols-2 gap-6 max-w-[300px] mx-auto mt-6">
                  {animals.slice(3).map((animal) => {
                    const isSelected = selectedAnimal === animal.id;
                    const isCorrect = animal.id === correctAnswer;
                    
                    return (
                      <motion.div
                        key={animal.id}
                        className={`cursor-pointer text-center ${
                          showResult && isSelected
                            ? isCorrect 
                              ? 'bg-green-100 border-2 border-green-500' 
                              : 'bg-red-100 border-2 border-red-500'
                            : 'hover:bg-gray-50'
                        } p-4 rounded-lg transition-all`}
                        onClick={() => !showResult && handleAnimalSelect(animal.id)}
                        whileHover={{ scale: showResult ? 1 : 1.05 }}
                        whileTap={{ scale: showResult ? 1 : 0.95 }}
                      >
                        {/* Silhouette */}
                        <div className="w-20 h-20 bg-black rounded-lg mb-3 flex items-center justify-center shadow-lg mx-auto">
                          <div className="text-white text-[32px]">{animal.emoji}</div>
                        </div>
                        
                        {/* Letter */}
                        <div className="font-['Jim_Nightshade'] text-[18px] text-black font-bold mb-2">
                          {animal.letter}
                        </div>
                        
                        {/* Name (nur nach Auswahl sichtbar) */}
                        {showResult && isSelected && (
                          <motion.div
                            className="font-['Jim_Nightshade'] text-[14px] text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {animal.name}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Ergebnis */}
              {showResult && selectedAnimal === correctAnswer && (
                <motion.div
                  className="bg-green-100 border-2 border-green-600 rounded-lg p-4 mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-[20px] mb-2">🦌</div>
                  <p className="font-['Jim_Nightshade'] text-[16px] text-green-800 font-bold">
                    Du hast den Elch gefunden!
                  </p>
                  <p className="text-[12px] text-green-700 mt-2">
                    Der stille Gefährte aus Schwedens Wäldern begleitet dich nun auf deiner Reise.
                  </p>
                </motion.div>
              )}

              {/* Zurücksetzen Button */}
              {showResult && selectedAnimal !== correctAnswer && (
                <Button
                  onClick={() => {
                    setShowResult(false);
                    setSelectedAnimal(null);
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