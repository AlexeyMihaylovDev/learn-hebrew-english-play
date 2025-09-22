import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGameConfig } from '@/hooks/useGameConfig';
import { 
  ArrowLeft, 
  BookOpen, 
  Image, 
  Gamepad2, 
  Star,
  Lock,
  Play,
  CheckCircle,
  Settings,
  RotateCcw
} from 'lucide-react';
import { LevelMenuProps, Category, DIFFICULTY_COLORS, CATEGORY_ICONS, LEVEL_ICONS } from '@/types/gameTypes';

const LevelMenu: React.FC<LevelMenuProps> = ({ onBack, onSelectLevel, completedLevels }) => {
  const { t } = useLanguage();
  const { config, isLevelUnlocked, getLevelConfig, toggleTestingMode } = useGameConfig(completedLevels);

  // Group levels by category
  const levelsByCategory = config.levels.reduce((acc, level) => {
    if (!acc[level.category]) {
      acc[level.category] = [];
    }
    acc[level.category].push(level);
    return acc;
  }, {} as Record<Category, typeof config.levels>);

  const getDifficultyColor = (difficulty: string) => {
    const colors = DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS];
    return `bg-${colors.bg.split('-')[1]}-50 text-${colors.text.split('-')[1]}-700 border-${colors.border.split('-')[1]}-200`;
  };

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'basic': return 'from-purple-500 to-pink-500';
      case 'reading': return 'from-blue-500 to-cyan-500';
      case 'interactive': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'basic': return <Gamepad2 className="w-8 h-8" />;
      case 'reading': return <BookOpen className="w-8 h-8" />;
      case 'interactive': return <Image className="w-8 h-8" />;
      default: return <Gamepad2 className="w-8 h-8" />;
    }
  };

  const getCategoryTitle = (category: Category) => {
    switch (category) {
      case 'basic': return t('basicLearning');
      case 'reading': return t('readingStories');
      case 'interactive': return t('interactiveGames');
      default: return category;
    }
  };

  const getCategoryDescription = (category: Category) => {
    switch (category) {
      case 'basic': return t('startWithFundamentals');
      case 'reading': return t('improveReadingSkills');
      case 'interactive': return t('funGamesToPractice');
      default: return '';
    }
  };

  return (
    <div id="level-menu-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="level-menu-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="level-menu-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToLevelMap')}
        </Button>

        <div id="level-menu-stats" className="flex items-center gap-4">
          <Badge id="completed-levels-badge" variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200">
            {t('completedLevels')}: {completedLevels.size}
          </Badge>
          
          {/* Testing Mode Toggle */}
          <Button
            id="testing-mode-toggle"
            onClick={toggleTestingMode}
            variant="outline"
            size="sm"
            className={`transition-all duration-300 ${
              config.testingMode 
                ? 'bg-yellow-100 text-yellow-700 border-yellow-300' 
                : 'bg-gray-100 text-gray-700 border-gray-300'
            }`}
          >
            <Settings className="w-4 h-4 mr-1" />
            {config.testingMode ? 'Testing' : 'Normal'}
          </Button>
          
          <div id="level-menu-stars" className="flex items-center gap-1">
            {[1, 2, 3].map(starNum => (
              <Star 
                key={starNum} 
                id={`menu-star-${starNum}`}
                className={`w-6 h-6 transition-all duration-300 ${
                  starNum <= Math.ceil(completedLevels.size / 3) 
                    ? 'text-yellow-400 fill-yellow-400 animate-bounce' 
                    : 'text-gray-400'
                }`} 
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div id="level-menu-main-content" className="max-w-6xl mx-auto space-y-8">
        <div id="level-menu-title-section" className="text-center space-y-2 animate-slide-up">
          <h1 id="level-menu-title" className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('englishLearningLevels')}
          </h1>
          <p id="level-menu-subtitle" className="text-xl text-gray-600">
            {t('chooseLearningPath')}
          </p>
        </div>

        {/* Level Categories */}
        <div id="level-categories" className="space-y-8">
          {Object.entries(levelsByCategory).map(([category, levels], categoryIndex) => (
            <Card 
              key={category}
              id={`category-${category}`}
              className="bg-white/90 backdrop-blur-sm shadow-2xl animate-bounce-in border-2 border-purple-200"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="p-8">
                {/* Category Header */}
                <div id={`category-header-${category}`} className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${getCategoryColor(category as Category)} text-white shadow-lg`}>
                    {getCategoryIcon(category as Category)}
                  </div>
                  <div>
                    <h2 id={`category-title-${category}`} className="text-2xl font-bold text-gray-800">
                      {getCategoryTitle(category as Category)}
                    </h2>
                    <p id={`category-description-${category}`} className="text-gray-600">
                      {getCategoryDescription(category as Category)}
                    </p>
                  </div>
                </div>

                {/* Levels Grid */}
                <div id={`levels-grid-${category}`} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {levels.map((level, levelIndex) => {
                    const isUnlocked = isLevelUnlocked(level.id);
                    const isCompleted = completedLevels.has(level.id);
                    
                    return (
                      <Card 
                        key={level.id}
                        id={`level-card-${level.id}`}
                        className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                          !isUnlocked ? 'opacity-60' : 'hover:scale-105'
                        } border-2 ${
                          isCompleted 
                            ? 'border-green-300 bg-green-50' 
                            : !isUnlocked 
                              ? 'border-gray-200 bg-gray-50' 
                              : 'border-purple-200 bg-white'
                        }`}
                      >
                        <div className="p-6 space-y-4">
                          {/* Level Header */}
                          <div id={`level-header-${level.id}`} className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 id={`level-title-${level.id}`} className="text-lg font-bold text-gray-800 mb-1">
                                {level.title}
                              </h3>
                              <p id={`level-description-${level.id}`} className="text-sm text-gray-600">
                                {level.description}
                              </p>
                            </div>
                            
                            {/* Status Icon */}
                            <div className="ml-4">
                              {isCompleted ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              ) : !isUnlocked ? (
                                <Lock className="w-6 h-6 text-gray-400" />
                              ) : (
                                <Play className="w-6 h-6 text-purple-600" />
                              )}
                            </div>
                          </div>

                          {/* Difficulty Badge */}
                          <div className="flex justify-between items-center">
                            <Badge 
                              id={`difficulty-badge-${level.id}`}
                              variant="outline" 
                              className={`text-xs ${getDifficultyColor(level.difficulty)}`}
                            >
                              {t(level.difficulty)}
                            </Badge>
                            
                            {/* Level Icon */}
                            <div className="text-2xl">
                              {LEVEL_ICONS[level.id as keyof typeof LEVEL_ICONS] || '🎮'}
                            </div>
                          </div>

                          {/* Action Button */}
                          <Button
                            id={`level-action-btn-${level.id}`}
                            onClick={() => isUnlocked && onSelectLevel(level.id)}
                            disabled={!isUnlocked}
                            className={`w-full font-bold transition-all duration-300 hover:scale-105 ${
                              !isUnlocked 
                                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                                : isCompleted 
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            }`}
                            size="lg"
                          >
                            {!isUnlocked ? (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                {t('lockedLevel')}
                              </>
                            ) : isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {t('completed')}
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                {t('start')}
                              </>
                            )}
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Progress Summary */}
        <Card id="progress-summary" className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
          <div className="p-6 text-center space-y-4">
            <h3 id="progress-title" className="text-2xl font-bold text-gray-800">
              {t('yourLearningProgress')}
            </h3>
            <div id="progress-stats" className="flex justify-center gap-8">
              <div className="text-center">
                <div id="completed-count" className="text-3xl font-bold text-green-600">
                  {completedLevels.size}
                </div>
                <div className="text-sm text-gray-600">{t('completedLevels')}</div>
              </div>
              <div className="text-center">
                <div id="total-count" className="text-3xl font-bold text-purple-600">
                  {config.levels.length}
                </div>
                <div className="text-sm text-gray-600">{t('totalLevels')}</div>
              </div>
              <div className="text-center">
                <div id="progress-percentage" className="text-3xl font-bold text-blue-600">
                  {Math.round((completedLevels.size / config.levels.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">{t('progress')}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LevelMenu;