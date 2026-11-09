import React, { useState } from 'react';
import {
  Camera,
  Heart,
  Sparkles,
  Calendar,
  MapPin,
  Maximize2,
  X,
  Shuffle,
  Plus,
  ArrowRight,
  BookHeart,
  Smile,
  Compass,
} from 'lucide-react';
import { memoriesData, timelineMilestones } from '../data/romanticContent';
import { MemoryItem, TimelineMilestone, UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

interface MuseumSectionProps {
  personalization: UserPersonalization;
  onNext: () => void;
  onExploreMuseum: () => void;
}

export const MuseumSection: React.FC<MuseumSectionProps> = ({
  personalization,
  onNext,
  onExploreMuseum,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'timeline'>('gallery');
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('lp_custom_memories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return memoriesData;
      }
    }
    return memoriesData;
  });

  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [randomMemory, setRandomMemory] = useState<MemoryItem | null>(null);

  // Form for adding new memory
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleSelectRandom = () => {
    romanticAudio.playCardFlip();
    const item = memories[Math.floor(Math.random() * memories.length)];
    setRandomMemory(item);
    setSelectedMemory(item);
    fireHeartConfetti();
    onExploreMuseum();
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    romanticAudio.playHeartSound();
    const newMem: MemoryItem = {
      id: `custom-mem-${Date.now()}`,
      title: newTitle || 'Our Precious Moment',
      date: newDate || 'Recently',
      location: newLocation || 'Somewhere Special',
      story: newStory || 'A memory forever treasured.',
      imageUrl:
        newImageUrl ||
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      tags: ['Personal', 'Love'],
    };

    const updated = [newMem, ...memories];
    setMemories(updated);
    localStorage.setItem('lp_custom_memories', JSON.stringify(updated));
    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewStory('');
    setNewImageUrl('');
    fireHeartConfetti();
  };

  return (
    <section className="relative min-h-screen px-4 py-12 max-w-6xl mx-auto select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-md">
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span>Curated Moments</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100">
          Our Little Museum
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 font-sans mt-2 max-w-xl mx-auto">
          A golden sanctuary of our favourite photographs, milestones, and unscripted laughter.
        </p>

        {/* Tab & Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex p-1 rounded-full bg-rose-950/70 border border-rose-500/30">
            <button
              onClick={() => {
                romanticAudio.playHeartSound();
                setActiveTab('gallery');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              Polaroid Moments ({memories.length})
            </button>
            <button
              onClick={() => {
                romanticAudio.playHeartSound();
                setActiveTab('timeline');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              Our Timeline
            </button>
          </div>

          <button
            onClick={handleSelectRandom}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-900/40 hover:bg-rose-800/60 border border-rose-400/30 text-rose-200 hover:text-white text-xs font-medium transition-all shadow-md active:scale-95"
            title="Surprise me with a random memory"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span>Memory of the Day</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-950/70 hover:bg-rose-900/80 border border-pink-500/30 text-rose-200 text-xs font-medium transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-rose-300" />
            <span>Add Memory</span>
          </button>
        </div>
      </div>

      {/* TAB 1: POLAROID GALLERY */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {memories.map((mem, index) => {
            const tiltAngles = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
            const tilt = tiltAngles[index % tiltAngles.length];

            return (
              <div
                key={mem.id}
                onClick={() => {
                  romanticAudio.playHeartSound();
                  setSelectedMemory(mem);
                  onExploreMuseum();
                }}
                className={`group relative bg-[#fffdfa] text-[#2b0c16] rounded-2xl p-4 pb-6 shadow-[0_15px_35px_rgba(0,0,0,0.55)] cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 hover:rotate-0 hover:shadow-[0_20px_45px_rgba(244,63,94,0.35)] ${tilt}`}
              >
                {/* Vintage Tape / Pin on top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/80 border border-amber-300/60 backdrop-blur-sm -rotate-3 shadow-sm rounded-sm" />

                {/* Photo Frame */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-rose-100 mb-4 border border-rose-900/10">
                  <img
                    src={mem.imageUrl}
                    alt={mem.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-xs flex items-center gap-1 font-medium drop-shadow">
                      <Maximize2 className="w-3.5 h-3.5" /> Tap to read story
                    </span>
                  </div>
                </div>

                {/* Handwritten Polaroid Caption */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-rose-800/70 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rose-700" />
                      {mem.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-700" />
                      {mem.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif-romantic font-bold text-rose-950 leading-snug">
                    {mem.title}
                  </h3>

                  <p className="font-handwriting text-base sm:text-lg text-rose-900 line-clamp-2 leading-tight">
                    "{mem.story}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: RELATIONSHIP TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="relative max-w-3xl mx-auto py-6">
          {/* Central spine line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-500 via-pink-500 to-amber-500 -translate-x-1/2" />

          <div className="space-y-8 relative">
            {timelineMilestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex items-center flex-col sm:flex-row ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Heart */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 p-0.5 shadow-lg shadow-rose-600/40 z-10 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#1e050e] flex items-center justify-center">
                      <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    onClick={() => {
                      romanticAudio.playCardFlip();
                      setSelectedMilestone(item);
                      onExploreMuseum();
                    }}
                    className={`ml-12 sm:ml-0 w-full sm:w-[44%] glass-panel rounded-2xl p-5 border border-rose-500/30 hover:border-rose-400/60 shadow-xl cursor-pointer hover:scale-[1.02] transition-all group`}
                  >
                    <div className="flex items-center justify-between text-xs text-amber-300 font-mono mb-1">
                      <span>{item.yearOrDate}</span>
                      {item.highlight && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-200 text-[10px]">
                          {item.highlight}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold font-serif-romantic text-rose-100 group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-rose-300/80 italic mb-2">{item.subtitle}</p>
                    <p className="text-xs text-rose-200/90 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: Fullscreen Memory Lightbox Preview */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl glass-panel-light text-[#2b0c16] rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-300/60 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 p-2 text-rose-800 hover:text-black rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden mb-5 border border-rose-900/10 max-h-[380px] bg-rose-950 flex items-center justify-center">
              <img
                src={selectedMemory.imageUrl}
                alt={selectedMemory.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-rose-800/80 font-mono mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-700" />
                {selectedMemory.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-700" />
                {selectedMemory.location}
              </span>
            </div>

            <h3 className="text-2xl font-serif-romantic font-bold text-rose-950 mb-3">
              {selectedMemory.title}
            </h3>

            <p className="font-handwriting text-2xl text-rose-900 leading-relaxed italic mb-6">
              "{selectedMemory.story}"
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-rose-900/15">
              <span className="text-xs text-rose-700 font-sans font-medium">
                Cherished by {personalization.hisName} & {personalization.herName} ❤️
              </span>
              <button
                onClick={() => setSelectedMemory(null)}
                className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-md transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Milestone Detail */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 text-rose-100 shadow-2xl border border-rose-500/40">
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-4 right-4 p-2 text-rose-300 hover:text-white rounded-full bg-rose-950/50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-mono uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{selectedMilestone.yearOrDate}</span>
            </div>

            <h3 className="text-2xl font-serif-romantic font-bold text-rose-100 mb-1">
              {selectedMilestone.title}
            </h3>
            <p className="text-xs text-rose-300 italic mb-4">{selectedMilestone.subtitle}</p>

            <div className="bg-rose-950/60 p-4 rounded-2xl border border-rose-500/20 text-sm text-rose-200 leading-relaxed font-sans mb-6">
              {selectedMilestone.description}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedMilestone(null)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold shadow-md"
              >
                Keep in My Heart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Custom Memory / Photo */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 text-rose-100 shadow-2xl border border-rose-500/40">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-rose-300 hover:text-white rounded-full bg-rose-950/50"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif-romantic text-rose-100 mb-1">
              Add a New Memory
            </h3>
            <p className="text-xs text-rose-300 mb-4">
              Add your real photo URL, caption, and story to our museum!
            </p>

            <form onSubmit={handleAddMemory} className="space-y-3 text-xs">
              <div>
                <label className="block text-rose-300 mb-1 font-medium">Memory Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. That Night Under the Stars"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-rose-300 mb-1 font-medium">Date</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. Last Summer"
                    className="w-full px-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-rose-300 mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Our Favourite Park"
                    className="w-full px-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-rose-300 mb-1 font-medium">Photo Image URL</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://... (leave blank for lovely default)"
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-rose-300 mb-1 font-medium">The Story / Caption</label>
                <textarea
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  rows={3}
                  placeholder="What made this moment unforgettable?"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-rose-300 hover:bg-rose-950"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold shadow-md"
                >
                  Save to Museum
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
          <span>Test How Well You Know Us in The Love Quiz</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
