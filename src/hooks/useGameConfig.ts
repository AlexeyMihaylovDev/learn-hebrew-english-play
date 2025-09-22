import { useState, useEffect, useCallback } from 'react';
import { getGameConfig, isLevelUnlocked, getUnlockedLevels, getLevelConfig, GameConfig, LevelConfig } from '@/config/gameConfig';

export interface UseGameConfigReturn {
  config: GameConfig;
  unlockedLevels: string[];
  isLevelUnlocked: (levelId: string) => boolean;
  getLevelConfig: (levelId: string) => LevelConfig | undefined;
  updateConfig: (updates: Partial<GameConfig>) => void;
  resetToDefaults: () => void;
  toggleTestingMode: () => void;
}

export const useGameConfig = (completedLevels: Set<string>): UseGameConfigReturn => {
  const [config, setConfig] = useState<GameConfig>(() => getGameConfig());

  // Update unlocked levels when completed levels change
  const unlockedLevels = getUnlockedLevels(completedLevels, config);

  // Check if a specific level is unlocked
  const checkLevelUnlocked = useCallback((levelId: string): boolean => {
    return isLevelUnlocked(levelId, completedLevels, config);
  }, [completedLevels, config]);

  // Get configuration for a specific level
  const getLevelConfigById = useCallback((levelId: string): LevelConfig | undefined => {
    return getLevelConfig(levelId, config);
  }, [config]);

  // Update configuration
  const updateConfig = useCallback((updates: Partial<GameConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  // Reset to default configuration
  const resetToDefaults = useCallback(() => {
    setConfig(getGameConfig());
  }, []);

  // Toggle testing mode
  const toggleTestingMode = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      testingMode: !prev.testingMode,
      levels: prev.levels.map(level => ({
        ...level,
        unlocked: !prev.testingMode || level.dependencies?.length === 0 || false
      }))
    }));
  }, []);

  // Save configuration to localStorage
  useEffect(() => {
    localStorage.setItem('gameConfig', JSON.stringify(config));
  }, [config]);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('gameConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.warn('Failed to parse saved game config:', error);
      }
    }
  }, []);

  return {
    config,
    unlockedLevels,
    isLevelUnlocked: checkLevelUnlocked,
    getLevelConfig: getLevelConfigById,
    updateConfig,
    resetToDefaults,
    toggleTestingMode
  };
};
