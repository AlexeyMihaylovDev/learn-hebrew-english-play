import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface AlphabetLevelProps {
  onBack: () => void;
  onComplete: () => void;
}

const AlphabetLevel: React.FC<AlphabetLevelProps> = ({
  onBack,
  onComplete
}) => {
  const { t } = useLanguage();
  const [currentLetter, setCurrentLetter] = useState(0);
  const [stars, setStars] = useState(0);
  
  const alphabet = [
    { letter: 'A', phonetic: '/eɪ/', word: 'Apple', emoji: '🍎' },
    { letter: 'B', phonetic: '/biː/', word: 'Ball', emoji: '⚽' },
    { letter: 'C', phonetic: '/siː/', word: 'Cat', emoji: '🐱' },
    { letter: 'D', phonetic: '/diː/', word: 'Dog', emoji: '🐶' },
    { letter: 'E', phonetic: '/iː/', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', phonetic: '/ef/', word: 'Fish', emoji: '🐠' },
    { letter: 'G', phonetic: '/dʒiː/', word: 'Grape', emoji: '🍇' },
    { letter: 'H', phonetic: '/eɪtʃ/', word: 'House', emoji: '🏠' },
    { letter: 'I', phonetic: '/aɪ/', word: 'Ice cream', emoji: '🍦' },
    { letter: 'J', phonetic: '/dʒeɪ/', word: 'Juice', emoji: '🧃' },
    { letter: 'K', phonetic: '/keɪ/', word: 'Kite', emoji: '🪁' },
    { letter: 'L', phonetic: '/el/', word: 'Lion', emoji: '🦁' },
    { letter: 'M', phonetic: '/em/', word: 'Mouse', emoji: '🐭' },
    { letter: 'N', phonetic: '/en/', word: 'Nose', emoji: '👃' },
    { letter: 'O', phonetic: '/oʊ/', word: 'Orange', emoji: '🍊' },
    { letter: 'P', phonetic: '/piː/', word: 'Pizza', emoji: '🍕' },
    { letter: 'Q', phonetic: '/kjuː/', word: 'Queen', emoji: '👸' },
    { letter: 'R', phonetic: '/ɑr/', word: 'Rainbow', emoji: '🌈' },
    { letter: 'S', phonetic: '/es/', word: 'Sun', emoji: '☀️' },
    { letter: 'T', phonetic: '/tiː/', word: 'Tree', emoji: '🌳' },
    { letter: 'U', phonetic: '/juː/', word: 'Umbrella', emoji: '☂️' },
    { letter: 'V', phonetic: '/viː/', word: 'Violin', emoji: '🎻' },
    { letter: 'W', phonetic: '/ˈdʌbəljuː/', word: 'Water', emoji: '💧' },
    { letter: 'X', phonetic: '/eks/', word: 'Xylophone', emoji: '🎵' },
    { letter: 'Y', phonetic: '/waɪ/', word: 'Yacht', emoji: '⛵' },
    { letter: 'Z', phonetic: '/ziː/', word: 'Zebra', emoji: '🦓' }
  ];

  const playSound = async (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleLetterClick = () => {
    const currentAlphabet = alphabet[currentLetter];
    playSound(`${currentAlphabet.letter}. ${currentAlphabet.word}`);

    // Add star animation and progress
    setStars(prev => Math.min(prev + 1, 3));

    // Move to next letter after delay
    setTimeout(() => {
      if (currentLetter < alphabet.length - 1) {
        setCurrentLetter(prev => prev + 1);
        setStars(0); // Reset stars for new letter
      }
    }, 1500);
  };

  const handlePrevious = () => {
    if (currentLetter > 0) {
      setCurrentLetter(prev => prev - 1);
      setStars(0);
    }
  };

  const handleNext = () => {
    if (currentLetter < alphabet.length - 1) {
      setCurrentLetter(prev => prev + 1);
      setStars(0);
    }
  };

  const currentAlphabet = alphabet[currentLetter];

  // Safety check to prevent undefined errors
  if (!currentAlphabet) {
    return (
      <div id="alphabet-loading" className="min-h-screen p-4 flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div id="alphabet-level-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="alphabet-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="back-to-level-map-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('levelMap')}
        </Button>

        <div id="stars-container" className="flex items-center gap-2">
          {[1, 2, 3].map(starNum => (
            <Star 
              key={starNum} 
              id={`star-${starNum}`}
              className={`w-8 h-8 transition-all duration-300 ${
                starNum <= stars 
                  ? 'text-yellow-400 fill-yellow-400 animate-bounce' 
                  : 'text-gray-400'
              }`} 
            />
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div id="alphabet-main-content" className="max-w-2xl mx-auto space-y-8">
        <div id="alphabet-title-section" className="text-center space-y-2 animate-slide-up">
          <h1 id="alphabet-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('learnAlphabet')}
          </h1>
          <p id="alphabet-subtitle" className="text-xl text-gray-600">
            {t('letterSound')}
          </p>
        </div>

        {/* Letter Card */}
        <Card id="letter-card" className="bg-white/90 backdrop-blur-sm shadow-2xl text-center space-y-8 animate-bounce-in relative overflow-hidden border-2 border-purple-200">
          {/* Interactive Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 opacity-60" />
          
          <div className="relative space-y-6 p-8">
            {/* Large Letter Display with Interactive Zone */}
            <div id="letter-display-container" className="relative">
              <div 
                id="letter-display"
                onClick={handleLetterClick} 
                className="text-9xl font-bold text-purple-600 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-purple-700"
                style={{ 
                  textShadow: '0 0 40px rgba(147, 51, 234, 0.6)',
                  filter: 'drop-shadow(0 10px 20px rgba(147, 51, 234, 0.4))'
                }}
              >
                {currentAlphabet.letter}
              </div>
              
              {/* Click hint */}
              <div id="click-hint" className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 animate-pulse">
                👆 {t('letterSound')}
              </div>
            </div>

            {/* Word Example with Enhanced Layout */}
            <div id="word-example-container" className="space-y-6 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl border-2 border-purple-200 shadow-lg">
              {/* Large Emoji with Animation */}
              <div 
                id="word-emoji"
                className="text-8xl cursor-pointer transition-transform hover:scale-125 mx-auto w-fit"
                onClick={() => playSound(currentAlphabet.word)}
                style={{ 
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                  animation: 'wiggle 2s ease-in-out infinite'
                }}
              >
                {currentAlphabet.emoji}
              </div>
              
              {/* Word with Interactive Elements */}
              <div id="word-section" className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <p id="word-text" className="text-5xl font-bold text-gray-800 tracking-wide">
                    {currentAlphabet.word}
                  </p>
                  <Button
                    id="word-sound-btn"
                    onClick={() => playSound(currentAlphabet.word)}
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:scale-110 transition-transform bg-white shadow-md"
                  >
                    <Volume2 className="w-5 h-5" />
                  </Button>
                </div>
                
                <p id="letter-word-connection" className="text-xl text-gray-600 bg-white/70 px-6 py-3 rounded-full inline-block shadow-sm">
                  <span className="font-bold text-purple-600">{currentAlphabet.letter}</span> for <span className="font-semibold text-gray-800">{currentAlphabet.word}</span>
                </p>
              </div>
            </div>

            {/* Navigation and Practice Buttons */}
            <div id="action-buttons-container" className="flex flex-col gap-6">
              {/* Practice Button */}
              <Button 
                id="practice-together-btn"
                onClick={() => playSound(`${currentAlphabet.letter}. ${currentAlphabet.word}. Repeat: ${currentAlphabet.letter} for ${currentAlphabet.word}`)} 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                size="lg"
              >
                <Volume2 className="w-6 h-6 mr-3" />
                Practice Together
              </Button>
              
              {/* Navigation Buttons */}
              <div id="navigation-buttons" className="flex gap-4 justify-center">
                <Button 
                  id="previous-letter-btn"
                  onClick={handlePrevious}
                  disabled={currentLetter === 0}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-2 border-purple-200"
                >
                  <ChevronLeft className="w-8 h-8 text-purple-600" />
                </Button>
                
                <Button 
                  id="next-letter-btn"
                  onClick={handleNext}
                  disabled={currentLetter === alphabet.length - 1}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-2 border-purple-200"
                >
                  <ChevronRight className="w-8 h-8 text-purple-600" />
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div id="progress-section" className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span id="level-indicator">{t('level')} 1</span>
                <span id="progress-counter">{currentLetter + 1} / {alphabet.length}</span>
              </div>
              <div id="progress-bar-container" className="w-full bg-gray-200 h-4 rounded-full shadow-inner">
                <div 
                  id="progress-bar"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 shadow-lg" 
                  style={{
                    width: `${(currentLetter + 1) / alphabet.length * 100}%`
                  }} 
                />
              </div>
            </div>

            {/* Success Message */}
            {currentLetter === alphabet.length - 1 && (
              <div id="completion-message" className="animate-bounce-in space-y-6 p-8 bg-gradient-to-r from-green-100 to-purple-100 rounded-3xl border-2 border-green-300 shadow-xl">
                <div id="celebration-emoji" className="text-8xl animate-bounce mx-auto w-fit">🎉</div>
                <p id="well-done-text" className="text-4xl font-bold text-green-600">
                  {t('wellDone')}
                </p>
                <p id="completion-description" className="text-xl text-gray-600">
                  You've completed the alphabet! Ready for words?
                </p>
                <Button 
                  id="next-level-btn"
                  onClick={onComplete} 
                  className="w-full bg-gradient-to-r from-green-500 to-purple-500 text-white text-xl py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                  size="lg"
                >
                  {t('nextLevel')} ⭐
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlphabetLevel;