// Game Configuration File
// This file controls which levels are unlocked and available for testing

export interface LevelConfig {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'basic' | 'reading' | 'interactive';
  dependencies?: string[]; // Levels that must be completed first
}

export interface GameConfig {
  // Testing mode - when true, all levels are unlocked
  testingMode: boolean;
  
  // Individual level configurations
  levels: LevelConfig[];
  
  // Game settings
  settings: {
    defaultLanguage: 'he' | 'en';
    enableSound: boolean;
    enableAnimations: boolean;
    autoProgress: boolean;
  };
  
  // Development settings
  development: {
    showDebugInfo: boolean;
    enableConsoleLogs: boolean;
    skipIntro: boolean;
  };
}

// Default configuration
export const defaultGameConfig: GameConfig = {
  testingMode: true, // Set to false in production
  
  levels: [
    // Basic Learning Levels
    {
      id: 'alphabet',
      title: 'אלפבית וצלילים',
      description: 'למדו את האותיות האנגליות והצלילים שלהן',
      unlocked: true,
      difficulty: 'easy',
      category: 'basic',
      dependencies: []
    },
    {
      id: 'words',
      title: 'מילים פשוטות',
      description: 'התאמו מילים לתמונות',
      unlocked: true,
      difficulty: 'easy',
      category: 'basic',
      dependencies: ['alphabet']
    },
    {
      id: 'drag-drop',
      title: 'גרירה והשלכה',
      description: 'גררו מילים להתאמה עם המשמעויות',
      unlocked: true,
      difficulty: 'medium',
      category: 'basic',
      dependencies: ['words']
    },
    
    // Reading Levels
    {
      id: 'stories',
      title: 'סיפורים קצרים',
      description: 'קראו סיפורים פשוטים למתחילים',
      unlocked: true,
      difficulty: 'easy',
      category: 'reading',
      dependencies: ['drag-drop']
    },
    {
      id: 'comics',
      title: 'קומיקס עם תמונות',
      description: 'קומיקס מהנים עם תמונות וטקסט',
      unlocked: true,
      difficulty: 'medium',
      category: 'reading',
      dependencies: ['stories']
    },
    {
      id: 'advanced-reading',
      title: 'קריאה מתקדמת',
      description: 'סיפורים ארוכים וטקסטים מורכבים',
      unlocked: true,
      difficulty: 'hard',
      category: 'reading',
      dependencies: ['comics']
    },
    
    // Interactive Games
    {
      id: 'memory-game',
      title: 'משחק זיכרון',
      description: 'התאמו מילים אנגליות עם תמונות',
      unlocked: true,
      difficulty: 'easy',
      category: 'interactive',
      dependencies: ['comics']
    },
    {
      id: 'word-puzzle',
      title: 'חידת מילים',
      description: 'פתרו חידות עם מילים אנגליות',
      unlocked: true,
      difficulty: 'medium',
      category: 'interactive',
      dependencies: ['memory-game']
    },
    {
      id: 'speaking-practice',
      title: 'תרגול דיבור',
      description: 'תרגלו הגייה ודיבור',
      unlocked: true,
      difficulty: 'hard',
      category: 'interactive',
      dependencies: ['word-puzzle']
    }
  ],
  
  settings: {
    defaultLanguage: 'he',
    enableSound: true,
    enableAnimations: true,
    autoProgress: false
  },
  
  development: {
    showDebugInfo: true,
    enableConsoleLogs: true,
    skipIntro: false
  }
};

// Configuration for production (all levels locked by default)
export const productionGameConfig: GameConfig = {
  ...defaultGameConfig,
  testingMode: false,
  levels: defaultGameConfig.levels.map(level => ({
    ...level,
    unlocked: level.dependencies?.length === 0 || false
  })),
  development: {
    showDebugInfo: false,
    enableConsoleLogs: false,
    skipIntro: false
  }
};

// Get current configuration based on environment
export const getGameConfig = (): GameConfig => {
  const isDevelopment = import.meta.env.DEV;
  return isDevelopment ? defaultGameConfig : productionGameConfig;
};

// Helper functions for configuration management
export const isLevelUnlocked = (levelId: string, completedLevels: Set<string>, config: GameConfig): boolean => {
  if (config.testingMode) return true;
  
  const level = config.levels.find(l => l.id === levelId);
  if (!level) return false;
  
  // Check if all dependencies are completed
  if (level.dependencies) {
    return level.dependencies.every(dep => completedLevels.has(dep));
  }
  
  return level.unlocked;
};

export const getUnlockedLevels = (completedLevels: Set<string>, config: GameConfig): string[] => {
  return config.levels
    .filter(level => isLevelUnlocked(level.id, completedLevels, config))
    .map(level => level.id);
};

export const getLevelConfig = (levelId: string, config: GameConfig): LevelConfig | undefined => {
  return config.levels.find(level => level.id === levelId);
};
