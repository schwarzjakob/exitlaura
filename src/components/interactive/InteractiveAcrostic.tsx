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

  const hints = [
    'Die Maske ruht nicht im Nordpfad.',
    'Sie liegt nicht auf den Außensäulen, sondern im inneren Kreis.',
    'In der Waldlichtung findest du nur raschelnde Blätter – suche weiter in der Kälte.'
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
                Drei Hallen, drei Kreise. Nur ein Podest trägt die Maske der Ruhe – folge den Hinweisen der Göttin.
              </p>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 w-full">
                <div className="grid grid-cols-4 gap-3 min-w-0">
                  {/* Header row */}
                  <div className="h-14 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-500">Ort / Säule</span>
                  </div>
                  {columns.map((column) => (
                    <div
                      key={column.id}
                      className="h-14 flex flex-col items-center justify-center rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100"
                    >
                      <span className="text-lg">{column.icon}</span>
                      <span className="text-[10px] uppercase tracking-wider text-pink-600 font-semibold text-center">
                        {column.label}
                      </span>
                    </div>
                  ))}

                  {/* Podium grid */}
                  {rows.map((row) => (
                    <Fragment key={row.id}>
                      <div className="h-20 flex flex-col items-center justify-center rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                        <span className="text-lg">{row.icon}</span>
                        <span className="text-[10px] text-purple-700 font-semibold text-center leading-tight">
                          {row.label}
                        </span>
                      </div>
                      {columns.map((column) => {
                        const key = buildKey(row.id, column.id);
                        const isSelected = selectedCell?.row === row.id && selectedCell?.col === column.id;
                        const isAttempted = attemptedCells[key] === 'wrong';
                        const isCorrect = solved && row.id === correctCell.row && column.id === correctCell.col;

                        return (
                          <motion.button
                            key={key}
                            onClick={() => handleCellSelect(row.id, column.id)}
                            className={`h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-lg ${
                              isCorrect
                                ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 border-emerald-600 text-emerald-800 shadow-emerald-200'
                                : isSelected
                                ? 'bg-gradient-to-br from-pink-100 to-pink-200 border-pink-600 text-pink-800 shadow-pink-200'
                                : isAttempted
                                ? 'bg-gradient-to-br from-rose-100 to-rose-200 border-rose-500 text-rose-700 shadow-rose-200'
                                : 'bg-gradient-to-br from-white to-pink-50 border-pink-300 hover:border-pink-500 hover:bg-pink-100'
                            } ${solved ? 'cursor-default' : 'cursor-pointer hover:scale-105'}`}
                            disabled={solved}
                            whileHover={!solved ? { scale: 1.05 } : {}}
                            whileTap={!solved ? { scale: 0.95 } : {}}
                          >
                            <span className="text-2xl">{isCorrect ? '🎭✨' : '🎭'}</span>
                            <span className="text-[9px] text-gray-600 text-center font-medium">{row.icon}{column.icon}</span>
                          </motion.button>
                        );
                      })}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full max-w-xs bg-white/85 border border-pink-100 rounded-3xl p-6 shadow-lg text-left">
              <h3 className="text-[16px] text-pink-600 font-semibold mb-4 text-center">Hinweise der Göttin</h3>
              <ul className="space-y-3 text-[12px] text-black/75">
                {hints.map((hint, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <span className="text-pink-500 text-lg leading-none">✦</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
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
                className="mt-2 p-4 bg-emerald-100 border border-emerald-400 rounded-2xl max-w-sm"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-xl mb-1">🎭</p>
                <p className="text-[14px] text-emerald-700 font-semibold">
                  Du hast die Maske der Stille gefunden. Die Göttin gewährt dir: Öffne nun Päckchen&nbsp;C.
                </p>
              </motion.div>
            )}
            </div>
          </motion.div>
        </BackgroundBox>
      </PuzzleStageLayout>
    </div>
  );
}
