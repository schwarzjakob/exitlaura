import React, { useState } from 'react';
import { motion } from 'motion/react';
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/hintcards.webp";

interface HintCardProps {
  puzzleId: string;
  title: string;
  hintContent: React.ReactNode;
  className?: string;
}

const puzzleNames = {
  A: 'Rätsel der Namen',
  B: 'Netz der Symbole', 
  C: 'Stille der Maske',
  D: 'Pfad des Herzens',
  E: 'Kristall der Macht',
  F: 'Geweih des Nordens'
};

export function HintCard({ puzzleId, title, hintContent, className = "" }: HintCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(prev => !prev);
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 240);
  };

  const cardStyle = {
    width: 320,
    height: 460
  };

  return (
    <div 
      className={`relative cursor-pointer drop-shadow-xl ${className}`}
      style={cardStyle}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isPulsing ? 1.05 : 1
        }}
        transition={{ 
          rotateY: { duration: 0.8, ease: "easeInOut" },
          scale: { duration: 0.25, ease: "easeOut" }
        }}
        whileHover={{ scale: isPulsing ? 1.05 : 1.02 }}
        onClick={handleCardClick}
      >
        {/* Rückseite (Generische Hinweis-Karte) */}
        <motion.div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)"
          }}
        >
          <div
            className="bg-center bg-cover bg-no-repeat h-full w-full relative overflow-hidden"
            style={{ backgroundImage: `url('${imgBackground}')` }}
          >
            <div className="box-border content-stretch flex flex-col font-['Jim_Nightshade:Regular',_sans-serif] h-full items-center justify-between overflow-clip px-6 py-8 relative text-black text-center">
              <div className="relative shrink-0 text-[42px] leading-tight w-full">
                <p style={{ color: 'white', textShadow: `-1px -1px 0 black,1px -1px 0 black,-1px 1px 0 black,1px 1px 0 black` }}>Hinweis-Karte</p>
              </div>
              <div className="relative shrink-0 text-[120px] leading-none w-full">
                <p>{puzzleId}</p>
              </div>
              <div className="relative shrink-0 text-[16px] w-full">
                <p className="leading-tight italic text-gray-700" style={{ textShadow: `-1px -1px 0 white,1px -1px 0 white,-1px 1px 0 white,1px 1px 0 white` }}>
                  {puzzleNames[puzzleId]}
                </p>
              </div>

              {/* Klick-Hinweis */}
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[12px] text-gray-600 italic"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ textShadow: `-1px -1px 0 white,1px -1px 0 white,-1px 1px 0 white,1px 1px 0 white` }}
              >
                Klicken für Hinweis
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Vorderseite (Spezifische Hinweise) */}
        <motion.div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div
            className="bg-center bg-cover bg-no-repeat h-full w-full relative overflow-hidden"
            style={{ backgroundImage: `url('${imgComponent4}')` }}
          >
            <div className="h-full overflow-clip relative w-full">
              <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] inset-0 not-italic text-black px-6 py-6">
                {/* Titel */}
                <div className="text-center mb-4">
                  <h3 className="text-[22px] text-red-800 leading-tight mb-2">{title}</h3>
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B4513] to-transparent" />
                </div>

                {/* Hinweis-Content */}
                <div className="text-[15px] leading-[20px]">
                  {hintContent}
                </div>

                {/* Klick-Hinweis für Rückseite */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[12px] text-gray-600 italic text-center w-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Klicken für Rückseite
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
