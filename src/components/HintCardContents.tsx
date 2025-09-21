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
      <h4 className="text-[16px] font-bold text-yellow-800 mb-2">💡 Lösungsspalte</h4>
      <p className="text-[13px] text-yellow-700">
        Die erste Spalte (gelb markiert) enthält die Lösung! 
        Die ersten Buchstaben der Wörter bilden das berühmte Symbol der Macht.
      </p>
    </div>
    
    <div className="text-center mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-blue-800 mb-2">🎯 Zelda-Begriffe</h4>
      <p className="text-[13px] text-blue-700">
        • Grüne Kleidung des Helden → TUNIC<br/>
        • Vogelvolk in Hyrule → RITO<br/>
        • Weise Beschützerin → IMPA<br/>
        • Gefährtin mit Feenstaub → FAIRY<br/>
        • Klassischer Gegner → OCTOROK<br/>
        • Währung in Hyrule → RUPEE<br/>
        • Hühnerlegende → CUCCO<br/>
        • Links treues Pferd → EPONA
      </p>
    </div>

    <div className="text-center mb-4 p-3 bg-green-100 border-2 border-green-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-green-800 mb-2">🏆 Das Triforce</h4>
      <p className="text-[13px] text-green-700">
        T-R-I-F-O-R-C-E - Das heilige Symbol aus drei Dreiecken, 
        das Macht, Weisheit und Mut vereint. Es ist das Herzstück 
        der Zelda-Legende!
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
