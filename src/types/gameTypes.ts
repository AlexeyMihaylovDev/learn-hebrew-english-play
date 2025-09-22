// Game Types and Constants
export type Language = 'he' | 'en';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'basic' | 'reading' | 'interactive';
export type AppState = 'language-select' | 'level-map' | 'level-menu' | 'alphabet-level' | 'words-level' | 'drag-level' | 'reading-level';

// Game Data Types
export interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
  example: string;
}

export interface WordItem {
  word: string;
  emoji: string;
  options: string[];
}

export interface DragItem {
  id: string;
  word: string;
  emoji: string;
  correctPosition: number;
}

export interface Story {
  id: number;
  title: string;
  type: 'story' | 'comic';
  content: string[];
  images?: string[];
  level: Difficulty;
}

// Game State Types
export interface GameState {
  currentLevel: string | null;
  completedLevels: Set<string>;
  score: number;
  stars: number;
  currentQuestion: number;
  showFeedback: boolean;
}

// Component Props Types
export interface LevelComponentProps {
  onBack: () => void;
  onComplete: () => void;
}

export interface LevelMapProps {
  onSelectLevel: (levelId: number) => void;
  completedLevels: Set<number>;
  onShowLevelMenu: () => void;
}

export interface LevelMenuProps {
  onBack: () => void;
  onSelectLevel: (levelType: string) => void;
  completedLevels: Set<string>;
}

// Game Constants
export const GAME_CONSTANTS = {
  MAX_STARS: 3,
  ALPHABET_LENGTH: 26,
  WORDS_PER_LEVEL: 8,
  DRAG_QUESTIONS_PER_LEVEL: 5,
  STORIES_PER_LEVEL: 5,
  
  // Scoring
  PERFECT_SCORE_THRESHOLD: 1.0,
  GREAT_SCORE_THRESHOLD: 0.8,
  
  // Animation durations
  FEEDBACK_DELAY: 1500,
  TRANSITION_DELAY: 300,
  AUTO_PROGRESS_DELAY: 2000,
  
  // Sound settings
  SPEECH_RATE: 0.8,
  SPEECH_LANG: 'en-US',
  
  // UI Constants
  MAX_PROGRESS: 100,
  STAR_ANIMATION_DURATION: 300,
  HOVER_SCALE: 1.05,
  CARD_SHADOW: 'shadow-2xl',
  BORDER_RADIUS: 'rounded-2xl'
} as const;

// Color Themes
export const COLOR_THEMES = {
  primary: {
    gradient: 'from-purple-500 to-pink-500',
    text: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  secondary: {
    gradient: 'from-blue-500 to-cyan-500',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  success: {
    gradient: 'from-green-500 to-emerald-500',
    text: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  warning: {
    gradient: 'from-yellow-500 to-orange-500',
    text: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200'
  },
  danger: {
    gradient: 'from-red-500 to-pink-500',
    text: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200'
  }
} as const;

// Difficulty Colors
export const DIFFICULTY_COLORS = {
  easy: COLOR_THEMES.success,
  medium: COLOR_THEMES.warning,
  hard: COLOR_THEMES.danger
} as const;

// Category Icons
export const CATEGORY_ICONS = {
  basic: '🎮',
  reading: '📚',
  interactive: '🎯'
} as const;

// Level Icons
export const LEVEL_ICONS = {
  alphabet: '🔤',
  words: '📝',
  'drag-drop': '🎯',
  stories: '📚',
  comics: '📖',
  'advanced-reading': '📰',
  'memory-game': '🧠',
  'word-puzzle': '🧩',
  'speaking-practice': '🎤'
} as const;
