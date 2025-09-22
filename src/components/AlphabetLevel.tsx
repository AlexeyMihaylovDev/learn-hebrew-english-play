import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star } from 'lucide-react';
interface AlphabetLevelProps {
  onBack: () => void;
}
const AlphabetLevel: React.FC<AlphabetLevelProps> = ({
  onBack
}) => {
  const {
    t
  } = useLanguage();
  const [currentLetter, setCurrentLetter] = useState(0);
  const [stars, setStars] = useState(0);
  const alphabet = [{
    letter: 'A',
    phonetic: '/eɪ/',
    word: 'Apple',
    emoji: '🍎'
  }, {
    letter: 'B',
    phonetic: '/biː/',
    word: 'Ball',
    emoji: '⚽'
  }, {
    letter: 'C',
    phonetic: '/siː/',
    word: 'Cat',
    emoji: '🐱'
  }, {
    letter: 'D',
    phonetic: '/diː/',
    word: 'Dog',
    emoji: '🐶'
  }, {
    letter: 'E',
    phonetic: '/iː/',
    word: 'Elephant',
    emoji: '🐘'
  }];
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
      }
    }, 1500);
  };
  const currentAlphabet = alphabet[currentLetter];
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
        <Card className="level-card text-center space-y-8 animate-bounce-in">
          <div className="space-y-6">
            {/* Large Letter Display */}
            <div onClick={handleLetterClick} className="text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer transition-all duration-300 hover:scale-110 animate-float bg-slate-200">
              {currentAlphabet.letter}
            </div>

            {/* Phonetic */}
            <div className="space-y-2">
              <p className="text-2xl text-muted-foreground font-mono">
                {currentAlphabet.phonetic}
              </p>
            </div>

            {/* Word Example */}
            <div className="space-y-4">
              <div className="text-6xl animate-wiggle">
                {currentAlphabet.emoji}
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-foreground">
                  {currentAlphabet.word}
                </p>
                <p className="text-lg text-muted-foreground">
                  {currentAlphabet.letter} for {currentAlphabet.word}
                </p>
              </div>
            </div>

            {/* Interactive Buttons */}
            <div className="flex gap-4 justify-center">
              <Button onClick={() => playSound(currentAlphabet.letter)} className="game-button bg-gradient-accent text-white" size="lg">
                <Volume2 className="w-5 h-5 mr-2" />
                {t('letterSound')}
              </Button>
              
              <Button onClick={() => playSound(currentAlphabet.word)} className="game-button bg-gradient-secondary text-white" size="lg">
                <Volume2 className="w-5 h-5 mr-2" />
                {currentAlphabet.word}
              </Button>
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
            {currentLetter === alphabet.length - 1 && stars >= 3 && <div className="animate-bounce-in space-y-4">
                <p className="text-2xl font-bold text-success">
                  {t('wellDone')} 🎉
                </p>
                <Button onClick={onBack} className="game-button bg-gradient-success text-white" size="lg">
                  {t('nextLevel')} ⭐
                </Button>
              </div>}
          </div>
        </Card>
      </div>
    </div>;
};
export default AlphabetLevel;