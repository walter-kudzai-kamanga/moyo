import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Award } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface MusicControllerProps {
  onOpenAchievements: () => void;
  achievementCount: number;
  totalAchievements: number;
}

export const MusicController: React.FC<MusicControllerProps> = ({
  onOpenAchievements,
  achievementCount,
  totalAchievements,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(romanticAudio.getIsMuted());
  }, []);

  const handleToggleMusic = () => {
    romanticAudio.playHeartSound();
    const active = romanticAudio.toggleRomanticMusic();
    setIsPlaying(active);
  };

  const handleToggleMute = () => {
    const muted = romanticAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="fixed top-3 right-3 sm:top-5 sm:right-6 z-40 flex items-center gap-2 sm:gap-3">
      {/* Achievement Quick Badge */}
      <button
        onClick={onOpenAchievements}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-rose-950/70 hover:bg-rose-900/80 text-rose-200 border border-rose-500/30 backdrop-blur-md transition-all shadow-lg hover:shadow-rose-500/20 active:scale-95"
        title="View Love Achievements"
      >
        <Award className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden sm:inline">Badges:</span>
        <span className="text-amber-300 font-semibold">{achievementCount}/{totalAchievements}</span>
      </button>

      {/* Music Ambient Player Toggle */}
      <div className="flex items-center rounded-full bg-rose-950/70 border border-rose-500/30 backdrop-blur-md px-1.5 py-1 shadow-lg">
        <button
          onClick={handleToggleMusic}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            isPlaying
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/30'
              : 'text-rose-200 hover:text-white'
          }`}
          title={isPlaying ? 'Pause Nyasha David — Ndoda' : 'Play Nyasha David — Ndoda'}
        >
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse text-rose-200' : ''}`} />
          <span className="hidden md:inline">{isPlaying ? 'Ndoda' : 'Music'}</span>
          {isPlaying && (
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-1.5 bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
        </button>

        <button
          onClick={handleToggleMute}
          className="p-1.5 text-rose-300 hover:text-white rounded-full transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

    </header>
  );
};
