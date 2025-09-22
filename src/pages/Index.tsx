import React, { useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import LevelMap from '@/components/LevelMap';
import AlphabetLevel from '@/components/AlphabetLevel';
import WordsLevel from '@/components/WordsLevel';

type AppState = 'language-select' | 'level-map' | 'alphabet-level' | 'words-level';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('language-select');
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());

  const handleLanguageSelected = () => {
    setAppState('level-map');
  };

  const handleLevelSelected = (levelId: number) => {
    if (levelId === 1) {
      setAppState('alphabet-level');
    } else if (levelId === 2 && completedLevels.has(1)) {
      setAppState('words-level');
    }
    // Add more levels as needed
  };

  const handleBackToLevelMap = () => {
    setAppState('level-map');
  };

  const handleLevelComplete = (levelId: number) => {
    setCompletedLevels(prev => new Set([...prev, levelId]));
    setAppState('level-map');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {appState === 'language-select' && (
        <LanguageSelector onLanguageSelected={handleLanguageSelected} />
      )}
      
      {appState === 'level-map' && (
        <LevelMap 
          onSelectLevel={handleLevelSelected} 
          completedLevels={completedLevels}
        />
      )}
      
      {appState === 'alphabet-level' && (
        <AlphabetLevel 
          onBack={handleBackToLevelMap}
          onComplete={() => handleLevelComplete(1)}
        />
      )}

      {appState === 'words-level' && (
        <WordsLevel 
          onBack={handleBackToLevelMap}
          onComplete={() => handleLevelComplete(2)}
        />
      )}
    </main>
  );
};

export default Index;
