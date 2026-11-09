import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  Heart,
  Eye,
  HandHeart,
  Crown,
  ArrowRight,
  X,
} from 'lucide-react';
import { appreciationItems } from '../data/romanticContent';
import { AppreciationItem, UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

interface AppreciationSectionProps {
  personalization: UserPersonalization;
  onNext: () => void;
}

export const AppreciationSection: React.FC<AppreciationSectionProps> = ({
  personalization,
  onNext,
}) => {
  const [activeCategory, setActiveCategory] = useState<'notice' | 'appreciate' | 'never_forget'>('notice');
  const [selectedItem, setSelectedItem] = useState<AppreciationItem | null>(null);

  const categories = [
    { id: 'notice', label: 'Things I Notice About You', icon: Eye, count: 4 },
    { id: 'appreciate', label: 'Things I Appreciate', icon: HandHeart, count: 5 },
    { id: 'never_forget', label: 'Things I Never Want You to Forget', icon: Crown, count: 5 },
  ] as const;

  const filteredItems = appreciationItems.filter((i) => i.category === activeCategory);

  const handleItemClick = (item: AppreciationItem) => {
    romanticAudio.playHeartSound();
    fireHeartConfetti();
    setSelectedItem(item);
  };

  return (
    <section className="relative min-h-screen px-4 py-12 max-w-5xl mx-auto select-none">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-md">
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>Things I Don't Say Enough</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100">
          The Appreciation Room
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 font-sans mt-2 max-w-xl mx-auto">
          The quiet gestures, unseen sacrifices, and radiant qualities you bring into my life every day.
        </p>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  romanticAudio.playHeartSound();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/30 scale-105'
                    : 'bg-rose-950/60 text-rose-300 hover:text-white border border-rose-500/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Interactive Glowing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="group relative glass-panel rounded-3xl p-6 border border-rose-500/30 hover:border-rose-400/60 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-2xl bg-rose-900/50 border border-rose-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              </span>
              <span className="text-[11px] text-amber-300 font-mono tracking-widest uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Tap to reveal</span>
              </span>
            </div>

            <h3 className="text-xl font-bold font-serif-romantic text-rose-100 group-hover:text-amber-200 transition-colors mb-2">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-rose-200/80 font-sans line-clamp-2 leading-relaxed">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* MODAL: Full Detailed Appreciation Note */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel-light text-[#2b0c16] rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-300/60">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 text-rose-800 hover:text-black rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white mb-4 shadow-lg">
              <Heart className="w-6 h-6 fill-white" />
            </div>

            <span className="text-xs text-rose-700 font-mono uppercase tracking-widest">
              From Walter's Heart
            </span>

            <h3 className="text-2xl font-serif-romantic font-bold text-rose-950 mt-1 mb-4">
              {selectedItem.title}
            </h3>

            <p className="font-handwriting text-2xl text-rose-900 leading-relaxed italic mb-6">
              "{selectedItem.detail}"
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-rose-900/15">
              <span className="text-xs text-rose-700 font-sans">
                Dedicated to {personalization.herName}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-md"
              >
                Treasured
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation CTA */}
      <div className="text-center">
        <button
          onClick={() => {
            romanticAudio.playHeartSound();
            onNext();
          }}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-xl shadow-rose-600/30 hover:opacity-95 transition-all active:scale-95"
        >
          <span>Check Every Second in Our Love Counter</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
