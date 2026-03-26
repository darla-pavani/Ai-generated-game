import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Neon Nights (AI Mix)",
    artist: "Cyber Synth",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "6:12"
  },
  {
    id: 2,
    title: "Digital Horizon",
    artist: "Neural Network",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "7:05"
  },
  {
    id: 3,
    title: "Quantum Drift",
    artist: "AI Generator Beta",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "5:44"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const skipNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const skipPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    skipNext();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  return (
    <div className="bg-[#0f0a18] border border-purple-500/30 rounded-xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-purple-400 flex items-center gap-2 tracking-widest">
          <Music size={18} />
          AI RADIO
        </h2>
        <div className="flex items-center gap-2 text-purple-400/60">
          <Volume2 size={16} />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-purple-900/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>

      {/* Track Info */}
      <div className="mb-8">
        <div className="w-28 h-28 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-800 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Music size={48} className="text-white" />
        </div>
        <div className="text-left">
          <h3 className="text-lg font-bold text-white truncate mb-1">{currentTrack.title}</h3>
          <p className="text-sm text-purple-400">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div 
          className="h-1.5 bg-gray-800 rounded-full overflow-hidden cursor-pointer relative"
          onClick={handleProgressClick}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-purple-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <button 
          onClick={skipPrev}
          className="text-purple-400 hover:text-purple-300 transition-all cursor-pointer"
        >
          <SkipBack size={24} />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-16 h-16 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-all cursor-pointer"
        >
          {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
        </button>
        
        <button 
          onClick={skipNext}
          className="text-purple-400 hover:text-purple-300 transition-all cursor-pointer"
        >
          <SkipForward size={24} />
        </button>
      </div>

      {/* Playlist */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Up Next</h4>
        {TRACKS.map((track, index) => (
          <div 
            key={track.id}
            onClick={() => {
              setCurrentTrackIndex(index);
              setIsPlaying(true);
            }}
            className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all ${
              index === currentTrackIndex 
                ? 'bg-purple-900/30 border border-purple-500/30' 
                : 'hover:bg-gray-800/50 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <span className={`text-xs ${index === currentTrackIndex ? 'text-purple-400' : 'text-gray-600'}`}>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              <div className="truncate">
                <p className={`text-sm truncate ${index === currentTrackIndex ? 'text-purple-300' : 'text-gray-400'}`}>
                  {track.title}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">{track.artist}</p>
              </div>
            </div>
            <span className="text-xs text-gray-600">{track.duration}</span>
          </div>
        ))}
      </div>

      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
    </div>
  );
}
