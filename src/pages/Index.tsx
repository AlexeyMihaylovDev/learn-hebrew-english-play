import React, { useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import LevelMap from '@/components/LevelMap';
import LevelMenu from '@/components/LevelMenu';
import AlphabetLevel from '@/components/AlphabetLevel';
import WordsLevel from '@/components/WordsLevel';
import DragLevel from '@/components/DragLevel';
import ReadingLevel from '@/components/ReadingLevel';

type AppState = 'language-select' | 'level-map' | 'level-menu' | 'alphabet-level' | 'words-level' | 'drag-level' | 'reading-level';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('language-select');
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set());

  const handleLanguageSelected = () => {
    setAppState('level-map');
  };

  const handleLevelSelected = (levelId: number) => {
    if (levelId === 1) {
      setAppState('alphabet-level');
    } else if (levelId === 2 && completedLevels.has('alphabet')) {
      setAppState('words-level');
    } else if (levelId === 3 && completedLevels.has('words')) {
      setAppState('drag-level');
    }
  };

  const handleLevelMenuSelected = (levelType: string) => {
    switch (levelType) {
      case 'alphabet':
        setAppState('alphabet-level');
        break;
      case 'words':
        setAppState('words-level');
        break;
      case 'drag-drop':
        setAppState('drag-level');
        break;
      case 'stories':
      case 'comics':
      case 'advanced-reading':
        setAppState('reading-level');
        break;
      default:
        console.log('Level type not implemented:', levelType);
    }
  };

  const handleBackToLevelMap = () => {
    setAppState('level-map');
  };

  const handleBackToLevelMenu = () => {
    setAppState('level-menu');
  };

  const handleLevelComplete = (levelId: string) => {
    setCompletedLevels(prev => new Set([...prev, levelId]));
    setAppState('level-map');
  };

  const handleShowLevelMenu = () => {
    setAppState('level-menu');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {appState === 'language-select' && (
        <LanguageSelector onLanguageSelected={handleLanguageSelected} />
      )}
      
      {appState === 'level-map' && (
        <LevelMap 
          onSelectLevel={handleLevelSelected} 
          completedLevels={new Set([...completedLevels].map(level => {
            if (level === 'alphabet') return 1;
            if (level === 'words') return 2;
            if (level === 'drag-drop') return 3;
            return 0;
          }).filter(id => id > 0))}
          onShowLevelMenu={handleShowLevelMenu}
        />
      )}

      {appState === 'level-menu' && (
        <LevelMenu 
          onBack={handleBackToLevelMap}
          onSelectLevel={handleLevelMenuSelected}
          completedLevels={completedLevels}
        />
      )}
      
      {appState === 'alphabet-level' && (
        <AlphabetLevel 
          onBack={handleBackToLevelMap}
          onComplete={() => handleLevelComplete('alphabet')}
        />
      )}

      {appState === 'words-level' && (
        <WordsLevel 
          onBack={handleBackToLevelMap}
          onComplete={() => handleLevelComplete('words')}
        />
      )}

      {appState === 'drag-level' && (
        <DragLevel 
          onBack={handleBackToLevelMap}
          onComplete={() => handleLevelComplete('drag-drop')}
        />
      )}

      {appState === 'reading-level' && (
        <ReadingLevel 
          onBack={handleBackToLevelMap}
          onComplete={() => handleLevelComplete('stories')}
        />
      )}
    </main>
  );
};

export default Index;
