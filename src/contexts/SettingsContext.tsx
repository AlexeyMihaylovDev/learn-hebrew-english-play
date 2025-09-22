import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  unlockAllLevels: boolean;
  setUnlockAllLevels: (unlock: boolean) => void;
  testingMode: boolean;
  setTestingMode: (testing: boolean) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockAllLevels, setUnlockAllLevels] = useState<boolean>(() => {
    const saved = localStorage.getItem('unlockAllLevels');
    return saved === 'true';
  });

  const [testingMode, setTestingMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('testingMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('unlockAllLevels', unlockAllLevels.toString());
  }, [unlockAllLevels]);

  useEffect(() => {
    localStorage.setItem('testingMode', testingMode.toString());
  }, [testingMode]);

  const resetSettings = () => {
    setUnlockAllLevels(false);
    setTestingMode(false);
    localStorage.removeItem('unlockAllLevels');
    localStorage.removeItem('testingMode');
  };

  return (
    <SettingsContext.Provider value={{
      unlockAllLevels,
      setUnlockAllLevels,
      testingMode,
      setTestingMode,
      resetSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};


