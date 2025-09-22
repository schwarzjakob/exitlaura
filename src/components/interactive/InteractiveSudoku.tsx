import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { BackgroundBox } from '../ui/BackgroundBox';
import { FlippableRatselCard } from '../FlippableRatselCard';
import { SudokuRatselContent } from '../RatselCardContents';
import { HintCard } from '../HintCard';
import { SudokuHintContent } from '../HintCardContents';
import { PuzzleStageLayout } from '../PuzzleStageLayout';
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import type { GameState } from '../GameEngine';

interface InteractiveSudokuProps {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  onComplete: (code: { A: number; B: number; C: number }) => void;
}

export function InteractiveSudoku({ gameState, onComplete }: InteractiveSudokuProps) {
  const [numberInput, setNumberInput] = useState('');
  const [calculatedPage, setCalculatedPage] = useState<number | null>(null);
  const [showSudoku, setShowSudoku] = useState(false);
  const [sudokuValues, setSudokuValues] = useState<{ [key: string]: string }>({});
  const [markedFields, setMarkedFields] = useState<{ A: number | null; B: number | null; C: number | null }>({
    A: null, B: null, C: null
  });

  // Vordefiniertes Sudoku mit Lösung für Seite 53
  const sudokuPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const sudokuSolution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];

  // Die markierten Felder (mittlere Spalte, Positionen für A, B, C)
  const markedPositions = {
    A: { row: 2, col: 4 }, // Wert: 4
    B: { row: 4, col: 4 }, // Wert: 5  
    C: { row: 6, col: 4 }  // Wert: 3
  };

  const handleNumberSubmit = () => {
    const number = parseInt(numberInput);
    if (isNaN(number)) {
      toast.error('Bitte gib eine gültige Zahl ein!');
      return;
    }

    setCalculatedPage(number);

    if (number === 53) {
      toast.success(`Perfekt! Die Zahl ${number} ist korrekt!`);
      setTimeout(() => setShowSudoku(true), 1000);
    } else {
      toast.warning(`Die Zahl ${number} ist nicht korrekt. Löse das Rätsel, um die richtige Seitenzahl zu finden!`);
    }
  };

  const handleSudokuInput = (row: number, col: number, value: string) => {
    const key = `${row}-${col}`;
    setSudokuValues(prev => ({ ...prev, [key]: value }));
    
    // Prüfe markierte Felder
    Object.entries(markedPositions).forEach(([letter, pos]) => {
      if (pos.row === row && pos.col === col) {
        const numValue = parseInt(value) || null;
        setMarkedFields(prev => ({ ...prev, [letter as keyof typeof markedFields]: numValue }));
      }
    });
  };

  const checkSudokuCompletion = () => {
    const { A, B, C } = markedFields;
    
    if (A === null || B === null || C === null) {
      toast.error('Bitte fülle alle markierten Felder A, B und C aus!');
      return;
    }

    // Prüfe die richtigen Werte
    const correctValues = { A: 4, B: 5, C: 3 };
    
    if (A === correctValues.A && B === correctValues.B && C === correctValues.C) {
      toast.success('🎉 Sudoku gelöst! Der Code ist korrekt!');
      onComplete({ A, B, C });
    } else {
      toast.error(`Der Code ist nicht korrekt. Versuche es nochmal! (Tipp: Schau dir die mittlere Spalte genau an)`);
    }
  };

  const cardElement = (
    <div className="flex flex-col lg:flex-row gap-4">
      <FlippableRatselCard
        puzzleId="A"
        title="Rätsel der Namen"
        content={<SudokuRatselContent />}
      />
      <HintCard
        puzzleId="A"
        title="Rätsel der Namen"
        hintContent={<SudokuHintContent />}
      />
    </div>
  );

  const renderNameGate = () => (
    <PuzzleStageLayout card={cardElement}>
      <BackgroundBox backgroundImage={imgComponent4}>
        <motion.div
          className="font-['Jim_Nightshade:Regular',_sans-serif] text-center flex flex-col items-center justify-center gap-6 h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="bg-white/95 border-2 border-pink-200 rounded-2xl p-6 shadow-xl mb-4">
            <h2 className="text-[32px] text-gray-900 font-bold mb-3">Das erste Rätsel</h2>
            <p className="text-[16px] text-gray-800 max-w-md leading-relaxed font-medium">
              Auf welcher Seite findest du das Sudoku?
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Input
              type="number"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="Seitenzahl"
              className="text-center text-xl font-bold bg-white border-2 border-pink-300 focus:border-pink-500 shadow-lg h-14 text-gray-800"
            />

            {calculatedPage && (
              <motion.div
                className="bg-pink-100 border-2 border-pink-300 rounded-lg p-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-pink-800 font-bold text-sm">
                  Eingegebene Seitenzahl: {calculatedPage}
                </p>
              </motion.div>
            )}

            <Button
              onClick={handleNumberSubmit}
              disabled={!numberInput}
              className="h-14 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-lg font-bold shadow-xl border-2 border-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Seite prüfen
            </Button>
          </div>

          <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4 max-w-sm">
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              Löse das Rätsel, um die richtige Seitenzahl zu finden.
            </p>
          </div>
        </motion.div>
      </BackgroundBox>
    </PuzzleStageLayout>
  );

  const renderSudokuBoard = () => (
    <PuzzleStageLayout card={cardElement}>
      <BackgroundBox backgroundImage={imgComponent4}>
        <motion.div
          className="font-['Jim_Nightshade:Regular',_sans-serif] text-center flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="bg-white/95 border-2 border-pink-200 rounded-2xl p-6 shadow-xl">
            <h2 className="text-[32px] text-gray-900 font-bold mb-3">Sudoku - Seite {calculatedPage}</h2>
            <p className="text-[16px] text-gray-800 font-medium">Fülle die mittlere Säule und finde die Zeichen für A, B und C.</p>
          </div>

          <div className="w-full max-w-lg">
            <div className="grid grid-cols-9 gap-0 bg-pink-200 p-4 rounded-2xl border-2 border-pink-300">
              {sudokuPuzzle.flat().map((value, index) => {
                const row = Math.floor(index / 9);
                const col = index % 9;
                const key = `${row}-${col}`;
                const isMiddleColumn = col === 4;
                const isMarked = Object.values(markedPositions).some(pos => pos.row === row && pos.col === col);
                const markerLetter = Object.entries(markedPositions).find(([_, pos]) => pos.row === row && pos.col === col)?.[0];
                const isPrefilled = value !== 0;
                
                // Determine if this cell is on a 3x3 box boundary
                const isBoxBoundaryRight = col === 2 || col === 5; // Right edge of 3x3 boxes
                const isBoxBoundaryBottom = row === 2 || row === 5; // Bottom edge of 3x3 boxes
                const isBoxBoundaryLeft = col === 3 || col === 6; // Left edge of 3x3 boxes
                const isBoxBoundaryTop = row === 3 || row === 6; // Top edge of 3x3 boxes

                // Build border styles using inline styles for reliability
                const borderStyle: React.CSSProperties = {
                  border: '1px solid #f9a8d4', // pink-300
                  borderRight: isBoxBoundaryRight ? '4px solid #be185d' : '1px solid #f9a8d4', // pink-600 for thick borders
                  borderBottom: isBoxBoundaryBottom ? '4px solid #be185d' : '1px solid #f9a8d4',
                  borderLeft: isBoxBoundaryLeft ? '4px solid #be185d' : '1px solid #f9a8d4',
                  borderTop: isBoxBoundaryTop ? '4px solid #be185d' : '1px solid #f9a8d4',
                };

                return (
                  <div
                    key={index}
                    className={`
                      w-10 h-10 flex items-center justify-center text-[14px] relative rounded-md shadow-sm
                      ${isMiddleColumn ? 'bg-pink-100' : 'bg-white'}
                      ${isMarked ? 'bg-pink-300 text-pink-800 font-bold shadow-md' : ''}
                      ${isPrefilled ? 'font-bold text-pink-800 bg-pink-100' : ''}
                    `}
                    style={borderStyle}
                  >
                    {isPrefilled ? (
                      <span className="text-gray-800 font-bold">{value}</span>
                    ) : (
                      <input
                        type="text"
                        maxLength={1}
                        value={sudokuValues[key] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || /^[1-9]$/.test(val)) {
                            handleSudokuInput(row, col, val);
                          }
                        }}
                        className="w-full h-full text-center border-none bg-transparent focus:outline-none focus:bg-pink-200 text-gray-800 font-bold"
                      />
                    )}

                    {isMarked && (
                      <span className="absolute -top-2 -left-2 text-[10px] text-pink-800 font-bold bg-pink-400 border-2 border-white rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        {markerLetter}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-lg bg-white/95 border-2 border-pink-200 rounded-2xl px-6 py-4 shadow-xl">
            <p className="text-[16px] text-gray-800 font-bold mb-4">Gefundener Code:</p>
            <div className="flex justify-center gap-8 text-3xl font-bold text-pink-700">
              <span className="bg-pink-100 border-2 border-pink-300 rounded-lg px-4 py-2">A = {markedFields.A ?? '?'}</span>
              <span className="bg-pink-100 border-2 border-pink-300 rounded-lg px-4 py-2">B = {markedFields.B ?? '?'}</span>
              <span className="bg-pink-100 border-2 border-pink-300 rounded-lg px-4 py-2">C = {markedFields.C ?? '?'}</span>
            </div>
          </div>

          <Button
            onClick={checkSudokuCompletion}
            disabled={Object.values(markedFields).some(v => v === null)}
            className="mt-4 h-14 rounded-xl bg-pink-600 hover:bg-pink-700 px-12 text-lg font-bold shadow-xl border-2 border-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Code prüfen
          </Button>
        </motion.div>
      </BackgroundBox>
    </PuzzleStageLayout>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {showSudoku ? renderSudokuBoard() : renderNameGate()}
    </div>
  );
}
