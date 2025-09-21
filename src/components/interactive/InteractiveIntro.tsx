import { useState } from 'react';
import { motion } from 'motion/react';
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from '../ui/button';
import type { GameState } from '../GameEngine';

interface InteractiveIntroProps {
  gameState: GameState;
  onComplete: () => void;
}

export function InteractiveIntro({ gameState, onComplete }: InteractiveIntroProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Story in größeren Abschnitten für besseres Lesen
  const storyParagraphs = [
    {
      title: "Die Legende beginnt",
      text: "Einst lebte in den weiten Landen von Hyrule eine mächtige Göttin, die über Weisheit, Mut und Kraft gebot. Als sie spürte, dass ihre Zeit in dieser Welt sich dem Ende zuneigte, verbarg sie ihre wertvollsten Schätze an geheimen Orten."
    },
    {
      title: "Die Weisheit der Göttin",
      text: "Doch die Göttin war weise und wusste: Nur jemand mit reinem Herzen und scharfem Verstand sollte diese Geschenke finden dürfen. So webte sie mächtige Rätsel um jeden Schatz und versiegelte sie mit ihrer göttlichen Macht."
    },
    {
      title: "Die Botschaft für dich",
      text: `"${gameState.playerName}, tapfere Seele, wenn du diese Worte liest, dann bist du bereit für die Prüfungen. Löse meine Rätsel, eine nach der anderen, und die Schätze werden dir offenbart."`
    },
    {
      title: "Die Warnung",
      text: "Doch sei gewarnt: Nur Geduld und Weisheit führen dich zum Ziel. Jedes Rätsel birgt Geheimnisse, jede Prüfung testet deinen Verstand. Bist du bereit, die Reise zu beginnen und dich als würdig zu erweisen?"
    }
  ];

  const handleContinueReading = () => {
    if (readingProgress < storyParagraphs.length - 1) {
      setReadingProgress(prev => prev + 1);
    } else {
      setShowButton(true);
    }
  };

  const handleStartAdventure = () => {
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Pergamentrolle-Design */}
      <motion.div 
        className="relative mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Pergamentrolle-Container */}
        <div className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 rounded-3xl shadow-2xl border-8 border-amber-900/20 max-w-3xl mx-auto overflow-hidden">
          {/* Oberer Rollenstab */}
          <div className="h-8 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-600 to-amber-800"></div>
            <div className="absolute top-1 left-4 right-4 h-2 bg-amber-900/30 rounded-full"></div>
            <div className="absolute top-1 left-4 right-4 h-1 bg-amber-600/50 rounded-full"></div>
          </div>
          
          {/* Pergament-Inhalt */}
          <div className="px-12 py-8 min-h-[600px] relative">
            {/* Pergament-Textur-Overlay */}
            <div 
              className="absolute inset-0 opacity-10 mix-blend-multiply"
              style={{ backgroundImage: `url('${imgComponent4}')` }}
            />
            
            <motion.div 
              className="relative z-10 [text-shadow:rgba(0,0,0,0.25)_0px_2px_4px] font-['Jim_Nightshade:Regular',_sans-serif] text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Titel */}
              <motion.div className="text-center mb-8">
                <h1 className="text-5xl text-red-800 mb-2 drop-shadow-lg">
                  📜 Die Legende der Göttin 📜
                </h1>
                <div className="w-32 h-1 bg-red-800 mx-auto rounded-full opacity-60"></div>
              </motion.div>
              
              {/* Story-Inhalt */}
              <div className="space-y-8 text-center max-w-2xl mx-auto">
                {storyParagraphs.slice(0, readingProgress + 1).map((paragraph, index) => (
                  <motion.div
                    key={index}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3, duration: 0.6 }}
                  >
                    <h3 className="text-2xl text-amber-800 mb-4 italic">
                      {paragraph.title}
                    </h3>
                    <p className="text-xl leading-relaxed text-gray-800">
                      {paragraph.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Weiterlesen Button */}
              {readingProgress < storyParagraphs.length - 1 && !showButton && (
                <motion.div 
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    onClick={handleContinueReading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-['Jim_Nightshade'] text-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    📖 Weiterlesen...
                  </Button>
                </motion.div>
              )}

              {/* Start-Adventure Button */}
              {(readingProgress >= storyParagraphs.length - 1 || showButton) && (
                <motion.div 
                  className="text-center mt-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", duration: 0.8 }}
                >
                  <motion.div
                    className="p-6 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 rounded-2xl mb-6 border-2 border-yellow-600/50 shadow-inner"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-2xl text-red-700 font-bold">
                      ⚡ Die Rätsel erwarten dich! ⚡
                    </p>
                    <p className="text-lg text-amber-800 mt-2">
                      Bist du bereit, dein Schicksal zu erfüllen?
                    </p>
                  </motion.div>
                  
                  <Button
                    onClick={handleStartAdventure}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-12 py-4 rounded-xl font-['Jim_Nightshade'] text-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    🗡️ Das Abenteuer beginnen! 🗡️
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Unterer Rollenstab */}
          <div className="h-8 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-600 to-amber-800"></div>
            <div className="absolute bottom-1 left-4 right-4 h-2 bg-amber-900/30 rounded-full"></div>
            <div className="absolute bottom-1 left-4 right-4 h-1 bg-amber-600/50 rounded-full"></div>
          </div>

          {/* Seitliche Pergament-Schatten */}
          <div className="absolute top-8 bottom-8 -left-2 w-4 bg-gradient-to-r from-amber-700/20 to-transparent rounded-l-lg"></div>
          <div className="absolute top-8 bottom-8 -right-2 w-4 bg-gradient-to-l from-amber-700/20 to-transparent rounded-r-lg"></div>
        </div>

        {/* Pergament-Schatten */}
        <div className="absolute inset-0 bg-amber-900/10 rounded-3xl transform translate-x-1 translate-y-1 -z-10"></div>
        <div className="absolute inset-0 bg-amber-900/5 rounded-3xl transform translate-x-2 translate-y-2 -z-20"></div>
      </motion.div>

      {/* Atmosphärische Effekte */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full opacity-60"
            initial={{ 
              x: Math.random() * 800, 
              y: 800,
              scale: 0 
            }}
            animate={{ 
              y: -100,
              scale: [0, 1, 0],
              rotate: 360
            }}
            transition={{ 
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}