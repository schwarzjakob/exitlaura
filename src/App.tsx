
import {React } from 'react';
import { Toaster } from './components/ui/sonner';
import { GameEngine } from './components/GameEngine';

export default function App() {

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-100">
        <GameEngine />
      </div>
    </>
  );
}
