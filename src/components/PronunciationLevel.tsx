import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';

interface PronunciationLevelProps {
  onBack: () => void;
  onComplete: () => void;
}

const PronunciationLevel: React.FC<PronunciationLevelProps> = ({ onBack, onComplete }) => {
  const { t } = useLanguage();

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div id="pronunciation-level-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="pronunciation-level-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="pronunciation-level-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToLevelMap')}
        </Button>

        <div id="pronunciation-level-title" className="flex items-center gap-3">
          <Volume2 className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
            {t('pronunciationLevel')}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div id="pronunciation-level-main-content" className="max-w-4xl mx-auto space-y-8">
        
        {/* Level Info */}
        <Card id="pronunciation-level-info-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-6 animate-bounce-in border-2 border-teal-200">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Volume2 className="w-6 h-6 text-teal-600" />
              <h2 id="pronunciation-level-info-title" className="text-2xl font-bold text-gray-800">
                {t('pronunciationLevel')}
              </h2>
            </div>

            <p id="pronunciation-level-description" className="text-lg text-gray-600 mb-6">
              {t('pronunciationDesc')}
            </p>

            <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-6 border-2 border-teal-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t('comingSoon')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pronunciationLevelComingSoon')}
              </p>
            </div>
          </div>
        </Card>

        {/* Complete Button */}
        <div className="flex justify-center">
          <Button 
            id="pronunciation-level-complete-btn"
            onClick={handleComplete}
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3"
          >
            <Volume2 className="w-5 h-5 mr-2" />
            {t('markComplete')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PronunciationLevel;


