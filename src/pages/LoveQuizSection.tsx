import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Heart,
  Laugh,
} from 'lucide-react';
import { quizQuestions } from '../data/romanticContent';
import { UserPersonalization } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { fireHeartConfetti, fireRosePetalShower } from '../utils/confetti';

interface LoveQuizSectionProps {
  personalization: UserPersonalization;
  onNext: () => void;
  onQuizCompleted: () => void;
}

export const LoveQuizSection: React.FC<LoveQuizSectionProps> = ({
  personalization,
  onNext,
  onQuizCompleted,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [wrongStreakComment, setWrongStreakComment] = useState<string | null>(null);

  const currentQ = quizQuestions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      romanticAudio.playSuccessChime();
      fireHeartConfetti();
      setScore((prev) => prev + 1);
      setWrongStreakComment(null);
    } else {
      romanticAudio.playCardFlip();
      const playfulComments = [
        "Hmm, someone owes Walter a forehead kiss as a penalty! 😉",
        "Close, but Walter loves you way too much for a normal answer! ❤️",
        "Haha! Don't worry, you still get infinite chances to re-learn it! 🥰",
        "Aww, cute guess! But here's what my heart really says...",
      ];
      setWrongStreakComment(playfulComments[Math.floor(Math.random() * playfulComments.length)]);
    }
  };

  const handleNextQuestion = () => {
    romanticAudio.playHeartSound();
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setWrongStreakComment(null);
    } else {
      setIsQuizFinished(true);
      fireRosePetalShower();
      romanticAudio.playSuccessChime();
      onQuizCompleted();
    }
  };

  const handleRestartQuiz = () => {
    romanticAudio.playCardFlip();
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizFinished(false);
    setWrongStreakComment(null);
  };

  return (
    <section className="relative min-h-screen px-4 py-12 max-w-4xl mx-auto select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-md">
          <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>Interactive Relationship Quiz</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-romantic text-rose-100">
          How Well Do You Know Us?
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 font-sans mt-2 max-w-md mx-auto">
          Let’s put our memories and Walter’s heart to the test. No pressure, gorgeous!
        </p>

        {/* Score & Question Indicator */}
        {!isQuizFinished && (
          <div className="mt-4 flex items-center justify-center gap-4 text-xs">
            <span className="text-rose-300">
              Question{' '}
              <strong className="text-amber-300">
                {currentQuestionIndex + 1} of {quizQuestions.length}
              </strong>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="text-rose-300">
              Current Score: <strong className="text-pink-300">{score}</strong>
            </span>
          </div>
        )}
      </div>

      {!isQuizFinished ? (
        /* Question Card */
        <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-rose-500/30 shadow-2xl animate-in fade-in duration-300">
          {/* Progress bar */}
          <div className="w-full bg-rose-950/80 h-2 rounded-full overflow-hidden border border-rose-500/20 mb-8">
            <div
              className="bg-gradient-to-r from-rose-500 to-amber-400 h-full transition-all duration-500"
              style={{
                width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
              }}
            />
          </div>

          <h3 className="text-xl sm:text-3xl font-serif-romantic font-bold text-rose-100 mb-6 text-center leading-snug">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle =
                'bg-rose-950/40 border-rose-500/20 text-rose-100 hover:bg-rose-900/60 hover:border-rose-400/50';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'opacity-50 border-rose-900/30 text-rose-400/60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`relative p-4 rounded-2xl border text-left text-sm font-medium transition-all duration-300 flex items-center justify-between gap-3 ${btnStyle} active:scale-98`}
                >
                  <span className="leading-snug">{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Reveal Feedback */}
          {isAnswered && (
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/70 border border-rose-500/30 animate-in zoom-in-95 duration-300 mb-6">
              {wrongStreakComment && (
                <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-2">
                  <Laugh className="w-4 h-4 text-amber-400" />
                  <span>{wrongStreakComment}</span>
                </div>
              )}
              <p className="text-xs sm:text-sm text-rose-100 font-serif-romantic leading-relaxed">
                <strong className="text-amber-200 font-bold">Why it's true: </strong>
                {currentQ.explanation}
              </p>
              <p className="text-xs text-rose-300/90 font-handwriting text-lg mt-2">
                "{currentQ.romanticNote}"
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all active:scale-95"
              >
                <span>
                  {currentQuestionIndex + 1 < quizQuestions.length ? 'Next Question' : 'See My Verdict ❤️'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Results Score Card */
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-amber-500/40 text-center shadow-2xl animate-in zoom-in-95 duration-500 max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-xl shadow-amber-500/30">
            <Award className="w-8 h-8 text-white" />
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-mono uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Quiz Complete!</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif-romantic font-bold text-rose-100 mb-2">
            You Scored {score} / {quizQuestions.length}!
          </h3>

          <div className="p-6 rounded-2xl bg-rose-950/70 border border-rose-500/30 text-rose-200 text-sm sm:text-base font-serif-romantic italic leading-relaxed my-6">
            {score >= 6
              ? `"You got ${score}/${quizQuestions.length}! Incredible, beautiful. You truly know every corner of my heart, and having you as my partner is my greatest joy."`
              : `"You got ${score}/${quizQuestions.length}! Not bad at all, beautiful. But don't worry for even a second — you have a lifetime with me to learn every single thing."`}
            <div className="mt-3 text-xs text-amber-300 font-handwriting text-xl not-italic">
              Forever your biggest fan, {personalization.hisName} ❤️
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs text-rose-300 hover:text-white bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => {
                romanticAudio.playHeartSound();
                onNext();
              }}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 transition-all active:scale-95"
            >
              <span>Read "Open When..." Letters</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
