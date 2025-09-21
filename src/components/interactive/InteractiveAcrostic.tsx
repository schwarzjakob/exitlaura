import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { AcrosticRatselContent } from '../RatselCardContents';
import type { GameState } from "../GameEngine";

interface InteractiveAcrosticProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveAcrostic({ onComplete }: InteractiveAcrosticProps) {
  const [userInput, setUserInput] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);

  const acrosticLines = [
    "Manche Wege verlangen Einkehr.",
    "Auch Helden brauchen Dunkelheit und Stille,",
    "Sanft wie der Abend, der die Augen schließt.",
    "Kehrt dann Ruhe ein, wird Klarheit geboren.",
    "Erst dann darfst du weiterziehen."
  ];

  const correctAnswer = "MASKE"; // First letters: M-A-S-K-E

  const showNextLine = () => {
    if (currentLineIndex < acrosticLines.length) {
      const firstLetter = acrosticLines[currentLineIndex].charAt(0);
      setRevealedLetters(prev => [...prev, firstLetter]);
      setCurrentLineIndex(prev => prev + 1);
    }
  };

  const checkAnswer = () => {
    if (userInput.toUpperCase() === correctAnswer) {
      toast.success("🎉 Richtig! Du hast das Acrostic gelöst!");
      setTimeout(() => onComplete(), 1500);
    } else {
      toast.error("Das ist nicht korrekt. Schau dir die ersten Buchstaben genau an...");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Rätselkarte */}
      <div className="flex justify-center mb-6">
        <FlippableRatselCard
          puzzleId="C"
          title="Stille der Maske"
          content={<AcrosticRatselContent />}
        />
      </div>

      <motion.div
        className="bg-center bg-cover bg-no-repeat h-[500px] w-[700px] rounded-[15px] mx-auto relative"
        style={{ backgroundImage: `url('${imgComponent4}')` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-[500px] overflow-clip relative w-[700px] flex flex-col items-center justify-center p-8">
          <motion.div
            className="font-['Jim_Nightshade:Regular',_sans-serif] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-[32px] text-red-800 mb-6">
              Die Stille der Maske
            </h2>

            {/* Acrostic Lines */}
            <div className="space-y-4 mb-8 max-w-[500px]">
              {acrosticLines.map((line, index) => (
                <motion.div
                  key={index}
                  className={`flex items-start gap-3 ${
                    index <= currentLineIndex ? 'opacity-100' : 'opacity-30'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= currentLineIndex ? 1 : 0.3,
                    x: 0 
                  }}
                  transition={{ delay: index * 0.5 }}
                >
                  <div className={`w-8 h-8 rounded border-2 flex items-center justify-center ${
                    index < revealedLetters.length 
                      ? 'bg-yellow-300 border-yellow-600' 
                      : 'bg-white border-gray-400'
                  }`}>
                    <span className="font-bold text-red-800 text-[16px]">
                      {index < revealedLetters.length ? revealedLetters[index] : '?'}
                    </span>
                  </div>
                  <p className="text-[16px] text-black leading-[20px] text-left flex-1">
                    {index <= currentLineIndex ? line : '???'}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {currentLineIndex < acrosticLines.length ? (
                <Button
                  onClick={showNextLine}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-['Jim_Nightshade'] text-[18px]"
                >
                  Nächste Zeile enthüllen
                </Button>
              ) : (
                <div className="space-y-4">
                  <p className="text-[16px] text-black italic">
                    Die ersten Buchstaben bilden das Lösungswort:
                  </p>
                  <div className="flex justify-center gap-2 mb-4">
                    {revealedLetters.map((letter, index) => (
                      <div key={index} className="w-8 h-8 bg-yellow-300 border-2 border-yellow-600 rounded flex items-center justify-center">
                        <span className="font-bold text-red-800 text-[16px]">{letter}</span>
                      </div>
                    ))}
                  </div>
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                    placeholder="Lösungswort eingeben"
                    className="text-center text-xl font-bold max-w-xs mx-auto"
                    maxLength={5}
                  />
                  <Button
                    onClick={checkAnswer}
                    disabled={userInput.length !== 5}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-['Jim_Nightshade'] text-[18px]"
                  >
                    Lösung prüfen
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