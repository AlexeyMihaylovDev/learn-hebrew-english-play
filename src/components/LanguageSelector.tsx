import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  onLanguageSelected: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelected }) => {
  const { language, setLanguage, t } = useLanguage();

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setTimeout(onLanguageSelected, 300); // Small delay for smooth transition
  };

  return (
    <div id="language-selector-container" className="flex min-h-screen items-center justify-center p-4">
      <Card id="language-selector-card" className="bg-white/90 backdrop-blur-sm shadow-2xl max-w-md w-full animate-bounce-in border-2 border-purple-200">
        <div className="text-center space-y-6 p-8">
          <div id="welcome-section" className="space-y-2">
            <h1 id="welcome-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('welcomeTitle')}
            </h1>
            <p id="welcome-subtitle" className="text-xl text-gray-600">
              {t('welcomeSubtitle')}
            </p>
          </div>

          <div id="language-selection-section" className="space-y-4">
            <h2 id="choose-language-title" className="text-2xl font-semibold text-gray-800">
              {t('chooseLanguage')}
            </h2>
            
            <div id="language-buttons" className="grid gap-4">
              <Button
                id="hebrew-language-btn"
                onClick={() => handleSelectLanguage('he')}
                variant={language === 'he' ? 'default' : 'outline'}
                size="lg"
                className={`text-xl transition-all duration-300 hover:scale-105 ${
                  language === 'he' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50'
                }`}
              >
                🇮🇱 עברית
              </Button>
              
              <Button
                id="english-language-btn"
                onClick={() => handleSelectLanguage('en')}
                variant={language === 'en' ? 'default' : 'outline'}
                size="lg"
                className={`text-xl transition-all duration-300 hover:scale-105 ${
                  language === 'en' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50'
                }`}
              >
                🇺🇸 English
              </Button>
            </div>

            <Button
              id="start-learning-btn"
              onClick={onLanguageSelected}
              className="w-full bg-gradient-to-r from-green-500 to-purple-500 text-white text-xl py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              {t('startLearning')} ✨
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LanguageSelector;