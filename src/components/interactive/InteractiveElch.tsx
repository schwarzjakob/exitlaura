import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { HintCard } from '../HintCard';
import { ElchHintContent } from '../HintCardContents';
import type { GameState } from "../GameEngine";
import { PuzzleStageLayout } from '../PuzzleStageLayout';

interface InteractiveElchProps {
  gameState: GameState;
  onComplete: () => void;
}

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

  const cardElement = (
    <div className="flex flex-col lg:flex-row gap-4">
      <FlippableRatselCard
        puzzleId="F"
        title="Das Geweih des Nordens"
        content={<ElchRatselContent />}
      />
      <HintCard
        puzzleId="F"
        title="Das Geweih des Nordens"
        hintContent={<ElchHintContent />}
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <PuzzleStageLayout card={cardElement}>
        <motion.div
          className="font-['Jim_Nightshade:Regular',_sans-serif] flex flex-col gap-8 items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="space-y-2 max-w-xl">
            <h2 className="text-[32px] text-gray-900 font-bold">Das Geweih des Nordens</h2>
            <p className="text-[14px] text-black/70">
              Wähle den Gefährten, der sein Geweih mit Stolz trägt. Nur er begleitet dich auf dem letzten Weg.
            </p>
          </div>

          <div className="relative w-full max-w-xl">
            <div
              className="absolute inset-0 opacity-25 rounded-3xl"
              style={{
                backgroundImage: `url('${imgComponent4}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="relative bg-white/90 border-2 border-pink-200 backdrop-blur rounded-3xl p-6 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {animals.map((animal) => {
                  const isSelected = selectedAnimal === animal.id;
                  const isCorrect = animal.id === correctAnswer;

                  return (
                    <motion.button
                      key={animal.id}
                      onClick={() => !showResult && handleAnimalSelect(animal.id)}
                      className={`flex flex-col items-center gap-3 rounded-2xl border-2 px-5 py-4 transition-all shadow-md hover:shadow-lg ${
                        showResult && isSelected
                          ? isCorrect
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-800 shadow-emerald-200'
                            : 'bg-rose-100 border-rose-500 text-rose-700 shadow-rose-200'
                          : 'bg-white border-pink-200 hover:border-pink-400 hover:bg-pink-50'
                      } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                      whileHover={!showResult ? { scale: 1.05 } : {}}
                      whileTap={!showResult ? { scale: 0.97 } : {}}
                      disabled={showResult}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center text-4xl shadow-lg border border-pink-300">
                        {animal.emoji}
                      </div>
                      <div className="text-[18px] text-pink-700 font-bold">{animal.letter}</div>
                      {showResult && isSelected && (
                        <motion.div
                          className="text-sm text-black/70"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {animal.name}
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {showResult && selectedAnimal === correctAnswer && (
            <motion.div
              className="bg-emerald-100 border border-emerald-400 rounded-3xl px-6 py-4 max-w-sm shadow-lg"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-2xl mb-2">🦌</p>
              <p className="text-[15px] text-emerald-700 font-semibold">
                Du hast den Elch gefunden! Der stille Gefährte begleitet dich nun durch Schwedens Wälder.
              </p>
            </motion.div>
          )}

          {showResult && selectedAnimal !== correctAnswer && (
            <Button
              onClick={() => {
                setShowResult(false);
                setSelectedAnimal(null);
              }}
              className="h-11 rounded-full bg-pink-600 hover:bg-pink-500 px-8 text-sm font-semibold text-white shadow-md shadow-pink-500/30"
            >
              Nochmal versuchen
            </Button>
          )}
        </motion.div>
      </PuzzleStageLayout>
    </div>
  );
}
