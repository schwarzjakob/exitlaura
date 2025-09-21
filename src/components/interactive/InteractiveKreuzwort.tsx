import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { KreuzwortRatselContent } from '../RatselCardContents';
import type { GameState } from "../GameEngine";

interface InteractiveKreuzwortProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveKreuzwort({ onComplete }: InteractiveKreuzwortProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showHints, setShowHints] = useState(false);

  // Kreuzworträtsel-Daten - nur Zelda-Lore
  const crosswordClues = [
    { number: 1, direction: 'horizontal', clue: 'Grüner Held von Hyrule (4)', answer: 'LINK', startRow: 1, startCol: 0 },
    { number: 2, direction: 'vertical', clue: 'Drei göttliche Reliquien (8)', answer: 'TRIFORCE', startRow: 0, startCol: 2 },
    { number: 3, direction: 'horizontal', clue: 'Feenbegleiterin von Link (4)', answer: 'NAVI', startRow: 3, startCol: 1 },
    { number: 4, direction: 'horizontal', clue: 'Prinzessin von Hyrule (5)', answer: 'ZELDA', startRow: 5, startCol: 0 }
  ];

  const handleAnswerChange = (clueNumber: number, value: string) => {
    const upperValue = value.toUpperCase();
    setAnswers(prev => ({ ...prev, [clueNumber]: upperValue }));
  };

  // Automatische Triforce-Erkennung basierend auf Grid
  const checkForTriforce = () => {
    const triforceClue = crosswordClues.find(clue => clue.answer === 'TRIFORCE');
    if (!triforceClue) return false;
    
    const userAnswer = answers[triforceClue.number] || '';
    return userAnswer === 'TRIFORCE';
  };

  const triforceFound = checkForTriforce();

  const checkAnswers = () => {
    const correctAnswers = crosswordClues.every(clue => 
      answers[clue.number] === clue.answer
    );

    if (correctAnswers && triforceFound) {
      toast.success('🎉 Alle Begriffe korrekt! Das Triforce ist vollständig!');
      onComplete();
    } else if (!triforceFound) {
      toast.warning('Das TRIFORCE muss vollständig sein! (8 Buchstaben, vertikal)');
    } else {
      toast.error('Einige Zelda-Begriffe sind noch nicht korrekt. Überprüfe deine Eingaben!');
    }
  };

  const getGridCell = (row: number, col: number) => {
    // Bestimme welche Zellen aktiv sind basierend auf den Wörtern
    for (const clue of crosswordClues) {
      if (clue.direction === 'horizontal') {
        if (row === clue.startRow && col >= clue.startCol && col < clue.startCol + clue.answer.length) {
          const letterIndex = col - clue.startCol;
          const userAnswer = answers[clue.number] || '';
          return {
            isActive: true,
            isTriforce: clue.number === 2,
            letter: userAnswer[letterIndex] || '',
            hasNumber: col === clue.startCol ? clue.number : null
          };
        }
      } else { // vertical
        if (col === clue.startCol && row >= clue.startRow && row < clue.startRow + clue.answer.length) {
          const letterIndex = row - clue.startRow;
          const userAnswer = answers[clue.number] || '';
          return {
            isActive: true,
            isTriforce: clue.number === 2,
            letter: userAnswer[letterIndex] || '',
            hasNumber: row === clue.startRow ? clue.number : null
          };
        }
      }
    }
    return { isActive: false, isTriforce: false, letter: '', hasNumber: null };
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-8 items-start">
        {/* Rätselkarte links */}
        <div className="flex-shrink-0">
          <FlippableRatselCard
            puzzleId="B"
            title="Netz der Symbole"
            content={<KreuzwortRatselContent />}
            className="transform scale-125"
          />
        </div>

        {/* Spielfeld rechts */}
        <motion.div 
          className="bg-center bg-cover bg-no-repeat h-[700px] w-[800px] rounded-[15px] relative" 
          style={{ backgroundImage: `url('${imgComponent4}')` }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-[700px] overflow-auto relative w-[800px] flex flex-col items-center justify-center p-6">
            <motion.div 
              className="font-['Jim_Nightshade:Regular',_sans-serif] text-center w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-[24px] text-red-800 mb-4">Kästchen des Wissens</h2>
              
              <div className="text-[12px] text-black mb-6 max-w-2xl mx-auto">
                <p>Trage die Zelda-Begriffe ein. Das vertikale Wort wird sich zeigen!</p>
              </div>

              <div className="flex gap-6 justify-center">
                {/* Kreuzworträtsel Grid */}
                <div className="bg-white/90 p-4 rounded-lg shadow-inner">
                  <div className="grid grid-cols-8 gap-[1px] bg-black p-2">
                    {Array.from({ length: 64 }, (_, i) => {
                      const row = Math.floor(i / 8);
                      const col = i % 8;
                      const cellInfo = getGridCell(row, col);
                      
                      return (
                        <div
                          key={i}
                          className={`
                            w-8 h-8 flex items-center justify-center text-[12px] relative font-bold
                            ${cellInfo.isActive ? 'bg-white border border-gray-400' : 'bg-gray-800'}
                            ${cellInfo.isTriforce ? 'bg-yellow-200 border-yellow-600' : ''}
                          `}
                        >
                          {cellInfo.hasNumber && (
                            <span className="absolute top-0 left-0 text-[8px] text-blue-600 leading-none">
                              {cellInfo.hasNumber}
                            </span>
                          )}
                          {cellInfo.isActive && (
                            <span className={cellInfo.letter ? 'text-black' : 'text-gray-400'}>
                              {cellInfo.letter || '_'}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hinweise und Eingaben */}
                <div className="bg-white/90 p-4 rounded-lg shadow-inner max-w-xs">
                  <h3 className="text-[14px] text-black mb-4 font-bold">Zelda-Begriffe:</h3>
                  
                  <div className="space-y-3 text-[11px] text-black">
                    {crosswordClues.map((clue) => (
                      <motion.div 
                        key={clue.number}
                        className="space-y-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: clue.number * 0.1 }}
                      >
                        <label className="block">
                          {clue.number}. {clue.clue}
                        </label>
                        <Input
                          value={answers[clue.number] || ''}
                          onChange={(e) => handleAnswerChange(clue.number, e.target.value)}
                          placeholder={`${clue.answer.length} Buchstaben`}
                          className={`text-xs h-8 ${
                            answers[clue.number] === clue.answer ? 'bg-green-100 border-green-500' :
                            clue.number === 2 && answers[clue.number] === 'TRIFORCE' ? 'bg-yellow-100 border-yellow-500' :
                            'bg-white'
                          }`}
                          maxLength={clue.answer.length}
                        />
                        {answers[clue.number] === clue.answer && (
                          <span className="text-green-600 text-[10px]">✓ Korrekt</span>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button
                      onClick={() => setShowHints(!showHints)}
                      variant="outline"
                      className="w-full text-xs h-8"
                    >
                      {showHints ? 'Hinweise verstecken' : 'Extra Hinweise'}
                    </Button>
                    
                    {showHints && (
                      <motion.div 
                        className="text-[10px] text-gray-600 space-y-1 bg-gray-100 p-2 rounded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <p>• Held mit grüner Kleidung</p>
                        <p>• Drei magische Dreiecke</p>
                        <p>• Blaue Fee, "Hey! Listen!"</p>
                        <p>• Weise Prinzessin</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Triforce Status */}
              {triforceFound && (
                <motion.div 
                  className="mt-6 p-4 bg-yellow-200 rounded-lg border-2 border-yellow-600 max-w-md mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <div className="text-yellow-800">
                    <p className="text-[16px] font-bold mb-2">🏆 Das Triforce ist vollständig! 🏆</p>
                    <p className="text-[12px]">
                      Die drei göttlichen Reliquien weisen dir den Weg zur nächsten Prüfung!
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-6">
                <Button
                  onClick={checkAnswers}
                  disabled={!triforceFound}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-['Jim_Nightshade'] text-[18px]"
                >
                  Lösung prüfen
                </Button>
              </div>
            </motion.div>
          </div>
          <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_8px_0px_#9db3ce]" />
        </motion.div>
      </div>

      {/* Triforce-Partikel-Effekt */}
      {triforceFound && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 text-yellow-400"
              initial={{ 
                x: 500, 
                y: 350,
                scale: 0 
              }}
              animate={{ 
                x: 500 + (Math.cos(i * 24 * Math.PI / 180) * 100),
                y: 350 + (Math.sin(i * 24 * Math.PI / 180) * 100),
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            >
              ▲
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}