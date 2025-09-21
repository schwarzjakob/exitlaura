import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FlippableRatselCard } from '../FlippableRatselCard';
import { FinaleRatselContent } from '../RatselCardContents';
import type { GameState } from "../GameEngine";

interface InteractiveFinalePuzzleProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveFinalePuzzle({ onComplete }: InteractiveFinalePuzzleProps) {
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  // Fragment symbols representing the previous puzzles
  const fragments = [
    { symbol: '🛡️', name: 'Schild', order: 'A', description: 'Sudoku der Zahlen' },
    { symbol: '⚔️', name: 'Zeichen', order: 'B', description: 'Netz der Symbole' },
    { symbol: '🌙', name: 'Maske', order: 'C', description: 'Stille der Maske' },
    { symbol: '💝', name: 'Herz', order: 'D', description: 'Pfad des Herzens' }
  ];

  const correctOrder = ['A', 'B', 'C', 'D'];

  const handleFragmentClick = (order: string) => {
    if (selectedOrder.includes(order)) {
      // Remove from selection
      setSelectedOrder(selectedOrder.filter(o => o !== order));
    } else if (selectedOrder.length < 4) {
      // Add to selection
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

  const getFragmentByOrder = (order: string) => {
    return fragments.find(f => f.order === order);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Rätselkarte */}
      <div className="flex justify-center mb-6">
        <FlippableRatselCard
          puzzleId="E"
          title="Kristall der Macht"
          content={<FinaleRatselContent />}
        />
      </div>

      <motion.div
        className="bg-center bg-cover bg-no-repeat h-[600px] w-[800px] rounded-[15px] mx-auto relative"
        style={{ backgroundImage: `url('${imgComponent4}')` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-[600px] overflow-clip relative w-[800px] flex flex-col items-center justify-center p-8">
          <motion.div
            className="font-['Jim_Nightshade:Regular',_sans-serif] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-[28px] text-red-800 mb-4">
              Der Kristall der Macht
            </h2>
            <p className="text-[14px] text-black mb-6">
              Alle Siegel sind gefallen – fast. Setze die Fragmente deiner Reise in die richtige Reihenfolge.
            </p>

            {/* Scattered Fragments */}
            <div className="bg-white/90 p-6 rounded-lg shadow-inner w-full max-w-[600px] mx-auto mb-6">
              <p className="font-['Jim_Nightshade'] text-[14px] text-black text-center mb-4">
                Klicke auf die Fragmente, um sie zu ordnen:
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[...fragments].sort(() => Math.random() - 0.5).map((fragment) => {
                  const isSelected = selectedOrder.includes(fragment.order);
                  const selectionIndex = selectedOrder.indexOf(fragment.order);
                  
                  return (
                    <motion.div 
                      key={fragment.order} 
                      className={`relative cursor-pointer p-4 border-2 border-dashed rounded transition-all ${
                        isSelected 
                          ? 'border-yellow-600 bg-yellow-100' 
                          : 'border-gray-400 bg-white hover:bg-gray-50'
                      }`}
                      onClick={() => handleFragmentClick(fragment.order)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-[32px] mb-2">{fragment.symbol}</div>
                        <div className="font-['Jim_Nightshade'] text-[12px] text-black text-center">
                          <div className="font-bold">{fragment.name}</div>
                          <div className="text-gray-600">{fragment.description}</div>
                        </div>
                      </div>
                      
                      {/* Selection number */}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 border-2 border-yellow-600 rounded-full flex items-center justify-center">
                          <span className="font-['Jim_Nightshade'] text-[14px] font-bold text-black">
                            {selectionIndex + 1}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Assembly area */}
              <div className="border-2 border-yellow-600 rounded-lg p-4 bg-yellow-50">
                <p className="font-['Jim_Nightshade'] text-[12px] text-center text-red-800 mb-3">
                  Reihenfolge deiner Prüfungen: A → B → C → D
                </p>
                <div className="flex justify-center gap-2">
                  {['A', 'B', 'C', 'D'].map((letter, index) => {
                    const fragment = selectedOrder[index] ? getFragmentByOrder(selectedOrder[index]) : null;
                    
                    return (
                      <div key={letter} className="w-16 h-16 border-2 border-gray-400 rounded flex flex-col items-center justify-center bg-white">
                        {fragment ? (
                          <>
                            <div className="text-[20px]">{fragment.symbol}</div>
                            <div className="text-[8px] text-gray-600">{letter}</div>
                          </>
                        ) : (
                          <span className="font-['Jim_Nightshade'] text-[18px] text-gray-400 font-bold">
                            {letter}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {showSolution && (
              <motion.div
                className="mb-6 p-4 bg-green-100 border-2 border-green-600 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-[24px] mb-2">💎</div>
                <p className="font-['Jim_Nightshade'] text-[16px] text-green-800 font-bold">
                  Der Kristall der Macht erscheint!
                </p>
                <p className="text-[12px] text-green-700 mt-2">
                  Du hast alle Fragmente in die richtige Reihenfolge gebracht. Das letzte Siegel bricht...
                </p>
              </motion.div>
            )}

            {/* Controls */}
            <div className="space-y-4">
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={resetOrder}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 font-['Jim_Nightshade'] text-[16px]"
                >
                  Zurücksetzen
                </Button>
                {selectedOrder.length === 4 && !showSolution && (
                  <Button
                    onClick={checkOrder}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-['Jim_Nightshade'] text-[18px]"
                  >
                    Reihenfolge prüfen
                  </Button>
                )}
              </div>

              {selectedOrder.length > 0 && (
                <div className="text-[12px] text-gray-600">
                  Gewählte Reihenfolge: {selectedOrder.join(' → ')}
                </div>
              )}
            </div>
          </motion.div>
        </div>
        <div
          aria-hidden="true"
          className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_8px_0px_#9db3ce]"
        />
      </motion.div>
    </div>
  );
}