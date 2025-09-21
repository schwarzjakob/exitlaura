import React, { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { BackgroundBox } from "../ui/BackgroundBox";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { FinaleRatselContent } from '../RatselCardContents';
import { HintCard } from '../HintCard';
import { FinaleHintContent } from '../HintCardContents';
import { PuzzleStageLayout } from '../PuzzleStageLayout';
import type { GameState } from "../GameEngine";

interface InteractiveFinalePuzzleProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveFinalePuzzle({ onComplete }: InteractiveFinalePuzzleProps) {
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  const fragments = [
    { symbol: '🛡️', name: 'Schild', order: 'A', description: 'Sudoku der Zahlen' },
    { symbol: '⚔️', name: 'Zeichen', order: 'B', description: 'Netz der Symbole' },
    { symbol: '🌙', name: 'Maske', order: 'C', description: 'Stille der Maske' },
    { symbol: '💝', name: 'Herz', order: 'D', description: 'Pfad des Herzens' }
  ];

  const correctOrder = ['A', 'B', 'C', 'D'];

  const handleFragmentClick = (order: string) => {
    if (selectedOrder.includes(order)) {
      setSelectedOrder(selectedOrder.filter(o => o !== order));
    } else if (selectedOrder.length < 4) {
      setSelectedOrder([...selectedOrder, order]);
    }
  };

  const checkOrder = () => {
    if (selectedOrder.length !== 4) {
      toast.error("Du musst alle vier Fragmente ordnen!");
      return;
    }

    if (JSON.stringify(selectedOrder) === JSON.stringify(correctOrder)) {
      toast.success("🎉 Perfekt! Die Fragmente sind in der richtigen Reihenfolge!");
      setShowSolution(true);
      setTimeout(() => onComplete(), 2000);
    } else {
      toast.error("Die Reihenfolge ist nicht korrekt. Denk an die Reihenfolge deiner Prüfungen...");
    }
  };

  const resetOrder = () => {
    setSelectedOrder([]);
    setShowSolution(false);
  };

  const getFragmentByOrder = (order: string) =>
    fragments.find(f => f.order === order);

  const cardElement = (
    <div className="flex flex-col lg:flex-row gap-4">
      <FlippableRatselCard
        puzzleId="E"
        title="Kristall der Macht"
        content={<FinaleRatselContent />}
      />
      <HintCard
        puzzleId="E"
        title="Kristall der Macht"
        hintContent={<FinaleHintContent />}
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
            <h2 className="text-[32px] text-gray-900 font-bold">Der Kristall der Macht</h2>
            <p className="text-[14px] text-black/70">
              Ordne die Fragmente deiner Reise. Nur in der richtigen Reihenfolge entsteht der finale Kristall.
            </p>
          </div>
          <BackgroundBox backgroundImage={imgComponent4}>
          <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
            <div className="relative flex-1 w-full">
              
                <div className="rounded-3xl border-2 border-pink-200 bg-white/90 backdrop-blur p-6 shadow-xl">
                <p className="text-sm text-gray-700 mb-4 font-medium">
                  Klicke auf die Fragmente, um ihre Reihenfolge festzulegen.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {fragments.map((fragment) => {
                    const isSelected = selectedOrder.includes(fragment.order);
                    const selectionIndex = selectedOrder.indexOf(fragment.order);

                    return (
                      <motion.button
                        key={fragment.order}
                        onClick={() => handleFragmentClick(fragment.order)}
                        className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 px-5 py-4 text-center transition-all shadow-md hover:shadow-lg ${
                          isSelected ? 'bg-pink-100 border-pink-500 shadow-pink-200' : 'bg-white border-pink-200 hover:border-pink-400 hover:bg-pink-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-3xl">{fragment.symbol}</span>
                        <span className="text-[16px] text-pink-700 font-bold">{fragment.name}</span>
                        <span className="text-xs text-gray-600 font-medium">{fragment.description}</span>
                        
                      </motion.button>
                    );
                  })}
                </div>
                </div>
            </div>

            <div className="w-full max-w-sm bg-white/85 border border-pink-100 rounded-3xl p-6 shadow-lg text-left">
              <h3 className="text-[16px] text-pink-600 font-semibold mb-4 text-center">Reihenfolge deiner Prüfungen</h3>
              <div className="flex justify-between gap-3 text-sm text-black/70">
                {['A', 'B', 'C', 'D'].map((letter, index) => {
                  const fragment = selectedOrder[index] ? getFragmentByOrder(selectedOrder[index]) : null;
                  return (
                    <div key={letter} className="flex-1 min-h-[90px] rounded-2xl border border-pink-200 bg-pink-50/60 flex flex-col items-center justify-center gap-2">
                      {fragment ? (
                        <>
                          <span className="text-2xl">{fragment.symbol}</span>
                          <span className="text-xs text-pink-600 font-semibold">{letter}</span>
                        </>
                      ) : (
                        <span className="text-xl text-pink-200">{letter}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={resetOrder}
                  className="h-10 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 px-6 text-sm font-semibold border border-pink-200"
                >
                  Zurücksetzen
                </Button>
                <Button
                  onClick={checkOrder}
                  disabled={selectedOrder.length !== 4 || showSolution}
                  className="h-10 rounded-full bg-pink-600 hover:bg-pink-500 px-8 text-sm font-semibold shadow-md shadow-pink-500/30 disabled:opacity-60"
                >
                  Reihenfolge prüfen
                </Button>
              </div>

              {selectedOrder.length > 0 && (
                <p className="mt-4 text-xs text-black/50 text-center">
                  Gewählte Reihenfolge: {selectedOrder.join(' → ')}
                </p>
              )}
            </div>
          </div>

          {showSolution && (
            
              <motion.div
                className="w-full max-w-md bg-white/90 border border-emerald-300 rounded-3xl px-6 py-5 shadow-xl"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-2xl mb-2">💎</p>
                <p className="text-[15px] text-emerald-700 font-semibold">
                  Der Kristall der Macht erscheint! Du hast alle Fragmente vereint – die letzte Prüfung ist bestanden.
                </p>
              </motion.div>
            
          )}
          </BackgroundBox>
        </motion.div>
      </PuzzleStageLayout>
    </div>
  );
}
