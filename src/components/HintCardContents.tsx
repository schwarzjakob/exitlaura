import React from 'react';

// Spezifische Hinweise für jede Rätselkarte

export const SudokuHintContent = () => (
  <>
    <div className="text-center mb-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-yellow-800 mb-2">💡 Hinweis</h4>
      <p className="text-[13px] text-yellow-700">
        A=1, B=2, C=3... Z=26
      </p>
    </div>
    
    <div className="text-center mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-blue-800 mb-2">🎯 Tipp</h4>
      <p className="text-[13px] text-blue-700">
        Die mittlere Säule des Sudoku-Gitters enthält die wichtigen Zahlen. 
        Addiere sie zusammen, um den nächsten Schritt zu finden.
      </p>
    </div>
  </>
);

export const KreuzwortHintContent = () => (
  <>
    <div className="text-center mb-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-yellow-800 mb-2">💡 Hinweis</h4>
      <p className="text-[13px] text-yellow-700">
        Gesucht: 8 Buchstaben - Das Symbol der Macht
      </p>
    </div>
    
    <div className="text-center mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-blue-800 mb-2">🎯 Tipp</h4>
      <p className="text-[13px] text-blue-700">
        Das mittlere Wort führt weiter. Es ist das berühmte Symbol, 
        das Link in der Zelda-Serie stets bei sich trägt.
      </p>
    </div>
  </>
);

export const AcrosticHintContent = () => (
  <>
    <div className="text-center mb-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-yellow-800 mb-2">💡 Hinweis</h4>
      <p className="text-[13px] text-yellow-700">
        Finde das Podest der Maske – dort wartet der Weg zu Päckchen C.
      </p>
    </div>
    
    <div className="text-center mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-blue-800 mb-2">🎯 Tipp</h4>
      <p className="text-[13px] text-blue-700">
        Spüre den Frost: Nicht im Wind des Nordpfades, nicht an den äußeren Säulen. 
        Wer den inneren Kreis der Eishöhle findet, hört die Göttin flüstern.
      </p>
    </div>
  </>
);

export const RomanceHintContent = () => (
  <>
    <div className="text-center mb-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-yellow-800 mb-2">💡 Hinweis</h4>
      <p className="text-[13px] text-yellow-700">
        Verbinde die Herzen in der richtigen Reihenfolge
      </p>
    </div>
    
    <div className="text-center mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-blue-800 mb-2">🎯 Tipp</h4>
      <p className="text-[13px] text-blue-700">
        Beginne beim ersten Herz und ende beim letzten. 
        Die Reihenfolge ist wichtig - sie zeigt dir das Rechte.
      </p>
    </div>
  </>
);

export const FinaleHintContent = () => (
  <>
    <div className="text-center mb-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-yellow-800 mb-2">💡 Hinweis</h4>
      <p className="text-[13px] text-yellow-700">
        Die Ordnung deiner Prüfungen offenbart das letzte Geheimnis
      </p>
    </div>
    
    <div className="text-center mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-blue-800 mb-2">🎯 Tipp</h4>
      <p className="text-[13px] text-blue-700">
        Vier Kristalle der Macht, verschmolzen zu einem. 
        Ihre Farben zeigen den Weg zu dem was sie meinen.
      </p>
    </div>
  </>
);

export const ElchHintContent = () => (
  <>
    <div className="text-center mb-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-yellow-800 mb-2">💡 Hinweis</h4>
      <p className="text-[13px] text-yellow-700">
        Der letzte Weg zu einem treuen Freund
      </p>
    </div>
    
    <div className="text-center mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-blue-800 mb-2">🎯 Tipp</h4>
      <p className="text-[13px] text-blue-700">
        In den Wäldern des Nordens versteckt sich ein Gefährte. 
        Doch nur einer trägt das Geweih - finde den stillen Begleiter.
      </p>
    </div>
  </>
);
