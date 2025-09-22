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
    <div className="text-center mb-4 p-3 bg-blue-100 border-2 border-blue-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-blue-800 mb-2">🎯 Zelda-Begriffe</h4>
      <p className="text-[13px] text-blue-700">
        • Das ikonische Outfit, das du oft schon beim ersten Abenteuerteil bekommst.<br/>
        • Sie leben auch nicht mehr in der Nähe eines Vulkanes sondern in eisiger Höhe bei den Hebra-Bergen.<br/>
        • Das alte Kindermädchen von Prinzessin Zelda.<br/>
        • Kleine Wesen mit heilenden Kräften<br/>
        • Sie leben in Erdlöchern und tarnen sich entweder unter einem Busch oder einem Stein.<br/>
        • Währung in Hyrule.<br/>
        • Berüchtigt für aggressive Angriffe. Legt es auch Eier?<br/>
        • Links treues Pferd.
      </p>
    </div>
  </>
);

export const AcrosticHintContent = () => (
  <>
    <div className="text-center mb-4 p-3 bg-pink-100 border-2 border-pink-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-pink-800 mb-2">✨ Hinweise der Göttin</h4>
      <ul className="space-y-2 text-[13px] text-pink-700 text-left">
        <li className="flex gap-2 items-start">
          <span className="text-pink-500 text-sm leading-none">✦</span>
          <span>Wo ewiger Winter herrscht, dort offenbart sich das Geheimnis.</span>
        </li>
        <li className="flex gap-2 items-start">
          <span className="text-pink-500 text-sm leading-none">✦</span>
          <span>Das Zentrum birgt mehr Wahrheit als die äußeren Grenzen.</span>
        </li>
        <li className="flex gap-2 items-start">
          <span className="text-pink-500 text-sm leading-none">✦</span>
          <span>Drei Wächter, drei Pfade – doch nur einer führt zur stillen Maske.</span>
        </li>
      </ul>
    </div>

    
  </>
);

export const RomanceHintContent = () => (
  <>
    <div className="text-center mb-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <h4 className="text-[16px] font-bold text-yellow-800 mb-2">💡 Hinweis</h4>
      <p className="text-[13px] text-yellow-700">
        Es gibt doch so viele tolle Bücher, aber welche sind die besten? Sachbücher sicher nicht!
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
