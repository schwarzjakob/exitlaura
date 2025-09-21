import { useState } from 'react';
import RatselTemplate from '../imports/RatselTemplate-1-35';

interface WaechterCardProps {
  interactive?: boolean;
  onComplete?: (message: string) => void;
}

export function WaechterCard({ interactive = false, onComplete }: WaechterCardProps) {
  const [flappedNumbers, setFlappedNumbers] = useState<{[key: string]: boolean}>({});
  
  // Correct numbers that reveal message parts
  const correctAnswers = {
    A: 4, // ÖFF
    B: 5, // NE  
    C: 3  // PÄCKCHEN A
  };
  
  const hiddenMessages = {
    A: { 4: 'ÖFF' },
    B: { 5: 'NE ' },
    C: { 3: 'PÄCKCHEN A' }
  };

  const handleFlap = (column: 'A' | 'B' | 'C', number: number) => {
    if (!interactive) return;
    
    const key = `${column}-${number}`;
    setFlappedNumbers(prev => ({ ...prev, [key]: true }));
    
    // Check if all correct flaps are opened
    const allCorrectFlapped = Object.entries(correctAnswers).every(([col, num]) => {
      const correctKey = `${col}-${num}`;
      return flappedNumbers[correctKey] || key === correctKey;
    });
    
    if (allCorrectFlapped && onComplete) {
      setTimeout(() => {
        onComplete('ÖFFNE PÄCKCHEN A');
      }, 500);
    }
  };

  const renderColumn = (column: 'A' | 'B' | 'C', title: string) => (
    <div className="flex-1">
      <h3 className="font-['Jim_Nightshade'] text-[16px] text-[#8B4513] mb-4 text-center">
        Wächter {title}
      </h3>
      <div className="space-y-1">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => {
          const key = `${column}-${number}`;
          const isFlapped = flappedNumbers[key];
          const hasHiddenMessage = hiddenMessages[column]?.[number];
          
          return (
            <div key={number} className="relative">
              <div 
                className={`
                  w-8 h-8 border border-[#8B4513] bg-[#F4E7C7] flex items-center justify-center
                  font-['Jim_Nightshade'] text-[14px] text-[#2B2B2B] cursor-pointer
                  hover:bg-[#E6D7B7] transition-colors
                  ${isFlapped ? 'transform -rotate-12 opacity-50' : ''}
                `}
                onClick={() => handleFlap(column, number)}
                style={{
                  transformOrigin: 'bottom'
                }}
              >
                {!isFlapped ? number : ''}
              </div>
              
              {/* Hidden message revealed when flapped */}
              {isFlapped && hasHiddenMessage && (
                <div className="absolute inset-0 bg-[#FFD700] border border-[#C8A75E] flex items-center justify-center">
                  <span className="font-['Jim_Nightshade'] text-[12px] text-[#8B4513] font-bold">
                    {hasHiddenMessage}
                  </span>
                </div>
              )}
              
              {/* Fold line indicator for print version */}
              {!interactive && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] border-b border-dashed border-[#999] opacity-30"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-[535px] h-[368px] relative">
      <RatselTemplate />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col p-6">
        {/* Title */}
        <h2 className="font-['Jim_Nightshade'] text-[24px] text-[#8B4513] text-center mb-4">
          Die Wächter
        </h2>
        
        {/* Instruction */}
        <p className="font-['Jim_Nightshade'] text-[14px] text-[#2B2B2B] text-center mb-6">
          Wähle weise. Nur die rechten Zahlen lassen Worte erscheinen.
        </p>
        
        {/* Three Columns */}
        <div className="flex-1 flex gap-4 justify-center max-w-[400px] mx-auto">
          {renderColumn('A', 'A')}
          {renderColumn('B', 'B')}
          {renderColumn('C', 'C')}
        </div>
        
        {/* Footer */}
        <p className="font-['Jim_Nightshade'] text-[12px] text-[#666] text-center italic mt-4">
          Hebe nur, was dir offenbart wird.
        </p>
        
        {/* Print Instructions */}
        {!interactive && (
          <div className="absolute bottom-2 left-2 right-2 bg-[#FFE4B5] border border-[#C8A75E] rounded p-2">
            <p className="font-['Jim_Nightshade'] text-[10px] text-[#8B4513] text-center">
              Zum Drucken: Schnittlinien oben, Falzlinien unten. Versteckte Botschaften unter korrekten Zahlen platzieren.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}