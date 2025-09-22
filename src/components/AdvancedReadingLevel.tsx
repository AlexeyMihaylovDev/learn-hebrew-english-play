import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star, BookOpen, ChevronLeft, ChevronRight, Languages } from 'lucide-react';
import { STORIES_DATA } from '@/data/gameData';

interface AdvancedReadingLevelProps {
  onBack: () => void;
  onComplete: () => void;
}

const AdvancedReadingLevel: React.FC<AdvancedReadingLevelProps> = ({
  onBack,
  onComplete
}) => {
  const { t } = useLanguage();
  const [currentStory, setCurrentStory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [completedStories, setCompletedStories] = useState<Set<number>>(new Set());
  const [showTranslation, setShowTranslation] = useState(false);

  // Filter only advanced reading stories (hard level)
  const stories = STORIES_DATA.filter(story => story.level === 'hard');

  const currentStoryData = stories[currentStory];

  const playSound = async (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextPage = () => {
    if (currentPage < currentStoryData.content.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      // Story completed
      setCompletedStories(prev => new Set([...prev, currentStoryData.id]));
      if (currentStory < stories.length - 1) {
        setCurrentStory(prev => prev + 1);
        setCurrentPage(0);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(prev => prev + 1);
      setCurrentPage(0);
    }
  };

  const handlePreviousStory = () => {
    if (currentStory > 0) {
      setCurrentStory(prev => prev - 1);
      setCurrentPage(0);
    }
  };

  const isStoryCompleted = completedStories.has(currentStoryData.id);
  const isLastStory = currentStory === stories.length - 1;
  const isLastPage = currentPage === currentStoryData.content.length - 1;

  return (
    <div id="advanced-reading-level-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="advanced-reading-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="advanced-reading-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToLevelMap')}
        </Button>

        <div id="advanced-reading-info-container" className="flex items-center gap-4">
          <Badge id="advanced-story-counter-badge" variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
            {t('story')} {currentStory + 1} {t('of')} {stories.length}
          </Badge>
          <div id="advanced-reading-stars-container" className="flex items-center gap-1">
            {[1, 2, 3].map(starNum => (
              <Star 
                key={starNum} 
                id={`advanced-reading-star-${starNum}`}
                className={`w-6 h-6 transition-all duration-300 ${
                  starNum <= completedStories.size 
                    ? 'text-yellow-400 fill-yellow-400 animate-bounce' 
                    : 'text-gray-400'
                }`} 
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div id="advanced-reading-main-content" className="max-w-4xl mx-auto space-y-8">
        <div id="advanced-reading-title-section" className="text-center space-y-2 animate-slide-up">
          <h1 id="advanced-reading-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('advancedReadingLevel')}
          </h1>
          <p id="advanced-reading-subtitle" className="text-xl text-gray-600">
            {t('advancedReadingDesc')}
          </p>
        </div>

        {/* Story Card */}
        <Card id="advanced-story-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-8 animate-bounce-in border-2 border-purple-200">
          <div className="space-y-6 p-8">
            {/* Story Header */}
            <div id="advanced-story-header" className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <h2 id="advanced-story-title" className="text-3xl font-bold text-gray-800">
                  {currentStoryData.title}
                </h2>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Badge 
                  id="advanced-story-type-badge"
                  variant="outline" 
                  className="px-4 py-2 bg-red-50 text-red-700 border-red-200"
                >
                  📰 {t('advancedReading')}
                </Badge>
                
                <Badge 
                  id="advanced-story-level-badge"
                  variant="outline" 
                  className="px-4 py-2 bg-red-50 text-red-700 border-red-200"
                >
                  {t('hard')}
                </Badge>
              </div>
            </div>

            {/* Story Content */}
            <div id="advanced-story-content" className="space-y-6">
              {/* Page Counter */}
              <div id="advanced-page-counter" className="flex justify-between items-center">
                <Badge id="advanced-page-badge" variant="outline" className="text-sm bg-purple-50 text-purple-700 border-purple-200">
                  {t('page')} {currentPage + 1} {t('of')} {currentStoryData.content.length}
                </Badge>
                <div id="advanced-reading-level-indicator" className="text-sm text-gray-600 font-semibold">
                  Level 4
                </div>
              </div>

              {/* Story Text */}
              <div id="advanced-story-text-container" className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200">
                <div className="space-y-6">
                  {/* Story Text */}
                  <div id="advanced-story-text" className="text-center space-y-4">
                    <p className="text-2xl font-medium text-gray-800 leading-relaxed">
                      {currentStoryData.content[currentPage]}
                    </p>
                    
                    {/* Translation */}
                    {showTranslation && currentStoryData.translations && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200">
                        <p className="text-xl font-medium text-blue-800 leading-relaxed">
                          {currentStoryData.translations[currentPage]}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <Button 
                      id="advanced-read-aloud-btn"
                      onClick={() => playSound(currentStoryData.content[currentPage])} 
                      variant="outline" 
                      className="rounded-full hover:scale-110 transition-transform bg-white shadow-md border-purple-200"
                    >
                      <Volume2 className="w-6 h-6 mr-2" />
                      {t('readAloud')}
                    </Button>
                    
                    {currentStoryData.translations && (
                      <Button 
                        id="advanced-translation-btn"
                        onClick={() => setShowTranslation(!showTranslation)} 
                        variant="outline" 
                        className={`rounded-full hover:scale-110 transition-transform shadow-md ${
                          showTranslation 
                            ? 'bg-blue-100 text-blue-700 border-blue-300' 
                            : 'bg-white border-purple-200'
                        }`}
                      >
                        <Languages className="w-6 h-6 mr-2" />
                        {showTranslation ? t('hideTranslation') : t('showTranslation')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div id="advanced-story-navigation" className="flex justify-between items-center">
                <Button 
                  id="advanced-previous-page-btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-purple-200"
                >
                  <ChevronLeft className="w-8 h-8 text-purple-600" />
                </Button>

                <div id="advanced-story-progress" className="flex-1 mx-8">
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div 
                      id="advanced-story-progress-bar"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg" 
                      style={{
                        width: `${((currentPage + 1) / currentStoryData.content.length) * 100}%`
                      }} 
                    />
                  </div>
                </div>

                <Button 
                  id="advanced-next-page-btn"
                  onClick={handleNextPage}
                  disabled={isLastPage && isLastStory}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-purple-200"
                >
                  <ChevronRight className="w-8 h-8 text-purple-600" />
                </Button>
              </div>

              {/* Story Navigation */}
              <div id="advanced-story-story-navigation" className="flex gap-4 justify-center">
                <Button 
                  id="advanced-previous-story-btn"
                  onClick={handlePreviousStory}
                  disabled={currentStory === 0}
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform bg-white shadow-lg border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50"
                >
                  {t('previousStory')}
                </Button>
                
                <Button 
                  id="advanced-next-story-btn"
                  onClick={handleNextStory}
                  disabled={isLastStory}
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform bg-white shadow-lg border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50"
                >
                  {t('nextStory')}
                </Button>
              </div>

              {/* Completion Message */}
              {isStoryCompleted && (
                <div id="advanced-story-completion-message" className="animate-bounce-in space-y-4 p-6 bg-gradient-to-r from-green-100 to-purple-100 rounded-2xl border-2 border-green-300 shadow-lg">
                  <div className="text-6xl animate-bounce mx-auto w-fit">🎉</div>
                  <p className="text-2xl font-bold text-green-600">
                    {t('storyCompleted')}
                  </p>
                  <p className="text-lg text-gray-600">
                    Great job reading "{currentStoryData.title}"!
                  </p>
                </div>
              )}

              {/* Final Completion */}
              {isLastStory && isStoryCompleted && (
                <div id="advanced-final-completion" className="animate-bounce-in space-y-6 p-8 bg-gradient-to-r from-green-100 to-purple-100 rounded-3xl border-2 border-green-300 shadow-xl">
                  <div className="text-8xl animate-bounce mx-auto w-fit">🏆</div>
                  <h2 className="text-4xl font-bold text-green-600">
                    {t('allStoriesCompleted')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    You've completed all advanced reading! You're becoming an expert reader!
                  </p>
                  <Button 
                    id="advanced-reading-complete-btn"
                    onClick={onComplete} 
                    className="bg-gradient-to-r from-green-500 to-purple-500 text-white text-xl py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                    size="lg"
                  >
                    {t('continueLearning')} ⭐
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedReadingLevel;
