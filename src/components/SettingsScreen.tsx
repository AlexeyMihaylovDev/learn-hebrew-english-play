import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSettings } from '@/contexts/SettingsContext';
import { ArrowLeft, Settings, Lock, Unlock, TestTube, RotateCcw } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { 
    unlockAllLevels, 
    setUnlockAllLevels, 
    testingMode, 
    setTestingMode, 
    resetSettings 
  } = useSettings();

  return (
    <div id="settings-container" className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <header id="settings-header" className="flex items-center justify-between animate-slide-up">
        <Button 
          id="settings-back-btn"
          onClick={onBack} 
          variant="outline" 
          size="lg" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('backToLevelMap')}
        </Button>

        <div id="settings-title" className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('settings')}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div id="settings-main-content" className="max-w-4xl mx-auto space-y-8">
        
        {/* Level Management Section */}
        <Card id="level-management-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-6 animate-bounce-in border-2 border-purple-200">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-purple-600" />
              <h2 id="level-management-title" className="text-2xl font-bold text-gray-800">
                {t('levelManagement')}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Unlock All Levels */}
              <div id="unlock-all-levels-setting" className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Unlock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {t('unlockAllLevels')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('unlockAllLevelsDesc')}
                    </p>
                  </div>
                </div>
                <Switch
                  id="unlock-all-levels-switch"
                  checked={unlockAllLevels}
                  onCheckedChange={setUnlockAllLevels}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>

              {/* Testing Mode */}
              <div id="testing-mode-setting" className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <TestTube className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {t('testingMode')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('testingModeDesc')}
                    </p>
                  </div>
                </div>
                <Switch
                  id="testing-mode-switch"
                  checked={testingMode}
                  onCheckedChange={setTestingMode}
                  className="data-[state=checked]:bg-yellow-500"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Current Status */}
        <Card id="current-status-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-6 animate-bounce-in border-2 border-purple-200">
          <div className="p-8">
            <h2 id="current-status-title" className="text-2xl font-bold text-gray-800 mb-6">
              {t('currentStatus')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('levelUnlockStatus')}</p>
                  <Badge 
                    id="unlock-status-badge"
                    variant="outline" 
                    className={`mt-1 ${
                      unlockAllLevels 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {unlockAllLevels ? t('allUnlocked') : t('locked')}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="p-2 bg-purple-100 rounded-full">
                  <TestTube className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('testingModeStatus')}</p>
                  <Badge 
                    id="testing-status-badge"
                    variant="outline" 
                    className={`mt-1 ${
                      testingMode 
                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200' 
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {testingMode ? t('enabled') : t('disabled')}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <Card id="actions-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-6 animate-bounce-in border-2 border-purple-200">
          <div className="p-8">
            <h2 id="actions-title" className="text-2xl font-bold text-gray-800 mb-6">
              {t('actions')}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                id="reset-settings-btn"
                onClick={resetSettings}
                variant="outline"
                size="lg"
                className="flex-1 hover:scale-105 transition-transform bg-white shadow-md border-red-200 text-red-700 hover:bg-red-50"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {t('resetSettings')}
              </Button>

              <Button 
                id="save-settings-btn"
                onClick={() => {
                  // Settings are automatically saved via useEffect
                  alert(t('settingsSaved'));
                }}
                size="lg"
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t('saveSettings')}
              </Button>
            </div>
          </div>
        </Card>

        {/* Future Payment Info */}
        <Card id="payment-info-card" className="bg-white/90 backdrop-blur-sm shadow-2xl space-y-6 animate-bounce-in border-2 border-purple-200">
          <div className="p-8">
            <h2 id="payment-info-title" className="text-2xl font-bold text-gray-800 mb-6">
              {t('futureFeatures')}
            </h2>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Lock className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  {t('premiumLevels')}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t('premiumLevelsDesc')}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsScreen;
