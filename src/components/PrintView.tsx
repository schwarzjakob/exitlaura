import { IntroCard } from './IntroCard';
import { SudokuCard } from './SudokuCard';
import { WaechterCard } from './WaechterCard';
import { PermissionCard } from './PermissionCard';
import { RevealCard } from './RevealCard';
import { KreuzwortCard } from './KreuzwortCard';
import { AcrosticCard } from './AcrosticCard';
import { RomanceCard } from './RomanceCard';
import { FinalePuzzleCard } from './FinalePuzzleCard';
import { ElchCard } from './ElchCard';

export function PrintView() {
  return (
    <div className="bg-white p-8 space-y-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl text-black mb-2">DIY Exit-Spiel: Hyrule Geschenkbox</h1>
        <p className="text-gray-600">Komplettes Kartenset - Neue Struktur mit Päckchen-System</p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-left max-w-3xl mx-auto">
          <h3 className="font-bold mb-2">Spielflow:</h3>
          <ol className="space-y-1 text-gray-700">
            <li>1. <strong>Intro:</strong> Pergament eröffnet die Prüfungen.</li>
            <li>2. <strong>Rätsel A:</strong> Sudoku &amp; Wächtercode.</li>
            <li>3. <strong>Erlaubnis A:</strong> "Päckchen A öffnen".</li>
            <li>4. <strong>Story A:</strong> Zelda-Hüllen.</li>
            <li>5. <strong>Rätsel B:</strong> Kreuzwort der Symbole.</li>
            <li>6. <strong>Erlaubnis B:</strong> "Päckchen B öffnen".</li>
            <li>7. <strong>Story B:</strong> Sticker-Botschaften.</li>
            <li>8. <strong>Rätsel C:</strong> Logikgitter "Stille der Maske".</li>
            <li>9. <strong>Erlaubnis C:</strong> "Päckchen C öffnen".</li>
            <li>10. <strong>Story C:</strong> Maske der Ruhe.</li>
            <li>11. <strong>Rätsel D:</strong> Pfad des Herzens.</li>
            <li>12. <strong>Erlaubnis D:</strong> "Päckchen D öffnen".</li>
            <li>13. <strong>Story D:</strong> Wundertüte.</li>
            <li>14. <strong>Rätsel E:</strong> Kristall der Macht.</li>
            <li>15. <strong>Erlaubnis E:</strong> "Päckchen E öffnen".</li>
            <li>16. <strong>Story E:</strong> Controller (Finale).</li>
            <li>17. <strong>Rätsel F:</strong> Geweih des Nordens.</li>
            <li>18. <strong>Erlaubnis F:</strong> "Päckchen F öffnen".</li>
            <li>19. <strong>Story F:</strong> Elch-Gefährte (Epilog).</li>
          </ol>
        </div>
      </div>

      {/* Intro-Karte */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Intro - Die Prüfungen der Göttin</h2>
        <div className="flex justify-center">
          <div className="transform scale-75">
            <IntroCard />
          </div>
        </div>
      </div>

      {/* Rätsel A - Sudoku */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Rätsel A - Sudoku des Wächters</h2>
        <div className="flex justify-center">
          <div className="transform scale-75">
            <SudokuCard />
          </div>
        </div>
      </div>

      {/* Prüfkarte Wächter */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Prüfkarte - Die drei Wächter</h2>
        <div className="flex justify-center">
          <div className="transform scale-75">
            <WaechterCard />
          </div>
        </div>
      </div>

      {/* Rätsel B - Kreuzwort */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Rätsel B - Kästchen des Wissens</h2>
        <div className="flex justify-center">
          <div className="transform scale-75">
            <KreuzwortCard />
          </div>
        </div>
      </div>

      {/* Rätsel C - Maske */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Rätsel C - Halle der Stille</h2>
        <div className="flex justify-center">
          <div className="transform scale-75">
            <AcrosticCard />
          </div>
        </div>
      </div>

      {/* Rätsel D - Romance */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Rätsel D - Pfad des Herzens</h2>
        <div className="flex justify-center">
          <div className="transform scale-75">
            <RomanceCard />
          </div>
        </div>
      </div>

      {/* Rätsel E - Finale */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Rätsel E - Kristall der Macht</h2>
        <div className="flex justify-center">
          <div className="transform scale-75">
            <FinalePuzzleCard />
          </div>
        </div>
      </div>

      {/* Rätsel F - Elch */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Rätsel F - Geweih des Nordens</h2>
        <div className="flex justify-center">
          <div className="transform scale-75">
            <ElchCard />
          </div>
        </div>
      </div>

      {/* Permission Cards */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Erlaubnis-Karten (A-F)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {(['A', 'B', 'C', 'D', 'E', 'F'] as const).map((variant) => (
            <div key={variant} className="text-center">
              <h3 className="text-sm text-gray-600 mb-2">Erlaubnis {variant}</h3>
              <div className="transform scale-50">
                <PermissionCard variant={variant} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reveal Cards */}
      <div className="border-t-2 border-gray-300 pt-8">
        <h2 className="text-xl text-center mb-6 text-gray-800">Reveal-Karten (A-F)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {(['A', 'B', 'C', 'D', 'E', 'F'] as const).map((variant) => (
            <div key={variant} className="text-center">
              <h3 className="text-sm text-gray-600 mb-2">Reveal {variant}</h3>
              <div className="transform scale-50">
                <RevealCard variant={variant} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Druckhinweise */}
      <div className="border-t-2 border-gray-300 pt-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-800">Druckhinweise:</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Drucke alle Karten auf festem Papier (min. 200g/m²) oder Karton</p>
            <p>• Empfohlene Kartengröße: 63x88mm (Standard-Spielkartengröße) oder A6</p>
            <p>• Jede Karte hat eine Vorderseite (Pergament/Rätsel) und Rückseite (Fantasy-Illustration)</p>
            <p>• Schneide die Karten sauber aus und runde die Ecken ab</p>
            <p>• Für die Wächter-Karte: Schneide die Zahlen-Flaps als aufklappbare Laschen</p>
            <p>• Erlaubnis-Karten: Erst nach gelöstem Rätsel aushändigen</p>
            <p>• Reveal-Karten: Erst nach geöffnetem Päckchen lesen lassen</p>
            <p>• Laminierung optional für bessere Haltbarkeit</p>
          </div>
        </div>
      </div>

      {/* Material-Liste */}
      <div className="border-t-2 border-gray-300 pt-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-green-800">Benötigte Materialien:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
            <div>
              <h4 className="font-bold mb-2">Geschenke (Päckchen A-F):</h4>
              <ul className="space-y-1">
                <li>• <strong>Päckchen A:</strong> Zelda-Hüllen-Pack</li>
                <li>• <strong>Päckchen B:</strong> Anime-Sticker (Jujutsu Kaisen / Attack on Titan)</li>
                <li>• <strong>Päckchen C:</strong> Kühlmaske</li>
                <li>• <strong>Päckchen D:</strong> Wundertüte (Romance)</li>
                <li>• <strong>Päckchen E:</strong> Nintendo Switch Pro Controller (Finale)</li>
                <li>• <strong>Päckchen F:</strong> Kleiner Elch / Nordischer Gefährte</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Zusätzlich:</h4>
              <ul className="space-y-1">
                <li>• Sudoku-Heft (Seite 56 markiert)</li>
                <li>• Umschläge (markiert A, B, C...)</li>
                <li>• Schere/Cutter für Flaps</li>
                <li>• Geschenkbox als Container</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
