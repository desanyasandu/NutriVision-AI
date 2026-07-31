import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';
import { AnimatedPressable } from './AnimatedPressable';

export type NavTab = 'Home' | 'KanbanPlanner' | 'FoodScan' | 'AIAgentCoach' | 'HealthDashboard';

interface FloatingNavbarProps {
  currentScreen: string;
  onNavigate: (screen: NavTab) => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ currentScreen, onNavigate }) => {
  return (
    <View style={styles.floatingWrapper}>
      <View style={[styles.navContainer, SHADOWS.lg]}>
        {/* Home Tab */}
        <AnimatedPressable style={styles.tabItem} onPress={() => onNavigate('Home')}>
          <View style={[styles.iconWrapper, currentScreen === 'Home' && styles.activeIconLift]}>
            <Ionicons
              name={currentScreen === 'Home' ? 'home' : 'home-outline'}
              size={22}
              color={currentScreen === 'Home' ? COLORS.primary : COLORS.textMuted}
            />
          </View>
          <Text style={[styles.tabLabel, currentScreen === 'Home' && styles.activeLabel]}>Home</Text>
          {currentScreen === 'Home' && <View style={styles.activeDot} />}
        </AnimatedPressable>

        {/* Planner Tab */}
        <AnimatedPressable style={styles.tabItem} onPress={() => onNavigate('KanbanPlanner')}>
          <View style={[styles.iconWrapper, currentScreen === 'KanbanPlanner' && styles.activeIconLift]}>
            <Ionicons
              name={currentScreen === 'KanbanPlanner' ? 'grid' : 'grid-outline'}
              size={22}
              color={currentScreen === 'KanbanPlanner' ? COLORS.primary : COLORS.textMuted}
            />
          </View>
          <Text style={[styles.tabLabel, currentScreen === 'KanbanPlanner' && styles.activeLabel]}>Planner</Text>
          {currentScreen === 'KanbanPlanner' && <View style={styles.activeDot} />}
        </AnimatedPressable>

        {/* Center Floating Food Scan FAB */}
        <AnimatedPressable style={styles.fabTabItem} onPress={() => onNavigate('FoodScan')}>
          <View style={[styles.scanFab, SHADOWS.glow]}>
            <Ionicons name="camera" size={24} color={COLORS.white} />
          </View>
          <Text style={[styles.tabLabel, styles.fabLabel]}>Scan</Text>
        </AnimatedPressable>

        {/* AI Agent Tab */}
        <AnimatedPressable style={styles.tabItem} onPress={() => onNavigate('AIAgentCoach')}>
          <View style={[styles.iconWrapper, currentScreen === 'AIAgentCoach' && styles.activeIconLift]}>
            <Ionicons
              name={currentScreen === 'AIAgentCoach' ? 'sparkles' : 'sparkles-outline'}
              size={22}
              color={currentScreen === 'AIAgentCoach' ? COLORS.accent : COLORS.textMuted}
            />
          </View>
          <Text style={[styles.tabLabel, currentScreen === 'AIAgentCoach' && { color: COLORS.accent, fontWeight: '900' }]}>
            AI Agent
          </Text>
          {currentScreen === 'AIAgentCoach' && <View style={[styles.activeDot, { backgroundColor: COLORS.accent }]} />}
        </AnimatedPressable>

        {/* Dashboard Tab */}
        <AnimatedPressable style={styles.tabItem} onPress={() => onNavigate('HealthDashboard')}>
          <View style={[styles.iconWrapper, currentScreen === 'HealthDashboard' && styles.activeIconLift]}>
            <Ionicons
              name={currentScreen === 'HealthDashboard' ? 'stats-chart' : 'stats-chart-outline'}
              size={22}
              color={currentScreen === 'HealthDashboard' ? COLORS.primary : COLORS.textMuted}
            />
          </View>
          <Text style={[styles.tabLabel, currentScreen === 'HealthDashboard' && styles.activeLabel]}>Dashboard</Text>
          {currentScreen === 'HealthDashboard' && <View style={styles.activeDot} />}
        </AnimatedPressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: DESIGN_TOKENS.borderRadius.dialog, // 28
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    flex: 1,
  },
  iconWrapper: {
    padding: 2,
  },
  activeIconLift: {
    transform: [{ translateY: -2 }],
  },
  tabLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: '900',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.primary,
    marginTop: 1,
  },
  fabTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  scanFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -26,
    borderWidth: 3.5,
    borderColor: COLORS.cardBg,
  },
  fabLabel: {
    marginTop: 3,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
