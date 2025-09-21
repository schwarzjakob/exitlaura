import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import imgComponent4 from "figma:asset/4f048a806263f8bb83388f2709782db27449187b.png";
import { Button } from '../ui/button';
import type { GameState } from '../GameEngine';

interface InteractiveStickerProps {
  gameState: GameState;
  onComplete: (message: string) => void;
}

export function InteractiveSticker({ onComplete }: InteractiveStickerProps) {
  const [selectedStickers, setSelectedStickers] = useState<number[]>([]);
  const [revealedMessage, setRevealedMessage] = useState<string>('');
  const [showAllStickers, setShowAllStickers] = useState(false);

  // Anime-Sticker Rätsel-Daten
  const stickerData = [
    { id: 1, emoji: '🦸', anime: 'My Hero Academia', position: 1, letter: 'Ö' },
    { id: 2, emoji: '🗡️', anime: 'Attack on Titan', position: 2, letter: 'F' },
    { id: 3, emoji: '👑', anime: 'Zelda Series', position: 3, letter: 'F' },
    { id: 4, emoji: '🌟', anime: 'Sailor Moon', position: 4, letter: 'N' },
    { id: 5, emoji: '⚡', anime: 'Pokemon', position: 5, letter: 'E' },
    { id: 6, emoji: '🔥', anime: 'Demon Slayer', position: 6, letter: ' ' },
    { id: 7, emoji: '🌸', anime: 'Cardcaptor Sakura', position: 7, letter: 'D' },
    { id: 8, emoji: '❄️', anime: 'Frozen/Elsa', position: 8, letter: 'A' },
    { id: 9, emoji: '🌙', anime: 'Sailor Moon', position: 9, letter: 'S' },
    { id: 10, emoji: '🎭', anime: 'Persona', position: 10, letter: ' ' },
    { id: 11, emoji: '🏔️', anime: 'Attack on Titan', position: 11, letter: 'K' },
    { id: 12, emoji: '🗝️', anime: 'Kingdom Hearts', position: 12, letter: 'Ü' },
    { id: 13, emoji: '🎯', anime: 'Hunter x Hunter', position: 13, letter: 'H' },
    { id: 14, emoji: '🌈', anime: 'Pretty Cure', position: 14, letter: 'L' },
    { id: 15, emoji: '💎', anime: 'Steven Universe', position: 15, letter: 'R' },
    { id: 16, emoji: '🌺', anime: 'Moana', position: 16, letter: 'E' },
    { id: 17, emoji: '🎪', anime: 'Circus Theme', position: 17, letter: 'I' },
    { id: 18, emoji: '🔮', anime: 'Magic Girl', position: 18, letter: 'C' },
    { id: 19, emoji: '🦋', anime: 'Butterfly Theme', position: 19, letter: 'H' }
  ];

  const solution = "ÖFFNE DAS KÜHLREICH";

  const handleStickerClick = (sticker: typeof stickerData[0]) => {
    if (selectedStickers.includes(sticker.id)) {
      // Entfernen
      setSelectedStickers(prev => prev.filter(id => id !== sticker.id));
    } else {
      // Hinzufügen
      setSelectedStickers(prev => [...prev, sticker.id]);
    }
  };

  const updateMessage = () => {
    const sortedPositions = selectedStickers
      .map(id => stickerData.find(s => s.id === id)!)
      .sort((a, b) => a.position - b.position)
      .map(s => s.letter)
      .join('');
    
    setRevealedMessage(sortedPositions);
    
    if (sortedPositions === solution) {
      toast.success('🎉 Perfekt! Du hast die richtige Nachricht entschlüsselt!');
      setTimeout(() => onComplete(sortedPositions), 1500);
    } else if (sortedPositions.length > 0) {
      toast.info(`Aktueller Text: "${sortedPositions}"`);
    }
  };

  const autoSolve = () => {
    const correctIds = stickerData.map(s => s.id);
    setSelectedStickers(correctIds);
    setRevealedMessage(solution);
    toast.success('🎉 Alle Sticker wurden richtig sortiert!');
    setTimeout(() => onComplete(solution), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="bg-center bg-cover bg-no-repeat h-[700px] w-[1100px] rounded-[15px] mx-auto relative" 
        style={{ backgroundImage: `url('${imgComponent4}')` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-[700px] overflow-auto relative w-[1100px] flex flex-col items-center justify-start p-6">
          <motion.div 
            className="font-['Jim_Nightshade:Regular',_sans-serif] text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-[28px] text-red-800 mb-4">Sticker der Anime-Welten</h2>
            
            <div className="text-[14px] text-black mb-6 max-w-3xl mx-auto">
              <p>Das Triforce hat dir den Weg bereitet. Nun wartet eine andere Art der Magie.</p>
              <p>Klicke auf die Sticker in der richtigen Reihenfolge, um die geheime Nachricht zu enthüllen!</p>
            </div>

            <div className="flex gap-6 justify-center">
              {/* Sticker-Sammlung */}
              <div className="bg-white/90 p-4 rounded-lg shadow-inner max-w-2xl">
                <h3 className="text-[16px] text-black mb-4 font-bold">Anime-Sticker sammeln:</h3>
                
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {stickerData.map((sticker) => {
                    const isSelected = selectedStickers.includes(sticker.id);
                    const selectionOrder = selectedStickers.indexOf(sticker.id) + 1;
                    
                    return (
                      <motion.button
                        key={sticker.id}
                        onClick={() => handleStickerClick(sticker)}
                        className={`
                          w-16 h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer 
                          border-2 transition-all relative group
                          ${isSelected 
                            ? 'bg-yellow-200 border-yellow-600 scale-110' 
                            : 'bg-white border-gray-300 hover:border-blue-500 hover:shadow-md'
                          }
                        `}
                        whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={`${sticker.anime} - Position ${sticker.position}`}
                      >
                        {/* Emoji */}
                        <div className="text-2xl mb-1">
                          {sticker.emoji}
                        </div>
                        
                        {/* Position */}
                        <div className="text-[8px] text-gray-600">
                          {sticker.position}
                        </div>
                        
                        {/* Auswahlreihenfolge */}
                        {isSelected && (
                          <motion.div
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            {selectionOrder}
                          </motion.div>
                        )}
                        
                        {/* Versteckter Buchstabe (Tooltip) */}
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-200 border border-yellow-600 px-2 py-1 rounded text-[10px] font-bold text-red-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {sticker.letter}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-2 mb-4">
                  <Button
                    onClick={updateMessage}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm h-8"
                  >
                    Nachricht aktualisieren
                  </Button>
                  <Button
                    onClick={() => setSelectedStickers([])}
                    variant="outline"
                    className="flex-1 text-sm h-8"
                  >
                    Auswahl löschen
                  </Button>
                </div>

                <Button
                  onClick={() => setShowAllStickers(!showAllStickers)}
                  variant="outline"
                  className="w-full text-xs h-8 mb-2"
                >
                  {showAllStickers ? 'Details verstecken' : 'Alle Sticker anzeigen'}
                </Button>

                {showAllStickers && (
                  <motion.div 
                    className="bg-gray-50 p-3 rounded text-[10px] space-y-1 max-h-32 overflow-y-auto"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    {stickerData.map(sticker => (
                      <div key={sticker.id} className="flex justify-between">
                        <span>{sticker.emoji} {sticker.anime}</span>
                        <span>Pos: {sticker.position} → {sticker.letter}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Nachricht-Anzeige */}
              <div className="bg-white/90 p-4 rounded-lg shadow-inner min-w-80">
                <h3 className="text-[16px] text-black mb-4 font-bold">Enthüllte Nachricht:</h3>
                
                <div className="bg-yellow-100 p-4 rounded-lg mb-4 min-h-20 flex items-center justify-center">
                  <motion.div 
                    className="text-xl font-bold text-red-800 text-center"
                    key={revealedMessage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {revealedMessage || 'Wähle Sticker aus...'}
                  </motion.div>
                </div>

                <div className="space-y-2 text-[12px] text-gray-600">
                  <p>Ausgewählte Sticker: {selectedStickers.length}</p>
                  <p>Ziel: "{solution}"</p>
                  
                  <div className="mt-4">
                    <Button
                      onClick={autoSolve}
                      variant="outline"
                      className="w-full text-xs h-8"
                    >
                      Auto-Lösung (für Tests)
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {revealedMessage === solution && (
                    <motion.div
                      className="mt-4 p-3 bg-green-200 rounded-lg border-2 border-green-600"
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    >
                      <p className="text-green-800 font-bold text-center">
                        🎉 Perfekt gelöst! 🎉
                      </p>
                      <p className="text-green-700 text-sm text-center mt-1">
                        Die Kühlmaske wartet auf dich!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
        <div aria-hidden="true" className="absolute border-[6px] border-solid border-white inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_8px_0px_#9db3ce]" />
      </motion.div>

      {/* Sticker-Partikel-Effekt */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {selectedStickers.map((stickerId, index) => {
          const sticker = stickerData.find(s => s.id === stickerId);
          return sticker && (
            <motion.div
              key={stickerId}
              className="absolute text-2xl"
              initial={{ 
                x: 500 + index * 30, 
                y: 600,
                scale: 0 
              }}
              animate={{ 
                y: 100 + index * 20,
                scale: [0, 1, 0.8],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 1.5,
                delay: index * 0.1
              }}
            >
              {sticker.emoji}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}