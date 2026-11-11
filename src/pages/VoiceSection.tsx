import React, { useState, useEffect, useRef } from 'react';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Heart,
  Sparkles,
  ArrowRight,
  Disc,
} from 'lucide-react';
import { voiceTracksData } from '../data/romanticContent';
import { VoiceTrack, UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

interface VoiceSectionProps {
  personalization: UserPersonalization;
  onNext: () => void;
  onVoicePlayed: () => void;
}

export const VoiceSection: React.FC<VoiceSectionProps> = ({
  personalization,
  onNext,
  onVoicePlayed,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const activeTrack = voiceTracksData[currentTrackIndex];

  // Initialize random animated waveform heights
  useEffect(() => {
    const bars = Array.from({ length: 32 }, () => Math.random() * 0.7 + 0.3);
    setWaveformBars(bars);
  }, []);

  // Waveform animation loop when playing
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const animate = () => {
      setWaveformBars((prev) =>
        prev.map(() => Math.random() * 0.85 + 0.15)
      );
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      romanticAudio.stopSpeaking();
      setIsPlaying(false);
      romanticAudio.holdMusicForVoice(false);
    } else {
      romanticAudio.holdMusicForVoice(true);
      setIsPlaying(true);
      romanticAudio.playHeartSound();
      fireHeartConfetti();
      onVoicePlayed();

      const textToSpeak = activeTrack.speechText.replace(/\bWalter\b/g, personalization.hisName);

      romanticAudio.speakRomanticText(
        textToSpeak,
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          romanticAudio.holdMusicForVoice(false);
        }
      );
    }
  };

  useEffect(() => {
    return () => {
      romanticAudio.stopSpeaking();
      romanticAudio.holdMusicForVoice(false);
    };
  }, []);

  const handleSelectTrack = (index: number) => {
    if (isPlaying) {
      romanticAudio.stopSpeaking();
      setIsPlaying(false);
      romanticAudio.holdMusicForVoice(false);
    }
    romanticAudio.playCardFlip();
    setCurrentTrackIndex(index);
  };

  return (
    <section className="relative min-h-screen px-4 py-12 max-w-4xl mx-auto select-none">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-md">
          <Headphones className="w-3.5 h-3.5 text-rose-400" />
          <span>Whispers in Your Ear</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100">
          Listen to My Heart
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 font-sans mt-2 max-w-lg mx-auto">
          "Sometimes words are better heard than read. Put your headphones on or turn up your volume — I have recorded something for you..."
        </p>
      </div>

      {/* Main Luxury Audio Player Card */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-rose-500/40 shadow-2xl overflow-hidden mb-10">
        {/* Vinyl Record / Disc Visualizer */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          {/* Animated Spinning Record */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#160309] via-[#350719] to-[#120207] p-2 border-2 border-rose-500/40 shadow-[0_0_30px_rgba(225,29,72,0.35)] flex items-center justify-center transition-transform ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '8s' }}
            >
              {/* Grooves */}
              <div className="w-full h-full rounded-full border border-rose-400/20 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full border border-rose-400/20 flex items-center justify-center">
                  {/* Center Label */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex flex-col items-center justify-center text-white p-1 text-center shadow-lg">
                    <Heart className="w-4 h-4 fill-white" />
                    <span className="text-[8px] font-mono tracking-tighter uppercase mt-0.5">
                      For {personalization.herName.slice(0, 7)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Track Info & Visualizer */}
          <div className="flex-1 w-full text-center md:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300">
              Track 0{currentTrackIndex + 1} of 0{voiceTracksData.length}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-rose-100 mt-1 mb-1">
              {activeTrack.title}
            </h3>
            <p className="text-xs text-rose-300 italic mb-4">{activeTrack.subtitle}</p>

            {/* Audio Waveform Visualizer */}
            <div className="h-12 w-full flex items-center justify-center md:justify-start gap-1 px-2 py-1 rounded-xl bg-rose-950/50 border border-rose-500/20 mb-4">
              {waveformBars.map((height, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-rose-500 to-amber-300 transition-all duration-75"
                  style={{
                    height: isPlaying ? `${Math.max(15, height * 100)}%` : '20%',
                    opacity: isPlaying ? 0.9 : 0.4,
                  }}
                />
              ))}
            </div>

            {/* Play/Pause Main Controls */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <button
                onClick={handleTogglePlay}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Pause Voice</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                    <span>Listen To Voice Note</span>
                  </>
                )}
              </button>

              <span className="text-xs text-rose-300 font-mono">
                Duration ~ {activeTrack.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Spoken Message Transcript Box */}
        <div className="p-5 rounded-2xl bg-rose-950/70 border border-rose-500/20">
          <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block mb-1">
            Words Spoken From Walter's Heart:
          </span>
          <p className="font-handwriting text-xl sm:text-2xl text-rose-100 leading-relaxed italic">
            "{activeTrack.speechText.replace(/\bWalter\b/g, personalization.hisName)}"
          </p>
        </div>
      </div>

      {/* Track Playlist Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
        {voiceTracksData.map((track, idx) => {
          const isSelected = currentTrackIndex === idx;
          return (
            <button
              key={track.id}
              onClick={() => handleSelectTrack(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-rose-950/80 border-rose-400 text-rose-100 shadow-lg shadow-rose-600/20'
                  : 'bg-rose-950/30 border-rose-500/20 text-rose-300 hover:bg-rose-900/40 hover:text-white'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-amber-300/80 uppercase">
                  0{idx + 1}
                </span>
                <h4 className="text-sm font-serif-romantic font-bold text-rose-100">
                  {track.title}
                </h4>
                <p className="text-[11px] text-rose-300/70 line-clamp-1">{track.description}</p>
              </div>
              <Disc className={`w-5 h-5 ${isSelected ? 'text-rose-400 animate-spin' : 'text-rose-500/50'}`} />
            </button>
          );
        })}
      </div>

      {/* Footer Navigation CTA */}
      <div className="text-center">
        <button
          onClick={() => {
            romanticAudio.playHeartSound();
            onNext();
          }}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-xl shadow-rose-600/30 hover:opacity-95 transition-all active:scale-95"
        >
          <span>Step Into The Appreciation Room</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
