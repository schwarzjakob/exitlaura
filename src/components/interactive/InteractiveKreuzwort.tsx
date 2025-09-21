import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
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
  const [showFinalWord, setShowFinalWord] = useState(false);

  // Kreuzworträtsel-Daten – bekannte Zelda-Begriffe
  const crosswordClues = [
    { number: 1, clue: 'Grüne Kleidung des Helden (5)', answer: 'TUNIC', direction: 'horizontal', startRow: 0, startCol: 0 },
    { number: 2, clue: 'Vogelvolk in Hyrule (4)', answer: 'RITO', direction: 'horizontal', startRow: 1, startCol: 0 },
    { number: 3, clue: 'Weise Beschützerin von Zelda (4)', answer: 'IMPA', direction: 'horizontal', startRow: 2, startCol: 0 },
    { number: 4, clue: 'Gefährtin mit Feenstaub (5)', answer: 'FAIRY', direction: 'horizontal', startRow: 3, startCol: 0 },
    { number: 5, clue: 'Klassischer Gegner, spuckt Felsen (7)', answer: 'OCTOROK', direction: 'horizontal', startRow: 4, startCol: 0 },
    { number: 6, clue: 'Währung in Hyrule (5)', answer: 'RUPEE', direction: 'horizontal', startRow: 5, startCol: 0 },
    { number: 7, clue: 'Hühnerlegende – fass sie nicht! (5)', answer: 'CUCCO', direction: 'horizontal', startRow: 6, startCol: 0 },
    { number: 8, clue: 'Links treues Pferd (5)', answer: 'EPONA', direction: 'horizontal', startRow: 7, startCol: 0 }
  ];

  const GRID_ROWS = 8;
  const GRID_COLS = 8;
  const FINAL_WORD = 'TRIFORCE';
  
  // Definiere die Positionen der Buchstaben, die das Lösungswort bilden
  // Die Buchstaben werden aus den Kreuzungen der Wörter abgeleitet
  const solutionPositions = [
    { row: 1, col: 1, letter: 'T' }, // T aus LINK[1] ∩ ZELDA[1]
    { row: 1, col: 3, letter: 'R' }, // R aus LINK[3] ∩ GANON[1] 
    { row: 3, col: 1, letter: 'I' }, // I aus EPONA[1] ∩ ZELDA[3]
    { row: 3, col: 3, letter: 'F' }, // F aus EPONA[3] ∩ GANON[3]
    { row: 0, col: 2, letter: 'O' }, // O aus ZELDA[2]
    { row: 2, col: 0, letter: 'R' }, // R aus LINK[2]
    { row: 2, col: 4, letter: 'C' }, // C aus GANON[4]
    { row: 4, col: 2, letter: 'E' }  // E aus EPONA[2]
  ];

  const handleAnswerChange = (clueNumber: number, value: string) => {
    const upperValue = value.toUpperCase();
    setAnswers(prev => ({ ...prev, [clueNumber]: upperValue }));
  };

  const allFieldsFilled = crosswordClues.every(clue => (answers[clue.number] || '').length === clue.answer.length);

  // Extrahiere die Lösung aus den gefüllten Buchstaben
  // Nimm den ersten Buchstaben jeder Zeile (von oben nach unten) → TRIFORCE
  const getDerivedSolution = () => {
    let derivedWord = '';
    // Gehe durch alle Clues in Reihenfolge und nimm den ersten Buchstaben
    for (const clue of crosswordClues) {
      const userAnswer = answers[clue.number] || '';
      if (userAnswer[0]) {
        derivedWord += userAnswer[0];
      }
    }
    return derivedWord;
  };

  // Computed derived solution that updates reactively
  const derivedSolution = getDerivedSolution();

  const checkAnswers = () => {
    const correctAnswers = crosswordClues.every(clue => 
      answers[clue.number] === clue.answer
    );

    if (correctAnswers) {
      if (derivedSolution === FINAL_WORD) {
        setShowFinalWord(true);
        toast.success('🎉 Alle Begriffe sind korrekt! Das Triforce wurde aus den ersten Buchstaben abgeleitet!');
        setTimeout(() => onComplete(), 1500);
      } else {
        toast.error('Die Begriffe sind korrekt, aber das abgeleitete Lösungswort stimmt nicht überein. Überprüfe die ersten Buchstaben!');
      }
    } else {
      toast.error('Einige Zelda-Begriffe sind noch nicht korrekt. Überprüfe deine Eingaben!');
    }
  };
  
  const getGridCell = (row: number, col: number) => {
    let isActive = false;
    let letter = '';
    let hasNumber = null;
    let isSolutionPosition = false;
    let isBlocked = false;

    // Prüfe alle Clues für diese Position
    for (const clue of crosswordClues) {
      if (clue.direction === 'horizontal' && 
          row === clue.startRow && 
          col >= clue.startCol && 
          col < clue.startCol + clue.answer.length) {
        isActive = true;
        const letterIndex = col - clue.startCol;
        const userAnswer = answers[clue.number] || '';
        
        // In der ersten Spalte (Lösungsspalte) zeige den ersten Buchstaben des Wortes
        if (col === 0) {
          letter = userAnswer[0] || ''; // Erster Buchstaben des Wortes
        } else {
          letter = userAnswer[letterIndex] || '';
        }
        
        hasNumber = col === clue.startCol ? clue.number : hasNumber;
        break;
      }
    }

    // Prüfe ob diese Position Teil der Lösung ist (erste Spalte)
    isSolutionPosition = col === 0;

    // Definiere Blockfelder basierend auf dem Raster
    const blockedPositions = [
      // Zeile 0: TUNIC (0,0-4), dann Blockfelder (0,5-7)
      ...Array.from({length: 3}, (_, i) => ({row: 0, col: 5 + i})),
      // Zeile 1: RITO (1,0-3), dann Blockfelder (1,4-7)
      ...Array.from({length: 4}, (_, i) => ({row: 1, col: 4 + i})),
      // Zeile 2: IMPA (2,0-3), dann Blockfelder (2,4-7)
      ...Array.from({length: 4}, (_, i) => ({row: 2, col: 4 + i})),
      // Zeile 3: FAIRY (3,0-4), dann Blockfelder (3,5-7)
      ...Array.from({length: 3}, (_, i) => ({row: 3, col: 5 + i})),
      // Zeile 4: OCTOROK (4,0-6), dann Blockfeld (4,7)
      {row: 4, col: 7},
      // Zeile 5: RUPEE (5,0-4), dann Blockfelder (5,5-7)
      ...Array.from({length: 3}, (_, i) => ({row: 5, col: 5 + i})),
      // Zeile 6: CUCCO (6,0-4), dann Blockfelder (6,5-7)
      ...Array.from({length: 3}, (_, i) => ({row: 6, col: 5 + i})),
      // Zeile 7: EPONA (7,0-4), dann Blockfelder (7,5-7)
      ...Array.from({length: 3}, (_, i) => ({row: 7, col: 5 + i}))
    ];

    isBlocked = blockedPositions.some(pos => pos.row === row && pos.col === col);

    return { 
      isActive, 
      isFinal: false, 
      letter, 
      hasNumber,
      isSolutionPosition,
      isBlocked
    };
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
                Trage die Zelda-Begriffe ein und finde das Lösungswort in der ersten Spalte. Die ersten Buchstaben bilden das berühmte Symbol der Macht.
              </p>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 w-full">
                {/* Solution Column Label */}
                <div className="mb-2 text-center">
                  <span className="text-[12px] text-yellow-600 font-semibold bg-yellow-100 px-3 py-1 rounded-full">
                    💡 Lösungsspalte
                  </span>
                </div>
                <div className={`grid gap-[2px] bg-pink-100/80 p-3 rounded-2xl`} style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}>
                  {Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => {
                    const row = Math.floor(i / GRID_COLS);
                    const col = i % GRID_COLS;
                    const cellInfo = getGridCell(row, col);

                    return (
                      <div
                        key={i}
                        className={`
                          w-8 h-8 flex items-center justify-center text-[12px] relative font-semibold rounded-lg
                          ${cellInfo.isBlocked ? 'bg-gray-800 border border-gray-600' : 
                            cellInfo.isActive ? 'bg-white border border-pink-200' : 'bg-pink-200/40'}
                          ${cellInfo.isSolutionPosition ? 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 border-yellow-500 shadow-lg shadow-yellow-200/50' : ''}
                        `}
                      >
                        {cellInfo.hasNumber && (
                          <span className="absolute top-0 left-0 text-[8px] text-pink-500 font-bold">
                            {cellInfo.hasNumber}
                          </span>
                        )}
                        {cellInfo.isBlocked ? (
                          <span className="text-gray-400 text-[10px]">#</span>
                        ) : cellInfo.isActive && (
                          <span className={`${cellInfo.isSolutionPosition ? 'text-yellow-700 font-bold' : cellInfo.letter ? 'text-pink-700' : 'text-pink-200'}`}>
                            {cellInfo.letter || '·'}
                          </span>
                        )}
                        {cellInfo.isSolutionPosition && (
                          <span className="absolute -top-1 -right-1 text-[8px] text-yellow-600 font-bold">
                            {showFinalWord ? '★' : '●'}
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
                      {clue.number}. {clue.clue} ({clue.direction === 'horizontal' ? '→' : '↓'})
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

              {/* Abgeleitetes Lösungswort */}
              <motion.div
                className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-[11px] text-yellow-700 font-semibold mb-2 text-center">Abgeleitetes Lösungswort:</p>
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: 8 }, (_, i) => {
                    const letter = derivedSolution[i] || '';
                    return (
                      <div
                        key={i}
                        className="w-8 h-8 flex items-center justify-center text-[14px] font-bold rounded-lg border-2 border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800"
                      >
                        {letter || '?'}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-yellow-600 text-center">
                  Die ersten Buchstaben der Wörter bilden das Lösungswort
                </p>
              </motion.div>

            </div>

            {showFinalWord && (
            <motion.div
              className="w-full max-w-md bg-white/85 border border-yellow-200 rounded-3xl px-6 py-4 shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-yellow-600 font-semibold text-lg mb-1">🏆 Das Triforce ist enthüllt!</p>
              <p className="text-[13px] text-black/70">
                Aus den ersten Buchstaben wurde das Triforce abgeleitet: <span className="font-semibold text-yellow-700">{derivedSolution}</span>
              </p>
            </motion.div>
          )}

            <Button
              onClick={checkAnswers}
              disabled={!allFieldsFilled || showFinalWord}
              className="h-12 rounded-full bg-pink-600 hover:bg-pink-500 px-10 text-base font-semibold shadow-md shadow-pink-500/30 disabled:opacity-60"
            >
              Überprüfen
            </Button>
          </motion.div>
        </BackgroundBox>
      </PuzzleStageLayout>
    </div>
  );
}
