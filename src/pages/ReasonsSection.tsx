import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  ArrowRight,
  Sun,
  Music,
  Smile,
  ShieldCheck,
  Flame,
  Award,
  Infinity,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { reasonsData } from '../data/romanticContent';
import { UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti, fireRosePetalShower } from '../utils/confetti';

interface ReasonsSectionProps {
  personalization: UserPersonalization;
  onNext: () => void;
  onAllReasonsUnlocked: () => void;
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({
  personalization,
  onNext,
  onAllReasonsUnlocked,
}) => {
  const [flippedCards, setFlippedCards] = useState<{ [id: number]: boolean }>({});

  const openedCount = Object.values(flippedCards).filter(Boolean).length;
  const isComplete = openedCount === 20;

  const handleCardClick = (id: number) => {
    romanticAudio.playCardFlip();
    const nextState = { ...flippedCards, [id]: !flippedCards[id] };
    setFlippedCards(nextState);

    const nextCount = Object.values(nextState).filter(Boolean).length;
    if (nextCount === 20) {
      romanticAudio.playSuccessChime();
      fireRosePetalShower();
      onAllReasonsUnlocked();
    } else if (nextCount % 5 === 0) {
      fireHeartConfetti();
    }
  };

  const handleRevealAll = () => {
    romanticAudio.playSuccessChime();
    const all: { [id: number]: boolean } = {};
    reasonsData.forEach((r) => {
      all[r.id] = true;
    });
    setFlippedCards(all);
    fireRosePetalShower();
    onAllReasonsUnlocked();
  };

  return (
    <section className="relative min-h-screen px-4 py-12 max-w-6xl mx-auto select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-md">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Infinite Adoration</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100">
          20 Reasons Why I Love You
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 font-sans mt-2 max-w-xl mx-auto">
          Tap each numbered heart to flip the card and reveal a piece of my heart. Discover all 20 to unlock a secret message.
        </p>

        {/* Progress & Quick Reveal Control */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-xs">
            <span className="text-rose-300 font-medium">Discovered:</span>
            <span className="font-bold text-amber-300">{openedCount} / 20</span>
            <div className="w-16 h-2 bg-rose-900/60 rounded-full overflow-hidden ml-1">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-400 h-full transition-all duration-300"
                style={{ width: `${(openedCount / 20) * 100}%` }}
              />
            </div>
          </div>

          {openedCount < 20 && (
            <button
              onClick={handleRevealAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-rose-300 hover:text-white bg-rose-900/40 hover:bg-rose-800/60 border border-rose-400/20 transition-all active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal All Cards</span>
            </button>
          )}
        </div>
      </div>

      {/* Secret Message Banner when all 20 are opened */}
      {isComplete && (
        <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-amber-950/70 via-rose-900/80 to-pink-950/70 border-2 border-amber-400/60 shadow-2xl text-center animate-in zoom-in-95 duration-500">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Hidden Truth Unlocked</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif-romantic font-bold text-amber-100 max-w-3xl mx-auto italic leading-snug">
            "And if I had a thousand more reasons, I'd still find a thousand more."
          </h3>
          <p className="text-xs text-rose-200 mt-2 font-handwriting text-xl">
            You are my forever, {personalization.herName}. ❤️
          </p>
        </div>
      )}

      {/* Grid of 20 3D Flip Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 perspective-1000">
        {reasonsData.map((reason) => {
          const isFlipped = !!flippedCards[reason.id];
          return (
            <div
              key={reason.id}
              onClick={() => handleCardClick(reason.id)}
              className="relative aspect-[3/4] cursor-pointer group select-none"
            >
              <div
                className={`w-full h-full transition-transform duration-700 transform-style-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side: Numbered Heart in Luxury Burgundy */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-[#2a0715] via-[#430c23] to-[#18030b] border border-rose-500/30 p-4 flex flex-col items-center justify-between text-center shadow-lg group-hover:border-rose-400 group-hover:shadow-rose-600/30 group-hover:-translate-y-1 transition-all duration-300">
                  <span className="text-[11px] font-mono text-amber-300/80 uppercase tracking-widest">
                    #{String(reason.id).padStart(2, '0')}
                  </span>

                  <div className="relative flex items-center justify-center">
                    <Heart className="w-12 h-12 text-rose-500/40 fill-rose-600/30 group-hover:scale-110 transition-transform duration-300" />
                    <span className="absolute font-serif-romantic text-xl font-bold text-rose-100">
                      {reason.id}
                    </span>
                  </div>

                  <span className="text-[10px] text-rose-300/80 uppercase tracking-wider font-medium flex items-center gap-1">
                    <span>Tap to Open</span>
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  </span>
                </div>

                {/* Back Side: Revealed Sweet Reason in Cream / Rose Gold */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-[#fff7f9] to-[#ffe8ee] text-[#340c1b] border-2 border-rose-400/50 p-3 sm:p-4 flex flex-col items-center justify-between text-center shadow-xl">
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-rose-700/80 font-semibold">
                    <span>#{String(reason.id).padStart(2, '0')}</span>
                    <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                  </div>

                  <div className="my-auto">
                    <h4 className="text-xs sm:text-sm font-bold font-serif-romantic text-rose-950 mb-1 leading-tight">
                      {reason.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-rose-900/90 leading-snug font-sans">
                      {reason.description}
                    </p>
                  </div>

                  <span className="text-[9px] text-rose-600/80 font-handwriting text-sm">
                    Forever yours
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={() => {
            romanticAudio.playHeartSound();
            onNext();
          }}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-xl shadow-rose-600/30 hover:opacity-95 transition-all active:scale-95"
        >
          <span>Walk into Our Little Museum</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
