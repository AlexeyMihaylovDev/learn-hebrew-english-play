import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LanguageSelector from '@/components/LanguageSelector';
import LevelMap from '@/components/LevelMap';
import LevelMenu from '@/components/LevelMenu';
import AlphabetLevel from '@/components/AlphabetLevel';
import WordsLevel from '@/components/WordsLevel';
import DragLevel from '@/components/DragLevel';
import ReadingLevel from '@/components/ReadingLevel';

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set());

  const handleLanguageSelected = () => {
    navigate('/level-map');
  };

  const handleLevelSelected = (levelId: number) => {
    if (levelId === 1) {
      navigate('/alphabet-level');
    } else if (levelId === 2 && completedLevels.has('alphabet')) {
      navigate('/words-level');
    } else if (levelId === 3 && completedLevels.has('words')) {
      navigate('/drag-level');
    }
  };

  const handleLevelMenuSelected = (levelType: string) => {
    switch (levelType) {
      case 'alphabet':
        navigate('/alphabet-level');
        break;
      case 'words':
        navigate('/words-level');
        break;
      case 'drag-drop':
        navigate('/drag-level');
        break;
      case 'stories':
      case 'comics':
      case 'advanced-reading':
        navigate('/reading-level');
        break;
      default:
        console.log('Level type not implemented:', levelType);
    }
  };

  const handleBackToLevelMap = () => {
    navigate('/level-map');
  };

  const handleBackToLevelMenu = () => {
    navigate('/level-menu');
  };

  const handleLevelComplete = (levelId: string) => {
    setCompletedLevels(prev => new Set([...prev, levelId]));
    navigate('/level-map');
  };

  const handleShowLevelMenu = () => {
    navigate('/level-menu');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <Routes>
        <Route path="/" element={<LanguageSelector onLanguageSelected={handleLanguageSelected} />} />
        
        <Route path="/level-map" element={
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
        } />

        <Route path="/level-menu" element={
          <LevelMenu 
            onBack={handleBackToLevelMap}
            onSelectLevel={handleLevelMenuSelected}
            completedLevels={completedLevels}
          />
        } />
        
        <Route path="/alphabet-level" element={
          <AlphabetLevel 
            onBack={handleBackToLevelMap}
            onComplete={() => handleLevelComplete('alphabet')}
          />
        } />

        <Route path="/words-level" element={
          <WordsLevel 
            onBack={handleBackToLevelMap}
            onComplete={() => handleLevelComplete('words')}
          />
        } />

        <Route path="/drag-level" element={
          <DragLevel 
            onBack={handleBackToLevelMap}
            onComplete={() => handleLevelComplete('drag-drop')}
          />
        } />

        <Route path="/reading-level" element={
          <ReadingLevel 
            onBack={handleBackToLevelMap}
            onComplete={() => handleLevelComplete('stories')}
          />
        } />
      </Routes>
    </main>
  );
};

const Index = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default Index;