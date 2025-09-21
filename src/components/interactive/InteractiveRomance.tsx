import React, { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { BackgroundBox } from "../ui/BackgroundBox";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { RomanceRatselContent } from '../RatselCardContents';
import { HintCard } from '../HintCard';
import { RomanceHintContent } from '../HintCardContents';
import { PuzzleStageLayout } from '../PuzzleStageLayout';
import type { GameState } from "../GameEngine";

interface InteractiveRomanceProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveRomance({ onComplete }: InteractiveRomanceProps) {
  const [selectedPath, setSelectedPath] = useState<number[]>([]);

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
    if (pathWord.toUpperCase() === correctAnswer) {
      toast.success("🎉 Richtig! Du hast den Pfad des Herzens gefunden!");
      setTimeout(() => onComplete(), 1500);
    } else {
      toast.error("Das ist nicht der richtige Pfad. Folge den Herzen in der richtigen Reihenfolge...");
    }
  };


  const resetPath = () => {
    setSelectedPath([]);
  };

  const cardElement = (
    <div className="flex flex-col lg:flex-row gap-4">
      <FlippableRatselCard
        puzzleId="D"
        title="Pfad des Herzens"
        content={<RomanceRatselContent />}
      />
      <HintCard
        puzzleId="D"
        title="Pfad des Herzens"
        hintContent={<RomanceHintContent />}
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <PuzzleStageLayout card={cardElement}>
        <BackgroundBox backgroundImage={imgComponent4}>
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

          <div className="relative w-full max-w-2xl">
            <div className="relative overflow-hidden bg-gradient-to-br from-pink-50/80 via-white/90 to-pink-50/80 border-2 border-pink-200/60 rounded-3xl p-8 shadow-2xl shadow-pink-200/30 backdrop-blur-sm h-[400px]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-transparent to-pink-200/20" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.1),transparent_50%)]" />
              </div>
              
              {/* Connection Lines */}
              <div className="absolute inset-8">
                {selectedPath.slice(0, -1).map((heartId, index) => {
                  const currentHeart = hearts.find(h => h.id === heartId);
                  const nextHeart = hearts.find(h => h.id === selectedPath[index + 1]);
                  if (!currentHeart || !nextHeart) return null;

                  return (
                    <svg key={`${heartId}-${nextHeart.id}`} className="absolute inset-0 w-full h-full pointer-events-none">
                      <defs>
                        <linearGradient id={`gradient-${heartId}-${nextHeart.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
                          <stop offset="100%" stopColor="#f472b6" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <line
                        x1={currentHeart.x}
                        y1={currentHeart.y}
                        x2={nextHeart.x}
                        y2={nextHeart.y}
                        stroke="url(#gradient-${heartId}-${nextHeart.id})"
                        strokeWidth={4}
                        strokeLinecap="round"
                        filter="drop-shadow(0 0 6px rgba(244,114,182,0.4))"
                      />
                      <line
                        x1={currentHeart.x}
                        y1={currentHeart.y}
                        x2={nextHeart.x}
                        y2={nextHeart.y}
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeDasharray="8 4"
                        opacity={0.7}
                      />
                    </svg>
                  );
                })}
              </div>

              {/* Hearts */}
              <div className="absolute inset-8">
                {hearts.map((heart) => {
                  const isSelected = selectedPath.includes(heart.id);
                  const selectionIndex = selectedPath.indexOf(heart.id);

                  return (
                    <button
                      key={heart.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: heart.x, top: heart.y }}
                      onClick={() => handleHeartClick(heart.id)}
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {/* Outer Glow */}
                        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                          isSelected 
                            ? 'bg-pink-400/30 blur-lg scale-150' 
                            : 'bg-pink-200/20 blur-md scale-125 group-hover:bg-pink-300/30 group-hover:scale-150'
                        }`} />
                        
                        {/* Main Heart Shape */}
                        <div className={`relative w-20 h-20 rounded-full transition-all duration-300 ${
                          isSelected 
                            ? 'bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700 shadow-xl shadow-pink-500/50' 
                            : 'bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 shadow-lg shadow-pink-300/30 group-hover:shadow-xl group-hover:shadow-pink-400/40'
                        }`}>
                          {/* Inner Highlight */}
                          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
                          
                          {/* Letter */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white drop-shadow-lg">
                              {heart.letter}
                            </span>
                          </div>
                          
                          {/* Selection Number Badge */}
                          {isSelected && (
                            <motion.div 
                              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            >
                              <span className="text-sm font-bold text-yellow-900">
                                {selectionIndex + 1}
                              </span>
                            </motion.div>
                          )}
                          
                          {/* Pulse Animation for Selected */}
                          {isSelected && (
                            <motion.div 
                              className="absolute inset-0 rounded-full border-2 border-pink-400"
                              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                          )}
                        </div>
                      </motion.div>
                    </button>
                  );
                })}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-pink-300/40 rounded-full animate-pulse" />
              <div className="absolute top-8 right-6 w-2 h-2 bg-pink-400/50 rounded-full animate-pulse delay-1000" />
              <div className="absolute bottom-6 left-8 w-2.5 h-2.5 bg-pink-300/30 rounded-full animate-pulse delay-500" />
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-pink-400/40 rounded-full animate-pulse delay-1500" />
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-white border border-pink-200/60 rounded-3xl p-6 shadow-lg shadow-pink-100/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 via-transparent to-pink-100/20 opacity-50" />
            <div className="relative">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                  <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">
                    Dein Pfad
                  </h3>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-3 mb-4">
                {selectedPath.length > 0 ? (
                  selectedPath.map((heartId, index) => {
                    const heart = hearts.find(h => h.id === heartId);
                    return (
                      <div key={index} className="flex items-center">
                        <div className="relative group">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl shadow-md shadow-pink-300/50 flex items-center justify-center transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-pink-400/60">
                            <span className="text-white font-bold text-lg">
                              {heart?.letter}
                            </span>
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                            <span className="text-xs font-bold text-yellow-900">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        {index < selectedPath.length - 1 && (
                          <div className="w-6 h-0.5 bg-gradient-to-r from-pink-300 to-pink-400 mx-1" />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-4">
                    <div className="text-pink-300 text-sm italic">
                      Wähle die Herzen in der richtigen Reihenfolge
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-pink-200/50">
                  <span className="text-sm text-gray-600">Wort:</span>
                  <span className="font-bold text-lg tracking-wider text-pink-700 min-w-[120px]">
                    {getPathWord() || "..."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 w-full max-w-md">
            <div className="flex gap-3 justify-center">
              <Button
                onClick={resetPath}
                className="h-11 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 px-6 text-sm font-semibold border border-pink-200"
              >
                Zurücksetzen
              </Button>
              <Button
                onClick={checkPath}
                className="h-11 rounded-full bg-pink-600 hover:bg-pink-500 px-6 text-sm font-semibold shadow-md shadow-pink-500/30"
              >
                Pfad prüfen
              </Button>
            </div>

          </div>
          </motion.div>
        </BackgroundBox>
      </PuzzleStageLayout>
    </div>
  );
}
