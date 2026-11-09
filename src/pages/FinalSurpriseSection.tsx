import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Award,
  Download,
} from 'lucide-react';
import { UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireRosePetalShower, fireHeartConfetti } from '../utils/confetti';

interface FinalSurpriseSectionProps {
  personalization: UserPersonalization;
  onRestart: () => void;
  onOpenAchievements: () => void;
}

export const FinalSurpriseSection: React.FC<FinalSurpriseSectionProps> = ({
  personalization,
  onRestart,
  onOpenAchievements,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [typedChars, setTypedChars] = useState(0);

  const finalLetterText = `If I could give you one thing in this world, it would be the ability to see yourself through my eyes, even for just a moment. Maybe then you'd truly understand how breathtaking and special you are to me.

I cannot promise that every day will be perfect. I cannot promise that I'll always have the right words. But I can promise that what I feel for you is genuine, pure, and eternal — and that I never want you to question how much you mean to me.

Thank you for being part of my story. Thank you for the smiles, the memories, the quiet conversations, and even the little moments that make us uniquely who we are.

And if I had to choose all over again in every single lifetime, I'd still want to discover you.

I love you, ${personalization.herName}. Today, tomorrow, and in all the little moments in between. ❤️`;

  const handleRevealClimax = () => {
    setIsRevealed(true);
    romanticAudio.playWaxSealSound();
    romanticAudio.playSuccessChime();
    fireRosePetalShower();
    fireHeartConfetti(0.5, 0.5);

    // Keep gentle romantic shower going
    setTimeout(() => {
      fireHeartConfetti(0.2, 0.4);
      fireHeartConfetti(0.8, 0.4);
    }, 1800);
  };

  // Typewriter effect
  useEffect(() => {
    if (!isRevealed) return;

    if (typedChars < finalLetterText.length) {
      const timer = setTimeout(() => {
        setTypedChars((prev) => prev + 1);
      }, 22);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, typedChars, finalLetterText.length]);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-4 py-16 select-none text-center">
      {!isRevealed ? (
        /* Darkened Anticipation Screen */
        <div className="relative max-w-xl mx-auto flex flex-col items-center animate-in fade-in duration-700">
          {/* Subtle Glowing Center Heart */}
          <div className="relative w-20 h-20 mb-8 flex items-center justify-center animate-heart-pulse">
            <div className="absolute inset-0 rounded-full bg-rose-600/30 blur-xl" />
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]" />
          </div>

          <p className="text-sm sm:text-base text-rose-300 font-serif-romantic tracking-widest uppercase mb-4">
            A message from the bottom of my soul
          </p>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100 mb-6 leading-tight">
            Before you leave, there's just one more thing I want you to see...
          </h2>

          <p className="text-xs sm:text-sm text-rose-300/80 font-sans mb-10 max-w-md">
            Take a quiet breath. When you are ready, tap below.
          </p>

          {/* Climax Trigger Button */}
          <button
            onClick={handleRevealClimax}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-bold text-white shadow-2xl shadow-rose-600/50 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:scale-105 active:scale-95 transition-all duration-300 border border-rose-300/40"
          >
            <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-45 transition-transform" />
            <span>ONE LAST THING ❤️</span>
            <Heart className="w-5 h-5 fill-white" />
          </button>
        </div>
      ) : (
        /* The Grand Emotional Climax */
        <div className="relative w-full max-w-3xl mx-auto glass-panel rounded-3xl p-6 sm:p-12 border-2 border-rose-400/50 shadow-[0_0_60px_rgba(225,29,72,0.35)] animate-in zoom-in-95 duration-700 text-left">
          {/* Top Rose Petal Accent */}
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-rose-500/20 text-xs font-mono text-amber-300">
            <span className="flex items-center gap-1.5 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Final Declaration of Love
            </span>
            <span className="text-rose-400">Exclusively for {personalization.herName}</span>
          </div>

          {/* Typewriter message */}
          <div className="font-serif-romantic text-lg sm:text-2xl text-rose-100 leading-relaxed space-y-4 min-h-[300px]">
            <p className="whitespace-pre-line">
              {finalLetterText.slice(0, typedChars)}
              {typedChars < finalLetterText.length && (
                <span className="inline-block w-2 h-5 bg-rose-400 ml-1 animate-pulse" />
              )}
            </p>
          </div>

          {/* Signature & Sign-off */}
          <div className="mt-10 pt-6 border-t border-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-rose-400 font-sans">
                Made with love, exclusively for you.
              </p>
              <p className="font-calligraphy text-3xl sm:text-4xl text-amber-200 font-bold mt-1">
                — {personalization.hisName} ❤️
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAchievements}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-all active:scale-95"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>View My Certificate ❤️</span>
              </button>

              <button
                onClick={onRestart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 text-rose-200 text-xs font-semibold transition-all active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Experience Again</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
