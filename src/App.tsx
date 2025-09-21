import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import RatselTemplate from './imports/RatselTemplate-1-35';
import Frame1 from './imports/Frame1';
import { IntroCard } from './components/IntroCard';
import { SudokuCard } from './components/SudokuCard';
import { WaechterCard } from './components/WaechterCard';
import { PermissionCard } from './components/PermissionCard';
import { RevealCard } from './components/RevealCard';
import { KreuzwortCard } from './components/KreuzwortCard';
import { AcrosticCard } from './components/AcrosticCard';
import { RomanceCard } from './components/RomanceCard';
import { FinalePuzzleCard } from './components/FinalePuzzleCard';
import { ElchCard } from './components/ElchCard';
import { PrintView } from './components/PrintView';
import { GameEngine } from './components/GameEngine';
import { FlippableRatselCard } from './components/FlippableRatselCard';
import { SudokuRatselContent, KreuzwortRatselContent, AcrosticRatselContent, RomanceRatselContent, FinaleRatselContent } from './components/RatselCardContents';

export default function App() {
  const [currentView, setCurrentView] = useState('game');

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-100">
        {currentView === 'game' ? (
          <div className="relative">
            <GameEngine />
            
            {/* Switch to Design View Button */}
            <button
              onClick={() => setCurrentView('design')}
              className="fixed top-4 left-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all z-50"
            >
              🎨 Design-Ansicht
            </button>
          </div>
        ) : (
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 text-center">
                <h1 className="text-3xl text-gray-800 mb-4">DIY Exit-Spiel: Hyrule Geschenkbox</h1>
                <div className="flex justify-center gap-2 mb-6 flex-wrap">
                  <button 
                    onClick={() => setCurrentView('game')}
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    🎮 Spiel starten
                  </button>
                  <button 
                    onClick={() => setCurrentView('puzzle-cards')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'puzzle-cards' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    🃏 Rätselkarten
                  </button>
                  <button 
                    onClick={() => setCurrentView('overview')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Übersicht
                  </button>
                  <button 
                    onClick={() => setCurrentView('print')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'print' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    🖨️ Druckansicht
                  </button>
                  <button 
                    onClick={() => setCurrentView('intro')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'intro' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Intro
                  </button>
                  <button 
                    onClick={() => setCurrentView('sudoku')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'sudoku' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Rätsel A
                  </button>
                  <button 
                    onClick={() => setCurrentView('waechter')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'waechter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Wächter
                  </button>
                  <button 
                    onClick={() => setCurrentView('kreuzwort')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'kreuzwort' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Rätsel B
                  </button>
                  <button 
                    onClick={() => setCurrentView('acrostic')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'acrostic' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Rätsel C
                  </button>
                  <button 
                    onClick={() => setCurrentView('romance')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'romance' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Rätsel D
                  </button>
                  <button 
                    onClick={() => setCurrentView('finale')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'finale' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Rätsel E
                  </button>
                  <button 
                    onClick={() => setCurrentView('elch')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'elch' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Rätsel F (Elch)
                  </button>
                  <button 
                    onClick={() => setCurrentView('permission')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'permission' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Erlaubnis
                  </button>
                  <button 
                    onClick={() => setCurrentView('reveal')}
                    className={`px-3 py-2 rounded text-sm ${currentView === 'reveal' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    Reveal
                  </button>
                </div>
              </div>

              {currentView === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg mb-4">Alle Karten-Designs</h3>
                    <div className="space-y-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Intro-Pergament:</span>
                        <span className="text-green-600">✓ Erstellt</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rätsel A (Sudoku):</span>
                        <span className="text-green-600">✓ Erstellt</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prüfkarte (Wächter):</span>
                        <span className="text-green-600">✓ Erstellt</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rätsel B (Kreuzwort):</span>
                        <span className="text-green-600">✓ Neu erstellt</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rätsel C (Sticker):</span>
                        <span className="text-green-600">✓ Neu erstellt</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Finale D (Epilog):</span>
                        <span className="text-green-600">✓ Neu erstellt</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Druckvorlage:</span>
                        <span className="text-green-600">✓ Bereit</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg mb-4">Design-Konsistenz</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>✓ Jim Nightshade Schriftart</div>
                      <div>✓ Pergament-Texturen</div>
                      <div>✓ Fantasy/Zelda-Illustrationen</div>
                      <div>✓ Weiße Rahmen mit Schatten</div>
                      <div>✓ Einheitliche Kartengröße</div>
                      <div>✓ Rätsel-Kennzeichnung (A, B, C, D)</div>
                      <div>✓ Vorder- und Rückseiten</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg mb-4">Kompletter Spielflow</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>1. Intro → Story etablieren</div>
                      <div>2. LAURA (5 Buchstaben) → Seite 56</div>
                      <div>3. Sudoku Seite 56 → Code A,B,C</div>
                      <div>4. Wächter A=5, B=7, C=9 → "ÖFFNE UMSCHLAG B"</div>
                      <div>5. Kreuzwort → "TRIFORCE"</div>
                      <div>6. Sticker → "ÖFFNE DAS KÜHLREICH"</div>
                      <div>7. Finale → Wundertüte</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6 col-span-full">
                    <h3 className="text-lg mb-4">Geschenke im Spiel</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-2xl mb-1">🎮</div>
                        <div>Nintendo Controller</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-2xl mb-1">🏰</div>
                        <div>Zelda-Hüllen</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="text-2xl mb-1">🌟</div>
                        <div>Anime-Sticker</div>
                      </div>
                      <div className="text-center p-3 bg-cyan-50 rounded">
                        <div className="text-2xl mb-1">❄️</div>
                        <div>Kühlmaske</div>
                      </div>
                      <div className="text-center p-3 bg-pink-50 rounded">
                        <div className="text-2xl mb-1">🎁</div>
                        <div>Wundertüte</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'print' && <PrintView />}

              {currentView === 'intro' && (
                <div className="flex justify-center">
                  <IntroCard />
                </div>
              )}

              {currentView === 'ratsel' && (
                <div className="flex justify-center">
                  <div className="w-[535px] h-[368px]">
                    <RatselTemplate />
                  </div>
                </div>
              )}

              {currentView === 'sudoku' && (
                <div className="flex justify-center">
                  <SudokuCard />
                </div>
              )}

              {currentView === 'waechter' && (
                <div className="flex justify-center">
                  <WaechterCard />
                </div>
              )}

              {currentView === 'kreuzwort' && (
                <div className="flex justify-center">
                  <KreuzwortCard />
                </div>
              )}

              {currentView === 'acrostic' && (
                <div className="flex justify-center">
                  <AcrosticCard />
                </div>
              )}

              {currentView === 'romance' && (
                <div className="flex justify-center">
                  <RomanceCard />
                </div>
              )}

              {currentView === 'finale' && (
                <div className="flex justify-center">
                  <FinalePuzzleCard />
                </div>
              )}

              {currentView === 'elch' && (
                <div className="flex justify-center">
                  <ElchCard />
                </div>
              )}

              {currentView === 'permission' && (
                <div className="flex justify-center">
                  <div className="space-y-4">
                    <h3 className="text-center text-lg">Erlaubnis-Karten (A-F)</h3>
                    <div className="flex gap-4">
                      {(['A', 'B', 'C', 'D', 'E', 'F'] as const).map((variant) => (
                        <div key={variant} className="text-center">
                          <h4 className="text-sm mb-2">Päckchen {variant}</h4>
                          <div className="transform scale-75">
                            <PermissionCard variant={variant} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'reveal' && (
                <div className="flex justify-center">
                  <div className="space-y-4">
                    <h3 className="text-center text-lg">Reveal-Karten (A-F)</h3>
                    <div className="flex gap-4">
                      {(['A', 'B', 'C', 'D', 'E', 'F'] as const).map((variant) => (
                        <div key={variant} className="text-center">
                          <h4 className="text-sm mb-2">Geschenk {variant}</h4>
                          <div className="transform scale-75">
                            <RevealCard variant={variant} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'puzzle-cards' && (
                <div className="flex justify-center">
                  <div className="space-y-8">
                    <h3 className="text-center text-xl text-gray-800">🃏 Interaktive Rätselkarten</h3>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto">
                      Klicke auf die Karten, um sie umzudrehen und die Hinweise zu sehen! 
                      Diese Karten werden in den interaktiven Rätseln angezeigt.
                    </p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                      <div className="text-center">
                        <h4 className="text-sm mb-3 font-medium">Rätsel A - Sudoku</h4>
                        <FlippableRatselCard
                          puzzleId="A"
                          title="Rätsel der Namen"
                          content={<SudokuRatselContent />}
                        />
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-sm mb-3 font-medium">Rätsel B - Kreuzworträtsel</h4>
                        <FlippableRatselCard
                          puzzleId="B"
                          title="Netz der Symbole"
                          content={<KreuzwortRatselContent />}
                        />
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-sm mb-3 font-medium">Rätsel C - Acrostic</h4>
                        <FlippableRatselCard
                          puzzleId="C"
                          title="Stille der Maske"
                          content={<AcrosticRatselContent />}
                        />
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-sm mb-3 font-medium">Rätsel D - Romance</h4>
                        <FlippableRatselCard
                          puzzleId="D"
                          title="Pfad des Herzens"
                          content={<RomanceRatselContent />}
                        />
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-sm mb-3 font-medium">Rätsel E - Finale</h4>
                        <FlippableRatselCard
                          puzzleId="E"
                          title="Kristall der Macht"
                          content={<FinaleRatselContent />}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
                      <div className="flex items-start gap-3">
                        <div className="text-yellow-600 text-xl">💡</div>
                        <div>
                          <h4 className="font-medium text-yellow-800 mb-1">Hinweis für's echte Spiel:</h4>
                          <p className="text-sm text-yellow-700">
                            Diese Karten können ausgedruckt und physisch zu den Rätseln gelegt werden. 
                            Die Rückseite zeigt nur "Rätsel-Karte X", die Vorderseite die spezifischen Hinweise.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}