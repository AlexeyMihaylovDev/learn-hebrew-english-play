import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Lock, Play } from 'lucide-react';
import alphabetIcon from '@/assets/alphabet-icon.jpg';
import wordsIcon from '@/assets/words-icon.jpg';

interface Level {
  id: number;
  titleKey: string;
  descKey: string;
  icon: string;
  completed: boolean;
  stars: number;
  locked: boolean;
}

interface LevelMapProps {
  onSelectLevel: (levelId: number) => void;
}

const LevelMap: React.FC<LevelMapProps> = ({ onSelectLevel }) => {
  const { t } = useLanguage();

  const levels: Level[] = [
    {
      id: 1,
      titleKey: 'alphabetLevel',
      descKey: 'alphabetDesc',
      icon: alphabetIcon,
      completed: false,
      stars: 0,
      locked: false
    },
    {
      id: 2,
      titleKey: 'wordsLevel',
      descKey: 'wordsDesc',
      icon: wordsIcon,
      completed: false,
      stars: 0,
      locked: true
    },
    {
      id: 3,
      titleKey: 'phrasesLevel',
      descKey: 'phrasesDesc',
      icon: alphabetIcon, // Placeholder
      completed: false,
      stars: 0,
      locked: true
    }
  ];

  return (
    <div className="min-h-screen p-4 space-y-6">
      <header className="text-center space-y-2 animate-slide-up">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent text-shadow">
          {t('levelMap')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('chooseLanguage')}
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((level, index) => (
          <Card 
            key={level.id}
            className={`level-card relative overflow-hidden ${level.locked ? 'opacity-60' : ''} 
              animate-bounce-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              {/* Level Image */}
              <div className="aspect-square w-full mb-4 relative overflow-hidden rounded-2xl">
                <img 
                  src={level.icon} 
                  alt={t(level.titleKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Level Number Badge */}
                <Badge className="absolute top-2 left-2 bg-gradient-primary text-white font-bold text-lg px-3 py-1">
                  {t('level')} {level.id}
                </Badge>

                {/* Lock Overlay */}
                {level.locked && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Lock className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {t(level.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(level.descKey)}
                  </p>
                </div>

                {/* Stars Display */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((starNum) => (
                    <Star
                      key={starNum}
                      className={`w-6 h-6 ${
                        starNum <= level.stars 
                          ? 'text-star-gold fill-star-gold star-icon' 
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => !level.locked && onSelectLevel(level.id)}
                  disabled={level.locked}
                  className={`w-full ${level.locked 
                    ? 'bg-level-locked cursor-not-allowed' 
                    : level.completed 
                      ? 'bg-gradient-success' 
                      : 'bg-gradient-accent'
                  } text-white font-bold transition-all duration-300 hover:scale-105`}
                  size="lg"
                >
                  {level.locked ? (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      {t('locked')}
                    </>
                  ) : level.completed ? (
                    <>
                      <Star className="w-5 h-5 mr-2" />
                      {t('completed')}
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      {t('startLearning')}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LevelMap;