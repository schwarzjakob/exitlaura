import React, { useState, useEffect } from 'react';
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
import { InteractiveElch } from './interactive/InteractiveElch';
import { InteractivePermission } from './interactive/InteractivePermission';
import { InteractiveReveal } from './interactive/InteractiveReveal';

export type GameStage = 
  | 'intro' 
  | 'sudoku' | 'wächter' | 'permission-a' | 'reveal-a'
  | 'kreuzwort' | 'permission-b' | 'reveal-b'
  | 'acrostic' | 'permission-c' | 'reveal-c'
  | 'romance' | 'permission-d' | 'reveal-d'
  | 'finale' | 'permission-e' | 'reveal-e'
  | 'elch' | 'permission-f' | 'reveal-f'
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
  sudoku: 'Rätsel A: Die Zahlenarchive',
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
  elch: 'Rätsel F: Geweih des Nordens',
  'permission-f': 'Erlaubnis: Päckchen F',
  'reveal-f': 'Geschenk F: Elch-Gefährte',
  completed: 'Spiel abgeschlossen'
};

const getStageDescription = (currentStage: GameStage, completedStages: GameStage[]) => {
  const isCompleted = (stage: GameStage) => completedStages.includes(stage);

  switch (currentStage) {
    case 'sudoku':
      return '🔢 Laura betritt die heiligen Archive der Göttin. Zwischen staubigen Regalen alter Bücher verbirgt sich ein Gitter aus Symbolen, das nur mit klarem Kopf gelöst werden kann. Jede Zahl ist ein Schlüssel, jede Zeile ein Pfad – dies ist ihre erste Prüfung auf dem Weg zur Weisheit.';

    case 'wächter':
      if (isCompleted('sudoku')) {
        return '⚔️ Mit dem Code der Zahlen in der Hand nähert sich Laura der ersten Kammer. Doch vor dem Eingang erheben sich uralte Statuen, die plötzlich zum Leben erwachen. "Du hast Weisheit bewiesen", sprechen sie im Einklang, "doch besitzt du auch die Entschlossenheit eines wahren Wächters?"';
      }
      return '⚔️ Drei mächtige Wächter versperren Laura den Weg. Ihre steinernen Gesichter erwachen zum Leben, bereit, ihre Entschlossenheit zu prüfen.';

    case 'kreuzwort':
      if (isCompleted('wächter')) {
        return '🔗 Die Wächter haben Laura als würdig befunden und ihr den Weg zur Kreuzung der Legenden gewiesen. Hier steht ein Monument voller leerer Felder – jede Lücke sehnt sich nach dem Namen einer Geschichte aus Hyrules Vergangenheit. Nur wer die Verbindungen erkennt, wird das Triforce erwecken.';
      }
      return '🔗 An einer mystischen Kreuzung wartet ein Monument mit leeren Feldern. Die Legenden von Hyrule wollen erzählt werden.';

    case 'acrostic':
      if (isCompleted('kreuzwort')) {
        return '🎭 Das Triforce hat geleuchtet und Laura den Weg zum Tempel der Stille gewiesen. In diesen heiligen Hallen, wo einst die Göttin selbst meditierte, herrscht vollkommene Ruhe. Drei Kammern – Nordpfad, Waldlichtung und Eishöhle – bergen ein uraltes Geheimnis: die Maske der Göttin selbst.';
      }
      return '🎭 Laura betritt den Tempel der Reflexion. In der Stille dieser heiligen Hallen liegt ein mächtiges Artefakt verborgen.';

    case 'romance':
      if (isCompleted('acrostic')) {
        return '💖 Die Maske der Göttin in ihren Händen, spürt Laura eine neue Macht in sich erwachen. Sie folgt einem warmen Licht zu einem schimmernden Garten, wo Herzen wie funkelnde Sterne schweben. Jedes trägt eine Erinnerung an Verbindungen und Liebe in sich – doch nur der richtige Pfad offenbart die größte Macht von allen.';
      }
      return '💖 Laura betritt einen Garten voller leuchtender Herzen. Jedes pulsiert mit Erinnerungen an Liebe und Verbindung.';

    case 'finale':
      const completedCount = ['sudoku', 'kreuzwort', 'acrostic', 'romance'].filter(stage => isCompleted(stage as GameStage)).length;
      if (completedCount >= 4) {
        return '💎 Laura hat die vier großen Prüfungen gemeistert: Die Weisheit der Zahlen, die Verbindungen der Legenden, die Stille der Reflexion und die Macht der Herzen. Nun schweben die Fragmente ihrer Reise vor ihr – Schild, Symbol, Maske und Herz – und warten darauf, zum finalen Kristall der Macht vereint zu werden.';
      }
      return '💎 Die Zeit ist gekommen, alle Fragmente von Lauras Reise zu vereinen. Vier Kristalle schweben vor ihr und warten auf ihre finale Prüfung.';

    case 'elch':
      if (isCompleted('finale')) {
        return '🦌 Der Kristall der Macht leuchtet in Lauras Händen und führt sie zum geheimen Hain des Nordens. Hier, am Ende ihrer Verwandlung, wartet die letzte Entscheidung: Fünf edle Tiere bieten sich als ewige Begleiter an. Doch nur einer trägt die Krone des Waldes und wird Laura auf ihrem Weg als Wächterin zur Seite stehen.';
      }
      return '🦌 Laura erreicht den mystischen Hain des Nordens. Fünf edle Tiere warten darauf, ihr ewiger Begleiter zu werden.';

    default:
      return '';
  }
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
      'finale', 'permission-e', 'reveal-e',
      'elch', 'permission-f', 'reveal-f'
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
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-rose-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating gaming elements */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20 text-2xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              rotate: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              rotate: [0, 360],
              y: [null, -50]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          >
            {['⚡', '💎', '🎮', '✨', '🏆', '⭐'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      {/* Gaming grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
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
          <h1 className="text-4xl md:text-6xl font-['Jim_Nightshade'] text-pink-100 mb-4 drop-shadow-2xl">
            Hyrule Geschenkbox
          </h1>
          <p className="text-xl text-pink-200 mb-6">
            Ein magisches Exit-Spiel für {gameState.playerName}
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-pink-500/30">
            <div className="flex justify-between items-center">
              {[
                { stage: 'intro', name: 'Intro' },
                { stage: 'sudoku', name: 'Rätsel A' },
                { stage: 'kreuzwort', name: 'Rätsel B' },
                { stage: 'acrostic', name: 'Rätsel C' },
                { stage: 'romance', name: 'Rätsel D' },
                { stage: 'finale', name: 'Rätsel E' },
                { stage: 'elch', name: 'Rätsel F' }
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
                    whileHover={accessible ? { scale: 1.15, y: -2 } : {}}
                    whileTap={accessible ? { scale: 0.95 } : {}}
                    onClick={() => accessible && setGameState(prev => ({ ...prev, currentStage: stage as GameStage }))}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 border-2 ${
                      completed ? 'bg-gradient-to-br from-green-400 to-green-600 text-white border-green-300 shadow-lg shadow-green-500/30' :
                      current ? 'bg-gradient-to-br from-pink-400 to-pink-600 text-white border-pink-300 animate-pulse shadow-lg shadow-pink-500/50' :
                      accessible ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white border-blue-300 shadow-lg shadow-blue-500/30' :
                      'bg-gray-700 text-gray-400 border-gray-600'
                    }`}>
                      {completed ? <CheckCircle className="w-5 h-5" /> :
                       accessible ? <span className="text-sm font-bold">{index + 1}</span> :
                       <Lock className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs text-center font-medium ${
                      accessible ? 'text-pink-100' : 'text-gray-500'
                    }`}>
                      {name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Current Stage Title */}
          <motion.div
            className="text-center max-w-4xl mx-auto"
            key={gameState.currentStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-['Jim_Nightshade'] text-pink-200/90 mb-3">
              {stageNames[gameState.currentStage]}
            </h2>
            {getStageDescription(gameState.currentStage, gameState.completedStages) && (
              <motion.p
                className="text-pink-100/80 text-sm leading-relaxed italic max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {getStageDescription(gameState.currentStage, gameState.completedStages)}
              </motion.p>
            )}
          </motion.div>
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
                  revealedGifts: [...gameState.revealedGifts, 'E']
                });
                completeStage('reveal-e', 'elch');
              }}
            />
          )}

          {gameState.currentStage === 'elch' && (
            <InteractiveElch 
              gameState={gameState}
              onComplete={() => completeStage('elch', 'permission-f')}
            />
          )}

          {gameState.currentStage === 'permission-f' && (
            <InteractivePermission 
              gameState={gameState}
              variant="F"
              onComplete={() => {
                updateGameState({ 
                  openedPackages: [...gameState.openedPackages, 'F'] 
                });
                completeStage('permission-f', 'reveal-f');
              }}
            />
          )}

          {gameState.currentStage === 'reveal-f' && (
            <InteractiveReveal 
              gameState={gameState}
              variant="F"
              onComplete={() => {
                updateGameState({ 
                  revealedGifts: [...gameState.revealedGifts, 'F']
                });
                completeStage('reveal-f', 'completed');
              }}
            />
          )}
          
          {gameState.currentStage === 'completed' && (
            <motion.div
              className="text-center p-8 bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 rounded-3xl shadow-2xl max-w-2xl border-2 border-pink-300/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
            >
              <motion.div
                className="relative mb-6"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-16 h-16 mx-auto text-yellow-300 drop-shadow-lg" />
                <div className="absolute inset-0 w-16 h-16 mx-auto bg-yellow-300/20 rounded-full animate-ping" />
              </motion.div>
              <h2 className="text-3xl font-['Jim_Nightshade'] text-white mb-4 drop-shadow-lg">
                🎉 Glückwunsch, {gameState.playerName}! 🎉
              </h2>
              <p className="text-pink-100 text-lg mb-6">
                Du hast alle Rätsel der Göttin von Hyrule gelöst und alle Geschenke freigeschaltet!
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  '🛡️ Zelda-Hüllen-Pack',
                  '✨ Anime-Sticker',
                  '❄️ Kühlmaske',
                  '💝 Wundertüte (Romance)',
                  '🎮 Nintendo Switch Controller',
                  '🦌 Elch-Gefährte aus dem Norden'
                ].map((gift, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-white border border-white/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {gift}
                  </motion.div>
                ))}
              </div>
              <motion.button
                onClick={resetGame}
                className="bg-white text-pink-600 px-8 py-3 rounded-full hover:bg-pink-50 transition-colors font-semibold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nochmal spielen
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Game Controls */}
        <motion.div
          className="fixed bottom-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={resetGame}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-3 rounded-xl transition-all font-semibold shadow-lg border border-red-400/50"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Reset
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
