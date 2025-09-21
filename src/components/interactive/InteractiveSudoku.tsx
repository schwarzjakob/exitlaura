import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FlippableRatselCard } from '../FlippableRatselCard';
import { SudokuRatselContent } from '../RatselCardContents';
import type { GameState } from '../GameEngine';

interface InteractiveSudokuProps {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  onComplete: (code: { A: number; B: number; C: number }) => void;
}

export function InteractiveSudoku({ gameState, onComplete }: InteractiveSudokuProps) {
  const [nameInput, setNameInput] = useState('');
  const [calculatedPage, setCalculatedPage] = useState<number | null>(null);
  const [showSudoku, setShowSudoku] = useState(false);
  const [sudokuValues, setSudokuValues] = useState<{ [key: string]: string }>({});
  const [markedFields, setMarkedFields] = useState<{ A: number | null; B: number | null; C: number | null }>({
    A: null, B: null, C: null
  });

  // Vordefiniertes Sudoku mit Lösung für Seite 56
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

  const calculatePageFromName = (name: string) => {
    // LAURA = L(12) + A(1) + U(21) + R(18) + A(1) = 53, aber wir wollen 56
    // Daher nehmen wir eine leicht angepasste Formel
    let sum = 0;
    for (let char of name.toUpperCase()) {
      sum += char.charCodeAt(0) - 64; // A=1, B=2, etc.
    }
    return sum + 3; // +3 um auf 56 zu kommen
  };

  const handleNameSubmit = () => {
    if (nameInput.length !== 5) {
      toast.error('Der Name muss genau 5 Buchstaben haben!');
      return;
    }
    
    const page = calculatePageFromName(nameInput);
    setCalculatedPage(page);
    
    if (page === 56) {
      toast.success(`Perfekt! ${nameInput} führt zu Seite ${page}!`);
      setTimeout(() => setShowSudoku(true), 1000);
    } else {
      toast.warning(`${nameInput} führt zu Seite ${page}. Versuche es mit "LAURA"!`);
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

  return (
    <div className="max-w-6xl mx-auto">
      {!showSudoku ? (
        <div className="flex gap-8 items-start">
          {/* Rätselkarte links */}
          <div className="flex-shrink-0">
            <FlippableRatselCard
              puzzleId="A"
              title="Rätsel der Namen"
              content={<SudokuRatselContent />}
              className="transform scale-125"
            />
          </div>

          {/* Spielfeld rechts */}
          <motion.div 
            className="bg-center bg-cover bg-no-repeat h-[500px] w-[700px] rounded-[15px] relative" 
            style={{ backgroundImage: `url('${imgComponent4}')` }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-[500px] relative w-[700px] flex flex-col items-center justify-center p-8">
              <motion.div 
                className="font-['Jim_Nightshade:Regular',_sans-serif] text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-[28px] text-red-800 mb-6">Das erste Rätsel</h2>
                
                <div className="space-y-3 text-[14px] text-black leading-[18px] mb-8">
                  <p>Gib deinen Namen ein (5 Buchstaben):</p>
                </div>

                <div className="space-y-4">
                  <Input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value.toUpperCase())}
                    placeholder="DEIN NAME"
                    className="text-center text-xl font-bold max-w-xs mx-auto"
                    maxLength={5}
                  />
                  
                  {calculatedPage && (
                    <motion.p 
                      className="text-blue-600 font-bold text-[12px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {nameInput} = {nameInput.split('').map(char => `${char}(${char.charCodeAt(0) - 64})`).join(' + ')} = Seite {calculatedPage}
                    </motion.p>
                  )}

                  <Button
                    onClick={handleNameSubmit}
                    disabled={nameInput.length !== 5}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-['Jim_Nightshade'] text-[18px]"
                  >
                    Seite berechnen
                  </Button>
                </div>
              </motion.div>
            </div>
            <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_8px_0px_#9db3ce]" />
          </motion.div>
        </div>
      ) : (
        <div className="flex gap-8 items-start">
          {/* Rätselkarte links */}
          <div className="flex-shrink-0">
            <FlippableRatselCard
              puzzleId="A"
              title="Rätsel der Namen"
              content={<SudokuRatselContent />}
              className="transform scale-125"
            />
          </div>

          {/* Spielfeld rechts */}
          <motion.div 
            className="bg-center bg-cover bg-no-repeat h-[700px] w-[700px] rounded-[15px] relative" 
            style={{ backgroundImage: `url('${imgComponent4}')` }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-[700px] relative w-[700px] flex flex-col items-center justify-center p-6">
              <motion.div 
                className="font-['Jim_Nightshade:Regular',_sans-serif] text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-[24px] text-red-800 mb-4">Sudoku - Seite {calculatedPage}</h2>
                <p className="text-[14px] text-black mb-4">Finde die Werte in den markierten Feldern der mittleren Spalte!</p>
                
                {/* Sudoku Grid */}
                <div className="bg-white/90 p-4 rounded-lg shadow-inner mb-4">
                  <div className="grid grid-cols-9 gap-[1px] bg-black p-2 max-w-md mx-auto">
                    {sudokuPuzzle.flat().map((value, index) => {
                      const row = Math.floor(index / 9);
                      const col = index % 9;
                      const key = `${row}-${col}`;
                      const isMiddleColumn = col === 4;
                      const isMarked = Object.values(markedPositions).some(pos => pos.row === row && pos.col === col);
                      const markerLetter = Object.entries(markedPositions).find(([_, pos]) => pos.row === row && pos.col === col)?.[0];
                      const isPrefilled = value !== 0;
                      
                      return (
                        <div
                          key={index}
                          className={`
                            w-8 h-8 border border-gray-400 flex items-center justify-center text-xs relative
                            ${isMiddleColumn ? 'bg-blue-50' : 'bg-white'}
                            ${isMarked ? 'bg-yellow-200 border-2 border-yellow-600' : ''}
                            ${isPrefilled ? 'font-bold text-blue-800' : ''}
                          `}
                        >
                          {isPrefilled ? (
                            <span>{value}</span>
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
                              className="w-full h-full text-center border-none bg-transparent text-xs focus:outline-none focus:bg-blue-100"
                            />
                          )}
                          
                          {isMarked && (
                            <span className="absolute -top-1 -left-1 text-[8px] text-red-600 font-bold bg-white rounded-full w-3 h-3 flex items-center justify-center">
                              {markerLetter}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Code Display */}
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <p className="text-[14px] text-black mb-2">Gefundener Code:</p>
                  <div className="flex justify-center gap-4 text-xl font-bold">
                    <span>A = {markedFields.A ?? '?'}</span>
                    <span>B = {markedFields.B ?? '?'}</span>
                    <span>C = {markedFields.C ?? '?'}</span>
                  </div>
                </div>

                <Button
                  onClick={checkSudokuCompletion}
                  disabled={Object.values(markedFields).some(v => v === null)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-['Jim_Nightshade'] text-[18px]"
                >
                  Code prüfen
                </Button>
              </motion.div>
            </div>
            <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_8px_0px_#9db3ce]" />
          </motion.div>
        </div>
      )}
    </div>
  );
}