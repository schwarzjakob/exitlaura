import React, { Fragment, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { BackgroundBox } from "../ui/BackgroundBox";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { AcrosticRatselContent } from '../RatselCardContents';
import { HintCard } from '../HintCard';
import { AcrosticHintContent } from '../HintCardContents';
import { PuzzleStageLayout } from '../PuzzleStageLayout';
import type { GameState } from "../GameEngine";

interface InteractiveAcrosticProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveAcrostic({ onComplete }: InteractiveAcrosticProps) {
  const rows = [
    { id: 0, label: 'Nordpfad', icon: '🌬️' },
    { id: 1, label: 'Waldlichtung', icon: '🍃' },
    { id: 2, label: 'Eishöhle', icon: '❄️' }
  ];

  const columns = [
    { id: 0, label: 'Äußere Säule', icon: '🪨' },
    { id: 1, label: 'Innerer Kreis', icon: '🔶' },
    { id: 2, label: 'Spiegelgang', icon: '🪞' }
  ];


  const correctCell = { row: 2, col: 1 };

  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [attemptedCells, setAttemptedCells] = useState<Record<string, 'wrong'>>({});
  const [solved, setSolved] = useState(false);

  const buildKey = (row: number, col: number) => `${row}-${col}`;

  const handleCellSelect = (row: number, col: number) => {
    if (solved) return;
    setSelectedCell({ row, col });
  };

  const handleCheckSelection = () => {
    if (!selectedCell) {
      toast.info('Wähle zunächst ein Podest im Tempel.');
      return;
    }

    const isCorrect =
      selectedCell.row === correctCell.row &&
      selectedCell.col === correctCell.col;

    if (isCorrect) {
      setSolved(true);
      toast.success('🎭 Du hast die Maske der Stille gefunden! Der Hinweis führt dich zu Päckchen C.');
      setTimeout(() => onComplete(), 1500);
    } else {
      const key = buildKey(selectedCell.row, selectedCell.col);
      setAttemptedCells(prev => ({ ...prev, [key]: 'wrong' }));
      toast.error('Hier findest du nur kalten Stein. Nutze die Hinweise erneut!');
    }
  };

  const resetSelection = () => {
    if (solved) return;
    setSelectedCell(null);
  };

  const cardElement = (
    <div className="flex flex-col lg:flex-row gap-4">
      <FlippableRatselCard
        puzzleId="C"
        title="Stille der Maske"
        content={<AcrosticRatselContent />}
      />
      <HintCard
        puzzleId="C"
        title="Stille der Maske"
        hintContent={<AcrosticHintContent />}
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
              <h2 className="text-[32px] text-gray-900 font-bold">Tempel der Stille</h2>
              <p className="text-[16px] text-gray-800 font-medium">
                Im Herzen des Tempels warten drei Wächter. Neun Podeste bergen ihre Geheimnisse – doch nur eines trägt das Gesicht der Göttin.
              </p>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 w-full">
                {/* Temple Layout */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Die drei Wächter erwachen</h3>
                    <p className="text-sm text-gray-600">Wähle weise – das Schicksal der Maske liegt in deinen Händen</p>
                  </div>

                  <div className="grid grid-cols-3 gap-8 min-h-[400px]">
                    {rows.map((row) => {
                      // Theme styling for each hall
                      const hallThemes = {
                        0: { // Nordpfad
                          bg: 'bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100',
                          border: 'border-blue-200',
                          accent: 'text-blue-700',
                          podiumBase: 'from-blue-100 to-blue-200',
                          podiumBorder: 'border-blue-300'
                        },
                        1: { // Waldlichtung
                          bg: 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-100',
                          border: 'border-green-200',
                          accent: 'text-green-700',
                          podiumBase: 'from-green-100 to-green-200',
                          podiumBorder: 'border-green-300'
                        },
                        2: { // Eishöhle
                          bg: 'bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100',
                          border: 'border-cyan-200',
                          accent: 'text-cyan-700',
                          podiumBase: 'from-cyan-100 to-cyan-200',
                          podiumBorder: 'border-cyan-300'
                        }
                      };

                      const theme = hallThemes[row.id as keyof typeof hallThemes];

                      return (
                        <div key={row.id} className={`${theme.bg} ${theme.border} border-3 rounded-3xl p-8 shadow-2xl relative overflow-hidden`}>
                          {/* Hall Header */}
                          <div className="text-center mb-6 relative z-10">
                            <div className={`text-4xl mb-3 drop-shadow-lg`}>{row.icon}</div>
                            <h4 className={`font-bold text-xl ${theme.accent} drop-shadow-sm`}>{row.label}</h4>
                            <p className={`text-xs ${theme.accent} opacity-75 italic mt-1`}>
                              {row.id === 0 && "Wo die Winde der Zeit wehen..."}
                              {row.id === 1 && "Im Schatten der Bäume verborgen..."}
                              {row.id === 2 && "In ewiger Kälte erstarrt..."}
                            </p>
                          </div>

                          {/* Temple Room Layout */}
                          <div className="relative h-64 mx-4">
                            {/* Room Architecture */}
                            <div className={`absolute inset-0 ${theme.bg} rounded-2xl border-2 ${theme.border} shadow-inner`}>
                              {/* Floor Pattern */}
                              <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-xl"></div>

                              {/* Podiums positioned in temple layout */}
                              {columns.map((column, colIndex) => {
                                const key = buildKey(row.id, column.id);
                                const isSelected = selectedCell?.row === row.id && selectedCell?.col === column.id;
                                const isAttempted = attemptedCells[key] === 'wrong';
                                const isCorrect = solved && row.id === correctCell.row && column.id === correctCell.col;

                                // Position podiums in temple formation
                                const positions = [
                                  { left: '15%', top: '60%' },  // Äußere Säule (left)
                                  { left: '50%', top: '30%' },  // Innerer Kreis (center)
                                  { left: '85%', top: '60%' }   // Spiegelgang (right)
                                ];

                                const position = positions[colIndex];
                                const isInnerCircle = column.id === 1;

                                return (
                                  <div key={key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: position.left, top: position.top }}>
                                    {/* Pulsing glow effect for selected button */}
                                    {isSelected && (
                                      <motion.div
                                        className="absolute inset-0 w-20 h-20 -translate-x-2 -translate-y-2 rounded-full bg-yellow-400/30"
                                        animate={{
                                          scale: [1, 1.3, 1],
                                          opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{
                                          duration: 2,
                                          repeat: Infinity,
                                          ease: "easeInOut"
                                        }}
                                      />
                                    )}
                                    
                                    <motion.button
                                      onClick={() => handleCellSelect(row.id, column.id)}
                                      className={`w-16 h-16 rounded-full border-3 transition-all shadow-lg ${
                                        isCorrect
                                          ? 'bg-gradient-to-br from-emerald-300 via-emerald-200 to-emerald-400 border-emerald-600 text-emerald-800 shadow-emerald-300/50'
                                          : isSelected
                                          ? 'bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400 border-yellow-600 text-yellow-800 shadow-yellow-300/70 ring-4 ring-yellow-400/50 ring-offset-2 ring-offset-white'
                                          : isAttempted
                                          ? 'bg-gradient-to-br from-rose-300 via-rose-200 to-rose-400 border-rose-500 text-rose-700 shadow-rose-300/50'
                                          : `bg-gradient-to-br ${theme.podiumBase} ${theme.podiumBorder} hover:shadow-xl shadow-lg`
                                      } ${solved ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
                                      disabled={solved}
                                      whileHover={!solved ? { scale: isInnerCircle ? 1.15 : 1.1 } : {}}
                                      whileTap={!solved ? { scale: 0.95 } : {}}
                                      animate={isSelected ? {
                                        scale: [1, 1.1, 1],
                                        boxShadow: [
                                          '0 0 0 0 rgba(251, 191, 36, 0.7)',
                                          '0 0 0 10px rgba(251, 191, 36, 0)',
                                          '0 0 0 0 rgba(251, 191, 36, 0)'
                                        ]
                                      } : {}}
                                      transition={isSelected ? {
                                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                                        boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                      } : {}}
                                    >
                                    <div className="flex flex-col items-center justify-center h-full relative">
                                      <span className="text-2xl drop-shadow-sm">
                                        {isCorrect ? '🎭✨' : '🎭'}
                                      </span>

                                      {/* Position indicator */}
                                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] bg-white/80 px-2 py-1 rounded-full shadow-sm">
                                        <span className="text-xs">{column.icon}</span>
                                      </div>

                                    </div>
                                    </motion.button>
                                  </div>
                                );
                              })}

                              {/* Atmospheric effects */}
                              {row.id === 0 && ( // Nordpfad - wind effects
                                <div className="absolute inset-0 pointer-events-none">
                                  {[...Array(5)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute w-1 h-1 bg-blue-300/60 rounded-full"
                                      animate={{
                                        x: [0, 100, 0],
                                        y: [Math.random() * 50, Math.random() * 50],
                                        opacity: [0, 1, 0]
                                      }}
                                      transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2
                                      }}
                                      style={{
                                        left: `${Math.random() * 80}%`,
                                        top: `${Math.random() * 80}%`
                                      }}
                                    />
                                  ))}
                                </div>
                              )}

                              {row.id === 1 && ( // Waldlichtung - leaf effects
                                <div className="absolute inset-0 pointer-events-none">
                                  {[...Array(3)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute text-green-500/40 text-sm"
                                      animate={{
                                        y: [0, 20, 0],
                                        rotate: [0, 360],
                                        opacity: [0.3, 0.7, 0.3]
                                      }}
                                      transition={{
                                        duration: 4 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 3
                                      }}
                                      style={{
                                        left: `${20 + Math.random() * 60}%`,
                                        top: `${10 + Math.random() * 60}%`
                                      }}
                                    >
                                      🍃
                                    </motion.div>
                                  ))}
                                </div>
                              )}

                              {row.id === 2 && ( // Eishöhle - ice effects
                                <div className="absolute inset-0 pointer-events-none">
                                  {[...Array(4)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute w-2 h-2 bg-cyan-200/60 rounded-full"
                                      animate={{
                                        scale: [0.5, 1, 0.5],
                                        opacity: [0.3, 0.8, 0.3]
                                      }}
                                      transition={{
                                        duration: 2 + Math.random(),
                                        repeat: Infinity,
                                        delay: Math.random() * 2
                                      }}
                                      style={{
                                        left: `${20 + Math.random() * 60}%`,
                                        top: `${20 + Math.random() * 60}%`
                                      }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-col items-center gap-3">
            {!solved && (
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={handleCheckSelection}
                  className="h-12 rounded-full bg-pink-600 hover:bg-pink-500 px-8 text-base font-semibold shadow-md shadow-pink-500/30"
                >
                  Maske prüfen
                </Button>
                <Button
                  onClick={resetSelection}
                  variant="outline"
                  className="h-12 rounded-full px-8 text-base font-semibold border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  Auswahl löschen
                </Button>
              </div>
            )}

            {solved && (
              <motion.div
                className="mt-6 p-6 bg-gradient-to-br from-emerald-100 via-emerald-50 to-cyan-100 border-2 border-emerald-400 rounded-2xl max-w-md shadow-xl"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-4xl mb-3"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎭✨
                  </motion.div>
                  <h4 className="text-emerald-800 font-bold text-lg mb-2">Die Maske der Stille gefunden!</h4>
                  <p className="text-[14px] text-emerald-700 font-semibold leading-relaxed">
                    In der Eishöhle, im inneren Kreis, ruhte die Maske der Göttin.
                    <br />
                    <span className="text-cyan-700">Öffne nun Päckchen C.</span>
                  </p>
                </div>
              </motion.div>
            )}
            </div>
          </motion.div>
        </BackgroundBox>
      </PuzzleStageLayout>
    </div>
  );
}
