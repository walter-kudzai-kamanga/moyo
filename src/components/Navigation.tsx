import React, { useState } from 'react';
import {
  Heart,
  Mail,
  Camera,
  HelpCircle,
  Clock,
  Sparkles,
  Compass,
  Headphones,
  Home,
  Star,
  Flame,
} from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

export type SectionId =
  | 'welcome'
  | 'letter'
  | 'reasons'
  | 'museum'
  | 'quiz'
  | 'openwhen'
  | 'future'
  | 'voice'
  | 'appreciation'
  | 'counter'
  | 'final';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onSecretFound: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  onSecretFound,
}) => {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showStarWish, setShowStarWish] = useState(false);

  const navItems: Array<{ id: SectionId; label: string; icon: typeof Home }> = [
    { id: 'welcome', label: 'Home', icon: Home },
    { id: 'letter', label: 'My Letter', icon: Mail },
    { id: 'reasons', label: '20 Reasons', icon: Heart },
    { id: 'museum', label: 'Museum', icon: Camera },
    { id: 'quiz', label: 'Love Quiz', icon: HelpCircle },
    { id: 'openwhen', label: 'Open When', icon: Sparkles },
    { id: 'future', label: 'Our Future', icon: Compass },
    { id: 'voice', label: 'My Voice', icon: Headphones },
    { id: 'appreciation', label: 'Appreciation', icon: Flame },
    { id: 'counter', label: 'Love Counter', icon: Clock },
    { id: 'final', label: 'Final Surprise', icon: Sparkles },
  ];

  const handleLogoClick = () => {
    romanticAudio.playHeartSound();
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next === 5) {
      fireHeartConfetti();
      onSecretFound();
      setLogoClicks(0);
    }
  };

  const handleStarClick = () => {
    romanticAudio.playHeartSound();
    fireHeartConfetti(0.2, 0.2);
    setShowStarWish(true);
    onSecretFound();
    setTimeout(() => {
      setShowStarWish(false);
    }, 4500);
  };

  return (
    <>
      {/* Full-width top bar on large screens */}
      <nav className="fixed top-0 inset-x-0 z-40 hidden h-16 lg:flex items-center gap-4 px-5 xl:px-8 glass-panel !rounded-none !border-x-0 !border-t-0 !border-b border-rose-500/30 shadow-lg backdrop-blur-xl">
        {/* Secret Interactive Logo */}
        <button
          onClick={handleLogoClick}
          className="flex shrink-0 items-center gap-2 pr-4 border-r border-rose-500/20 text-sm font-semibold text-rose-200 hover:text-white transition-all active:scale-95 group"
          title="Click 5 times for a secret surprise!"
        >
          <div className="w-8 h-8 rounded-full bg-rose-600/30 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
          </div>
          <span className="font-serif-romantic tracking-wide font-medium whitespace-nowrap">Walter & You</span>
        </button>

        {/* Section Links */}
        <div className="flex flex-1 items-center gap-1 min-w-0 overflow-x-auto no-scrollbar px-1 [justify-content:safe_center]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  romanticAudio.playHeartSound();
                  onNavigate(item.id);
                }}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/40 font-semibold'
                    : 'text-rose-200/80 hover:text-white hover:bg-rose-950/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-rose-300'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secret Shooting Star */}
        <button
          onClick={handleStarClick}
          className="shrink-0 pl-4 border-l border-rose-500/20 text-amber-300 hover:text-amber-100 transition-colors p-1"
          title="Make a romantic wish upon a star!"
        >
          <Star className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse hover:rotate-45 transition-transform" />
        </button>
      </nav>

      {/* Secret Star Wish Toast */}
      {showStarWish && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl glass-panel border border-amber-400/50 text-amber-200 text-xs font-serif-romantic tracking-wide shadow-2xl animate-in fade-in zoom-in-95 flex items-center gap-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Secret Wish Unlocked: "My wish is to love you better and cherish you more with every sunrise." ✨</span>
        </div>
      )}

      {/* Mobile Floating Bottom Dock (Small Screens) */}
      <nav className="fixed bottom-2 left-2 right-2 z-40 lg:hidden glass-panel rounded-2xl border border-rose-500/30 shadow-2xl backdrop-blur-xl px-2 py-1.5">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-1 py-0.5 px-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  romanticAudio.playHeartSound();
                  onNavigate(item.id);
                }}
                className={`flex flex-col items-center justify-center min-w-[50px] py-1 px-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-rose-600/80 text-white font-semibold scale-105 shadow-md shadow-rose-600/40'
                    : 'text-rose-300/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-300'}`} />
                <span className="text-[10px] whitespace-nowrap mt-0.5 tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
