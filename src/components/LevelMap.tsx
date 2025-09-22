import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/contexts/SettingsContext';
import { Star, Lock, Play, Settings } from 'lucide-react';
import alphabetIcon from '@/assets/alphabet-icon.jpg';
import wordsIcon from '@/assets/words-icon.jpg';
import phrasesIcon from '@/assets/phrases-icon.svg';
import grammarIcon from '@/assets/grammar-icon.svg';
import listeningIcon from '@/assets/listening-icon.svg';
import speakingIcon from '@/assets/speaking-icon.svg';
import vocabularyIcon from '@/assets/vocabulary-icon.svg';
import pronunciationIcon from '@/assets/pronunciation-icon.svg';
import conversationIcon from '@/assets/conversation-icon.svg';

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
  onShowLevelMenu: () => void;
  onShowSettings: () => void;
}

const LevelMap: React.FC<LevelMapProps> = ({ onSelectLevel, completedLevels, onShowLevelMenu, onShowSettings }) => {
  const { t } = useLanguage();
  const { unlockAllLevels } = useSettings();

  const levels: Level[] = [
    {
      id: 1,
      titleKey: 'alphabetLevel',
      descKey: 'alphabetDesc',
      icon: alphabetIcon,
      completed: completedLevels.has(1),
      stars: completedLevels.has(1) ? 3 : 0,
      locked: false // Level 1 is always unlocked
    },
    {
      id: 2,
      titleKey: 'wordsLevel',
      descKey: 'wordsDesc',
      icon: wordsIcon,
      completed: completedLevels.has(2),
      stars: completedLevels.has(2) ? 3 : 0,
      locked: !unlockAllLevels && !completedLevels.has(1)
    },
    {
      id: 3,
      titleKey: 'phrasesLevel',
      descKey: 'phrasesDesc',
      icon: phrasesIcon,
      completed: completedLevels.has(3),
      stars: completedLevels.has(3) ? 3 : 0,
      locked: !unlockAllLevels && !completedLevels.has(2)
    },
    {
      id: 4,
      titleKey: 'grammarLevel',
      descKey: 'grammarDesc',
      icon: grammarIcon,
      completed: completedLevels.has(4),
      stars: completedLevels.has(4) ? 3 : 0,
      locked: !unlockAllLevels && !completedLevels.has(3)
    },
    {
      id: 5,
      titleKey: 'listeningLevel',
      descKey: 'listeningDesc',
      icon: listeningIcon,
      completed: completedLevels.has(5),
      stars: completedLevels.has(5) ? 3 : 0,
      locked: !unlockAllLevels && !completedLevels.has(4)
    },
    {
      id: 6,
      titleKey: 'speakingLevel',
      descKey: 'speakingDesc',
      icon: speakingIcon,
      completed: completedLevels.has(6),
      stars: completedLevels.has(6) ? 3 : 0,
      locked: !unlockAllLevels && !completedLevels.has(5)
    },
    {
      id: 7,
      titleKey: 'vocabularyLevel',
      descKey: 'vocabularyDesc',
      icon: vocabularyIcon,
      completed: completedLevels.has(7),
      stars: completedLevels.has(7) ? 3 : 0,
      locked: !unlockAllLevels && !completedLevels.has(6)
    },
    {
      id: 8,
      titleKey: 'pronunciationLevel',
      descKey: 'pronunciationDesc',
      icon: pronunciationIcon,
      completed: completedLevels.has(8),
      stars: completedLevels.has(8) ? 3 : 0,
      locked: !unlockAllLevels && !completedLevels.has(7)
    },
    {
      id: 9,
      titleKey: 'conversationLevel',
      descKey: 'conversationDesc',
      icon: conversationIcon,
      completed: completedLevels.has(9),
      stars: completedLevels.has(9) ? 3 : 0,
      locked: !unlockAllLevels && !completedLevels.has(8)
    }
  ];

  return (
    <div id="level-map-container" className="min-h-screen p-4 space-y-6">
      <header id="level-map-header" className="text-center space-y-4 animate-slide-up">
        {/* Settings Button */}
        <div className="flex justify-end mb-4">
          <Button
            id="settings-btn"
            onClick={onShowSettings}
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-none hover:scale-105 shadow-lg"
          >
            <Settings className="w-5 h-5 mr-2" />
            {t('settings')}
          </Button>
        </div>

        <h1 id="level-map-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t('levelMap')}
        </h1>
        <p id="level-map-subtitle" className="text-xl text-gray-600">
          {t('chooseLanguage')}
        </p>
        
        {/* Level Menu Button */}
        <Button
          id="level-menu-btn"
          onClick={onShowLevelMenu}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          size="lg"
        >
          📚 {t('moreLearningLevels')}
        </Button>
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
                  onClick={() => {
                    if (!level.locked) {
                      onSelectLevel(level.id);
                    }
                  }}
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