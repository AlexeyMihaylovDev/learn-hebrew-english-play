import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star, Check, X } from 'lucide-react';

interface WordsLevelProps {
  onBack: () => void;
  onComplete: () => void;
}

const WordsLevel: React.FC<WordsLevelProps> = ({
  onBack,
  onComplete
}) => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  
  const words = [
    {
      word: 'Cat',
      emoji: '🐱',
      options: ['🐱', '🐶', '🐭']
    },
    {
      word: 'Apple',
      emoji: '🍎',
      options: ['🍎', '🍊', '🍌']
    },
    {
      word: 'Sun',
      emoji: '☀️',
      options: ['☀️', '🌙', '⭐']
    },
    {
      word: 'House',
      emoji: '🏠',
      options: ['🏠', '🏫', '🏥']
    },
    {
      word: 'Car',
      emoji: '🚗',
      options: ['🚗', '🚲', '🚌']
    },
    {
      word: 'Fish',
      emoji: '🐠',
      options: ['🐠', '🐸', '🐦']
    },
    {
      word: 'Ball',
      emoji: '⚽',
      options: ['⚽', '🏀', '🎾']
    },
    {
      word: 'Tree',
      emoji: '🌳',
      options: ['🌳', '🌺', '🌵']
    }
  ];

  const currentWord = words[currentQuestion];

  const playSound = async (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (emoji: string) => {
    setSelectedAnswer(emoji);
    setCorrectAnswer(currentWord.emoji);
    setShowFeedback(true);
    if (emoji === currentWord.emoji) {
      setScore(prev => prev + 1);
    }
    setTimeout(() => {
      if (currentQuestion < words.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setShowFeedback(false);
        setSelectedAnswer(null);
        setCorrectAnswer(null);
      } else {
        // Level completed
        setShowFeedback(false);
      }
    }, 1500);
  };

  const resetLevel = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
  };

  const isCompleted = currentQuestion >= words.length - 1 && showFeedback;
  const progress = (currentQuestion + (showFeedback ? 1 : 0)) / words.length * 100;

  return (
    <div id="words-level-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="words-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="words-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('levelMap')}
        </Button>

        <div id="words-score-container" className="flex items-center gap-4">
          <Badge id="score-badge" variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
            Score: {score}/{words.length}
          </Badge>
          <div id="words-stars-container" className="flex items-center gap-1">
            {[1, 2, 3].map(starNum => (
              <Star 
                key={starNum} 
                id={`words-star-${starNum}`}
                className={`w-6 h-6 transition-all duration-300 ${
                  starNum <= Math.ceil(score / words.length * 3) 
                    ? 'text-yellow-400 fill-yellow-400 animate-bounce' 
                    : 'text-gray-400'
                }`} 
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div id="words-main-content" className="max-w-3xl mx-auto space-y-8">
        <div id="words-title-section" className="text-center space-y-2 animate-slide-up">
          <h1 id="words-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('wordsLevel')}
          </h1>
          <p id="words-subtitle" className="text-xl text-gray-600">
            Match the word with the correct picture!
          </p>
        </div>

        {!isCompleted ? (
          <Card id="words-game-card" className="bg-white/90 backdrop-blur-sm shadow-2xl text-center space-y-8 animate-bounce-in border-2 border-purple-200">
            <div className="space-y-6 p-8">
              {/* Question Counter */}
              <div id="question-counter" className="flex justify-between items-center">
                <Badge id="question-badge" variant="outline" className="text-sm bg-purple-50 text-purple-700 border-purple-200">
                  Question {currentQuestion + 1} of {words.length}
                </Badge>
                <div id="level-indicator" className="text-sm text-gray-600 font-semibold">
                  Level 2
                </div>
              </div>

              {/* Word Display */}
              <div id="word-display-section" className="space-y-4">
                <div 
                  id="current-word-display"
                  onClick={() => playSound(currentWord.word)} 
                  className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer transition-all duration-300 hover:scale-110"
                >
                  {currentWord.word}
                </div>
                
                <Button 
                  id="hear-word-btn"
                  onClick={() => playSound(currentWord.word)} 
                  variant="outline" 
                  className="rounded-full hover:scale-110 transition-transform bg-white shadow-md border-purple-200"
                >
                  <Volume2 className="w-5 h-5 mr-2" />
                  Hear Word
                </Button>
              </div>

              {/* Options */}
              <div id="options-grid" className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {currentWord.options.map((emoji, index) => (
                  <button 
                    key={index} 
                    id={`option-${index}`}
                    onClick={() => !showFeedback && handleAnswer(emoji)} 
                    disabled={showFeedback} 
                    className={`aspect-square p-6 rounded-2xl border-2 text-6xl relative transition-all duration-300 hover:scale-105
                      ${showFeedback && selectedAnswer === emoji 
                        ? emoji === correctAnswer 
                          ? 'border-green-500 bg-green-100 scale-110 shadow-lg' 
                          : 'border-red-500 bg-red-100 scale-95' 
                        : showFeedback && emoji === correctAnswer 
                          ? 'border-green-500 bg-green-100 scale-110 shadow-lg' 
                          : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50 bg-white shadow-md'
                      }
                      ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {emoji}
                    {showFeedback && selectedAnswer === emoji && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {emoji === correctAnswer ? (
                          <Check className="w-8 h-8 text-green-600 animate-bounce" />
                        ) : (
                          <X className="w-8 h-8 text-red-600 animate-bounce" />
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div 
                  id="feedback-message"
                  className={`animate-bounce-in p-6 rounded-2xl shadow-lg ${
                    selectedAnswer === correctAnswer 
                      ? 'bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300' 
                      : 'bg-gradient-to-r from-red-100 to-red-50 border-2 border-red-300'
                  }`}
                >
                  <p 
                    id="feedback-text"
                    className={`text-2xl font-bold ${
                      selectedAnswer === correctAnswer ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {selectedAnswer === correctAnswer 
                      ? 'Correct! Well done! 🎉' 
                      : `Not quite! It's ${currentWord.emoji}`
                    }
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              <div id="words-progress-section" className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span id="progress-label">Progress</span>
                  <span id="progress-percentage">{Math.round(progress)}%</span>
                </div>
                <div id="words-progress-container" className="w-full bg-gray-200 h-4 rounded-full shadow-inner">
                  <div 
                    id="words-progress-bar"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 shadow-lg" 
                    style={{
                      width: `${progress}%`
                    }} 
                  />
                </div>
              </div>
            </div>
          </Card>
        ) : (
          /* Completion Screen */
          <Card id="completion-card" className="bg-white/90 backdrop-blur-sm shadow-2xl text-center space-y-8 animate-bounce-in border-2 border-green-200">
            <div className="space-y-6 p-8">
              <div id="completion-emoji" className="text-8xl animate-bounce mx-auto w-fit">🎉</div>
              
              <div className="space-y-4">
                <h2 id="completion-title" className="text-4xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                  Level Complete!
                </h2>
                
                <div id="final-score-container" className="bg-gradient-to-r from-green-100 to-purple-100 rounded-3xl p-6 space-y-3 border-2 border-green-200 shadow-lg">
                  <p id="final-score-label" className="text-xl font-semibold text-gray-700">Final Score</p>
                  <div id="final-score-value" className="text-5xl font-bold text-green-600">
                    {score}/{words.length}
                  </div>
                  <p id="score-message" className="text-lg text-gray-600">
                    {score === words.length 
                      ? "Perfect! Amazing work!" 
                      : score >= words.length * 0.8 
                        ? "Great job! Well done!" 
                        : "Good effort! Keep practicing!"
                    }
                  </p>
                </div>

                <div id="completion-actions" className="flex gap-4 justify-center">
                  <Button 
                    id="try-again-btn"
                    onClick={resetLevel} 
                    variant="outline" 
                    size="lg" 
                    className="hover:scale-105 transition-transform bg-white shadow-lg border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Try Again
                  </Button>
                  
                  <Button 
                    id="next-level-completion-btn"
                    onClick={onComplete} 
                    className="bg-gradient-to-r from-green-500 to-purple-500 text-white text-xl py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                    size="lg"
                  >
                    Next Level ⭐
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WordsLevel;