import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
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
import ListeningLevel from '@/components/ListeningLevel';
import SpeakingLevel from '@/components/SpeakingLevel';
import VocabularyLevel from '@/components/VocabularyLevel';
import PronunciationLevel from '@/components/PronunciationLevel';
import ConversationLevel from '@/components/ConversationLevel';
import SettingsScreen from '@/components/SettingsScreen';
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
    } else if (levelId === 2) {
      navigate('/words-level');
    } else if (levelId === 3) {
      navigate('/phrases-level');
    } else if (levelId === 4) {
      navigate('/grammar-level');
    } else if (levelId === 5) {
      navigate('/listening-level');
    } else if (levelId === 6) {
      navigate('/speaking-level');
    } else if (levelId === 7) {
      navigate('/vocabulary-level');
    } else if (levelId === 8) {
      navigate('/pronunciation-level');
    } else if (levelId === 9) {
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

  const handleShowSettings = () => {
    navigate('/settings');
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
              if (level === 'phrases') return 3;
              if (level === 'grammar') return 4;
              if (level === 'listening') return 5;
              if (level === 'speaking') return 6;
              if (level === 'vocabulary') return 7;
              if (level === 'pronunciation') return 8;
              if (level === 'conversation') return 9;
              if (level === 'drag-drop') return 10; // This is for drag-drop level
              return 0;
            }).filter(id => id > 0))}
            onShowLevelMenu={handleShowLevelMenu}
            onShowSettings={handleShowSettings}
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

                <Route path="/listening-level" element={
                  <ListeningLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('listening')}
                  />
                } />

                <Route path="/speaking-level" element={
                  <SpeakingLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('speaking')}
                  />
                } />

                <Route path="/vocabulary-level" element={
                  <VocabularyLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('vocabulary')}
                  />
                } />

                <Route path="/pronunciation-level" element={
                  <PronunciationLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('pronunciation')}
                  />
                } />

                <Route path="/conversation-level" element={
                  <ConversationLevel 
                    onBack={handleBackToLevelMap}
                    onComplete={() => handleLevelComplete('conversation')}
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

                <Route path="/settings" element={
                  <SettingsScreen 
                    onBack={handleBackToLevelMap}
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
      <SettingsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </SettingsProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
