import { useState } from 'react';
import { motion } from 'motion/react';
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import imgBackground from "figma:asset/dcefe1de85a1f7e1e77f6f4f86686fc1468ca321.png";

interface FlippableRatselCardProps {
  puzzleId: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  title: string;
  content: React.ReactNode;
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

export function FlippableRatselCard({ puzzleId, title, content, className = "" }: FlippableRatselCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`relative w-[203px] h-[288px] cursor-pointer ${className}`}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Rückseite (Generische Rätselkarte) */}
        <motion.div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)"
          }}
        >
          <div 
            className="bg-center bg-cover bg-no-repeat h-[288px] rounded-[10px] w-[203px] relative" 
            style={{ backgroundImage: `url('${imgBackground}')` }}
          >
            <div className="box-border content-stretch flex flex-col font-['Jim_Nightshade:Regular',_sans-serif] h-[288px] items-center justify-between leading-[0] not-italic overflow-clip px-[18px] py-[20px] relative text-black text-center w-[203px]">
              <div className="relative shrink-0 text-[36px] w-full">
                <p className="leading-[40px] mb-2">Rätsel-Karte</p>
              </div>
              <div className="relative shrink-0 text-[72px] w-full">
                <p className="leading-[60px] mb-2">{puzzleId}</p>
              </div>
              <div className="relative shrink-0 text-[12px] w-full">
                <p className="leading-[14px] italic text-gray-700">
                  {puzzleNames[puzzleId]}
                </p>
              </div>
              
              {/* Klick-Hinweis */}
              <motion.div 
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-500 italic"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Klicken zum Umdrehen
              </motion.div>
            </div>
            <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
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
            className="bg-center bg-cover bg-no-repeat h-[288px] rounded-[10px] w-[203px] relative" 
            style={{ backgroundImage: `url('${imgComponent4}')` }}
          >
            <div className="h-[288px] overflow-clip relative w-[203px]">
              <div className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] absolute font-['Jim_Nightshade:Regular',_sans-serif] h-[260px] leading-[18px] left-[11px] not-italic text-[13px] text-black top-[14px] w-[181px]">
                {/* Titel */}
                <div className="text-center mb-3">
                  <h3 className="text-[16px] text-red-800 leading-[18px] mb-1">{title}</h3>
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B4513] to-transparent mb-2"></div>
                </div>
                
                {/* Content */}
                <div className="text-[12px] leading-[16px]">
                  {content}
                </div>
                
                {/* Klick-Hinweis für Rückseite */}
                <motion.div 
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[9px] text-gray-600 italic text-center w-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Klicken für Rückseite
                </motion.div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_8px_0px_#9db3ce]" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}