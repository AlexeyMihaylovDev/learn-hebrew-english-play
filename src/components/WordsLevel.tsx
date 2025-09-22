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
  const {
    t
  } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const words = [{
    word: 'Cat',
    emoji: '🐱',
    options: ['🐱', '🐶', '🐭']
  }, {
    word: 'Apple',
    emoji: '🍎',
    options: ['🍎', '🍊', '🍌']
  }, {
    word: 'Sun',
    emoji: '☀️',
    options: ['☀️', '🌙', '⭐']
  }, {
    word: 'House',
    emoji: '🏠',
    options: ['🏠', '🏫', '🏥']
  }, {
    word: 'Car',
    emoji: '🚗',
    options: ['🚗', '🚲', '🚌']
  }, {
    word: 'Fish',
    emoji: '🐠',
    options: ['🐠', '🐸', '🐦']
  }, {
    word: 'Ball',
    emoji: '⚽',
    options: ['⚽', '🏀', '🎾']
  }, {
    word: 'Tree',
    emoji: '🌳',
    options: ['🌳', '🌺', '🌵']
  }];
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
  return <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between animate-slide-up">
        <Button onClick={onBack} variant="outline" size="lg" className="bg-gradient-accent text-white border-none hover:scale-105">
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('levelMap')}
        </Button>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Score: {score}/{words.length}
          </Badge>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(starNum => <Star key={starNum} className={`w-6 h-6 transition-all duration-300 ${starNum <= Math.ceil(score / words.length * 3) ? 'text-star-gold fill-star-gold star-icon animate-bounce-in' : 'text-muted-foreground'}`} />)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2 animate-slide-up">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('wordsLevel')}
          </h1>
          <p className="text-lg text-muted-foreground">
            Match the word with the correct picture!
          </p>
        </div>

        {!isCompleted ? <Card className="level-card text-center space-y-8 animate-bounce-in">
            <div className="space-y-6">
              {/* Question Counter */}
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-sm">
                  Question {currentQuestion + 1} of {words.length}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Level 2
                </div>
              </div>

              {/* Word Display */}
              <div className="space-y-4">
                <div onClick={() => playSound(currentWord.word)} className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer transition-all duration-300 hover:scale-110 bg-slate-300">
                  {currentWord.word}
                </div>
                
                <Button onClick={() => playSound(currentWord.word)} variant="outline" className="rounded-full hover:scale-110 transition-transform">
                  <Volume2 className="w-5 h-5 mr-2" />
                  Hear Word
                </Button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {currentWord.options.map((emoji, index) => <button key={index} onClick={() => !showFeedback && handleAnswer(emoji)} disabled={showFeedback} className={`emoji-option aspect-square p-6 rounded-2xl border-2 text-6xl relative
                      ${showFeedback && selectedAnswer === emoji ? emoji === correctAnswer ? 'border-success bg-success/20 scale-110 feedback-success' : 'border-destructive bg-destructive/20 scale-95 feedback-error' : showFeedback && emoji === correctAnswer ? 'border-success bg-success/20 scale-110 feedback-success' : 'border-muted hover:border-primary hover:bg-primary/5'}
                      ${showFeedback ? 'cursor-not-allowed' : ''}
                    `}>
                    {emoji}
                    {showFeedback && selectedAnswer === emoji && <div className="absolute inset-0 flex items-center justify-center">
                        {emoji === correctAnswer ? <Check className="w-8 h-8 text-success animate-bounce-in" /> : <X className="w-8 h-8 text-destructive animate-bounce-in" />}
                      </div>}
                  </button>)}
              </div>

              {/* Feedback */}
              {showFeedback && <div className={`animate-bounce-in p-4 rounded-2xl ${selectedAnswer === correctAnswer ? 'bg-success/20 border-2 border-success/30' : 'bg-destructive/20 border-2 border-destructive/30'}`}>
                  <p className={`text-xl font-bold ${selectedAnswer === correctAnswer ? 'text-success' : 'text-destructive'}`}>
                    {selectedAnswer === correctAnswer ? 'Correct! Well done! 🎉' : `Not quite! It's ${currentWord.emoji}`}
                  </p>
                </div>}

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-muted h-3 rounded-full">
                  <div className="bg-gradient-primary h-3 rounded-full transition-all duration-500" style={{
                width: `${progress}%`
              }} />
                </div>
              </div>
            </div>
          </Card> : (/* Completion Screen */
      <Card className="level-card text-center space-y-8 animate-bounce-in">
            <div className="space-y-6 p-6">
              <div className="text-8xl animate-wiggle">🎉</div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-success bg-clip-text text-transparent">
                  Level Complete!
                </h2>
                
                <div className="bg-gradient-to-r from-success/20 to-primary/20 rounded-2xl p-6 space-y-3">
                  <p className="text-xl font-semibold">Final Score</p>
                  <div className="text-5xl font-bold text-success">
                    {score}/{words.length}
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {score === words.length ? "Perfect! Amazing work!" : score >= words.length * 0.8 ? "Great job! Well done!" : "Good effort! Keep practicing!"}
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={resetLevel} variant="outline" size="lg" className="hover:scale-105 transition-transform">
                    Try Again
                  </Button>
                  
                  <Button onClick={onComplete} className="game-button bg-gradient-success text-white" size="lg">
                    Next Level ⭐
                  </Button>
                </div>
              </div>
            </div>
          </Card>)}
      </div>
    </div>;
};
export default WordsLevel;