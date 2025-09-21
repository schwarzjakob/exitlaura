import React, { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BackgroundBox } from "../ui/BackgroundBox";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { KreuzwortRatselContent } from '../RatselCardContents';
import { HintCard } from '../HintCard';
import { KreuzwortHintContent } from '../HintCardContents';
import { PuzzleStageLayout } from '../PuzzleStageLayout';
import type { GameState } from "../GameEngine";

interface InteractiveKreuzwortProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveKreuzwort({ onComplete }: InteractiveKreuzwortProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showHints, setShowHints] = useState(false);
  const [showFinalWord, setShowFinalWord] = useState(false);

  // Kreuzworträtsel-Daten – horizontale Begriffe aus der Zelda-Lore
  const crosswordClues = [
    { number: 1, clue: 'Grüner Held von Hyrule (4)', answer: 'LINK', startRow: 1, startCol: 1 },
    { number: 2, clue: 'Prinzessin von Hyrule (5)', answer: 'ZELDA', startRow: 3, startCol: 0 },
    { number: 3, clue: 'Feenbegleiterin von Link (4)', answer: 'NAVI', startRow: 5, startCol: 2 }
  ];

  const GRID_ROWS = 8;
  const GRID_COLS = 8;
  const FINAL_COLUMN = 6;
  const FINAL_WORD = 'TRIFORCE';

  const handleAnswerChange = (clueNumber: number, value: string) => {
    const upperValue = value.toUpperCase();
    setAnswers(prev => ({ ...prev, [clueNumber]: upperValue }));
  };

  const allFieldsFilled = crosswordClues.every(clue => (answers[clue.number] || '').length === clue.answer.length);

  const checkAnswers = () => {
    const correctAnswers = crosswordClues.every(clue => 
      answers[clue.number] === clue.answer
    );

    if (correctAnswers) {
      setShowFinalWord(true);
      toast.success('🎉 Alle Begriffe korrekt! Das Triforce erscheint im Raster!');
      setTimeout(() => onComplete(), 1500);
    } else {
      toast.error('Einige Zelda-Begriffe sind noch nicht korrekt. Überprüfe deine Eingaben!');
    }
  };
  
  const getGridCell = (row: number, col: number) => {
    for (const clue of crosswordClues) {
      if (row === clue.startRow && col >= clue.startCol && col < clue.startCol + clue.answer.length) {
        const letterIndex = col - clue.startCol;
        const userAnswer = answers[clue.number] || '';
        return {
          isActive: true,
          isFinal: false,
          letter: userAnswer[letterIndex] || '',
          hasNumber: col === clue.startCol ? clue.number : null
        };
      }
    }

    if (col === FINAL_COLUMN && row < FINAL_WORD.length) {
      return {
        isActive: true,
        isFinal: true,
        letter: showFinalWord ? FINAL_WORD[row] : '',
        hasNumber: null
      };
    }

    return { isActive: false, isFinal: false, letter: '', hasNumber: null };
  };

  const cardElement = (
    <div className="flex flex-col lg:flex-row gap-4">
      <FlippableRatselCard
        puzzleId="B"
        title="Netz der Symbole"
        content={<KreuzwortRatselContent />}
      />
      <HintCard
        puzzleId="B"
        title="Netz der Symbole"
        hintContent={<KreuzwortHintContent />}
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
            <div className="space-y-2">
              <h2 className="text-[32px] text-gray-900 font-bold">Kästchen des Wissens</h2>
              <p className="text-[16px] text-gray-800 max-w-2xl font-medium">
                Trage die Zelda-Begriffe ein. Sobald sie korrekt stehen, offenbart das goldene Feld das Wort der Macht.
              </p>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 w-full">
                <div className="grid grid-cols-8 gap-[2px] bg-pink-100/80 p-3 rounded-2xl">
                  {Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => {
                    const row = Math.floor(i / GRID_COLS);
                    const col = i % GRID_COLS;
                    const cellInfo = getGridCell(row, col);

                    return (
                      <div
                        key={i}
                        className={`
                          w-9 h-9 flex items-center justify-center text-[13px] relative font-semibold rounded-lg
                          ${cellInfo.isActive ? 'bg-white border border-pink-200' : 'bg-pink-200/40'}
                          ${cellInfo.isFinal ? 'bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-yellow-400 text-yellow-700' : ''}
                        `}
                      >
                        {cellInfo.hasNumber && (
                          <span className="absolute top-1 left-1 text-[9px] text-pink-500 font-bold">
                            {cellInfo.hasNumber}
                          </span>
                        )}
                        {cellInfo.isActive && (
                          <span className={`${cellInfo.isFinal ? (showFinalWord ? 'text-yellow-700' : 'text-yellow-500') : cellInfo.letter ? 'text-pink-700' : 'text-pink-200'}`}>
                            {cellInfo.letter || (cellInfo.isFinal ? '?' : '·')}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {showFinalWord && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[...Array(12)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-yellow-400 text-sm"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          x: Math.cos((i / 12) * Math.PI * 2) * 140,
                          y: Math.sin((i / 12) * Math.PI * 2) * 140
                        }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.12 }}
                      >
                        ▲
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            <div className="w-full max-w-xs bg-white/85 border border-pink-100 rounded-3xl p-6 shadow-lg text-left">
              <h3 className="text-[16px] text-pink-600 font-semibold mb-4 text-center">Zelda-Begriffe</h3>
              <div className="space-y-3 text-[12px] text-black/80">
                {crosswordClues.map((clue) => (
                  <motion.div
                    key={clue.number}
                    className="space-y-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: clue.number * 0.15 }}
                  >
                    <label className="block font-semibold text-pink-700">
                      {clue.number}. {clue.clue}
                    </label>
                    <Input
                      value={answers[clue.number] || ''}
                      onChange={(e) => handleAnswerChange(clue.number, e.target.value)}
                      placeholder={`${clue.answer.length} Buchstaben`}
                      className={`text-sm h-9 uppercase tracking-[0.2em] text-center ${
                        answers[clue.number] === clue.answer ? 'bg-pink-100 border-pink-400 text-pink-700' :
                        'bg-white border-pink-200'
                      }`}
                      maxLength={clue.answer.length}
                    />
                    {answers[clue.number] === clue.answer && (
                      <span className="text-pink-500 text-[11px]">✓ Korrekt</span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                <Button
                  onClick={() => setShowHints(!showHints)}
                  variant="outline"
                  className="w-full h-9 rounded-full border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  {showHints ? 'Hinweise verstecken' : 'Extra Hinweise'}
                </Button>

                {showHints && (
                  <motion.div
                    className="text-[11px] text-black/70 space-y-1 bg-pink-50 border border-pink-200 p-3 rounded-2xl"
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

            {showFinalWord && (
            <motion.div
              className="w-full max-w-md bg-white/85 border border-pink-200 rounded-3xl px-6 py-4 shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-pink-600 font-semibold text-lg mb-1">🏆 Das Triforce ist vollständig!</p>
              <p className="text-[13px] text-black/70">
                Die Reliquien leuchten vereint. <span className="font-semibold">Finales Wort:</span> {FINAL_WORD}
              </p>
            </motion.div>
          )}

            <Button
              onClick={checkAnswers}
              disabled={!allFieldsFilled || showFinalWord}
              className="h-12 rounded-full bg-pink-600 hover:bg-pink-500 px-10 text-base font-semibold shadow-md shadow-pink-500/30 disabled:opacity-60"
            >
              Triforce enthüllen
            </Button>
          </motion.div>
        </BackgroundBox>
      </PuzzleStageLayout>
    </div>
  );
}
