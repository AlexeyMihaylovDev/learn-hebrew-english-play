import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star } from 'lucide-react';
interface AlphabetLevelProps {
  onBack: () => void;
  onComplete: () => void;
}
const AlphabetLevel: React.FC<AlphabetLevelProps> = ({
  onBack,
  onComplete
}) => {
  const {
    t
  } = useLanguage();
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
    return <div className="min-h-screen p-4 flex items-center justify-center">
      <p className="text-lg">Loading...</p>
    </div>;
  }

  return <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between animate-slide-up">
        <Button onClick={onBack} variant="outline" size="lg" className="bg-gradient-accent text-white border-none hover:scale-105">
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('levelMap')}
        </Button>

        <div className="flex items-center gap-2">
          {[1, 2, 3].map(starNum => <Star key={starNum} className={`w-8 h-8 transition-all duration-300 ${starNum <= stars ? 'text-star-gold fill-star-gold star-icon animate-bounce-in' : 'text-muted-foreground'}`} />)}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2 animate-slide-up">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('learnAlphabet')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('letterSound')}
          </p>
        </div>

        {/* Letter Card */}
        <Card className="level-card text-center space-y-8 animate-bounce-in relative overflow-hidden">
          {/* Interactive Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 opacity-50" />
          
          <div className="relative space-y-6">
            {/* Large Letter Display with Interactive Zone */}
            <div className="relative">
              <div 
                onClick={handleLetterClick} 
                className="letter-display text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-float"
                style={{ 
                  textShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
                  filter: 'drop-shadow(0 8px 16px rgba(168, 85, 247, 0.3))'
                }}
              >
                {currentAlphabet.letter}
              </div>
              
              {/* Click hint */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground animate-pulse">
                👆 {t('letterSound')}
              </div>
            </div>

            {/* Phonetic with sound button */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3">
                <p className="text-2xl text-muted-foreground font-mono bg-muted/30 px-4 py-2 rounded-full">
                  {currentAlphabet.phonetic}
                </p>
                <Button
                  onClick={() => playSound(currentAlphabet.letter)}
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Word Example with Enhanced Layout */}
            <div className="space-y-6 p-6 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-2xl border-2 border-primary/20">
              {/* Large Emoji with Animation */}
              <div 
                className="text-8xl cursor-pointer transition-transform hover:scale-125 emoji-option"
                onClick={() => playSound(currentAlphabet.word)}
                style={{ 
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                  animation: 'wiggle 2s ease-in-out infinite'
                }}
              >
                {currentAlphabet.emoji}
              </div>
              
              {/* Word with Interactive Elements */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <p className="text-4xl font-bold text-foreground tracking-wide">
                    {currentAlphabet.word}
                  </p>
                  <Button
                    onClick={() => playSound(currentAlphabet.word)}
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:scale-110 transition-transform"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-lg text-muted-foreground bg-background/50 px-4 py-2 rounded-full inline-block">
                  <span className="font-bold text-primary">{currentAlphabet.letter}</span> for <span className="font-semibold">{currentAlphabet.word}</span>
                </p>
              </div>
            </div>

            {/* Navigation and Practice Buttons */}
            <div className="flex flex-col gap-4">
              {/* Practice Button */}
              <Button 
                onClick={() => playSound(`${currentAlphabet.letter}. ${currentAlphabet.word}. Repeat: ${currentAlphabet.letter} for ${currentAlphabet.word}`)} 
                className="game-button bg-gradient-primary text-white w-full" 
                size="lg"
              >
                <Volume2 className="w-5 h-5 mr-2" />
                Practice Together
              </Button>
              
              {/* Navigation Buttons */}
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={handlePrevious}
                  disabled={currentLetter === 0}
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform disabled:opacity-50"
                >
                  ← Previous
                </Button>
                
                <Button 
                  onClick={handleNext}
                  disabled={currentLetter === alphabet.length - 1}
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Next →
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{t('level')} 1</span>
                <span>{currentLetter + 1} / {alphabet.length}</span>
              </div>
              <div className="w-full bg-muted h-3 rounded-full">
                <div className="bg-gradient-primary h-3 rounded-full transition-all duration-500" style={{
                width: `${(currentLetter + 1) / alphabet.length * 100}%`
              }} />
              </div>
            </div>

            {/* Success Message */}
            {currentLetter === alphabet.length - 1 && <div className="animate-bounce-in space-y-4 p-6 bg-gradient-to-r from-success/20 to-primary/20 rounded-2xl border-2 border-success/30">
                <div className="text-6xl animate-wiggle">🎉</div>
                <p className="text-3xl font-bold text-success">
                  {t('wellDone')}
                </p>
                <p className="text-lg text-muted-foreground">
                  You've completed the alphabet! Ready for words?
                </p>
                <Button onClick={onComplete} className="game-button bg-gradient-success text-white" size="lg">
                  {t('nextLevel')} ⭐
                </Button>
              </div>}
          </div>
        </Card>
      </div>
    </div>;
};
export default AlphabetLevel;