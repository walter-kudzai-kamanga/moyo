import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, Music } from 'lucide-react';
import { UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

interface WelcomeSectionProps {
  personalization: UserPersonalization;
  onOpenHeart: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  personalization,
  onOpenHeart,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [pulseSpeed, setPulseSpeed] = useState(false);

  const handleClickOpen = () => {
    setIsOpening(true);
    setPulseSpeed(true);
    romanticAudio.playHeartSound();
    fireHeartConfetti(0.5, 0.5);

    // Auto start background melody if not playing yet
    if (!romanticAudio.getIsMusicPlaying()) {
      romanticAudio.startRomanticMusic();
    }

    setTimeout(() => {
      onOpenHeart();
    }, 1400);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-16 text-center select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] rounded-full bg-rose-600/15 blur-[120px] pointer-events-none -top-10" />
      <div className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full bg-pink-700/15 blur-[100px] pointer-events-none -bottom-10" />

      {/* Intro badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-medium tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>A Special Journey For You</span>
      </div>

      {/* Main Greeting */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif-romantic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-amber-100 mb-4 max-w-3xl leading-tight">
        Hey {personalization.herName}...
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-rose-200/90 font-serif-romantic italic max-w-xl mb-3 leading-relaxed">
        "I know you weren't expecting this, but I have something special for you."
      </p>

      <p className="text-xs sm:text-sm text-rose-300/80 tracking-wide font-sans mb-10 max-w-md">
        Someone has something to tell you from the bottom of his heart...
      </p>

      {/* Glowing 3D Beating Heart in Centre */}
      <div className="relative mb-10 cursor-pointer group" onClick={handleClickOpen}>
        {/* Glow rings */}
        <div
          className={`absolute -inset-6 rounded-full bg-gradient-to-tr from-rose-600/30 via-pink-500/30 to-amber-400/20 blur-xl transition-all duration-500 ${
            pulseSpeed ? 'scale-125 opacity-100 animate-ping' : 'group-hover:scale-110 opacity-70'
          }`}
        />

        {/* 3D Heart SVG with realistic lighting and depth */}
        <div
          className={`relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center transition-transform duration-300 ${
            pulseSpeed ? 'animate-bounce scale-110' : 'animate-heart-pulse'
          }`}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_15px_35px_rgba(225,29,72,0.65)]"
          >
            <defs>
              <radialGradient id="heartGradient" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ff758c" />
                <stop offset="35%" stopColor="#e11d48" />
                <stop offset="70%" stopColor="#9f1239" />
                <stop offset="100%" stopColor="#4c0519" />
              </radialGradient>
              <linearGradient id="shineGrad" x1="0%" y1="0%" x2="50%" y2="80%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Heart Shape */}
            <path
              d="M50,88 C50,88 12,62 12,34 C12,18 25,8 40,8 C47,8 50,14 50,14 C50,14 53,8 60,8 C75,8 88,18 88,34 C88,62 50,88 50,88 Z"
              fill="url(#heartGradient)"
            />
            {/* 3D Curved Light Reflection */}
            <ellipse
              cx="32"
              cy="25"
              rx="12"
              ry="7"
              transform="rotate(-25 32 25)"
              fill="url(#shineGrad)"
            />
          </svg>

          {/* Central subtle pulsing text/icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <Sparkles className="w-6 h-6 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>
      </div>

      {/* Main Interactive CTA Button: Open My Heart ❤️ */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleClickOpen}
          disabled={isOpening}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-semibold text-white shadow-2xl shadow-rose-600/40 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 active:scale-95 transition-all duration-300 border border-rose-300/30 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>Open My Heart</span>
            <Heart className="w-5 h-5 text-rose-200 fill-rose-200 group-hover:scale-125 transition-transform" />
          </span>
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </button>

        {isOpening && (
          <p className="text-xs text-rose-300 font-serif-romantic tracking-widest uppercase animate-pulse mt-2">
            I hope you're ready for this... ❤️
          </p>
        )}
      </div>

      {/* Personal touch footnote */}
      <div className="mt-14 text-xs text-rose-400/80 font-serif-romantic tracking-wider">
        Crafted exclusively with love by {personalization.hisName}
      </div>
    </section>
  );
};
