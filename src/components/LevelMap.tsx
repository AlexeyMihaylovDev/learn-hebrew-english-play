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
  completedLevels: Set<number>;
}

const LevelMap: React.FC<LevelMapProps> = ({ onSelectLevel, completedLevels }) => {
  const { t } = useLanguage();

  const levels: Level[] = [
    {
      id: 1,
      titleKey: 'alphabetLevel',
      descKey: 'alphabetDesc',
      icon: alphabetIcon,
      completed: completedLevels.has(1),
      stars: completedLevels.has(1) ? 3 : 0,
      locked: false
    },
    {
      id: 2,
      titleKey: 'wordsLevel',
      descKey: 'wordsDesc',
      icon: wordsIcon,
      completed: completedLevels.has(2),
      stars: completedLevels.has(2) ? 3 : 0,
      locked: !completedLevels.has(1)
    },
    {
      id: 3,
      titleKey: 'phrasesLevel',
      descKey: 'phrasesDesc',
      icon: alphabetIcon, // Placeholder
      completed: completedLevels.has(3),
      stars: completedLevels.has(3) ? 3 : 0,
      locked: !completedLevels.has(2)
    }
  ];

  return (
    <div id="level-map-container" className="min-h-screen p-4 space-y-6">
      <header id="level-map-header" className="text-center space-y-2 animate-slide-up">
        <h1 id="level-map-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t('levelMap')}
        </h1>
        <p id="level-map-subtitle" className="text-xl text-gray-600">
          {t('chooseLanguage')}
        </p>
      </header>

      <div id="levels-grid" className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((level, index) => (
          <Card 
            key={level.id}
            id={`level-card-${level.id}`}
            className={`bg-white/90 backdrop-blur-sm shadow-2xl relative overflow-hidden border-2 ${
              level.locked ? 'opacity-60 border-gray-200' : 'border-purple-200'
            } animate-bounce-in hover:shadow-xl transition-all duration-300 hover:scale-105`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              {/* Level Image */}
              <div id={`level-image-${level.id}`} className="aspect-square w-full mb-4 relative overflow-hidden rounded-2xl">
                <img 
                  src={level.icon} 
                  alt={t(level.titleKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Level Number Badge */}
                <Badge 
                  id={`level-badge-${level.id}`}
                  className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg px-3 py-1 shadow-lg"
                >
                  {t('level')} {level.id}
                </Badge>

                {/* Lock Overlay */}
                {level.locked && (
                  <div id={`level-lock-overlay-${level.id}`} className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Lock className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>

              {/* Level Info */}
              <div id={`level-info-${level.id}`} className="space-y-3 p-4">
                <div className="space-y-1">
                  <h3 id={`level-title-${level.id}`} className="text-xl font-bold text-gray-800">
                    {t(level.titleKey)}
                  </h3>
                  <p id={`level-description-${level.id}`} className="text-sm text-gray-600">
                    {t(level.descKey)}
                  </p>
                </div>

                {/* Stars Display */}
                <div id={`level-stars-${level.id}`} className="flex items-center gap-1">
                  {[1, 2, 3].map((starNum) => (
                    <Star
                      key={starNum}
                      id={`level-star-${level.id}-${starNum}`}
                      className={`w-6 h-6 ${
                        starNum <= level.stars 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  id={`level-action-btn-${level.id}`}
                  onClick={() => !level.locked && onSelectLevel(level.id)}
                  disabled={level.locked}
                  className={`w-full font-bold transition-all duration-300 hover:scale-105 ${
                    level.locked 
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                      : level.completed 
                        ? 'bg-gradient-to-r from-green-500 to-purple-500 text-white shadow-lg' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  }`}
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