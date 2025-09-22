import React, { useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import LevelMap from '@/components/LevelMap';
import AlphabetLevel from '@/components/AlphabetLevel';

type AppState = 'language-select' | 'level-map' | 'alphabet-level';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('language-select');

  const handleLanguageSelected = () => {
    setAppState('level-map');
  };

  const handleLevelSelected = (levelId: number) => {
    if (levelId === 1) {
      setAppState('alphabet-level');
    }
    // Add more levels as needed
  };

  const handleBackToLevelMap = () => {
    setAppState('level-map');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {appState === 'language-select' && (
        <LanguageSelector onLanguageSelected={handleLanguageSelected} />
      )}
      
      {appState === 'level-map' && (
        <LevelMap onSelectLevel={handleLevelSelected} />
      )}
      
      {appState === 'alphabet-level' && (
        <AlphabetLevel onBack={handleBackToLevelMap} />
      )}
    </main>
  );
};

export default Index;
