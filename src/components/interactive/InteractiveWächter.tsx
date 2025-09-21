import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from "../ui/button";
import { BackgroundBox } from "../ui/BackgroundBox";
import type { GameState } from "../GameEngine";

interface InteractiveWächterProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveWächter({
  gameState,
  onComplete,
}: InteractiveWächterProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<{
    A: number | null;
    B: number | null;
    C: number | null;
  }>({
    A: null,
    B: null,
    C: null,
  });
  const [revealedMessages, setRevealedMessages] = useState<{
    A: boolean;
    B: boolean;
    C: boolean;
  }>({
    A: false,
    B: false,
    C: false,
  });
  const [showFinalMessage, setShowFinalMessage] =
    useState(false);

  // Die korrekten Codes und versteckten Nachrichten
  const correctCodes = { A: 4, B: 5, C: 3 }; // Aus dem Sudoku
  const hiddenMessages = {
    A: { correctNumber: 4, message: "ÖFF" },
    B: { correctNumber: 5, message: "NE " },
    C: { correctNumber: 3, message: "UMS" },
    full: "ÖFFNE UMSCHLAG B",
  };

  const handleNumberClick = (
    watcher: "A" | "B" | "C",
    number: number,
  ) => {
    setSelectedNumbers((prev) => ({
      ...prev,
      [watcher]: number,
    }));

    if (number === hiddenMessages[watcher].correctNumber) {
      setRevealedMessages((prev) => ({
        ...prev,
        [watcher]: true,
      }));
      toast.success(
        `Wächter ${watcher} öffnet sich! Nachricht gefunden: "${hiddenMessages[watcher].message}"`,
      );
    } else {
      setRevealedMessages((prev) => ({
        ...prev,
        [watcher]: false,
      }));
      toast.error(
        `Wächter ${watcher} bleibt verschlossen. Versuche eine andere Zahl!`,
      );
    }
  };

  const checkAllWächter = () => {
    const allRevealed =
      Object.values(revealedMessages).every(Boolean);

    if (allRevealed) {
      setShowFinalMessage(true);
      toast.success(
        "🎉 Alle Wächter besiegt! Die vollständige Nachricht wurde enthüllt!",
      );
      setTimeout(() => onComplete(), 2000);
    } else {
      toast.warning(
        "Noch nicht alle Wächter sind besiegt. Verwende den richtigen Code!",
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        className="w-[900px] mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <BackgroundBox backgroundImage={imgComponent4}>
          <div className="h-[560px] overflow-clip relative w-full flex flex-col items-center justify-center">
          <motion.div
            className="font-['Jim_Nightshade:Regular',_sans-serif] text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-[28px] text-red-800 mb-4">
              Die drei Wächter
            </h2>

            <div className="text-[14px] text-black mb-6 max-w-2xl mx-auto">
              <p>
                Nun, da du die Zahlen gefunden hast, prüfe
                deinen Mut vor den drei Wächtern.
              </p>
              <p>
                Verwende deinen Code vom Sudoku: A=
                {gameState.sudokuCode.A}, B=
                {gameState.sudokuCode.B}, C=
                {gameState.sudokuCode.C}
              </p>
            </div>

            {/* Wächter-Spalten */}
            <div className="flex gap-8 justify-center mb-6">
              {(["A", "B", "C"] as const).map((watcher) => (
                <motion.div
                  key={watcher}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Wächter-Titel */}
                  <div className="font-['Jim_Nightshade:Regular',_sans-serif] text-[20px] text-black mb-3">
                    <p>Wächter {watcher}</p>
                  </div>

                  {/* Zahlen-Grid */}
                  <div className="grid grid-cols-2 gap-1 mb-4">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                      (number) => {
                        const isSelected =
                          selectedNumbers[watcher] === number;
                        const isCorrect =
                          number ===
                          hiddenMessages[watcher].correctNumber;
                        const isRevealed =
                          revealedMessages[watcher] &&
                          isCorrect;

                        return (
                          <motion.button
                            key={number}
                            onClick={() =>
                              handleNumberClick(watcher, number)
                            }
                            className={`
                            w-8 h-8 border border-gray-400 flex items-center justify-center text-sm cursor-pointer
                            transition-all duration-200 relative overflow-hidden
                            ${isSelected ? "bg-blue-200 border-blue-600 scale-110" : "bg-white hover:bg-gray-100"}
                            ${isRevealed ? "bg-yellow-200 border-yellow-600" : ""}
                          `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-['Jim_Nightshade:Regular',_sans-serif] text-black relative z-10">
                              {number}
                            </span>

                            {/* Versteckte Nachricht */}
                            <AnimatePresence>
                              {isRevealed && (
                                <motion.div
                                  className="absolute inset-0 bg-yellow-300 flex items-center justify-center text-[10px] font-bold text-red-800 z-20"
                                  initial={{
                                    opacity: 0,
                                    scale: 0,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    scale: 1,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    scale: 0,
                                  }}
                                  transition={{
                                    type: "spring",
                                    duration: 0.5,
                                  }}
                                >
                                  {
                                    hiddenMessages[watcher]
                                      .message
                                  }
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        );
                      },
                    )}
                  </div>

                  {/* Status-Anzeige */}
                  <div className="text-xs">
                    {selectedNumbers[watcher] !== null && (
                      <span
                        className={
                          revealedMessages[watcher]
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {revealedMessages[watcher]
                          ? "✓ Besiegt"
                          : "✗ Verschlossen"}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Nachricht-Zusammenstellung */}
            <div className="bg-yellow-100/80 p-4 rounded-lg mb-6 max-w-md mx-auto">
              <p className="text-[14px] text-black mb-2">
                Enthüllte Nachricht:
              </p>
              <div className="flex justify-center gap-2 text-xl font-bold text-red-800">
                <span
                  className={
                    revealedMessages.A
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                >
                  {revealedMessages.A
                    ? hiddenMessages.A.message
                    : "???"}
                </span>
                <span
                  className={
                    revealedMessages.B
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                >
                  {revealedMessages.B
                    ? hiddenMessages.B.message
                    : "???"}
                </span>
                <span
                  className={
                    revealedMessages.C
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                >
                  {revealedMessages.C
                    ? hiddenMessages.C.message
                    : "???"}
                </span>
              </div>

              <AnimatePresence>
                {showFinalMessage && (
                  <motion.div
                    className="mt-4 p-3 bg-green-200 rounded-lg border-2 border-green-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <p className="text-green-800 font-bold text-lg">
                      🎉 {hiddenMessages.full} 🎉
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              onClick={checkAllWächter}
              disabled={
                !Object.values(revealedMessages).every(Boolean)
              }
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-['Jim_Nightshade'] text-[18px]"
            >
              Nachricht vervollständigen
            </Button>
          </motion.div>
          </div>
        </BackgroundBox>
      </motion.div>

      {/* Magische Effekte */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {Object.entries(revealedMessages).map(
          ([watcher, revealed], index) =>
            revealed && (
              <motion.div
                key={watcher}
                className="absolute w-4 h-4 bg-yellow-400 rounded-full opacity-70"
                initial={{
                  x: 400 + index * 150,
                  y: 300,
                  scale: 0,
                }}
                animate={{
                  y: [300, 250, 300],
                  scale: [0, 1, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            ),
        )}
      </motion.div>
    </div>
  );
}