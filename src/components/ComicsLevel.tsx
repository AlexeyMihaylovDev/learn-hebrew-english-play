import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star, Image, ChevronLeft, ChevronRight, Languages } from 'lucide-react';
import { STORIES_DATA } from '@/data/gameData';

interface ComicsLevelProps {
  onBack: () => void;
  onComplete: () => void;
}

const ComicsLevel: React.FC<ComicsLevelProps> = ({
  onBack,
  onComplete
}) => {
  const { t } = useLanguage();
  const [currentStory, setCurrentStory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [completedStories, setCompletedStories] = useState<Set<number>>(new Set());
  const [showTranslation, setShowTranslation] = useState(false);

  // Filter only comic type
  const stories = STORIES_DATA.filter(story => story.type === 'comic');

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
    <div id="comics-level-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="comics-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="comics-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToLevelMap')}
        </Button>

        <div id="comics-info-container" className="flex items-center gap-4">
          <Badge id="comic-counter-badge" variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
            {t('comic')} {currentStory + 1} {t('of')} {stories.length}
          </Badge>
          <div id="comics-stars-container" className="flex items-center gap-1">
            {[1, 2, 3].map(starNum => (
              <Star 
                key={starNum} 
                id={`comics-star-${starNum}`}
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
      <div id="comics-main-content" className="max-w-4xl mx-auto space-y-8">
        <div id="comics-title-section" className="text-center space-y-2 animate-slide-up">
          <h1 id="comics-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('comicsLevel')}
          </h1>
          <p id="comics-subtitle" className="text-xl text-gray-600">
            {t('comicsDesc')}
          </p>
        </div>

        {/* Comic Card */}
        <Card id="comic-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-8 animate-bounce-in border-2 border-purple-200">
          <div className="space-y-6 p-8">
            {/* Comic Header */}
            <div id="comic-header" className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Image className="w-8 h-8 text-purple-600" />
                <h2 id="comic-title" className="text-3xl font-bold text-gray-800">
                  {currentStoryData.title}
                </h2>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Badge 
                  id="comic-type-badge"
                  variant="outline" 
                  className="px-4 py-2 bg-blue-50 text-blue-700 border-blue-200"
                >
                  📚 {t('comic')}
                </Badge>
                
                <Badge 
                  id="comic-level-badge"
                  variant="outline" 
                  className={`px-4 py-2 ${
                    currentStoryData.level === 'easy' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : currentStoryData.level === 'medium'
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  {t(currentStoryData.level)}
                </Badge>
              </div>
            </div>

            {/* Comic Content */}
            <div id="comic-content" className="space-y-6">
              {/* Page Counter */}
              <div id="page-counter" className="flex justify-between items-center">
                <Badge id="page-badge" variant="outline" className="text-sm bg-purple-50 text-purple-700 border-purple-200">
                  {t('page')} {currentPage + 1} {t('of')} {currentStoryData.content.length}
                </Badge>
                <div id="comics-level-indicator" className="text-sm text-gray-600 font-semibold">
                  Level 4
                </div>
              </div>

              {/* Comic Content */}
              <div id="comic-content-container" className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200">
                <div className="space-y-6">
                  {/* Comic Images */}
                  {currentStoryData.images && (
                    <div id="comic-image" className="text-center">
                      <div className="text-8xl mb-4 animate-bounce">
                        {currentStoryData.images[currentPage]}
                      </div>
                    </div>
                  )}
                  
                  {/* Comic Text */}
                  <div id="comic-text" className="text-center space-y-4">
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
                      id="read-aloud-btn"
                      onClick={() => playSound(currentStoryData.content[currentPage])} 
                      variant="outline" 
                      className="rounded-full hover:scale-110 transition-transform bg-white shadow-md border-purple-200"
                    >
                      <Volume2 className="w-6 h-6 mr-2" />
                      {t('readAloud')}
                    </Button>
                    
                    {currentStoryData.translations && (
                      <Button 
                        id="translation-btn"
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
              <div id="comic-navigation" className="flex justify-between items-center">
                <Button 
                  id="previous-page-btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-purple-200"
                >
                  <ChevronLeft className="w-8 h-8 text-purple-600" />
                </Button>

                <div id="comic-progress" className="flex-1 mx-8">
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div 
                      id="comic-progress-bar"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg" 
                      style={{
                        width: `${((currentPage + 1) / currentStoryData.content.length) * 100}%`
                      }} 
                    />
                  </div>
                </div>

                <Button 
                  id="next-page-btn"
                  onClick={handleNextPage}
                  disabled={isLastPage && isLastStory}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-purple-200"
                >
                  <ChevronRight className="w-8 h-8 text-purple-600" />
                </Button>
              </div>

              {/* Comic Navigation */}
              <div id="comic-story-navigation" className="flex gap-4 justify-center">
                <Button 
                  id="previous-comic-btn"
                  onClick={handlePreviousStory}
                  disabled={currentStory === 0}
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform bg-white shadow-lg border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50"
                >
                  {t('previousStory')}
                </Button>
                
                <Button 
                  id="next-comic-btn"
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
                <div id="comic-completion-message" className="animate-bounce-in space-y-4 p-6 bg-gradient-to-r from-green-100 to-purple-100 rounded-2xl border-2 border-green-300 shadow-lg">
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
                <div id="final-completion" className="animate-bounce-in space-y-6 p-8 bg-gradient-to-r from-green-100 to-purple-100 rounded-3xl border-2 border-green-300 shadow-xl">
                  <div className="text-8xl animate-bounce mx-auto w-fit">🏆</div>
                  <h2 className="text-4xl font-bold text-green-600">
                    {t('allStoriesCompleted')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    You've read all the comics! You're becoming a great reader!
                  </p>
                  <Button 
                    id="comics-complete-btn"
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

export default ComicsLevel;
