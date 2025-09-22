import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star, BookOpen, Image, ChevronLeft, ChevronRight } from 'lucide-react';

interface ReadingLevelProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Story {
  id: number;
  title: string;
  type: 'story' | 'comic';
  content: string[];
  images?: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

const ReadingLevel: React.FC<ReadingLevelProps> = ({
  onBack,
  onComplete
}) => {
  const { t } = useLanguage();
  const [currentStory, setCurrentStory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [completedStories, setCompletedStories] = useState<Set<number>>(new Set());

  const stories: Story[] = [
    {
      id: 1,
      title: 'The Little Cat',
      type: 'story',
      level: 'beginner',
      content: [
        'Once upon a time, there was a little cat.',
        'The cat was very cute and fluffy.',
        'She loved to play with a red ball.',
        'Every day, she would run and jump.',
        'The cat was very happy!'
      ]
    },
    {
      id: 2,
      title: 'My Family',
      type: 'story',
      level: 'beginner',
      content: [
        'I have a big family.',
        'My mom is very kind.',
        'My dad is very strong.',
        'I have a little sister.',
        'We all love each other!'
      ]
    },
    {
      id: 3,
      title: 'The Magic Garden',
      type: 'story',
      level: 'intermediate',
      content: [
        'In a beautiful garden, flowers bloomed everywhere.',
        'Butterflies danced from flower to flower.',
        'A little girl named Emma discovered the garden.',
        'She saw colorful roses, daisies, and tulips.',
        'Emma felt like she was in a fairy tale.',
        'She promised to visit the garden every day.'
      ]
    },
    {
      id: 4,
      title: 'The Brave Dog',
      type: 'comic',
      level: 'beginner',
      content: [
        'Max the dog was very brave.',
        'He protected his family from danger.',
        'One day, a stranger came to the house.',
        'Max barked loudly to warn everyone.',
        'The stranger ran away quickly.',
        'Max was a hero!'
      ],
      images: ['🐕', '🏠', '👤', '🚨', '🏃', '🏆']
    },
    {
      id: 5,
      title: 'The Space Adventure',
      type: 'comic',
      level: 'intermediate',
      content: [
        'Captain Luna flew her rocket to the moon.',
        'She saw stars twinkling in the dark sky.',
        'On the moon, she found strange rocks.',
        'She collected samples for her research.',
        'Then she flew back to Earth safely.',
        'Everyone was proud of her adventure!'
      ],
      images: ['🚀', '🌙', '⭐', '🪨', '🔬', '🌍']
    }
  ];

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
    <div id="reading-level-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="reading-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="reading-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('levelMap')}
        </Button>

        <div id="reading-info-container" className="flex items-center gap-4">
          <Badge id="story-counter-badge" variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
            Story {currentStory + 1} of {stories.length}
          </Badge>
          <div id="reading-stars-container" className="flex items-center gap-1">
            {[1, 2, 3].map(starNum => (
              <Star 
                key={starNum} 
                id={`reading-star-${starNum}`}
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
      <div id="reading-main-content" className="max-w-4xl mx-auto space-y-8">
        <div id="reading-title-section" className="text-center space-y-2 animate-slide-up">
          <h1 id="reading-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Reading Stories
          </h1>
          <p id="reading-subtitle" className="text-xl text-gray-600">
            Read stories and comics to improve your English!
          </p>
        </div>

        {/* Story Card */}
        <Card id="story-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-8 animate-bounce-in border-2 border-purple-200">
          <div className="space-y-6 p-8">
            {/* Story Header */}
            <div id="story-header" className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                {currentStoryData.type === 'comic' ? (
                  <Image className="w-8 h-8 text-purple-600" />
                ) : (
                  <BookOpen className="w-8 h-8 text-purple-600" />
                )}
                <h2 id="story-title" className="text-3xl font-bold text-gray-800">
                  {currentStoryData.title}
                </h2>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Badge 
                  id="story-type-badge"
                  variant="outline" 
                  className={`px-4 py-2 ${
                    currentStoryData.type === 'comic' 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-green-50 text-green-700 border-green-200'
                  }`}
                >
                  {currentStoryData.type === 'comic' ? '📚 Comic' : '📖 Story'}
                </Badge>
                
                <Badge 
                  id="story-level-badge"
                  variant="outline" 
                  className={`px-4 py-2 ${
                    currentStoryData.level === 'beginner' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : currentStoryData.level === 'intermediate'
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  {currentStoryData.level}
                </Badge>
              </div>
            </div>

            {/* Story Content */}
            <div id="story-content" className="space-y-6">
              {/* Page Counter */}
              <div id="page-counter" className="flex justify-between items-center">
                <Badge id="page-badge" variant="outline" className="text-sm bg-purple-50 text-purple-700 border-purple-200">
                  Page {currentPage + 1} of {currentStoryData.content.length}
                </Badge>
                <div id="reading-level-indicator" className="text-sm text-gray-600 font-semibold">
                  Level 4
                </div>
              </div>

              {/* Story Text */}
              <div id="story-text-container" className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200">
                <div className="space-y-6">
                  {/* Comic Images */}
                  {currentStoryData.type === 'comic' && currentStoryData.images && (
                    <div id="comic-image" className="text-center">
                      <div className="text-8xl mb-4">
                        {currentStoryData.images[currentPage]}
                      </div>
                    </div>
                  )}
                  
                  {/* Story Text */}
                  <div id="story-text" className="text-center">
                    <p className="text-2xl font-medium text-gray-800 leading-relaxed">
                      {currentStoryData.content[currentPage]}
                    </p>
                  </div>
                  
                  {/* Audio Button */}
                  <div className="text-center">
                    <Button 
                      id="read-aloud-btn"
                      onClick={() => playSound(currentStoryData.content[currentPage])} 
                      variant="outline" 
                      className="rounded-full hover:scale-110 transition-transform bg-white shadow-md border-purple-200"
                    >
                      <Volume2 className="w-6 h-6 mr-2" />
                      Read Aloud
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div id="story-navigation" className="flex justify-between items-center">
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

                <div id="story-progress" className="flex-1 mx-8">
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div 
                      id="story-progress-bar"
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

              {/* Story Navigation */}
              <div id="story-story-navigation" className="flex gap-4 justify-center">
                <Button 
                  id="previous-story-btn"
                  onClick={handlePreviousStory}
                  disabled={currentStory === 0}
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform bg-white shadow-lg border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50"
                >
                  Previous Story
                </Button>
                
                <Button 
                  id="next-story-btn"
                  onClick={handleNextStory}
                  disabled={isLastStory}
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform bg-white shadow-lg border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50"
                >
                  Next Story
                </Button>
              </div>

              {/* Completion Message */}
              {isStoryCompleted && (
                <div id="story-completion-message" className="animate-bounce-in space-y-4 p-6 bg-gradient-to-r from-green-100 to-purple-100 rounded-2xl border-2 border-green-300 shadow-lg">
                  <div className="text-6xl animate-bounce mx-auto w-fit">🎉</div>
                  <p className="text-2xl font-bold text-green-600">
                    Story Completed!
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
                    All Stories Completed!
                  </h2>
                  <p className="text-xl text-gray-600">
                    You've read all the stories! You're becoming a great reader!
                  </p>
                  <Button 
                    id="reading-complete-btn"
                    onClick={onComplete} 
                    className="bg-gradient-to-r from-green-500 to-purple-500 text-white text-xl py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                    size="lg"
                  >
                    Continue Learning ⭐
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

export default ReadingLevel;
