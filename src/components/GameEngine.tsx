import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { CheckCircle, Lock, Star } from 'lucide-react';
import { InteractiveIntro } from './interactive/InteractiveIntro';
import { InteractiveSudoku } from './interactive/InteractiveSudoku';
import { InteractiveWächter } from './interactive/InteractiveWächter';
import { InteractiveKreuzwort } from './interactive/InteractiveKreuzwort';
import { InteractiveAcrostic } from './interactive/InteractiveAcrostic';
import { InteractiveRomance } from './interactive/InteractiveRomance';
import { InteractiveFinalePuzzle } from './interactive/InteractiveFinalePuzzle';
import { InteractivePermission } from './interactive/InteractivePermission';
import { InteractiveReveal } from './interactive/InteractiveReveal';

export type GameStage = 
  | 'intro' 
  | 'sudoku' | 'wächter' | 'permission-a' | 'reveal-a'
  | 'kreuzwort' | 'permission-b' | 'reveal-b'
  | 'acrostic' | 'permission-c' | 'reveal-c'
  | 'romance' | 'permission-d' | 'reveal-d'
  | 'finale' | 'permission-e' | 'reveal-e'
  | 'completed';

export interface GameState {
  currentStage: GameStage;
  completedStages: GameStage[];
  sudokuCode: { A: number | null; B: number | null; C: number | null };
  unlockedPackages: string[];
  openedPackages: string[];
  revealedGifts: string[];
  playerName: string;
}

const initialGameState: GameState = {
  currentStage: 'intro',
  completedStages: [],
  sudokuCode: { A: null, B: null, C: null },
  unlockedPackages: [],
  openedPackages: [],
  revealedGifts: [],
  playerName: 'Laura'
};

const stageNames = {
  intro: 'Intro: Die Göttin spricht',
  sudoku: 'Rätsel A: Sudoku der Zahlen', 
  wächter: 'Prüfung: Die drei Wächter',
  'permission-a': 'Erlaubnis: Päckchen A',
  'reveal-a': 'Geschenk A: Zelda-Hüllen',
  kreuzwort: 'Rätsel B: Netz der Symbole',
  'permission-b': 'Erlaubnis: Päckchen B',
  'reveal-b': 'Geschenk B: Anime-Sticker',
  acrostic: 'Rätsel C: Stille der Maske',
  'permission-c': 'Erlaubnis: Päckchen C',
  'reveal-c': 'Geschenk C: Kühlmaske',
  romance: 'Rätsel D: Pfad des Herzens',
  'permission-d': 'Erlaubnis: Päckchen D',
  'reveal-d': 'Geschenk D: Wundertüte',
  finale: 'Rätsel E: Kristall der Macht',
  'permission-e': 'Erlaubnis: Päckchen E',
  'reveal-e': 'Geschenk E: Controller',
  completed: 'Spiel abgeschlossen'
};

export function GameEngine() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [showCelebration, setShowCelebration] = useState(false);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const completeStage = (stage: GameStage, nextStage?: GameStage) => {
    setGameState(prev => ({
      ...prev,
      completedStages: [...prev.completedStages, stage],
      currentStage: nextStage || prev.currentStage
    }));
    
    if (nextStage) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      toast.success(`${stageNames[stage]} abgeschlossen!`, {
        description: `Weiter zu: ${stageNames[nextStage]}`
      });
    }
  };

  const resetGame = () => {
    setGameState(initialGameState);
    toast.info('Spiel wurde zurückgesetzt');
  };

  const isStageCompleted = (stage: GameStage) => {
    return gameState.completedStages.includes(stage);
  };

  const isStageAccessible = (stage: GameStage) => {
    const stageOrder: GameStage[] = [
      'intro', 
      'sudoku', 'wächter', 'permission-a', 'reveal-a',
      'kreuzwort', 'permission-b', 'reveal-b',
      'acrostic', 'permission-c', 'reveal-c',
      'romance', 'permission-d', 'reveal-d',
      'finale', 'permission-e', 'reveal-e'
    ];
    const currentIndex = stageOrder.indexOf(gameState.currentStage);
    const targetIndex = stageOrder.indexOf(stage);
    return targetIndex <= currentIndex || isStageCompleted(stage);
  };

  useEffect(() => {
    if (gameState.currentStage === 'completed') {
      toast.success('🎉 Herzlichen Glückwunsch!', {
        description: 'Du hast alle Rätsel der Göttin gelöst!'
      });
    }
  }, [gameState.currentStage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0 
            }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-8xl"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.5, 1], rotate: [0, 180, 360] }}
              exit={{ scale: 0 }}
              transition={{ duration: 1.5 }}
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Game Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-['Jim_Nightshade'] text-yellow-300 mb-4 drop-shadow-lg">
            Hyrule Geschenkbox
          </h1>
          <p className="text-xl text-blue-200 mb-6">
            Ein magisches Exit-Spiel für {gameState.playerName}
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto bg-black/30 rounded-full p-2 mb-6">
            <div className="flex justify-between items-center">
              {[
                { stage: 'intro', name: 'Intro' },
                { stage: 'sudoku', name: 'Rätsel A' },
                { stage: 'kreuzwort', name: 'Rätsel B' },
                { stage: 'acrostic', name: 'Rätsel C' },
                { stage: 'romance', name: 'Rätsel D' },
                { stage: 'finale', name: 'Rätsel E' }
              ].map(({ stage, name }, index) => {
                const completed = isStageCompleted(stage as GameStage);
                const current = gameState.currentStage === stage || 
                                gameState.currentStage.startsWith(stage.charAt(0).toLowerCase()) ||
                                (stage === 'intro' && gameState.currentStage === 'intro');
                const accessible = isStageAccessible(stage as GameStage);
                
                return (
                  <motion.div
                    key={stage}
                    className={`flex flex-col items-center ${
                      accessible ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                    whileHover={accessible ? { scale: 1.1 } : {}}
                    onClick={() => accessible && setGameState(prev => ({ ...prev, currentStage: stage as GameStage }))}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all ${
                      completed ? 'bg-green-500 text-white' :
                      current ? 'bg-yellow-400 text-black animate-pulse' :
                      accessible ? 'bg-blue-500 text-white' :
                      'bg-gray-600 text-gray-400'
                    }`}>
                      {completed ? <CheckCircle className="w-4 h-4" /> :
                       accessible ? index + 1 :
                       <Lock className="w-4 h-4" />}
                    </div>
                    <span className={`text-xs text-center ${
                      accessible ? 'text-white' : 'text-gray-500'
                    }`}>
                      {name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Current Stage Title */}
          <motion.h2 
            className="text-2xl font-['Jim_Nightshade'] text-yellow-200"
            key={gameState.currentStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {stageNames[gameState.currentStage]}
          </motion.h2>
        </motion.div>

        {/* Game Content */}
        <motion.div 
          className="flex justify-center"
          key={gameState.currentStage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {gameState.currentStage === 'intro' && (
            <InteractiveIntro 
              gameState={gameState}
              onComplete={() => completeStage('intro', 'sudoku')}
            />
          )}
          
          {gameState.currentStage === 'sudoku' && (
            <InteractiveSudoku 
              gameState={gameState}
              updateGameState={updateGameState}
              onComplete={(code) => {
                updateGameState({ sudokuCode: code });
                completeStage('sudoku', 'wächter');
              }}
            />
          )}
          
          {gameState.currentStage === 'wächter' && (
            <InteractiveWächter 
              gameState={gameState}
              onComplete={() => completeStage('wächter', 'permission-a')}
            />
          )}

          {gameState.currentStage === 'permission-a' && (
            <InteractivePermission 
              gameState={gameState}
              variant="A"
              onComplete={() => {
                updateGameState({ 
                  openedPackages: [...gameState.openedPackages, 'A'] 
                });
                completeStage('permission-a', 'reveal-a');
              }}
            />
          )}

          {gameState.currentStage === 'reveal-a' && (
            <InteractiveReveal 
              gameState={gameState}
              variant="A"
              onComplete={() => {
                updateGameState({ 
                  revealedGifts: [...gameState.revealedGifts, 'A'] 
                });
                completeStage('reveal-a', 'kreuzwort');
              }}
            />
          )}
          
          {gameState.currentStage === 'kreuzwort' && (
            <InteractiveKreuzwort 
              gameState={gameState}
              onComplete={() => completeStage('kreuzwort', 'permission-b')}
            />
          )}

          {gameState.currentStage === 'permission-b' && (
            <InteractivePermission 
              gameState={gameState}
              variant="B"
              onComplete={() => {
                updateGameState({ 
                  openedPackages: [...gameState.openedPackages, 'B'] 
                });
                completeStage('permission-b', 'reveal-b');
              }}
            />
          )}

          {gameState.currentStage === 'reveal-b' && (
            <InteractiveReveal 
              gameState={gameState}
              variant="B"
              onComplete={() => {
                updateGameState({ 
                  revealedGifts: [...gameState.revealedGifts, 'B'] 
                });
                completeStage('reveal-b', 'acrostic');
              }}
            />
          )}
          
          {gameState.currentStage === 'acrostic' && (
            <InteractiveAcrostic 
              gameState={gameState}
              onComplete={() => completeStage('acrostic', 'permission-c')}
            />
          )}

          {gameState.currentStage === 'permission-c' && (
            <InteractivePermission 
              gameState={gameState}
              variant="C"
              onComplete={() => {
                updateGameState({ 
                  openedPackages: [...gameState.openedPackages, 'C'] 
                });
                completeStage('permission-c', 'reveal-c');
              }}
            />
          )}

          {gameState.currentStage === 'reveal-c' && (
            <InteractiveReveal 
              gameState={gameState}
              variant="C"
              onComplete={() => {
                updateGameState({ 
                  revealedGifts: [...gameState.revealedGifts, 'C'] 
                });
                completeStage('reveal-c', 'romance');
              }}
            />
          )}

          {gameState.currentStage === 'romance' && (
            <InteractiveRomance 
              gameState={gameState}
              onComplete={() => completeStage('romance', 'permission-d')}
            />
          )}

          {gameState.currentStage === 'permission-d' && (
            <InteractivePermission 
              gameState={gameState}
              variant="D"
              onComplete={() => {
                updateGameState({ 
                  openedPackages: [...gameState.openedPackages, 'D'] 
                });
                completeStage('permission-d', 'reveal-d');
              }}
            />
          )}

          {gameState.currentStage === 'reveal-d' && (
            <InteractiveReveal 
              gameState={gameState}
              variant="D"
              onComplete={() => {
                updateGameState({ 
                  revealedGifts: [...gameState.revealedGifts, 'D'] 
                });
                completeStage('reveal-d', 'finale');
              }}
            />
          )}
          
          {gameState.currentStage === 'finale' && (
            <InteractiveFinalePuzzle 
              gameState={gameState}
              onComplete={() => completeStage('finale', 'permission-e')}
            />
          )}

          {gameState.currentStage === 'permission-e' && (
            <InteractivePermission 
              gameState={gameState}
              variant="E"
              onComplete={() => {
                updateGameState({ 
                  openedPackages: [...gameState.openedPackages, 'E'] 
                });
                completeStage('permission-e', 'reveal-e');
              }}
            />
          )}

          {gameState.currentStage === 'reveal-e' && (
            <InteractiveReveal 
              gameState={gameState}
              variant="E"
              onComplete={() => {
                updateGameState({ 
                  revealedGifts: [...gameState.revealedGifts, 'E'],
                  currentStage: 'completed'
                });
                completeStage('reveal-e');
              }}
            />
          )}
          
          {gameState.currentStage === 'completed' && (
            <motion.div 
              className="text-center p-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl shadow-2xl max-w-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
            >
              <Star className="w-16 h-16 mx-auto mb-4 text-white" />
              <h2 className="text-3xl font-['Jim_Nightshade'] text-white mb-4">
                🎉 Glückwunsch, {gameState.playerName}! 🎉
              </h2>
              <p className="text-white text-lg mb-6">
                Du hast alle Rätsel der Göttin von Hyrule gelöst und alle Geschenke freigeschaltet!
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  '🛡️ Zelda-Hüllen-Pack',
                  '✨ Anime-Sticker', 
                  '❄️ Kühlmaske', 
                  '💝 Wundertüte (Romance)', 
                  '🎮 Nintendo Switch Pro Controller'
                ].map((gift, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/20 p-3 rounded-lg text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {gift}
                  </motion.div>
                ))}
              </div>
              <button
                onClick={resetGame}
                className="bg-white text-orange-500 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Nochmal spielen
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Game Controls */}
        <motion.div 
          className="fixed bottom-4 right-4 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={resetGame}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reset
          </button>
        </motion.div>
      </div>
    </div>
  );
}