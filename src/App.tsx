/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FloatingHeartsCanvas } from './components/FloatingHeartsCanvas';
import { Navigation, SectionId } from './components/Navigation';
import { MusicController } from './components/MusicController';
import { PersonalizeModal } from './components/PersonalizeModal';
import { SecretEasterEggs } from './components/SecretEasterEggs';

import { WelcomeSection } from './pages/WelcomeSection';
import { LoveLetterSection } from './pages/LoveLetterSection';
import { ReasonsSection } from './pages/ReasonsSection';
import { MuseumSection } from './pages/MuseumSection';
import { LoveQuizSection } from './pages/LoveQuizSection';
import { OpenWhenSection } from './pages/OpenWhenSection';
import { FutureSection } from './pages/FutureSection';
import { VoiceSection } from './pages/VoiceSection';
import { AppreciationSection } from './pages/AppreciationSection';
import { LoveCounterSection } from './pages/LoveCounterSection';
import { FinalSurpriseSection } from './pages/FinalSurpriseSection';

import { defaultPersonalization } from './data/romanticContent';
import { UserPersonalization } from './types';
import { romanticAudio } from './utils/audioSynth';
import { fireHeartConfetti, fireRosePetalShower } from './utils/confetti';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('welcome');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  // Load personalization from localStorage or defaults
  const [personalization, setPersonalization] = useState<UserPersonalization>(() => {
    const saved = localStorage.getItem('lp_personalization');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultPersonalization;
      }
    }
    return defaultPersonalization;
  });

  // Achievements unlocked state
  const [achievements, setAchievements] = useState<{ [key: string]: boolean }>(() => {
    const saved = localStorage.getItem('lp_achievements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const handleUnlockAchievement = (key: string) => {
    if (!achievements[key]) {
      const updated = { ...achievements, [key]: true };
      setAchievements(updated);
      localStorage.setItem('lp_achievements', JSON.stringify(updated));
    }
  };

  const handleSavePersonalization = (data: UserPersonalization) => {
    setPersonalization(data);
    localStorage.setItem('lp_personalization', JSON.stringify(data));
  };

  const navigateTo = (sec: SectionId) => {
    setActiveSection(sec);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecretFound = () => {
    handleUnlockAchievement('secret_easter_egg');
    fireHeartConfetti();
  };

  return (
    <div className="relative min-h-screen text-[#fbebf0] bg-[#120308] font-sans selection:bg-rose-500/30 selection:text-rose-100 overflow-x-hidden pb-24 lg:pb-12">
      {/* 60fps Floating Hearts and Stardust Canvas */}
      <FloatingHeartsCanvas />

      {/* Top Floating Music Controller & Achievements */}
      <MusicController
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenAchievements={() => setShowAchievementsModal(true)}
        achievementCount={Object.values(achievements).filter(Boolean).length}
        totalAchievements={6}
      />

      {/* Persistent Navigation (Desktop Top Bar & Mobile Bottom Dock) */}
      <Navigation
        activeSection={activeSection}
        onNavigate={navigateTo}
        onSecretFound={handleSecretFound}
      />

      {/* Main Experience Content Container */}
      <main className="relative z-10 pt-16 sm:pt-20 px-2 sm:px-4">
        {activeSection === 'welcome' && (
          <WelcomeSection
            personalization={personalization}
            onOpenHeart={() => {
              handleUnlockAchievement('first_letter');
              navigateTo('letter');
            }}
          />
        )}

        {activeSection === 'letter' && (
          <LoveLetterSection
            personalization={personalization}
            onNext={() => navigateTo('reasons')}
            onLetterOpened={() => handleUnlockAchievement('first_letter')}
          />
        )}

        {activeSection === 'reasons' && (
          <ReasonsSection
            personalization={personalization}
            onNext={() => navigateTo('museum')}
            onAllReasonsUnlocked={() => handleUnlockAchievement('all_reasons')}
          />
        )}

        {activeSection === 'museum' && (
          <MuseumSection
            personalization={personalization}
            onNext={() => navigateTo('quiz')}
            onExploreMuseum={() => handleUnlockAchievement('secret_easter_egg')}
          />
        )}

        {activeSection === 'quiz' && (
          <LoveQuizSection
            personalization={personalization}
            onNext={() => navigateTo('openwhen')}
            onQuizCompleted={() => handleUnlockAchievement('quiz_done')}
          />
        )}

        {activeSection === 'openwhen' && (
          <OpenWhenSection
            personalization={personalization}
            onNext={() => navigateTo('future')}
            onEnvelopeOpened={() => handleUnlockAchievement('open_when')}
          />
        )}

        {activeSection === 'future' && (
          <FutureSection
            personalization={personalization}
            onNext={() => navigateTo('voice')}
            onDreamChecked={() => handleUnlockAchievement('secret_easter_egg')}
          />
        )}

        {activeSection === 'voice' && (
          <VoiceSection
            personalization={personalization}
            onNext={() => navigateTo('appreciation')}
            onVoicePlayed={() => handleUnlockAchievement('secret_easter_egg')}
          />
        )}

        {activeSection === 'appreciation' && (
          <AppreciationSection
            personalization={personalization}
            onNext={() => navigateTo('counter')}
          />
        )}

        {activeSection === 'counter' && (
          <LoveCounterSection
            personalization={personalization}
            onNext={() => navigateTo('final')}
            onOpenSettings={() => setShowSettingsModal(true)}
          />
        )}

        {activeSection === 'final' && (
          <FinalSurpriseSection
            personalization={personalization}
            onRestart={() => navigateTo('welcome')}
            onOpenAchievements={() => setShowAchievementsModal(true)}
          />
        )}
      </main>

      {/* Secret Easter Eggs & Interactions (Kiss, Virtual Hug, Daily Whisper, Badges) */}
      <SecretEasterEggs
        personalization={personalization}
        achievements={achievements}
        onUnlockAchievement={handleUnlockAchievement}
        showAchievementsModal={showAchievementsModal}
        setShowAchievementsModal={setShowAchievementsModal}
      />

      {/* Personalization Settings Modal */}
      <PersonalizeModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        personalization={personalization}
        onSave={handleSavePersonalization}
      />
    </div>
  );
}
