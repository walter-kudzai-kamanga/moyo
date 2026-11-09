import React, { useState } from 'react';
import {
  Compass,
  CheckSquare,
  Square,
  Sparkles,
  MapPin,
  Heart,
  Plus,
  ArrowRight,
  Plane,
  X,
} from 'lucide-react';
import { bucketListItems, travelDestinations } from '../data/romanticContent';
import { BucketListItem, TravelDestination, UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';
import { safeStorage } from '../utils/storage';

interface FutureSectionProps {
  personalization: UserPersonalization;
  onNext: () => void;
  onDreamChecked: () => void;
}

export const FutureSection: React.FC<FutureSectionProps> = ({
  personalization,
  onNext,
  onDreamChecked,
}) => {
  const [items, setItems] = useState<BucketListItem[]>(() => {
    const saved = safeStorage.getItem('lp_bucket_list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.some((i: any) => i.id === 'b-ldr-1')) {
          return parsed;
        }
      } catch (e) {
        return bucketListItems;
      }
    }
    return bucketListItems;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<TravelDestination | null>(null);
  const [newDreamTitle, setNewDreamTitle] = useState('');
  const [showAddDream, setShowAddDream] = useState(false);

  const handleToggleCheck = (id: string) => {
    romanticAudio.playHeartSound();
    const updated = items.map((item) => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState) {
          fireHeartConfetti();
          setToastMessage('One more dream to make come true together. ❤️');
          setTimeout(() => setToastMessage(null), 3500);
          onDreamChecked();
        }
        return { ...item, completed: nextState };
      }
      return item;
    });

    setItems(updated);
    safeStorage.setItem('lp_bucket_list', JSON.stringify(updated));
  };

  const handleAddDream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDreamTitle.trim()) return;
    romanticAudio.playHeartSound();
    fireHeartConfetti();

    const newItem: BucketListItem = {
      id: `dream-${Date.now()}`,
      title: newDreamTitle.trim(),
      category: 'adventure',
      completed: false,
    };

    const updated = [...items, newItem];
    setItems(updated);
    safeStorage.setItem('lp_bucket_list', JSON.stringify(updated));
    setNewDreamTitle('');
    setShowAddDream(false);
  };

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <section className="relative min-h-screen px-4 py-12 max-w-6xl mx-auto select-none">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-2xl border border-white/20 animate-in zoom-in-95 duration-200 flex items-center gap-2">
          <Heart className="w-4 h-4 fill-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-rose-400" />
          <span>Dreams & Destinations</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100">
          Our Future Together
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 font-sans mt-2 max-w-xl mx-auto">
          We aren't just celebrating what we already share. We are dreaming up all the beautiful chapters we still get to write.
        </p>
      </div>

      {/* SUBSECTION A: BUCKET LIST */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/30 mb-12 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-500/20">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-rose-100 flex items-center gap-2">
              <span>Our Couple Bucket List</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-rose-300">
              {completedCount} of {items.length} milestones experienced so far
            </p>
          </div>

          <button
            onClick={() => setShowAddDream(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-900/60 hover:bg-rose-800 border border-rose-400/30 text-xs font-semibold text-rose-100 transition-all active:scale-95 shadow-md"
          >
            <Plus className="w-3.5 h-3.5 text-rose-300" />
            <span>Add Our Own Dream</span>
          </button>
        </div>

        {/* Bucket List Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleCheck(item.id)}
              className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-3 ${
                item.completed
                  ? 'bg-rose-950/40 border-emerald-500/40 text-rose-200'
                  : 'bg-rose-950/20 border-rose-500/20 text-rose-100 hover:border-rose-400/50 hover:bg-rose-950/40'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-rose-400 hover:text-white transition-colors"
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-rose-500/60" />
                )}
              </button>
              <div className="flex-1 text-xs sm:text-sm font-sans leading-snug">
                <span className={item.completed ? 'line-through text-rose-300/60' : ''}>
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBSECTION B: PLACES WE SHOULD VISIT */}
      <div className="mb-12">
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-rose-100 flex items-center justify-center gap-2">
            <Plane className="w-5 h-5 text-rose-400" />
            <span>Places We Should Visit</span>
          </h3>
          <p className="text-xs text-rose-300">
            Handpicked dream destinations waiting for our footprints
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {travelDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => {
                romanticAudio.playCardFlip();
                setSelectedDestination(dest);
              }}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-rose-500/30 cursor-pointer hover:border-rose-400 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b050d] via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-amber-300 font-mono uppercase tracking-widest flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {dest.country}
                    </span>
                    <h4 className="text-xl font-bold font-serif-romantic text-white leading-tight">
                      {dest.name}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="p-4 text-xs text-rose-200/90 font-sans">
                <p className="line-clamp-2 leading-relaxed mb-3">{dest.description}</p>
                <div className="pt-2 border-t border-rose-500/20 text-[11px] text-amber-300/90 font-serif-romantic italic">
                  Tap to view our imagined adventure ✨
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBSECTION C: OUR FUTURE PROMISE MESSAGE */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-rose-950/80 via-pink-950/70 to-purple-950/80 border border-rose-400/30 text-center shadow-2xl max-w-3xl mx-auto">
        <Heart className="w-8 h-8 text-rose-400 fill-rose-400 mx-auto mb-3 animate-pulse" />
        <h4 className="text-xl sm:text-2xl font-serif-romantic font-bold text-rose-100 mb-3">
          Our Future Promise
        </h4>
        <p className="font-serif-romantic text-base sm:text-xl text-rose-200 leading-relaxed italic mb-4">
          "I don't know exactly what tomorrow holds, but I know there are so many beautiful moments I'd love to experience with you. I hope we get to create a thousand more memories together."
        </p>
        <p className="text-xs text-amber-300 font-handwriting text-2xl">
          Always holding your hand, {personalization.hisName} ❤️
        </p>
      </div>

      {/* MODAL: Destination details */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel-light text-[#290c17] rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-300/60 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-4 right-4 p-2 text-rose-800 hover:text-black rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden mb-4 h-56 bg-rose-950">
              <img
                src={selectedDestination.imageUrl}
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xs text-rose-700 font-mono uppercase tracking-widest mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {selectedDestination.country}
            </div>

            <h3 className="text-2xl font-serif-romantic font-bold text-rose-950 mb-1">
              {selectedDestination.name}
            </h3>
            <p className="text-xs text-rose-800/80 italic mb-4">{selectedDestination.tagline}</p>

            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-sans mb-4">
              {selectedDestination.description}
            </p>

            <div className="p-4 rounded-2xl bg-rose-100/80 border border-rose-300 text-xs text-rose-950 mb-6">
              <strong className="block text-rose-900 font-bold mb-1">Our Imagined Date:</strong>
              {selectedDestination.dreamActivity}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedDestination(null)}
                className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-md"
              >
                Let's Go Someday ❤️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add custom dream */}
      {showAddDream && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 text-rose-100 shadow-2xl border border-rose-500/40">
            <button
              onClick={() => setShowAddDream(false)}
              className="absolute top-4 right-4 p-2 text-rose-300 hover:text-white rounded-full bg-rose-950/50"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif-romantic text-rose-100 mb-1">
              Add a Dream to Our Bucket List
            </h3>
            <p className="text-xs text-rose-300 mb-4">
              What is something special you want us to do together?
            </p>

            <form onSubmit={handleAddDream} className="space-y-4">
              <input
                type="text"
                value={newDreamTitle}
                onChange={(e) => setNewDreamTitle(e.target.value)}
                placeholder="e.g. Learn how to salsa dance together"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 placeholder-rose-400/50 text-xs focus:outline-none focus:border-rose-400"
              />

              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowAddDream(false)}
                  className="px-4 py-2 rounded-xl text-rose-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold shadow-md"
                >
                  Save Dream
                </button>
              </div>
            </form>
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
          <span>Listen to My Voice & Heart</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
