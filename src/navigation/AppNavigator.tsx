import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { SplashScreen } from '../screens/SplashScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { FoodScanScreen } from '../screens/FoodScanScreen';
import { AnalyzingScreen } from '../screens/AnalyzingScreen';
import { FoodDetectionResultScreen } from '../screens/FoodDetectionResultScreen';
import { NutritionAnalysisScreen } from '../screens/NutritionAnalysisScreen';
import { DiseaseRiskAnalysisScreen } from '../screens/DiseaseRiskAnalysisScreen';
import { ExistingDiseaseCheckerScreen } from '../screens/ExistingDiseaseCheckerScreen';
import { VoiceAssistantScreen } from '../screens/VoiceAssistantScreen';
import { AIAgentCoachScreen } from '../screens/AIAgentCoachScreen';
import { HealthDashboardScreen } from '../screens/HealthDashboardScreen';
import { DigitalHealthTwinScreen } from '../screens/DigitalHealthTwinScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { KanbanPlannerScreen } from '../screens/KanbanPlannerScreen';
import { FloatingNavbar, NavTab } from '../components/FloatingNavbar';
import { COLORS } from '../theme/colors';

type ScreenName =
  | 'Splash'
  | 'Home'
  | 'FoodScan'
  | 'Analyzing'
  | 'FoodDetectionResult'
  | 'NutritionAnalysis'
  | 'DiseaseRiskAnalysis'
  | 'ExistingDiseaseChecker'
  | 'VoiceAssistant'
  | 'AIAgentCoach'
  | 'HealthDashboard'
  | 'DigitalHealthTwin'
  | 'UserProfile'
  | 'KanbanPlanner';

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Splash');

  const navigateTo = (screen: ScreenName) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen onStart={() => navigateTo('Home')} />;
      case 'Home':
        return <HomeScreen onNavigate={(s) => navigateTo(s as ScreenName)} />;
      case 'FoodScan':
        return (
          <FoodScanScreen
            onBack={() => navigateTo('Home')}
            onScanComplete={() => navigateTo('Analyzing')}
            onVoiceScan={() => navigateTo('VoiceAssistant')}
          />
        );
      case 'Analyzing':
        return <AnalyzingScreen onComplete={() => navigateTo('FoodDetectionResult')} />;
      case 'FoodDetectionResult':
        return (
          <FoodDetectionResultScreen
            onBack={() => navigateTo('Home')}
            onViewNutrition={() => navigateTo('NutritionAnalysis')}
            onCheckDisease={() => navigateTo('ExistingDiseaseChecker')}
            onAskAgent={() => navigateTo('AIAgentCoach')}
          />
        );
      case 'NutritionAnalysis':
        return (
          <NutritionAnalysisScreen
            onBack={() => navigateTo('FoodDetectionResult')}
            onNavigateToRisk={() => navigateTo('DiseaseRiskAnalysis')}
          />
        );
      case 'DiseaseRiskAnalysis':
        return (
          <DiseaseRiskAnalysisScreen
            onBack={() => navigateTo('FoodDetectionResult')}
            onNavigateToChecker={() => navigateTo('ExistingDiseaseChecker')}
            onAskAgent={() => navigateTo('AIAgentCoach')}
          />
        );
      case 'ExistingDiseaseChecker':
        return (
          <ExistingDiseaseCheckerScreen
            onBack={() => navigateTo('FoodDetectionResult')}
            onAskAgent={() => navigateTo('AIAgentCoach')}
          />
        );
      case 'VoiceAssistant':
        return (
          <VoiceAssistantScreen
            onBack={() => navigateTo('Home')}
            onNavigateToAgent={() => navigateTo('AIAgentCoach')}
          />
        );
      case 'AIAgentCoach':
        return (
          <AIAgentCoachScreen
            onBack={() => navigateTo('Home')}
            onNavigateToTwin={() => navigateTo('DigitalHealthTwin')}
          />
        );
      case 'HealthDashboard':
        return (
          <HealthDashboardScreen
            onBack={() => navigateTo('Home')}
            onNavigateToTwin={() => navigateTo('DigitalHealthTwin')}
          />
        );
      case 'DigitalHealthTwin':
        return (
          <DigitalHealthTwinScreen
            onBack={() => navigateTo('HealthDashboard')}
            onAskAgent={() => navigateTo('AIAgentCoach')}
          />
        );
      case 'UserProfile':
        return <UserProfileScreen onBack={() => navigateTo('Home')} />;
      case 'KanbanPlanner':
        return <KanbanPlannerScreen onBack={() => navigateTo('Home')} />;
      default:
        return <HomeScreen onNavigate={(s) => navigateTo(s as ScreenName)} />;
    }
  };

  const hideTabBarScreens: ScreenName[] = ['Splash', 'Analyzing', 'FoodScan', 'VoiceAssistant'];
  const showBottomTab = !hideTabBarScreens.includes(currentScreen);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>{renderScreen()}</View>

      {showBottomTab && (
        <FloatingNavbar
          currentScreen={currentScreen}
          onNavigate={(screen: NavTab) => navigateTo(screen)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    minHeight: '100vh' as any,
  },
  screenContainer: {
    flex: 1,
  },
});
