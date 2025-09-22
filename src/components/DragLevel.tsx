import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star, Check, X, RotateCcw } from 'lucide-react';

interface DragLevelProps {
  onBack: () => void;
  onComplete: () => void;
}

interface DragItem {
  id: string;
  word: string;
  emoji: string;
  correctPosition: number;
}

const DragLevel: React.FC<DragLevelProps> = ({
  onBack,
  onComplete
}) => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [draggedItems, setDraggedItems] = useState<{[key: string]: number}>({});
  const [correctAnswers, setCorrectAnswers] = useState<{[key: string]: number}>({});

  const dragQuestions = [
    {
      id: 1,
      title: 'Match the words with pictures',
      items: [
        { id: 'cat', word: 'Cat', emoji: '🐱', correctPosition: 0 },
        { id: 'dog', word: 'Dog', emoji: '🐶', correctPosition: 1 },
        { id: 'bird', word: 'Bird', emoji: '🐦', correctPosition: 2 }
      ],
      dropZones: [
        { id: 'zone-0', emoji: '🐱', position: 0 },
        { id: 'zone-1', emoji: '🐶', position: 1 },
        { id: 'zone-2', emoji: '🐦', position: 2 }
      ]
    },
    {
      id: 2,
      title: 'Match the fruits',
      items: [
        { id: 'apple', word: 'Apple', emoji: '🍎', correctPosition: 0 },
        { id: 'banana', word: 'Banana', emoji: '🍌', correctPosition: 1 },
        { id: 'orange', word: 'Orange', emoji: '🍊', correctPosition: 2 }
      ],
      dropZones: [
        { id: 'zone-0', emoji: '🍎', position: 0 },
        { id: 'zone-1', emoji: '🍌', position: 1 },
        { id: 'zone-2', emoji: '🍊', position: 2 }
      ]
    },
    {
      id: 3,
      title: 'Match the colors',
      items: [
        { id: 'red', word: 'Red', emoji: '🔴', correctPosition: 0 },
        { id: 'blue', word: 'Blue', emoji: '🔵', correctPosition: 1 },
        { id: 'green', word: 'Green', emoji: '🟢', correctPosition: 2 }
      ],
      dropZones: [
        { id: 'zone-0', emoji: '🔴', position: 0 },
        { id: 'zone-1', emoji: '🔵', position: 1 },
        { id: 'zone-2', emoji: '🟢', position: 2 }
      ]
    },
    {
      id: 4,
      title: 'Match the vehicles',
      items: [
        { id: 'car', word: 'Car', emoji: '🚗', correctPosition: 0 },
        { id: 'bus', word: 'Bus', emoji: '🚌', correctPosition: 1 },
        { id: 'bike', word: 'Bike', emoji: '🚲', correctPosition: 2 }
      ],
      dropZones: [
        { id: 'zone-0', emoji: '🚗', position: 0 },
        { id: 'zone-1', emoji: '🚌', position: 1 },
        { id: 'zone-2', emoji: '🚲', position: 2 }
      ]
    },
    {
      id: 5,
      title: 'Match the shapes',
      items: [
        { id: 'circle', word: 'Circle', emoji: '⭕', correctPosition: 0 },
        { id: 'square', word: 'Square', emoji: '⬜', correctPosition: 1 },
        { id: 'triangle', word: 'Triangle', emoji: '🔺', correctPosition: 2 }
      ],
      dropZones: [
        { id: 'zone-0', emoji: '⭕', position: 0 },
        { id: 'zone-1', emoji: '⬜', position: 1 },
        { id: 'zone-2', emoji: '🔺', position: 2 }
      ]
    }
  ];

  const currentQuestionData = dragQuestions[currentQuestion];

  const playSound = async (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropZonePosition: number) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    
    setDraggedItems(prev => ({
      ...prev,
      [itemId]: dropZonePosition
    }));
  };

  const checkAnswers = () => {
    const correctAnswers: {[key: string]: number} = {};
    let correctCount = 0;

    currentQuestionData.items.forEach(item => {
      correctAnswers[item.id] = item.correctPosition;
      if (draggedItems[item.id] === item.correctPosition) {
        correctCount++;
      }
    });

    setCorrectAnswers(correctAnswers);
    setShowFeedback(true);
    
    if (correctCount === currentQuestionData.items.length) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < dragQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setShowFeedback(false);
        setDraggedItems({});
        setCorrectAnswers({});
      } else {
        setShowFeedback(false);
      }
    }, 2000);
  };

  const resetQuestion = () => {
    setDraggedItems({});
    setCorrectAnswers({});
    setShowFeedback(false);
  };

  const resetLevel = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setDraggedItems({});
    setCorrectAnswers({});
  };

  const isCompleted = currentQuestion >= dragQuestions.length - 1 && showFeedback;
  const progress = (currentQuestion + (showFeedback ? 1 : 0)) / dragQuestions.length * 100;

  return (
    <div id="drag-level-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="drag-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="drag-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('levelMap')}
        </Button>

        <div id="drag-score-container" className="flex items-center gap-4">
          <Badge id="drag-score-badge" variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
            Score: {score}/{dragQuestions.length}
          </Badge>
          <div id="drag-stars-container" className="flex items-center gap-1">
            {[1, 2, 3].map(starNum => (
              <Star 
                key={starNum} 
                id={`drag-star-${starNum}`}
                className={`w-6 h-6 transition-all duration-300 ${
                  starNum <= Math.ceil(score / dragQuestions.length * 3) 
                    ? 'text-yellow-400 fill-yellow-400 animate-bounce' 
                    : 'text-gray-400'
                }`} 
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div id="drag-main-content" className="max-w-4xl mx-auto space-y-8">
        <div id="drag-title-section" className="text-center space-y-2 animate-slide-up">
          <h1 id="drag-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Drag & Drop Level
          </h1>
          <p id="drag-subtitle" className="text-xl text-gray-600">
            Drag the words to match the pictures!
          </p>
        </div>

        {!isCompleted ? (
          <Card id="drag-game-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-8 animate-bounce-in border-2 border-purple-200">
            <div className="space-y-6 p-8">
              {/* Question Counter */}
              <div id="drag-question-counter" className="flex justify-between items-center">
                <Badge id="drag-question-badge" variant="outline" className="text-sm bg-purple-50 text-purple-700 border-purple-200">
                  Question {currentQuestion + 1} of {dragQuestions.length}
                </Badge>
                <div id="drag-level-indicator" className="text-sm text-gray-600 font-semibold">
                  Level 3
                </div>
              </div>

              {/* Question Title */}
              <div id="drag-question-title" className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentQuestionData.title}
                </h2>
                <Button 
                  id="hear-question-btn"
                  onClick={() => playSound(currentQuestionData.title)} 
                  variant="outline" 
                  className="rounded-full hover:scale-110 transition-transform bg-white shadow-md border-purple-200"
                >
                  <Volume2 className="w-5 h-5 mr-2" />
                  Hear Question
                </Button>
              </div>

              {/* Drag and Drop Area */}
              <div id="drag-drop-area" className="space-y-8">
                {/* Drop Zones */}
                <div id="drop-zones" className="grid grid-cols-3 gap-6">
                  {currentQuestionData.dropZones.map((zone, index) => (
                    <div
                      key={zone.id}
                      id={`drop-zone-${index}`}
                      className={`aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-300 ${
                        Object.values(draggedItems).includes(zone.position)
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, zone.position)}
                    >
                      <div className="text-6xl mb-2">{zone.emoji}</div>
                      <div className="text-sm text-gray-600">Drop here</div>
                    </div>
                  ))}
                </div>

                {/* Draggable Items */}
                <div id="draggable-items" className="grid grid-cols-3 gap-6">
                  {currentQuestionData.items.map((item, index) => {
                    const isPlaced = draggedItems[item.id] !== undefined;
                    const isCorrect = correctAnswers[item.id] === draggedItems[item.id];
                    
                    return (
                      <div
                        key={item.id}
                        id={`draggable-item-${item.id}`}
                        draggable={!showFeedback}
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        className={`aspect-square border-2 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          showFeedback
                            ? isCorrect
                              ? 'border-green-500 bg-green-100'
                              : 'border-red-500 bg-red-100'
                            : isPlaced
                              ? 'border-purple-400 bg-purple-100 opacity-50'
                              : 'border-purple-200 bg-white shadow-md hover:shadow-lg'
                        }`}
                      >
                        <div className="text-4xl font-bold text-gray-800">
                          {item.word}
                        </div>
                        {showFeedback && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            {isCorrect ? (
                              <Check className="w-8 h-8 text-green-600 animate-bounce" />
                            ) : (
                              <X className="w-8 h-8 text-red-600 animate-bounce" />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div id="drag-action-buttons" className="flex gap-4 justify-center">
                <Button 
                  id="reset-question-btn"
                  onClick={resetQuestion}
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform bg-white shadow-lg border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
                
                <Button 
                  id="check-answers-btn"
                  onClick={checkAnswers}
                  disabled={Object.keys(draggedItems).length !== currentQuestionData.items.length}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  size="lg"
                >
                  Check Answers
                </Button>
              </div>

              {/* Progress Bar */}
              <div id="drag-progress-section" className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span id="drag-progress-label">Progress</span>
                  <span id="drag-progress-percentage">{Math.round(progress)}%</span>
                </div>
                <div id="drag-progress-container" className="w-full bg-gray-200 h-4 rounded-full shadow-inner">
                  <div 
                    id="drag-progress-bar"
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
          <Card id="drag-completion-card" className="bg-white/90 backdrop-blur-sm shadow-2xl text-center space-y-8 animate-bounce-in border-2 border-green-200">
            <div className="space-y-6 p-8">
              <div id="drag-completion-emoji" className="text-8xl animate-bounce mx-auto w-fit">🎉</div>
              
              <div className="space-y-4">
                <h2 id="drag-completion-title" className="text-4xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                  Level Complete!
                </h2>
                
                <div id="drag-final-score-container" className="bg-gradient-to-r from-green-100 to-purple-100 rounded-3xl p-6 space-y-3 border-2 border-green-200 shadow-lg">
                  <p id="drag-final-score-label" className="text-xl font-semibold text-gray-700">Final Score</p>
                  <div id="drag-final-score-value" className="text-5xl font-bold text-green-600">
                    {score}/{dragQuestions.length}
                  </div>
                  <p id="drag-score-message" className="text-lg text-gray-600">
                    {score === dragQuestions.length 
                      ? "Perfect! Amazing work!" 
                      : score >= dragQuestions.length * 0.8 
                        ? "Great job! Well done!" 
                        : "Good effort! Keep practicing!"
                    }
                  </p>
                </div>

                <div id="drag-completion-actions" className="flex gap-4 justify-center">
                  <Button 
                    id="drag-try-again-btn"
                    onClick={resetLevel} 
                    variant="outline" 
                    size="lg" 
                    className="hover:scale-105 transition-transform bg-white shadow-lg border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Try Again
                  </Button>
                  
                  <Button 
                    id="drag-next-level-btn"
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

export default DragLevel;
