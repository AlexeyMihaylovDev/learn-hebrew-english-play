import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types/gameTypes';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

interface Translation {
  [key: string]: {
    he: string;
    en: string;
  };
}

const translations: Translation = {
  // Welcome & Navigation
  welcomeTitle: {
    he: 'ברוכים הבאים לגיימפאן אנגלית!',
    en: 'Welcome to GameFun English!'
  },
  welcomeSubtitle: {
    he: 'למדו אנגלית בצורה מהנה וקלה',
    en: 'Learn English in a fun and easy way'
  },
  chooseLanguage: {
    he: 'בחרו שפה',
    en: 'Choose Language'
  },
  startLearning: {
    he: 'התחילו ללמוד',
    en: 'Start Learning'
  },
  
  // Level Map
  levelMap: {
    he: 'מפת השלבים',
    en: 'Level Map'
  },
  level: {
    he: 'שלב',
    en: 'Level'
  },
  completed: {
    he: 'הושלם',
    en: 'Completed'
  },
  locked: {
    he: 'נעול',
    en: 'Locked'
  },
  
  // Level Descriptions
  alphabetLevel: {
    he: 'האלפבית וצלילים',
    en: 'Alphabet & Sounds'
  },
  alphabetDesc: {
    he: 'למדו את האותיות האנגליות והצלילים שלהן',
    en: 'Learn English letters and their sounds'
  },
  wordsLevel: {
    he: 'מילים פשוטות',
    en: 'Simple Words'
  },
  wordsDesc: {
    he: 'התאמו מילים לתמונות',
    en: 'Match words with pictures'
  },
  dragLevel: {
    he: 'גרירה והשלכה',
    en: 'Drag & Drop'
  },
  dragDesc: {
    he: 'גררו מילים להתאמה עם המשמעויות',
    en: 'Drag words to match meanings'
  },
  storiesLevel: {
    he: 'סיפורים קצרים',
    en: 'Short Stories'
  },
  storiesDesc: {
    he: 'קראו סיפורים פשוטים למתחילים',
    en: 'Read simple stories for beginners'
  },
  comicsLevel: {
    he: 'קומיקס עם תמונות',
    en: 'Picture Comics'
  },
  comicsDesc: {
    he: 'קומיקס מהנים עם תמונות וטקסט',
    en: 'Fun comics with pictures and text'
  },
  advancedReadingLevel: {
    he: 'קריאה מתקדמת',
    en: 'Advanced Reading'
  },
  advancedReadingDesc: {
    he: 'סיפורים ארוכים וטקסטים מורכבים',
    en: 'Longer stories and complex texts'
  },
  memoryGameLevel: {
    he: 'משחק זיכרון',
    en: 'Memory Game'
  },
  memoryGameDesc: {
    he: 'התאמו מילים אנגליות עם תמונות',
    en: 'Match English words with pictures'
  },
  wordPuzzleLevel: {
    he: 'חידת מילים',
    en: 'Word Puzzle'
  },
  wordPuzzleDesc: {
    he: 'פתרו חידות עם מילים אנגליות',
    en: 'Solve puzzles with English words'
  },
  speakingPracticeLevel: {
    he: 'תרגול דיבור',
    en: 'Speaking Practice'
  },
  speakingPracticeDesc: {
    he: 'תרגלו הגייה ודיבור',
    en: 'Practice pronunciation and speaking'
  },
  
  // Game Elements
  stars: {
    he: 'כוכבים',
    en: 'Stars'
  },
  points: {
    he: 'נקודות',
    en: 'Points'
  },
  wellDone: {
    he: 'כל הכבוד!',
    en: 'Well Done!'
  },
  tryAgain: {
    he: 'נסו שוב',
    en: 'Try Again'
  },
  nextLevel: {
    he: 'השלב הבא',
    en: 'Next Level'
  },
  
  // Alphabet Level
  learnAlphabet: {
    he: 'למדו את האלפבית',
    en: 'Learn the Alphabet'
  },
  letterSound: {
    he: 'צליל האות',
    en: 'Letter Sound'
  },
  playSound: {
    he: 'השמע צליל',
    en: 'Play Sound'
  },
  
  // Words Level
  matchWord: {
    he: 'התאמו את המילה לתמונה הנכונה!',
    en: 'Match the word with the correct picture!'
  },
  hearWord: {
    he: 'השמע מילה',
    en: 'Hear Word'
  },
  question: {
    he: 'שאלה',
    en: 'Question'
  },
  of: {
    he: 'מתוך',
    en: 'of'
  },
  progress: {
    he: 'התקדמות',
    en: 'Progress'
  },
  correct: {
    he: 'נכון! כל הכבוד!',
    en: 'Correct! Well done!'
  },
  notQuite: {
    he: 'לא בדיוק! זה',
    en: 'Not quite! It\'s'
  },
  
  // Drag Level
  dragTitle: {
    he: 'רמת גרירה והשלכה',
    en: 'Drag & Drop Level'
  },
  dragSubtitle: {
    he: 'גררו את המילים להתאמה עם התמונות!',
    en: 'Drag the words to match the pictures!'
  },
  checkAnswers: {
    he: 'בדוק תשובות',
    en: 'Check Answers'
  },
  reset: {
    he: 'איפוס',
    en: 'Reset'
  },
  dropHere: {
    he: 'שחרר כאן',
    en: 'Drop here'
  },
  
  // Reading Level
  readingTitle: {
    he: 'קריאת סיפורים',
    en: 'Reading Stories'
  },
  readingSubtitle: {
    he: 'קראו סיפורים וקומיקס כדי לשפר את האנגלית שלכם!',
    en: 'Read stories and comics to improve your English!'
  },
  story: {
    he: 'סיפור',
    en: 'Story'
  },
  comic: {
    he: 'קומיקס',
    en: 'Comic'
  },
  page: {
    he: 'עמוד',
    en: 'Page'
  },
  readAloud: {
    he: 'קרא בקול',
    en: 'Read Aloud'
  },
  storyCompleted: {
    he: 'סיפור הושלם!',
    en: 'Story Completed!'
  },
  allStoriesCompleted: {
    he: 'כל הסיפורים הושלמו!',
    en: 'All Stories Completed!'
  },
  continueLearning: {
    he: 'המשיכו ללמוד',
    en: 'Continue Learning'
  },
  
  // Level Menu
  englishLearningLevels: {
    he: 'רמות לימוד אנגלית',
    en: 'English Learning Levels'
  },
  chooseLearningPath: {
    he: 'בחרו את נתיב הלמידה שלכם ושפרו את כישורי האנגלית!',
    en: 'Choose your learning path and improve your English skills!'
  },
  basicLearning: {
    he: 'למידה בסיסית',
    en: 'Basic Learning'
  },
  startWithFundamentals: {
    he: 'התחילו עם היסודות',
    en: 'Start with the fundamentals'
  },
  readingStories: {
    he: 'קריאה וסיפורים',
    en: 'Reading & Stories'
  },
  improveReadingSkills: {
    he: 'שפרו את כישורי הקריאה שלכם',
    en: 'Improve your reading skills'
  },
  interactiveGames: {
    he: 'משחקים אינטראקטיביים',
    en: 'Interactive Games'
  },
  funGamesToPractice: {
    he: 'משחקים מהנים לתרגול אנגלית',
    en: 'Fun games to practice English'
  },
  moreLearningLevels: {
    he: 'רמות למידה נוספות',
    en: 'More Learning Levels'
  },
  backToLevelMap: {
    he: 'חזרה למפת השלבים',
    en: 'Back to Level Map'
  },
  yourLearningProgress: {
    he: 'התקדמות הלמידה שלכם',
    en: 'Your Learning Progress'
  },
  completedLevels: {
    he: 'הושלמו',
    en: 'Completed'
  },
  totalLevels: {
    he: 'סה"כ שלבים',
    en: 'Total Levels'
  },
  
  // Difficulty levels
  easy: {
    he: 'קל',
    en: 'Easy'
  },
  medium: {
    he: 'בינוני',
    en: 'Medium'
  },
  hard: {
    he: 'קשה',
    en: 'Hard'
  },
  
  // Common actions
  start: {
    he: 'התחל',
    en: 'Start'
  },
  lockedLevel: {
    he: 'נעול',
    en: 'Locked'
  },
  levelComplete: {
    he: 'שלב הושלם!',
    en: 'Level Complete!'
  },
  perfectAmazingWork: {
    he: 'מושלם! עבודה מדהימה!',
    en: 'Perfect! Amazing work!'
  },
  greatJobWellDone: {
    he: 'עבודה נהדרת! כל הכבוד!',
    en: 'Great job! Well done!'
  },
  goodEffortKeepPracticing: {
    he: 'מאמץ טוב! המשיכו לתרגל!',
    en: 'Good effort! Keep practicing!'
  },
  finalScore: {
    he: 'ציון סופי',
    en: 'Final Score'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('gameEnglishLanguage');
    return (saved as Language) || 'he'; // Default to Hebrew
  });

  const isRTL = language === 'he';

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    localStorage.setItem('gameEnglishLanguage', language);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};