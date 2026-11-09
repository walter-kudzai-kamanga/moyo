import React, { useState } from 'react';
import { X, Heart, Sparkles, Calendar, User, Save, RotateCcw } from 'lucide-react';
import { UserPersonalization } from '../types';
import { defaultPersonalization } from '../data/romanticContent';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalization: UserPersonalization;
  onSave: (data: UserPersonalization) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  personalization,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserPersonalization>(personalization);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    romanticAudio.playHeartSound();
    fireHeartConfetti();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    romanticAudio.playCardFlip();
    setFormData(defaultPersonalization);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/30 text-rose-100 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-rose-300 hover:text-white rounded-full bg-rose-950/50 hover:bg-rose-900/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-600/30">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif-romantic text-rose-100">Personalize Your Story</h3>
            <p className="text-xs text-rose-300">Custom names, dates, and memories for this website</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-rose-300 mb-1">Her Name / Greeting</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-rose-400" />
                <input
                  type="text"
                  value={formData.herName}
                  onChange={(e) => setFormData({ ...formData, herName: e.target.value })}
                  placeholder="e.g. Kudzai / Beautiful"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 placeholder-rose-400/50 focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-rose-300 mb-1">Her Sweet Nickname</label>
              <div className="relative">
                <Sparkles className="absolute left-3 top-2.5 w-4 h-4 text-rose-400" />
                <input
                  type="text"
                  value={formData.herNickname}
                  onChange={(e) => setFormData({ ...formData, herNickname: e.target.value })}
                  placeholder="e.g. My Angel / Sunshine"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 placeholder-rose-400/50 focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-rose-300 mb-1">Your Name (Creator)</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-rose-400" />
              <input
                type="text"
                value={formData.hisName}
                onChange={(e) => setFormData({ ...formData, hisName: e.target.value })}
                placeholder="Walter"
                required
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 placeholder-rose-400/50 focus:outline-none focus:border-rose-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-rose-300 mb-1">Relationship / Anniversary Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-rose-400" />
                <input
                  type="date"
                  value={formData.anniversaryDate.split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, anniversaryDate: `${e.target.value}T00:00:00` })}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 focus:outline-none focus:border-rose-400 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-rose-300 mb-1">Next Date Countdown</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-rose-400" />
                <input
                  type="datetime-local"
                  value={formData.nextDate ? formData.nextDate.slice(0, 16) : ''}
                  onChange={(e) => setFormData({ ...formData, nextDate: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 focus:outline-none focus:border-rose-400 text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-rose-300 mb-1">Next Date Title</label>
            <input
              type="text"
              value={formData.nextDateTitle}
              onChange={(e) => setFormData({ ...formData, nextDateTitle: e.target.value })}
              placeholder="e.g. Romantic Dinner & Stargazing"
              className="w-full px-3 py-2 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-100 placeholder-rose-400/50 focus:outline-none focus:border-rose-400 text-xs"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-900/40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-950/60 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/30 hover:opacity-95 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                Save & Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
