import React, { useState, useEffect } from 'react';
import {
  Clock,
  Heart,
  Calendar,
  Sparkles,
  ArrowRight,
  Flame,
  Hourglass,
  CalendarHeart,
} from 'lucide-react';
import { UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

interface LoveCounterSectionProps {
  personalization: UserPersonalization;
  onNext: () => void;
  onOpenSettings: () => void;
}

export const LoveCounterSection: React.FC<LoveCounterSectionProps> = ({
  personalization,
  onNext,
  onOpenSettings,
}) => {
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const updateCounters = () => {
      const now = new Date().getTime();
      const startDate = new Date(personalization.anniversaryDate).getTime();
      const diffSince = Math.max(0, now - startDate);

      const dSince = Math.floor(diffSince / (1000 * 60 * 60 * 24));
      const hSince = Math.floor((diffSince / (1000 * 60 * 60)) % 24);
      const mSince = Math.floor((diffSince / 1000 / 60) % 60);
      const sSince = Math.floor((diffSince / 1000) % 60);

      setElapsed({ days: dSince, hours: hSince, minutes: mSince, seconds: sSince });

      // Next Date Countdown
      if (personalization.nextDate) {
        const nextDateTarget = new Date(personalization.nextDate).getTime();
        const diffUntil = nextDateTarget - now;

        if (diffUntil > 0) {
          const dUntil = Math.floor(diffUntil / (1000 * 60 * 60 * 24));
          const hUntil = Math.floor((diffUntil / (1000 * 60 * 60)) % 24);
          const mUntil = Math.floor((diffUntil / 1000 / 60) % 60);
          const sUntil = Math.floor((diffUntil / 1000) % 60);
          setCountdown({ days: dUntil, hours: hUntil, minutes: mUntil, seconds: sUntil, isPast: false });
        } else {
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        }
      }
    };

    updateCounters();
    const interval = setInterval(updateCounters, 1000);

    return () => clearInterval(interval);
  }, [personalization.anniversaryDate, personalization.nextDate]);

  return (
    <section className="relative min-h-screen px-4 py-12 max-w-5xl mx-auto select-none flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-md">
          <Clock className="w-3.5 h-3.5 text-rose-400" />
          <span>Every Second, Every Heartbeat</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100">
          The Love Counter
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 font-sans mt-2 max-w-lg mx-auto">
          Every second with you is a blessing I wouldn't trade for anything in this universe.
        </p>
      </div>

      {/* Main Counter Card 1: Time Together */}
      <div className="glass-panel rounded-3xl p-6 sm:p-12 border border-rose-500/30 shadow-2xl text-center mb-8 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300 mb-3">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          <span>We Have Been Creating Memories For:</span>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 my-6 max-w-3xl mx-auto">
          {[
            { label: 'Days', val: elapsed.days },
            { label: 'Hours', val: elapsed.hours },
            { label: 'Minutes', val: elapsed.minutes },
            { label: 'Seconds', val: elapsed.seconds, highlight: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-6 rounded-2xl border text-center transition-all ${
                item.highlight
                  ? 'bg-rose-950/80 border-rose-400/50 shadow-lg shadow-rose-600/20'
                  : 'bg-rose-950/40 border-rose-500/20'
              }`}
            >
              <div className="font-serif-romantic font-bold text-4xl sm:text-6xl text-rose-100">
                {String(item.val).padStart(2, '0')}
              </div>
              <div className="text-xs uppercase tracking-widest text-rose-300 font-mono mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <p className="font-serif-romantic text-base sm:text-lg text-rose-200/90 italic max-w-md mx-auto">
          "And every single second of that time has made me fall deeper in love with you."
        </p>

        <button
          onClick={onOpenSettings}
          className="mt-4 text-[11px] text-amber-300 hover:text-amber-200 underline tracking-wide font-mono"
        >
          Customize Relationship Start Date
        </button>
      </div>

      {/* Second Counter Card: Next Date Countdown */}
      {personalization.nextDate && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/60 via-purple-950/50 to-pink-950/60 border border-rose-400/30 text-center shadow-xl max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs text-rose-300 uppercase tracking-widest font-mono mb-2">
            <CalendarHeart className="w-4 h-4 text-pink-400" />
            <span>Time Until Our Next Date</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif-romantic font-bold text-rose-100 mb-4">
            {personalization.nextDateTitle || 'Our Next Romantic Date ❤️'}
          </h3>

          {!countdown.isPast ? (
            <div className="flex items-center justify-center gap-3 text-sm font-mono text-amber-200">
              <span className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/30">
                {countdown.days}d
              </span>
              <span>:</span>
              <span className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/30">
                {countdown.hours}h
              </span>
              <span>:</span>
              <span className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/30">
                {countdown.minutes}m
              </span>
              <span>:</span>
              <span className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-500/30 font-bold text-pink-300">
                {countdown.seconds}s
              </span>
            </div>
          ) : (
            <p className="text-xs text-rose-300 font-serif-romantic italic">
              Today is the day! Hope you have your gorgeous smile ready! ❤️
            </p>
          )}
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
          <span>Ready For The Final Surprise?</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
