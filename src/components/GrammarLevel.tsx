import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ArrowLeft, Star, BookOpen, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

interface GrammarRule {
  id: number;
  title: string;
  rule: string;
  examples: string[];
  translations: string[];
  category: string;
}

interface GrammarLevelProps {
  onBack: () => void;
  onComplete: () => void;
}

const GrammarLevel: React.FC<GrammarLevelProps> = ({
  onBack,
  onComplete
}) => {
  const { t } = useLanguage();
  const [currentRule, setCurrentRule] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedRules, setCompletedRules] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);

  const grammarRules: GrammarRule[] = [
    {
      id: 1,
      title: "Present Simple",
      rule: "Use Present Simple for habits, facts, and general truths",
      examples: [
        "I eat breakfast every day.",
        "She works in a hospital.",
        "The sun rises in the east."
      ],
      translations: [
        "אני אוכל ארוחת בוקר כל יום.",
        "היא עובדת בבית חולים.",
        "השמש זורחת במזרח."
      ],
      category: "Tenses"
    },
    {
      id: 2,
      title: "Present Continuous",
      rule: "Use Present Continuous for actions happening now",
      examples: [
        "I am reading a book.",
        "She is cooking dinner.",
        "They are playing football."
      ],
      translations: [
        "אני קורא ספר.",
        "היא מבשלת ארוחת ערב.",
        "הם משחקים כדורגל."
      ],
      category: "Tenses"
    },
    {
      id: 3,
      title: "Past Simple",
      rule: "Use Past Simple for completed actions in the past",
      examples: [
        "I went to school yesterday.",
        "She finished her homework.",
        "They visited their grandparents."
      ],
      translations: [
        "הלכתי לבית הספר אתמול.",
        "היא סיימה את השיעורים שלה.",
        "הם ביקרו את הסבים שלהם."
      ],
      category: "Tenses"
    },
    {
      id: 4,
      title: "Articles: A/An/The",
      rule: "Use 'a' before consonant sounds, 'an' before vowel sounds, 'the' for specific things",
      examples: [
        "A cat is sleeping.",
        "An apple is red.",
        "The book is interesting."
      ],
      translations: [
        "חתול ישן.",
        "תפוח אדום.",
        "הספר מעניין."
      ],
      category: "Articles"
    },
    {
      id: 5,
      title: "Plural Nouns",
      rule: "Add 's' to most nouns, 'es' to nouns ending in s, sh, ch, x, z",
      examples: [
        "One cat, two cats.",
        "One box, two boxes.",
        "One dish, two dishes."
      ],
      translations: [
        "חתול אחד, שני חתולים.",
        "קופסה אחת, שתי קופסאות.",
        "צלחת אחת, שתי צלחות."
      ],
      category: "Nouns"
    },
    {
      id: 6,
      title: "Adjectives",
      rule: "Adjectives describe nouns and come before the noun",
      examples: [
        "A big house.",
        "A beautiful flower.",
        "A smart student."
      ],
      translations: [
        "בית גדול.",
        "פרח יפה.",
        "תלמיד חכם."
      ],
      category: "Adjectives"
    },
    {
      id: 7,
      title: "Prepositions",
      rule: "Prepositions show relationships between words",
      examples: [
        "The book is on the table.",
        "I go to school.",
        "She lives in the city."
      ],
      translations: [
        "הספר על השולחן.",
        "אני הולך לבית הספר.",
        "היא גרה בעיר."
      ],
      category: "Prepositions"
    },
    {
      id: 8,
      title: "Question Words",
      rule: "Use question words to ask for specific information",
      examples: [
        "What is your name?",
        "Where do you live?",
        "When do you go to school?"
      ],
      translations: [
        "מה השם שלך?",
        "איפה אתה גר?",
        "מתי אתה הולך לבית הספר?"
      ],
      category: "Questions"
    }
  ];

  const currentRuleData = grammarRules[currentRule];

  const playSound = async (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextRule = () => {
    if (currentRule < grammarRules.length - 1) {
      setCurrentRule(prev => prev + 1);
      setShowTranslation(false);
    }
  };

  const handlePreviousRule = () => {
    if (currentRule > 0) {
      setCurrentRule(prev => prev - 1);
      setShowTranslation(false);
    }
  };

  const handleRuleComplete = () => {
    if (!completedRules.has(currentRuleData.id)) {
      setCompletedRules(prev => new Set([...prev, currentRuleData.id]));
      setScore(prev => prev + 15);
    }
  };

  const isRuleCompleted = completedRules.has(currentRuleData.id);
  const isLastRule = currentRule === grammarRules.length - 1;
  const allRulesCompleted = completedRules.size === grammarRules.length;

  return (
    <div id="grammar-level-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="grammar-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="grammar-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToLevelMap')}
        </Button>

        <div id="grammar-info-container" className="flex items-center gap-4">
          <Badge id="rule-counter-badge" variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
            {t('rule')} {currentRule + 1} {t('of')} {grammarRules.length}
          </Badge>
          <div id="grammar-score" className="text-lg font-bold text-purple-600">
            {t('score')}: {score}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div id="grammar-main-content" className="max-w-4xl mx-auto space-y-8">
        <div id="grammar-title-section" className="text-center space-y-2 animate-slide-up">
          <h1 id="grammar-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('grammarLevel')}
          </h1>
          <p id="grammar-subtitle" className="text-xl text-gray-600">
            {t('grammarDesc')}
          </p>
        </div>

        {/* Grammar Rule Card */}
        <Card id="grammar-rule-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-8 animate-bounce-in border-2 border-purple-200">
          <div className="space-y-6 p-8">
            {/* Rule Header */}
            <div id="grammar-rule-header" className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <h2 id="grammar-rule-title" className="text-3xl font-bold text-gray-800">
                  {currentRuleData.title}
                </h2>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Badge 
                  id="grammar-category-badge"
                  variant="outline" 
                  className="px-4 py-2 bg-green-50 text-green-700 border-green-200"
                >
                  {currentRuleData.category}
                </Badge>
                
                <Badge 
                  id="grammar-level-badge"
                  variant="outline" 
                  className="px-4 py-2 bg-blue-50 text-blue-700 border-blue-200"
                >
                  Level 4
                </Badge>
              </div>
            </div>

            {/* Rule Content */}
            <div id="grammar-rule-content" className="space-y-6">
              {/* Rule Explanation */}
              <div id="rule-explanation" className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {t('rule')}
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {currentRuleData.rule}
                  </p>
                </div>
              </div>

              {/* Examples */}
              <div id="examples-section" className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 text-center">
                  {t('examples')}
                </h3>
                
                <div className="space-y-3">
                  {currentRuleData.examples.map((example, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-4 border-2 border-blue-200">
                      <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-800">
                          {example}
                        </p>
                        
                        {showTranslation && (
                          <p className="text-base text-blue-700">
                            {currentRuleData.translations[index]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
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

              {/* Completion Button */}
              <div className="text-center">
                <Button 
                  id="complete-rule-btn"
                  onClick={handleRuleComplete}
                  disabled={isRuleCompleted}
                  className={`text-xl py-4 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    isRuleCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}
                  size="lg"
                >
                  {isRuleCompleted ? (
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
              <div id="grammar-navigation" className="flex justify-between items-center">
                <Button 
                  id="previous-rule-btn"
                  onClick={handlePreviousRule}
                  disabled={currentRule === 0}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-purple-200"
                >
                  <ChevronLeft className="w-8 h-8 text-purple-600" />
                </Button>

                <div id="grammar-progress" className="flex-1 mx-8">
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div 
                      id="grammar-progress-bar"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg" 
                      style={{
                        width: `${((currentRule + 1) / grammarRules.length) * 100}%`
                      }} 
                    />
                  </div>
                </div>

                <Button 
                  id="next-rule-btn"
                  onClick={handleNextRule}
                  disabled={isLastRule}
                  variant="outline"
                  size="lg"
                  className="rounded-full w-16 h-16 hover:scale-110 transition-transform disabled:opacity-50 bg-white shadow-lg border-purple-200"
                >
                  <ChevronRight className="w-8 h-8 text-purple-600" />
                </Button>
              </div>

              {/* Final Completion */}
              {allRulesCompleted && (
                <div id="final-completion" className="animate-bounce-in space-y-6 p-8 bg-gradient-to-r from-green-100 to-purple-100 rounded-3xl border-2 border-green-300 shadow-xl">
                  <div className="text-8xl animate-bounce mx-auto w-fit">🏆</div>
                  <h2 className="text-4xl font-bold text-green-600">
                    {t('levelComplete')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {t('finalScore')}: {score} {t('points')}
                  </p>
                  <p className="text-lg text-gray-600">
                    You've mastered basic grammar! Excellent work!
                  </p>
                  <Button 
                    id="grammar-complete-btn"
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

export default GrammarLevel;
