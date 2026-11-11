import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  Award,
  X,
  Volume2,
  Gift,
  Smile,
  Compass,
  CheckCircle,
} from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti, fireRosePetalShower } from '../utils/confetti';
import { UserPersonalization } from '../types';

interface SecretEasterEggsProps {
  personalization: UserPersonalization;
  achievements: { [key: string]: boolean };
  onUnlockAchievement: (key: string) => void;
  showAchievementsModal: boolean;
  setShowAchievementsModal: (val: boolean) => void;
}

export const SecretEasterEggs: React.FC<SecretEasterEggsProps> = ({
  personalization,
  achievements,
  onUnlockAchievement,
  showAchievementsModal,
  setShowAchievementsModal,
}) => {
  const [showSecretLetter, setShowSecretLetter] = useState(false);
  const [showHugModal, setShowHugModal] = useState(false);
  const [kissCoordinates, setKissCoordinates] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [dailyLoveNote, setDailyLoveNote] = useState<string | null>(null);

  const totalPossibleAchievements = 6;
  const unlockedCount = Object.values(achievements).filter(Boolean).length;
  const isAllUnlocked = unlockedCount >= totalPossibleAchievements;

  const vibratePhone = (pattern: number | number[]) => {
    const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData;
    const phone = uaData?.mobile
      ?? /Android.+Mobile|iPhone|iPod|Windows Phone/i.test(navigator.userAgent);
    if (!phone || typeof navigator.vibrate !== 'function') return;
    navigator.vibrate(pattern);
  };

  // Handle Virtual Kiss
  const handleTriggerKiss = (e?: React.MouseEvent) => {
    vibratePhone([35, 45, 55]);
    romanticAudio.playKissSound();
    fireHeartConfetti(0.5, 0.5);
    onUnlockAchievement('kiss');

    const x = e ? e.clientX : window.innerWidth / 2 + (Math.random() - 0.5) * 200;
    const y = e ? e.clientY : window.innerHeight / 2 + (Math.random() - 0.5) * 200;

    const newKiss = { id: Date.now() + Math.random(), x, y };
    setKissCoordinates((prev) => [...prev, newKiss]);

    setTimeout(() => {
      setKissCoordinates((prev) => prev.filter((k) => k.id !== newKiss.id));
    }, 2800);
  };

  // Handle Virtual Hug
  const handleTriggerHug = () => {
    vibratePhone([90, 110, 70, 930, 90, 110, 70, 930, 90, 110, 70, 930, 90, 110, 70, 930, 90, 110, 70, 930, 90, 110, 70]);
    setShowHugModal(true);
    romanticAudio.playHeartSound();
    onUnlockAchievement('hug');

    // Play steady heartbeat
    const beatInterval = setInterval(() => {
      romanticAudio.playHeartbeat();
    }, 1200);

    setTimeout(() => {
      clearInterval(beatInterval);
    }, 7000);
  };

  const dailyNotes = [
    `Today's thought: In case no one reminded you this morning, your smile is Walter's favourite thing in the entire world, Mai Kuku.`,
    `A gentle reminder for Tino: You are loved fiercely, chosen intentionally, and appreciated beyond words, Mai Future.`,
    `Random thought: Every room you walk into gets a little warmer and a lot brighter just by having you in it, Mai Kamanga.`,
    `Whisper from Walter's heart: I'm proud of you, Tino. Even on quiet days, you are doing great. Moyo wangu!`,
    `Fun fact: You still give me those exact same butterflies as the first day we spoke, my sweet Mai Kuku.`,
  ];

  const handleShowDailyNote = () => {
    romanticAudio.playHeartSound();
    fireHeartConfetti();
    const note = dailyNotes[Math.floor(Math.random() * dailyNotes.length)];
    setDailyLoveNote(note);
    onUnlockAchievement('daily_note');
  };

  return (
    <>
      {/* Floating Action Quick Ribbon on bottom right */}
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-30 flex flex-col items-end gap-2.5">
        {/* Kiss Button */}
        <button
          onClick={handleTriggerKiss}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-pink-500/30 backdrop-blur-md text-pink-200 hover:text-white shadow-xl hover:shadow-rose-500/25 transition-all active:scale-95 text-xs font-medium"
          title="Send a Virtual Kiss"
        >
          <span className="text-base group-hover:scale-125 transition-transform">💋</span>
          <span className="hidden sm:inline">Kiss Me</span>
        </button>

        {/* Virtual Hug Button */}
        <button
          onClick={handleTriggerHug}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 backdrop-blur-md text-rose-200 hover:text-white shadow-xl hover:shadow-rose-500/25 transition-all active:scale-95 text-xs font-medium"
          title="Give me a Virtual Hug"
        >
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 group-hover:scale-125 transition-transform" />
          <span className="hidden sm:inline">Virtual Hug</span>
        </button>

        {/* Daily Love Whisper */}
        <button
          onClick={handleShowDailyNote}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-rose-900/80 to-purple-950/80 hover:from-rose-800 hover:to-purple-900 border border-amber-500/30 backdrop-blur-md text-amber-200 hover:text-amber-100 shadow-xl transition-all active:scale-95 text-xs font-medium"
          title="Today's Sweet Note"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline">Daily Love Note</span>
        </button>
      </div>

      {/* Screen Kiss marks rendering */}
      {kissCoordinates.map((kiss) => (
        <div
          key={kiss.id}
          style={{ left: kiss.x, top: kiss.y }}
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-50 duration-300"
        >
          <div className="relative">
            <span className="text-4xl filter drop-shadow-[0_0_12px_rgba(244,63,94,0.9)] animate-bounce">
              💋
            </span>
            <span className="absolute -top-3 -right-6 text-xs font-bold text-rose-200 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-400/50 shadow-md">
              Muah!
            </span>
          </div>
        </div>
      ))}

      {/* Virtual Hug Modal */}
      {showHugModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-8 border border-rose-500/40 text-center text-rose-100 shadow-2xl">
            <button
              onClick={() => {
                navigator.vibrate?.(0);
                setShowHugModal(false);
              }}
              className="absolute top-4 right-4 p-2 text-rose-300 hover:text-white rounded-full bg-rose-950/50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-rose-600/30 animate-pulse" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-rose-600/50 animate-heart-pulse">
                <Heart className="w-9 h-9 text-white fill-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold font-serif-romantic text-rose-100 mb-2">
              Wrapping You In My Arms
            </h3>
            <p className="text-xs text-rose-300 mb-6 italic">
              "Hear the heartbeat? That is my heart, beating solely for you, {personalization.herName}."
            </p>

            <div className="bg-rose-950/60 p-4 rounded-2xl border border-rose-500/20 text-xs text-rose-200 leading-relaxed mb-6">
              Take a slow, deep breath in... and hold it for 3 seconds. Imagine me wrapping both arms securely around you, holding you until all the tension melts away. You are safe, cherished, and deeply adored.
            </div>

            <button
              onClick={() => {
                navigator.vibrate?.(0);
                romanticAudio.playHeartSound();
                fireHeartConfetti();
                setShowHugModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-rose-600/40 hover:opacity-95 transition-all"
            >
              I Feel the Warmth ❤️
            </button>
          </div>
        </div>
      )}

      {/* Daily Love Note Modal */}
      {dailyLoveNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/40 text-center text-amber-50 shadow-2xl">
            <button
              onClick={() => setDailyLoveNote(null)}
              className="absolute top-4 right-4 p-2 text-rose-300 hover:text-white rounded-full bg-rose-950/50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>

            <h4 className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
              Today's Little Whisper
            </h4>
            <p className="font-serif-romantic text-xl text-rose-100 mb-6 leading-relaxed italic">
              "{dailyLoveNote}"
            </p>

            <p className="text-xs text-rose-300 font-handwriting text-lg mb-6">
              With endless love, {personalization.hisName} ❤️
            </p>

            <button
              onClick={() => setDailyLoveNote(null)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium text-xs shadow-md"
            >
              Saved in My Heart
            </button>
          </div>
        </div>
      )}

      {/* Achievements & Official Owner Certificate Modal */}
      {showAchievementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/40 text-rose-100 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAchievementsModal(false)}
              className="absolute top-4 right-4 p-2 text-rose-300 hover:text-white rounded-full bg-rose-950/50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif-romantic text-rose-100">
                  Love Milestones & Badges
                </h3>
                <p className="text-xs text-rose-300">
                  {unlockedCount} of {totalPossibleAchievements} romantic badges unlocked
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-rose-950/70 h-2.5 rounded-full overflow-hidden border border-rose-500/20 mb-6">
              <div
                className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 h-full transition-all duration-700"
                style={{ width: `${(unlockedCount / totalPossibleAchievements) * 100}%` }}
              />
            </div>

            {/* Badges List */}
            <div className="space-y-3 mb-6">
              {[
                { key: 'first_letter', title: 'Words From The Heart', desc: 'Opened Walter’s digital love letter', icon: '💌' },
                { key: 'all_reasons', title: 'Heart Explorer', desc: 'Discovered all 20 reasons why I love you', icon: '❤️' },
                { key: 'quiz_done', title: 'Couple Mastermind', desc: 'Completed the relationship love quiz', icon: '🎮' },
                { key: 'open_when', title: 'Always Here For You', desc: 'Opened an emotional support letter', icon: '💕' },
                { key: 'hug', title: 'Warmth Received', desc: 'Took a virtual hug to heart', icon: '🤗' },
                { key: 'secret_easter_egg', title: 'Secret Keeper', desc: 'Found the hidden Easter eggs', icon: '✨' },
              ].map((badge) => {
                const unlocked = !!achievements[badge.key];
                return (
                  <div
                    key={badge.key}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      unlocked
                        ? 'bg-rose-950/60 border-amber-500/40 text-rose-100'
                        : 'bg-rose-950/20 border-rose-900/30 text-rose-400/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <h4 className="text-xs font-semibold text-rose-200">{badge.title}</h4>
                        <p className="text-[11px] text-rose-300/80">{badge.desc}</p>
                      </div>
                    </div>
                    {unlocked ? (
                      <span className="flex items-center gap-1 text-[11px] text-amber-300 font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                        <CheckCircle className="w-3 h-3 text-amber-400" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-[11px] text-rose-400/60 italic">Locked</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Certificate of Owner of My Heart */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/60 via-rose-950/80 to-purple-950/60 border border-amber-400/40 text-center relative overflow-hidden">
              <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
                Official Declaration
              </div>
              <h4 className="text-lg font-serif-romantic font-bold text-amber-100 mb-2">
                Officially the Owner of Walter's Heart ❤️
              </h4>
              <p className="text-xs text-rose-200/90 leading-relaxed font-serif-romantic italic mb-4">
                "Be it known to the stars and all of creation: {personalization.herName} ({personalization.herNickname}) holds the exclusive, permanent, and unconditional title to every heartbeat of {personalization.hisName} since 20 February 2023 across every single mile. Moyo Wangu ❤️"
              </p>
              <div className="text-xs text-amber-300 font-handwriting text-lg">
                Signed with endless adoration, {personalization.hisName}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
