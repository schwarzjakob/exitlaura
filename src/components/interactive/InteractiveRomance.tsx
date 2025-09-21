import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { RomanceRatselContent } from '../RatselCardContents';
import { PuzzleStageLayout } from '../PuzzleStageLayout';
import type { GameState } from "../GameEngine";

interface InteractiveRomanceProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveRomance({ onComplete }: InteractiveRomanceProps) {
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [userInput, setUserInput] = useState("");
  const [showInput, setShowInput] = useState(true);

  const hearts = [
    { id: 1, x: 80, y: 80, letter: 'R' },
    { id: 2, x: 180, y: 60, letter: 'O' },
    { id: 3, x: 270, y: 95, letter: 'M' },
    { id: 4, x: 220, y: 150, letter: 'A' },
    { id: 5, x: 140, y: 175, letter: 'N' },
    { id: 6, x: 90, y: 135, letter: 'C' },
    { id: 7, x: 240, y: 205, letter: 'E' }
  ];

  const correctAnswer = "ROMANCE";

  const handleHeartClick = (heartId: number) => {
    if (selectedPath.includes(heartId)) {
      const index = selectedPath.indexOf(heartId);
      setSelectedPath(selectedPath.slice(0, index));
    } else {
      setSelectedPath([...selectedPath, heartId]);
    }
  };

  const getPathWord = () =>
    selectedPath
      .map(id => hearts.find(h => h.id === id)?.letter || '')
      .join('');

  const checkPath = () => {
    const pathWord = getPathWord();
    if (pathWord.length >= 4) {
      setShowInput(true);
      setUserInput(pathWord);
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

  const cardElement = (
    <FlippableRatselCard
      puzzleId="D"
      title="Pfad des Herzens"
      content={<RomanceRatselContent />}
    />
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
            <h2 className="text-[32px] text-gray-900 font-bold">Der Pfad des Herzens</h2>
            <p className="text-[14px] text-black/70">
              Folge den leuchtenden Herzen in der richtigen Reihenfolge. Nur so offenbart sich das verborgene Wort.
            </p>
          </div>

          <div className="relative w-full max-w-xl">
            <div
              className="absolute inset-0 opacity-35 rounded-3xl"
              style={{
                backgroundImage: `url('${imgComponent4}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="relative bg-white/85 border border-white/70 backdrop-blur rounded-3xl p-6 shadow-lg h-[320px]">
              <div className="absolute inset-6">
                {selectedPath.slice(0, -1).map((heartId, index) => {
                  const currentHeart = hearts.find(h => h.id === heartId);
                  const nextHeart = hearts.find(h => h.id === selectedPath[index + 1]);
                  if (!currentHeart || !nextHeart) return null;

                  return (
                    <svg key={`${heartId}-${nextHeart.id}`} className="absolute inset-0 w-full h-full pointer-events-none">
                      <line
                        x1={currentHeart.x}
                        y1={currentHeart.y}
                        x2={nextHeart.x}
                        y2={nextHeart.y}
                        stroke="#f472b6"
                        strokeWidth={3}
                        strokeDasharray="6 6"
                        strokeLinecap="round"
                        opacity={0.9}
                      />
                    </svg>
                  );
                })}

                {hearts.map((heart) => {
                  const isSelected = selectedPath.includes(heart.id);
                  const selectionIndex = selectedPath.indexOf(heart.id);

                  return (
                    <button
                      key={heart.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: heart.x, top: heart.y }}
                      onClick={() => handleHeartClick(heart.id)}
                    >
                      <motion.div
                        className={`relative size-16 flex items-center justify-center transition-transform ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`absolute inset-0 rounded-[40px] rotate-45 ${
                          isSelected ? 'bg-gradient-to-br from-pink-400 to-pink-600' : 'bg-gradient-to-br from-pink-200 to-pink-400'
                        } shadow-lg`} />
                        <div className="absolute inset-1 rounded-[36px] rotate-45 bg-white/30" />
                        <span className="relative z-10 text-lg font-semibold text-white -rotate-45">
                          {heart.letter}
                        </span>
                        {isSelected && (
                          <span className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-yellow-300 border-2 border-yellow-500 text-xs font-bold text-yellow-900 flex items-center justify-center">
                            {selectionIndex + 1}
                          </span>
                        )}
                      </motion.div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {selectedPath.length > 0 && (
            <div className="bg-white/85 border border-pink-100 rounded-2xl px-5 py-3 shadow-inner text-sm text-black/70">
              <p className="mb-1 font-semibold text-pink-600">Dein aktueller Pfad</p>
              <div className="flex justify-center gap-2">
                {selectedPath.map((heartId, index) => {
                  const heart = hearts.find(h => h.id === heartId);
                  return (
                    <span key={index} className="w-7 h-7 bg-pink-100 border border-pink-400 rounded-full flex items-center justify-center text-pink-700 font-semibold">
                      {heart?.letter}
                    </span>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-black/50">
                Gefundenes Wort: <span className="font-semibold text-pink-600">{getPathWord()}</span>
              </p>
            </div>
          )}

          <div className="flex flex-col items-center gap-3 w-full max-w-md">
            <div className="flex gap-3 justify-center">
              <Button
                onClick={resetPath}
                className="h-11 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 px-6 text-sm font-semibold border border-pink-200"
              >
                Zurücksetzen
              </Button>
              {!showInput && selectedPath.length > 0 && (
                <Button
                  onClick={checkPath}
                  className="h-11 rounded-full bg-pink-600 hover:bg-pink-500 px-6 text-sm font-semibold shadow-md shadow-pink-500/30"
                >
                  Pfad prüfen
                </Button>
              )}
            </div>

            {showInput && (
              <div className="w-full bg-white/85 border border-pink-100 rounded-2xl px-6 py-4 shadow-inner space-y-3">
                <p className="text-[13px] text-black/70 italic">
                  Trage das vollständige Wort ein.
                </p>
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                  placeholder="Lösungswort"
                  className="text-center text-lg font-semibold uppercase tracking-[0.3em]"
                />
                <Button
                  onClick={checkAnswer}
                  disabled={userInput.length < 4}
                  className="h-11 rounded-full bg-pink-600 hover:bg-pink-500 px-8 text-sm font-semibold shadow-md shadow-pink-500/30 disabled:opacity-60"
                >
                  Antwort prüfen
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </PuzzleStageLayout>
    </div>
  );
}
