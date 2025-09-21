import { motion } from 'motion/react';
import React from 'react';

interface PuzzleStageLayoutProps {
  card: React.ReactNode;
  children: React.ReactNode;
}

export function PuzzleStageLayout({ card, children }: PuzzleStageLayoutProps) {
  return (
    <div className="flex flex-row gap-6 lg:gap-8 items-start justify-center w-full max-w-7xl mx-auto px-4">
      {/* Card Section - Left Side */}
      <div className="w-[380px] flex justify-start shrink-0">

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-[24px] border-[12px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-white overflow-hidden">
            {card}
          </div>
        </motion.div>
      </div>

      {/* Game Content Section - Right Side */}
      <motion.div
        className="flex-1 min-w-0" 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="relative w-full min-h-[640px] rounded-[24px] border-[3px] border-white/80 bg-white/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(236,72,153,0.25)] overflow-hidden">
          {/* Enhanced background with better contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-white/90 to-rose-50/70" />

          {/* Gaming accent elements */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-pink-500/80 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-pink-500/80 to-transparent" />

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-[3px] border-t-[3px] border-pink-400/60 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-[3px] border-t-[3px] border-pink-400/60 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-[3px] border-b-[3px] border-pink-400/60 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-[3px] border-b-[3px] border-pink-400/60 rounded-br-lg" />

          <div className="relative h-full w-full p-6 lg:p-8 xl:p-10 flex flex-col">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
