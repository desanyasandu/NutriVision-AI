import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  | 'UserProfile';

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
            onBack={() => navigateTo('NutritionAnalysis')}
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
      default:
        return <HomeScreen onNavigate={(s) => navigateTo(s as ScreenName)} />;
    }
  };

  // Only show bottom navigation tab bar on main app flow
  const hideTabBarScreens: ScreenName[] = ['Splash', 'Analyzing', 'FoodScan', 'VoiceAssistant'];
  const showBottomTab = !hideTabBarScreens.includes(currentScreen);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>{renderScreen()}</View>

      {showBottomTab && (
        <View style={styles.bottomTabContainer}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigateTo('Home')}
            activeOpacity={0.7}
          >
            <Ionicons
              name={currentScreen === 'Home' ? 'home' : 'home-outline'}
              size={22}
              color={currentScreen === 'Home' ? COLORS.primary : COLORS.textMuted}
            />
            <Text
              style={[
                styles.tabLabel,
                currentScreen === 'Home' && styles.tabLabelActive,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigateTo('FoodScan')}
            activeOpacity={0.7}
          >
            <View style={styles.scanTabCircle}>
              <Ionicons name="camera" size={22} color={COLORS.white} />
            </View>
            <Text style={styles.tabLabel}>Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigateTo('AIAgentCoach')}
            activeOpacity={0.7}
          >
            <Ionicons
              name={currentScreen === 'AIAgentCoach' ? 'sparkles' : 'sparkles-outline'}
              size={22}
              color={currentScreen === 'AIAgentCoach' ? COLORS.primary : COLORS.textMuted}
            />
            <Text
              style={[
                styles.tabLabel,
                currentScreen === 'AIAgentCoach' && styles.tabLabelActive,
              ]}
            >
              AI Agent
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigateTo('HealthDashboard')}
            activeOpacity={0.7}
          >
            <Ionicons
              name={currentScreen === 'HealthDashboard' ? 'stats-chart' : 'stats-chart-outline'}
              size={22}
              color={currentScreen === 'HealthDashboard' ? COLORS.primary : COLORS.textMuted}
            />
            <Text
              style={[
                styles.tabLabel,
                currentScreen === 'HealthDashboard' && styles.tabLabelActive,
              ]}
            >
              Dashboard
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContainer: {
    flex: 1,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.cardBg,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: COLORS.primaryLight,
    fontWeight: '800',
  },
  scanTabCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    borderWidth: 3,
    borderColor: COLORS.cardBg,
    elevation: 6,
  },
});
