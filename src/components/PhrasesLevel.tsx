import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star, MessageSquare, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

interface Phrase {
  id: number;
  english: string;
  hebrew: string;
  category: string;
  example: string;
  exampleTranslation: string;
}

interface PhrasesLevelProps {
  onBack: () => void;
  onComplete: () => void;
}

const PhrasesLevel: React.FC<PhrasesLevelProps> = ({
  onBack,
  onComplete
}) => {
  const { t } = useLanguage();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [completedPhrases, setCompletedPhrases] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);

  const phrases: Phrase[] = [
    {
      id: 1,
      english: "Hello, how are you?",
      hebrew: "שלום, איך אתה?",
      category: "Greetings",
      example: "Hello, how are you today?",
      exampleTranslation: "שלום, איך אתה היום?"
    },
    {
      id: 2,
      english: "Nice to meet you",
      hebrew: "נעים להכיר",
      category: "Greetings",
      example: "Nice to meet you, my name is Sarah.",
      exampleTranslation: "נעים להכיר, השם שלי שרה."
    },
    {
      id: 3,
      english: "Thank you very much",
      hebrew: "תודה רבה",
      category: "Politeness",
      example: "Thank you very much for your help.",
      exampleTranslation: "תודה רבה על העזרה שלך."
    },
    {
      id: 4,
      english: "You're welcome",
      hebrew: "בבקשה",
      category: "Politeness",
      example: "You're welcome, it was my pleasure.",
      exampleTranslation: "בבקשה, זה היה העונג שלי."
    },
    {
      id: 5,
      english: "Excuse me",
      hebrew: "סליחה",
      category: "Politeness",
      example: "Excuse me, where is the bathroom?",
      exampleTranslation: "סליחה, איפה השירותים?"
    },
    {
      id: 6,
      english: "I don't understand",
      hebrew: "אני לא מבין",
      category: "Communication",
      example: "I don't understand this word.",
      exampleTranslation: "אני לא מבין את המילה הזאת."
    },
    {
      id: 7,
      english: "Can you help me?",
      hebrew: "אתה יכול לעזור לי?",
      category: "Requests",
      example: "Can you help me with my homework?",
      exampleTranslation: "אתה יכול לעזור לי עם השיעורים?"
    },
    {
      id: 8,
      english: "What time is it?",
      hebrew: "מה השעה?",
      category: "Questions",
      example: "What time is it? I need to go.",
      exampleTranslation: "מה השעה? אני צריך ללכת."
    },
    {
      id: 9,
      english: "How much does it cost?",
      hebrew: "כמה זה עולה?",
      category: "Shopping",
      example: "How much does this shirt cost?",
      exampleTranslation: "כמה החולצה הזאת עולה?"
    },
    {
      id: 10,
      english: "I'm sorry",
      hebrew: "אני מצטער",
      category: "Apologies",
      example: "I'm sorry for being late.",
      exampleTranslation: "אני מצטער על האיחור."
    }
  ];

  const currentPhraseData = phrases[currentPhrase];

  const playSound = async (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(prev => prev + 1);
      setShowTranslation(false);
      setShowExample(false);
    }
  };

  const handlePreviousPhrase = () => {
    if (currentPhrase > 0) {
      setCurrentPhrase(prev => prev - 1);
      setShowTranslation(false);
      setShowExample(false);
    }
  };

  const handlePhraseComplete = () => {
    if (!completedPhrases.has(currentPhraseData.id)) {
      setCompletedPhrases(prev => new Set([...prev, currentPhraseData.id]));
      setScore(prev => prev + 10);
    }
  };

  const isPhraseCompleted = completedPhrases.has(currentPhraseData.id);
  const isLastPhrase = currentPhrase === phrases.length - 1;
  const allPhrasesCompleted = completedPhrases.size === phrases.length;

  return (
    <div id="phrases-level-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="phrases-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="phrases-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToLevelMap')}
        </Button>

        <div id="phrases-info-container" className="flex items-center gap-4">
          <Badge id="phrase-counter-badge" variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
            {t('phrase')} {currentPhrase + 1} {t('of')} {phrases.length}
          </Badge>
          <div id="phrases-score" className="text-lg font-bold text-purple-600">
            {t('score')}: {score}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div id="phrases-main-content" className="max-w-4xl mx-auto space-y-8">
        <div id="phrases-title-section" className="text-center space-y-2 animate-slide-up">
          <h1 id="phrases-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('phrasesLevel')}
          </h1>
          <p id="phrases-subtitle" className="text-xl text-gray-600">
            {t('phrasesDesc')}
          </p>
        </div>

        {/* Phrase Card */}
        <Card id="phrase-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-8 animate-bounce-in border-2 border-purple-200">
          <div className="space-y-6 p-8">
            {/* Phrase Header */}
            <div id="phrase-header" className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <h2 id="phrase-category" className="text-2xl font-bold text-gray-800">
                  {currentPhraseData.category}
                </h2>
              </div>
              
              <Badge 
                id="phrase-level-badge"
                variant="outline" 
                className="px-4 py-2 bg-blue-50 text-blue-700 border-blue-200"
              >
                Level 3
              </Badge>
            </div>

            {/* Phrase Content */}
            <div id="phrase-content" className="space-y-6">
              {/* English Phrase */}
              <div id="english-phrase" className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold text-gray-800">
                    {currentPhraseData.english}
                  </h3>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center">
                    <Button 
                      id="read-aloud-btn"
                      onClick={() => playSound(currentPhraseData.english)} 
                      variant="outline" 
                      className="rounded-full hover:scale-110 transition-transform bg-white shadow-md border-purple-200"
                    >
                      <Volume2 className="w-6 h-6 mr-2" />
                      {t('readAloud')}
                    </Button>
                    
                    <Button 
                      id="show-translation-btn"
                      onClick={() => setShowTranslation(!showTranslation)} 
                      variant="outline" 
                      className={`rounded-full hover:scale-110 transition-transform shadow-md ${
                        showTranslation 
                          ? 'bg-blue-100 text-blue-700 border-blue-300' 
                          : 'bg-white border-purple-200'
                      }`}
                    >
                      {showTranslation ? t('hideTranslation') : t('showTranslation')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hebrew Translation */}
              {showTranslation && (
                <div id="hebrew-translation" className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 animate-slide-up">
                  <h4 className="text-2xl font-bold text-blue-800 text-center">
                    {currentPhraseData.hebrew}
                  </h4>
                </div>
              )}

              {/* Example */}
              <div id="example-section" className="space-y-4">
                <Button 
                  id="show-example-btn"
                  onClick={() => setShowExample(!showExample)} 
                  variant="outline" 
                  className="w-full hover:scale-105 transition-transform bg-white shadow-md border-purple-200"
                >
                  {showExample ? t('hideExample') : t('showExample')}
                </Button>
                
                {showExample && (
                  <div id="example-content" className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200 animate-slide-up">
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-green-800">{t('example')}:</h4>
                      <p className="text-xl text-gray-800">{currentPhraseData.example}</p>
                      <p className="text-lg text-green-700">{currentPhraseData.exampleTranslation}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Completion Button */}
              <div className="text-center">
                <Button 
                  id="complete-phrase-btn"
                  onClick={handlePhraseComplete}
                  disabled={isPhraseCompleted}
                  className={`text-xl py-4 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    isPhraseCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}
                  size="lg"
                >
                  {isPhraseCompleted ? (
                    <>
                      <CheckCircle className="w-6 h-6 mr-2" />
                      {t('completed')}
                    </>
                  ) : (
                    <>
                      <Star className="w-6 h-6 mr-2" />
                      {t('markComplete')}
                    </>
                  )}
                </Button>
              </div>

              {/* Navigation */}
              <div id="phrase-navigation" className="flex justify-between items-center">
                <Button 
                  id="previous-phrase-btn"
                  onClick={handlePreviousPhrase}
                  disabled={currentPhrase === 0}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-purple-200"
                >
                  <ChevronLeft className="w-8 h-8 text-purple-600" />
                </Button>

                <div id="phrase-progress" className="flex-1 mx-8">
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div 
                      id="phrase-progress-bar"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg" 
                      style={{
                        width: `${((currentPhrase + 1) / phrases.length) * 100}%`
                      }} 
                    />
                  </div>
                </div>

                <Button 
                  id="next-phrase-btn"
                  onClick={handleNextPhrase}
                  disabled={isLastPhrase}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-purple-200"
                >
                  <ChevronRight className="w-8 h-8 text-purple-600" />
                </Button>
              </div>

              {/* Final Completion */}
              {allPhrasesCompleted && (
                <div id="final-completion" className="animate-bounce-in space-y-6 p-8 bg-gradient-to-r from-green-100 to-purple-100 rounded-3xl border-2 border-green-300 shadow-xl">
                  <div className="text-8xl animate-bounce mx-auto w-fit">🏆</div>
                  <h2 className="text-4xl font-bold text-green-600">
                    {t('levelComplete')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {t('finalScore')}: {score} {t('points')}
                  </p>
                  <p className="text-lg text-gray-600">
                    You've learned all the useful phrases! Great job!
                  </p>
                  <Button 
                    id="phrases-complete-btn"
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

export default PhrasesLevel;
