import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { RomanceRatselContent } from '../RatselCardContents';
import type { GameState } from "../GameEngine";

interface InteractiveRomanceProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveRomance({ onComplete }: InteractiveRomanceProps) {
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [userInput, setUserInput] = useState("");
  const [showInput, setShowInput] = useState(true); // Für Debug: sofort auf true setzen

  // Heart puzzle - following hearts in the right order reveals hidden letters
  const hearts = [
    { id: 1, x: 60, y: 80, letter: 'R', correct: 1 },
    { id: 2, x: 160, y: 60, letter: 'O', correct: 2 },
    { id: 3, x: 240, y: 100, letter: 'M', correct: 3 },
    { id: 4, x: 200, y: 150, letter: 'A', correct: 4 },
    { id: 5, x: 120, y: 170, letter: 'N', correct: 5 },
    { id: 6, x: 80, y: 130, letter: 'C', correct: 6 },
    { id: 7, x: 210, y: 200, letter: 'E', correct: 7 }
  ];

  const correctAnswer = "ROMANCE";

  const handleHeartClick = (heartId: number) => {
    if (selectedPath.includes(heartId)) {
      // Remove this heart and all hearts after it from the path
      const index = selectedPath.indexOf(heartId);
      setSelectedPath(selectedPath.slice(0, index));
    } else {
      setSelectedPath([...selectedPath, heartId]);
    }
  };

  const getPathWord = () => {
    return selectedPath
      .map(id => hearts.find(h => h.id === id)?.letter || '')
      .join('');
  };

  const checkPath = () => {
    const pathWord = getPathWord();
    if (pathWord.length >= 4) {
      setShowInput(true);
      setUserInput(pathWord); // Automatisch das gefundene Wort ins Eingabefeld setzen
      toast.success(`Pfad gefunden: ${pathWord}`);
    } else {
      toast.error("Folge dem Pfad der Herzen...");
    }
  };

  const checkAnswer = () => {
    if (userInput.toUpperCase() === correctAnswer) {
      toast.success("🎉 Richtig! Du hast den Pfad des Herzens gefunden!");
      setTimeout(() => onComplete(), 1500);
    } else {
      toast.error("Das ist nicht das richtige Wort. Folge dem kompletten Pfad...");
    }
  };

  const resetPath = () => {
    setSelectedPath([]);
    setShowInput(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Rätselkarte */}
      <div className="flex justify-center mb-6">
        <FlippableRatselCard
          puzzleId="D"
          title="Pfad des Herzens"
          content={<RomanceRatselContent />}
        />
      </div>

      <motion.div
        className="bg-center bg-cover bg-no-repeat min-h-[700px] w-[800px] rounded-[15px] mx-auto relative"
        style={{ backgroundImage: `url('${imgComponent4}')` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="min-h-[700px] relative w-[800px] flex flex-col items-center justify-center p-6">
          <motion.div
            className="font-['Jim_Nightshade:Regular',_sans-serif] text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-[24px] text-red-800 mb-3">
              Der Pfad des Herzens
            </h2>
            <p className="text-[12px] text-black mb-4">
              Verbinde die Herzen in der richtigen Reihenfolge, um das Wort zu finden.
            </p>

            {/* Heart Puzzle */}
            <div className="bg-white/90 p-4 rounded-lg shadow-inner w-full max-w-[400px] h-[280px] relative mx-auto mb-4">
              {/* Hearts */}
              {hearts.map((heart, index) => {
                const isSelected = selectedPath.includes(heart.id);
                const selectionIndex = selectedPath.indexOf(heart.id);
                
                return (
                  <div 
                    key={heart.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${heart.x}px`, top: `${heart.y}px` }}
                    onClick={() => handleHeartClick(heart.id)}
                  >
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Heart shape */}
                      <div className={`w-10 h-10 rounded-t-full transform rotate-45 relative transition-all ${
                        isSelected 
                          ? 'bg-gradient-to-b from-pink-400 to-red-500' 
                          : 'bg-gradient-to-b from-pink-200 to-red-300'
                      }`}>
                        <div className={`w-10 h-10 rounded-t-full absolute -left-5 top-0 ${
                          isSelected 
                            ? 'bg-gradient-to-b from-pink-400 to-red-500' 
                            : 'bg-gradient-to-b from-pink-200 to-red-300'
                        }`}></div>
                        <div className={`w-10 h-10 rounded-t-full absolute left-0 -top-5 ${
                          isSelected 
                            ? 'bg-gradient-to-b from-pink-400 to-red-500' 
                            : 'bg-gradient-to-b from-pink-200 to-red-300'
                        }`}></div>
                      </div>
                      
                      {/* Letter */}
                      <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
                        <span className="font-['Jim_Nightshade'] text-[12px] font-bold text-white">
                          {heart.letter}
                        </span>
                      </div>
                      
                      {/* Selection number */}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 border-2 border-yellow-600 rounded-full flex items-center justify-center">
                          <span className="font-['Jim_Nightshade'] text-[10px] font-bold text-black">
                            {selectionIndex + 1}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
              
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {selectedPath.slice(0, -1).map((heartId, index) => {
                  const currentHeart = hearts.find(h => h.id === heartId);
                  const nextHeart = hearts.find(h => h.id === selectedPath[index + 1]);
                  if (!currentHeart || !nextHeart) return null;
                  
                  return (
                    <line 
                      key={index}
                      x1={currentHeart.x} 
                      y1={currentHeart.y} 
                      x2={nextHeart.x} 
                      y2={nextHeart.y}
                      stroke="#FF69B4" 
                      strokeWidth="2" 
                      strokeDasharray="4,4"
                      opacity="0.8"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Current Path */}
            {selectedPath.length > 0 && (
              <div className="mb-4">
                <p className="text-[12px] text-black mb-2">Dein Pfad:</p>
                <div className="flex justify-center gap-1 mb-2">
                  {selectedPath.map((heartId, index) => {
                    const heart = hearts.find(h => h.id === heartId);
                    return (
                      <div key={index} className="w-6 h-6 bg-pink-200 border-2 border-pink-500 rounded flex items-center justify-center">
                        <span className="font-bold text-red-800 text-[12px]">{heart?.letter}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-gray-600">
                  Gefundenes Wort: <span className="font-bold">{getPathWord()}</span>
                </p>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-3">
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={resetPath}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 font-['Jim_Nightshade'] text-[14px]"
                >
                  Zurücksetzen
                </Button>
                {!showInput && selectedPath.length > 0 && (
                  <Button
                    onClick={checkPath}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 font-['Jim_Nightshade'] text-[14px]"
                  >
                    Pfad prüfen
                  </Button>
                )}
              </div>

              {showInput && (
                <div className="space-y-3">
                  <p className="text-[12px] text-black italic">
                    Was ist das vollständige Wort?
                  </p>
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                    placeholder="Vollständiges Wort eingeben"
                    className="text-center font-bold max-w-xs mx-auto text-base"
                  />
                  <Button
                    onClick={checkAnswer}
                    disabled={userInput.length < 4}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-['Jim_Nightshade'] text-[16px]"
                  >
                    Antwort prüfen
                  </Button>
                </div>
              )}
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