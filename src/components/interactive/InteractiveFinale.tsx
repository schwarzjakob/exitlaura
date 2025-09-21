import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from '../ui/button';
import { BackgroundBox } from '../ui/BackgroundBox';
import { Gift, Star, Heart, Trophy, Crown } from 'lucide-react';
import type { GameState } from '../GameEngine';

interface InteractiveFinaleProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveFinale({ gameState, onComplete }: InteractiveFinaleProps) {
  const [currentPhase, setCurrentPhase] = useState<'story' | 'gifts' | 'celebration'>('story');
  const [readingProgress, setReadingProgress] = useState(0);
  const [unlockedGifts, setUnlockedGifts] = useState<string[]>([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const epilogParts = [
    `Tapfere ${gameState.playerName},`,
    "",
    "du hast alle Prüfungen gemeistert",
    "und die Siegel gebrochen.",
    "",
    "Das Reich der Kästchen gab dir Zahlen,",
    "die Wächter öffneten dir Tore,",
    "das Wissen der Helden führte dich weiter,",
    "und die bunten Sticker verrieten dir",
    "das letzte Geheimnis.",
    "",
    "Nun, da alle Pfade beschritten sind,",
    "überreiche ich dir meine Schätze:",
    "",
    "Die Geschenke einer Göttin!"
  ];

  const gameGifts = [
    { id: 'controller', name: 'Nintendo Controller', emoji: '🎮', description: 'Für epische Gaming-Sessions' },
    { id: 'zelda', name: 'Zelda-Hüllen', emoji: '🏰', description: 'Hüter der Hyrule-Geschichten' },
    { id: 'sticker', name: 'Anime-Sticker', emoji: '🌟', description: 'Magische Anime-Sammlung' },
    { id: 'kuehl', name: 'Kühlmaske', emoji: '❄️', description: 'Erfrischung für müde Augen' },
    { id: 'wunder', name: 'Wundertüte', emoji: '🎁', description: 'Das finale Geheimnis der Göttin' }
  ];

  const handleContinueReading = () => {
    if (readingProgress < epilogParts.length - 1) {
      setReadingProgress(prev => prev + 1);
    } else {
      setCurrentPhase('gifts');
    }
  };

  const unlockGift = (giftId: string) => {
    if (!unlockedGifts.includes(giftId)) {
      setUnlockedGifts(prev => [...prev, giftId]);
      const gift = gameGifts.find(g => g.id === giftId);
      toast.success(`🎁 ${gift?.name} freigeschaltet!`, {
        description: gift?.description
      });

      if (unlockedGifts.length + 1 === gameGifts.length) {
        setTimeout(() => setCurrentPhase('celebration'), 1000);
      }
    }
  };

  const unlockAllGifts = () => {
    gameGifts.forEach((gift, index) => {
      setTimeout(() => unlockGift(gift.id), index * 500);
    });
  };

  const completeFinal = () => {
    setShowFinalMessage(true);
    toast.success('🎉 Die Göttin ist zufrieden! Ihre Mission ist erfüllt!');
    setTimeout(() => onComplete(), 3000);
  };

  useEffect(() => {
    if (currentPhase === 'celebration') {
      setTimeout(() => setShowFinalMessage(true), 1000);
    }
  }, [currentPhase]);

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {currentPhase === 'story' && (
          <motion.div 
            key="story"
            className="h-[600px] w-[700px] mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BackgroundBox backgroundImage={imgComponent4}>
              <motion.div
                className="h-[600px] overflow-auto p-8 [text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] font-['Jim_Nightshade:Regular',_sans-serif] leading-[24px] text-[16px] text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div className="text-center mb-6">
                  <h2 className="text-[32px] text-red-800 mb-4">
                    ✦ Epilog der Göttin ✦
                  </h2>
                </motion.div>
                
                <div className="space-y-4">
                  {epilogParts.slice(0, readingProgress + 3).map((part, index) => (
                    <motion.p
                      key={index}
                      className={part === "" ? "h-4" : "mb-2"}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {part}
                    </motion.p>
                  ))}
                </div>

                {readingProgress < epilogParts.length - 3 && (
                  <motion.div 
                    className="text-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={handleContinueReading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-['Jim_Nightshade'] text-[18px]"
                    >
                      Weiterlesen...
                    </Button>
                  </motion.div>
                )}

                {readingProgress >= epilogParts.length - 3 && (
                  <motion.div 
                    className="text-center mt-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <Button
                      onClick={() => setCurrentPhase('gifts')}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-['Jim_Nightshade'] text-[20px] shadow-lg"
                    >
                      🎁 Die Geschenke enthüllen 🎁
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </BackgroundBox>
          </motion.div>
        )}

        {currentPhase === 'gifts' && (
          <motion.div 
            key="gifts"
            className="h-[700px] w-[900px] mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BackgroundBox backgroundImage={imgComponent4}>
              <motion.div
                className="h-[700px] overflow-clip flex flex-col items-center justify-center p-6 font-['Jim_Nightshade:Regular',_sans-serif] text-center w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-[28px] text-red-800 mb-6">Die Schätze der Göttin</h2>
                
                <div className="text-[14px] text-black mb-8 max-w-2xl mx-auto">
                  <p>Klicke auf jedes Geschenk, um es freizuschalten!</p>
                  <p>Du hast dir alle diese Schätze durch deine Weisheit verdient.</p>
                </div>

                {/* Geschenke Grid */}
                <div className="grid grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
                  {gameGifts.map((gift, index) => {
                    const isUnlocked = unlockedGifts.includes(gift.id);
                    
                    return (
                      <motion.button
                        key={gift.id}
                        onClick={() => unlockGift(gift.id)}
                        className={`
                          p-6 rounded-xl border-2 transition-all duration-300 relative overflow-hidden
                          ${isUnlocked 
                            ? 'bg-gradient-to-br from-yellow-200 to-yellow-400 border-yellow-600 scale-105' 
                            : 'bg-white/80 border-gray-400 hover:border-blue-500 hover:scale-105'
                          }
                        `}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        disabled={isUnlocked}
                      >
                        {/* Geschenk Icon */}
                        <motion.div 
                          className="text-6xl mb-4"
                          animate={isUnlocked ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                          transition={{ duration: 0.8 }}
                        >
                          {gift.emoji}
                        </motion.div>
                        
                        {/* Geschenk Name */}
                        <h3 className="text-[16px] font-bold text-black mb-2">
                          {gift.name}
                        </h3>
                        
                        {/* Beschreibung */}
                        <p className="text-[12px] text-gray-700">
                          {gift.description}
                        </p>

                        {/* Freischalt-Effekt */}
                        {isUnlocked && (
                          <motion.div
                            className="absolute inset-0 bg-yellow-300/30 rounded-xl flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1 }}
                          >
                            <Star className="w-12 h-12 text-yellow-600" />
                          </motion.div>
                        )}

                        {/* Status */}
                        <div className="absolute top-2 right-2">
                          {isUnlocked ? (
                            <Trophy className="w-6 h-6 text-yellow-600" />
                          ) : (
                            <Gift className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Fortschritt */}
                <div className="bg-white/80 p-4 rounded-lg mb-6 max-w-md mx-auto">
                  <p className="text-[14px] text-black mb-2">
                    Fortschritt: {unlockedGifts.length} / {gameGifts.length}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(unlockedGifts.length / gameGifts.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={unlockAllGifts}
                    variant="outline"
                    className="px-4 py-2 text-sm"
                  >
                    Alle freischalten
                  </Button>
                  
                  {unlockedGifts.length === gameGifts.length && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        onClick={completeFinal}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-['Jim_Nightshade'] text-[18px]"
                      >
                        ✨ Mission vollenden ✨
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </BackgroundBox>
          </motion.div>
        )}

        {currentPhase === 'celebration' && (
          <motion.div 
            key="celebration"
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <BackgroundBox backgroundImage={imgComponent4}>
              <div className="text-center p-8">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(255,255,0,0.3)",
                  "0 0 40px rgba(255,0,255,0.3)",
                  "0 0 20px rgba(128,0,255,0.3)",
                  "0 0 20px rgba(255,255,0,0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-6"
              >
                <Crown className="w-full h-full text-yellow-300" />
              </motion.div>
              
              <h2 className="text-4xl font-['Jim_Nightshade'] mb-4">
                🎉 Glückwunsch! 🎉
              </h2>
              
              <p className="text-xl mb-6">
                Du hast alle Rätsel der Göttin von Hyrule gemeistert!
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {gameGifts.map((gift, index) => (
                  <motion.div
                    key={gift.id}
                    className="bg-white/20 p-3 rounded-lg flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <span className="text-2xl">{gift.emoji}</span>
                    <span className="text-sm">{gift.name}</span>
                  </motion.div>
                ))}
              </div>

              {showFinalMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/20 p-4 rounded-lg mb-6"
                >
                  <Heart className="w-8 h-8 mx-auto mb-2 text-pink-300" />
                  <p className="text-lg italic">
                    "Mögen deine Abenteuer niemals enden,<br />
                    deine Reise niemals zu Ende sein."
                  </p>
                  <p className="text-sm mt-2 text-yellow-200">
                    - Die Göttin von Hyrule
                  </p>
                </motion.div>
              )}
            </motion.div>
              </div>
            </BackgroundBox>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feuerwerk-Effekt */}
      {currentPhase === 'celebration' && (
        <motion.div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -100, -200]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}