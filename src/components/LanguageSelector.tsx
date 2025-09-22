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
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="level-card max-w-md w-full animate-bounce-in">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent text-shadow">
              {t('welcomeTitle')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('welcomeSubtitle')}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              {t('chooseLanguage')}
            </h2>
            
            <div className="grid gap-4">
              <Button
                onClick={() => handleSelectLanguage('he')}
                variant={language === 'he' ? 'default' : 'outline'}
                size="lg"
                className={`game-button text-xl ${language === 'he' ? 'bg-gradient-primary' : ''} 
                  transition-all duration-300 hover:scale-105`}
              >
                🇮🇱 עברית
              </Button>
              
              <Button
                onClick={() => handleSelectLanguage('en')}
                variant={language === 'en' ? 'default' : 'outline'}
                size="lg"
                className={`game-button text-xl ${language === 'en' ? 'bg-gradient-primary' : ''} 
                  transition-all duration-300 hover:scale-105`}
              >
                🇺🇸 English
              </Button>
            </div>

            <Button
              onClick={onLanguageSelected}
              className="w-full game-button bg-gradient-secondary text-xl mt-6"
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