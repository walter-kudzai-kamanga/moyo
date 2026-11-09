import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Mail,
  X,
  ArrowRight,
  Flame,
  CloudRain,
  Moon,
  Cake,
  SunMedium,
  Camera,
  Infinity,
  HeartHandshake,
  CheckCircle,
} from 'lucide-react';
import { openWhenEnvelopes } from '../data/romanticContent';
import { OpenWhenEnvelope, UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

interface OpenWhenSectionProps {
  personalization: UserPersonalization;
  onNext: () => void;
  onEnvelopeOpened: () => void;
}

export const OpenWhenSection: React.FC<OpenWhenSectionProps> = ({
  personalization,
  onNext,
  onEnvelopeOpened,
}) => {
  const [selectedEnvelope, setSelectedEnvelope] = useState<OpenWhenEnvelope | null>(null);
  const [openedEnvelopes, setOpenedEnvelopes] = useState<{ [id: string]: boolean }>({});

  const handleOpenEnvelope = (env: OpenWhenEnvelope) => {
    romanticAudio.playWaxSealSound();
    fireHeartConfetti(0.5, 0.4);
    setSelectedEnvelope(env);
    setOpenedEnvelopes((prev) => ({ ...prev, [env.id]: true }));
    onEnvelopeOpened();
  };

  const getEnvelopeIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'CloudRain':
        return <CloudRain className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Moon':
        return <Moon className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'SunMedium':
        return <SunMedium className="w-5 h-5" />;
      case 'Cake':
        return <Cake className="w-5 h-5" />;
      case 'Camera':
        return <Camera className="w-5 h-5" />;
      case 'Infinity':
        return <Infinity className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative min-h-screen px-4 py-12 max-w-6xl mx-auto select-none">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-md">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>Sanctuary of Letters</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100">
          Open When...
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 font-sans mt-2 max-w-xl mx-auto">
          Letters written for every mood, season, and emotional weather. Whenever you need reassurance, open the right envelope.
        </p>
      </div>

      {/* Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {openWhenEnvelopes.map((env) => {
          const isOpened = !!openedEnvelopes[env.id];
          return (
            <div
              key={env.id}
              onClick={() => handleOpenEnvelope(env)}
              className={`group relative rounded-3xl p-6 border transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between ${
                isOpened
                  ? 'bg-rose-950/60 border-rose-500/40 text-rose-100'
                  : 'bg-gradient-to-br from-[#240613] via-[#320a1a] to-[#17030c] border-rose-500/25 hover:border-pink-400/60'
              }`}
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="flex items-center gap-1.5 text-amber-300/90 font-mono">
                  {getEnvelopeIcon(env.icon)}
                  <span>{env.mood}</span>
                </span>
                {isOpened && (
                  <span className="flex items-center gap-1 text-[11px] text-rose-300/80 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-rose-400" /> Read
                  </span>
                )}
              </div>

              {/* Envelope Body */}
              <div className="my-2">
                <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-rose-100 group-hover:text-amber-200 transition-colors mb-1.5 leading-snug">
                  {env.title}
                </h3>
                <p className="text-xs text-rose-300/80 font-sans">{env.tagline}</p>
              </div>

              {/* Bottom wax seal impression */}
              <div className="mt-6 pt-3 border-t border-rose-500/20 flex items-center justify-between">
                <span className="text-[11px] text-rose-400/80 uppercase tracking-widest font-mono">
                  Sealed for {personalization.herName}
                </span>
                <div className="w-7 h-7 rounded-full bg-rose-700/50 border border-rose-400/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Letter View */}
      {selectedEnvelope && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl glass-panel-light text-[#290c17] rounded-3xl p-6 sm:p-10 shadow-2xl border border-rose-300/60 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEnvelope(null)}
              className="absolute top-4 right-4 p-2 text-rose-800 hover:text-black rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-rose-900/15 pb-4 mb-5">
              <span className="text-xs uppercase tracking-widest text-rose-700 font-mono font-semibold">
                {selectedEnvelope.mood}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-rose-950 mt-1">
                {selectedEnvelope.title}
              </h3>
            </div>

            {/* Letter Text */}
            <div className="font-handwriting text-xl sm:text-2xl text-rose-950 leading-relaxed whitespace-pre-line mb-6">
              {selectedEnvelope.letter}
            </div>

            {/* Romantic Quote Box */}
            <div className="p-4 rounded-2xl bg-rose-100/70 border border-rose-300/60 mb-6 text-center">
              <p className="font-serif-romantic italic text-base sm:text-lg text-rose-900 font-medium">
                "{selectedEnvelope.quote}"
              </p>
            </div>

            {/* Action suggestion */}
            {selectedEnvelope.suggestedAction && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-medium mb-6">
                <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>Sweet Suggestion: {selectedEnvelope.suggestedAction}</span>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-rose-900/15">
              <span className="text-xs text-rose-700 font-sans">
                Forever with you, {personalization.hisName} ❤️
              </span>
              <button
                onClick={() => setSelectedEnvelope(null)}
                className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-md transition-colors"
              >
                Tuck Letter Away
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation CTA */}
      <div className="mt-14 text-center">
        <button
          onClick={() => {
            romanticAudio.playHeartSound();
            onNext();
          }}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-xl shadow-rose-600/30 hover:opacity-95 transition-all active:scale-95"
        >
          <span>Explore Our Future Together</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
