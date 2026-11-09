import React, { useState } from 'react';
import { Mail, Heart, Sparkles, ArrowRight, Stamp } from 'lucide-react';
import { UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

interface LoveLetterSectionProps {
  personalization: UserPersonalization;
  onNext: () => void;
  onLetterOpened: () => void;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({
  personalization,
  onNext,
  onLetterOpened,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBreakingSeal, setIsBreakingSeal] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsBreakingSeal(true);
    romanticAudio.playWaxSealSound();
    fireHeartConfetti(0.5, 0.4);

    setTimeout(() => {
      setIsOpen(true);
      setIsBreakingSeal(false);
      onLetterOpened();
    }, 600);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 select-none">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-md">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>Words From My Heart</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100">
          A Letter For {personalization.herName}
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 font-sans mt-2">
          {isOpen ? 'Read slowly and take every word to heart.' : 'Tap the wax seal to break it open.'}
        </p>
      </div>

      {/* The Envelope / Letter Container */}
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Floating Envelope */
          <div
            onClick={handleOpenLetter}
            className={`group relative w-full max-w-lg aspect-[1.5/1] rounded-3xl bg-gradient-to-br from-[#2a0815] via-[#3d0f22] to-[#1c040d] border border-rose-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-8 flex flex-col items-center justify-between cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-rose-400/60 ${
              isBreakingSeal ? 'scale-105 filter brightness-125' : 'animate-float-gentle'
            }`}
          >
            {/* Envelope flap geometry */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-rose-950/60 to-transparent rounded-t-3xl border-b border-rose-500/20 pointer-events-none" />

            {/* Top Text on Envelope */}
            <div className="w-full flex justify-between items-center text-xs text-rose-400/80 font-serif-romantic tracking-widest uppercase">
              <span className="flex items-center gap-1.5">
                <Stamp className="w-3.5 h-3.5 text-amber-400" />
                Air Mail d'Amour
              </span>
              <span>Confidential & Private</span>
            </div>

            {/* Center Recipient Address & Wax Seal */}
            <div className="flex flex-col items-center text-center my-auto">
              <p className="text-xs text-rose-300/70 uppercase tracking-widest font-sans mb-1">
                Specially addressed to:
              </p>
              <h3 className="text-2xl sm:text-4xl font-calligraphy text-amber-100 font-bold tracking-wide">
                {personalization.herName}
              </h3>
              <p className="text-[11px] text-rose-400/80 italic mt-0.5">
                ({personalization.herNickname})
              </p>

              {/* The Wax Seal Button */}
              <div className="relative mt-6 group-hover:scale-110 transition-transform">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-amber-900 border-2 border-amber-400/60 shadow-[0_0_25px_rgba(225,29,72,0.8)] flex flex-col items-center justify-center text-amber-200">
                  <span className="font-serif-romantic font-bold text-2xl tracking-tighter">
                    {personalization.hisName.charAt(0) || 'W'}
                  </span>
                  <Heart className="w-3 h-3 text-amber-300 fill-amber-300 -mt-1" />
                </div>
                <div className="absolute -inset-2 rounded-full border border-dashed border-amber-300/40 animate-spin" style={{ animationDuration: '14s' }} />
              </div>
            </div>

            {/* Bottom Envelope Message */}
            <div className="text-center text-xs text-rose-300 font-serif-romantic tracking-wide flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Tap the seal to unroll this handwritten letter</span>
            </div>
          </div>
        ) : (
          /* Unfolded Handwritten-Style Letter */
          <div className="relative w-full glass-panel-light text-[#2d0f19] rounded-3xl p-6 sm:p-12 border border-rose-300/50 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
            {/* Subtle paper watermark texture */}
            <div className="absolute top-4 right-6 opacity-10 pointer-events-none">
              <Heart className="w-48 h-48 text-rose-900 fill-rose-900" />
            </div>

            {/* Letter Header */}
            <div className="flex justify-between items-baseline border-b border-rose-900/15 pb-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-rose-800/70 font-semibold font-sans">
                  Personal Letter
                </span>
                <h3 className="text-3xl sm:text-4xl font-calligraphy text-rose-950 font-bold">
                  My Love,
                </h3>
              </div>
              <div className="text-right text-xs text-rose-800/80 font-serif-romantic italic">
                From the depths of my heart
              </div>
            </div>

            {/* Letter Body in Handwritten Font */}
            <div className="space-y-4 font-handwriting text-xl sm:text-2xl text-rose-950 leading-relaxed tracking-wide">
              <p>
                Sometimes I sit and think about how lucky I am to have you in my life. I don't think words will ever be enough to explain what you truly mean to me.
              </p>
              <p>
                You have this beautiful way of making ordinary moments feel extraordinary. Even on days when nothing particularly special happens, knowing that I have you makes everything feel a little softer, brighter, and infinitely better.
              </p>
              <p>
                I may not always have the perfect words, and I may not always express myself the way I should, but I hope you never doubt how special you are to me.
              </p>
              <p>
                This little website is just my way of reminding you that you are loved, appreciated, admired, and cherished beyond measure.
              </p>
              <p className="font-semibold text-rose-900">
                And if there's one thing I want you to remember, it's this: out of all the people in this world, I am grateful that I get to call you mine.
              </p>
            </div>

            {/* Letter Sign-off */}
            <div className="mt-8 pt-4 border-t border-rose-900/15 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <p className="font-handwriting text-2xl sm:text-3xl text-rose-900 font-bold">
                  Forever yours,
                </p>
                <p className="font-calligraphy text-3xl sm:text-4xl text-rose-950 font-bold mt-1">
                  With all my love, {personalization.hisName} ❤️
                </p>
              </div>

              {/* Next Section CTA */}
              <button
                onClick={() => {
                  romanticAudio.playHeartSound();
                  onNext();
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-700 to-pink-700 hover:from-rose-600 hover:to-pink-600 text-white font-sans font-semibold text-sm shadow-lg shadow-rose-900/30 transition-all active:scale-95"
              >
                <span>There's more I want you to know</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
