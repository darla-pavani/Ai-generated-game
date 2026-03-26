/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0510] text-green-400 flex flex-col items-center justify-center p-8 font-mono relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header / Score */}
      <div className="absolute top-8 right-8 z-20">
        <div className="text-xl font-bold text-green-400 bg-[#05100a] px-6 py-2 rounded border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.1)] tracking-widest">
          SCORE: {score}
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-16 items-center justify-center relative z-10 mt-12">
        {/* Game Container with Blue Border Decoration */}
        <div className="relative p-12">
          {/* Blue border decoration */}
          <div className="absolute inset-0 border-2 border-[#5a75ff]/80 pointer-events-none">
            {/* Gradient rectangle */}
            <div className="absolute -top-0.5 -left-0.5 w-48 h-12 bg-gradient-to-r from-[#00ffaa] to-[#3b82f6]" />
          </div>
          
          <SnakeGame onScoreChange={setScore} />
        </div>

        {/* Music Player Container */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <MusicPlayer />
        </div>
      </main>
    </div>
  );
}


