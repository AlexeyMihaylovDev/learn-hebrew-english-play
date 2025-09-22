import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'he' | 'en';

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
    he: 'חיות, פירות וחפצים בסיסיים',
    en: 'Animals, fruits and basic objects'
  },
  phrasesLevel: {
    he: 'ביטויים פשוטים',
    en: 'Simple Phrases'
  },
  phrasesDesc: {
    he: 'ברכות ושיחות יומיומיות',
    en: 'Greetings and daily conversations'
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
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('gameEnglishLanguage');
    return (saved as Language) || 'he';
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