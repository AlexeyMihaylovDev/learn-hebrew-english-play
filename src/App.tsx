import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSelector from '@/components/LanguageSelector';
import LevelMap from '@/components/LevelMap';
import LevelMenu from '@/components/LevelMenu';
import AlphabetLevel from '@/components/AlphabetLevel';
import WordsLevel from '@/components/WordsLevel';
import DragLevel from '@/components/DragLevel';
import ReadingLevel from '@/components/ReadingLevel';
import StoriesLevel from '@/components/StoriesLevel';
import ComicsLevel from '@/components/ComicsLevel';
import AdvancedReadingLevel from '@/components/AdvancedReadingLevel';
import PhrasesLevel from '@/components/PhrasesLevel';
import GrammarLevel from '@/components/GrammarLevel';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const navigate = useNavigate();
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
      navigate('/phrases-level');
    } else if (levelId === 4 && completedLevels.has('phrases')) {
      navigate('/grammar-level');
    } else if (levelId === 5 && completedLevels.has('grammar')) {
      navigate('/listening-level');
    } else if (levelId === 6 && completedLevels.has('listening')) {
      navigate('/speaking-level');
    } else if (levelId === 7 && completedLevels.has('speaking')) {
      navigate('/vocabulary-level');
    } else if (levelId === 8 && completedLevels.has('vocabulary')) {
      navigate('/pronunciation-level');
    } else if (levelId === 9 && completedLevels.has('pronunciation')) {
      navigate('/conversation-level');
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
        navigate('/stories-level');
        break;
      case 'comics':
        navigate('/comics-level');
        break;
      case 'advanced-reading':
        navigate('/advanced-reading-level');
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

                <Route path="/phrases-level" element={
                  <PhrasesLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('phrases')}
                  />
                } />

                <Route path="/grammar-level" element={
                  <GrammarLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('grammar')}
                  />
                } />

                <Route path="/reading-level" element={
                  <ReadingLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('stories')}
                  />
                } />

                <Route path="/stories-level" element={
                  <StoriesLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('stories')}
                  />
                } />

                <Route path="/comics-level" element={
                  <ComicsLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('comics')}
                  />
                } />

                <Route path="/advanced-reading-level" element={
                  <AdvancedReadingLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('advanced-reading')}
                  />
                } />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
