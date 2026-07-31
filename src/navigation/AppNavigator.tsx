import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
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
import { KanbanPlannerScreen } from '../screens/KanbanPlannerScreen';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

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

  // Only show bottom navigation tab bar on main app flow
  const hideTabBarScreens: ScreenName[] = ['Splash', 'Analyzing', 'FoodScan', 'VoiceAssistant'];
  const showBottomTab = !hideTabBarScreens.includes(currentScreen);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>{renderScreen()}</View>

      {showBottomTab && (
        <View style={styles.floatingDockWrapper}>
          <View style={[styles.bottomTabContainer, SHADOWS.lg]}>
            <AnimatedPressable
              style={styles.tabItem}
              onPress={() => navigateTo('Home')}
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
              {currentScreen === 'Home' && <View style={styles.activeDot} />}
            </AnimatedPressable>

            <AnimatedPressable
              style={styles.tabItem}
              onPress={() => navigateTo('KanbanPlanner')}
            >
              <Ionicons
                name={currentScreen === 'KanbanPlanner' ? 'grid' : 'grid-outline'}
                size={22}
                color={currentScreen === 'KanbanPlanner' ? COLORS.primary : COLORS.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  currentScreen === 'KanbanPlanner' && styles.tabLabelActive,
                ]}
              >
                Planner
              </Text>
              {currentScreen === 'KanbanPlanner' && <View style={styles.activeDot} />}
            </AnimatedPressable>

            <AnimatedPressable
              style={styles.tabItem}
              onPress={() => navigateTo('FoodScan')}
            >
              <View style={[styles.scanTabCircle, SHADOWS.glow]}>
                <Ionicons name="camera" size={22} color={COLORS.white} />
              </View>
              <Text style={styles.tabLabel}>Scan</Text>
            </AnimatedPressable>

            <AnimatedPressable
              style={styles.tabItem}
              onPress={() => navigateTo('AIAgentCoach')}
            >
              <Ionicons
                name={currentScreen === 'AIAgentCoach' ? 'sparkles' : 'sparkles-outline'}
                size={22}
                color={currentScreen === 'AIAgentCoach' ? COLORS.accent : COLORS.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  currentScreen === 'AIAgentCoach' && { color: COLORS.accent, fontWeight: '900' },
                ]}
              >
                AI Agent
              </Text>
              {currentScreen === 'AIAgentCoach' && <View style={[styles.activeDot, { backgroundColor: COLORS.accent }]} />}
            </AnimatedPressable>

            <AnimatedPressable
              style={styles.tabItem}
              onPress={() => navigateTo('HealthDashboard')}
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
              {currentScreen === 'HealthDashboard' && <View style={styles.activeDot} />}
            </AnimatedPressable>
          </View>
        </View>
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
  floatingDockWrapper: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.cardBg,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '900',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.primary,
    marginTop: 2,
  },
  scanTabCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
    borderWidth: 3,
    borderColor: COLORS.cardBg,
  },
});
