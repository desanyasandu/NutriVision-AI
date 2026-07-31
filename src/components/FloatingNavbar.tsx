import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { AnimatedPressable } from './AnimatedPressable';

export type NavTab = 'Home' | 'KanbanPlanner' | 'FoodScan' | 'AIAgentCoach' | 'HealthDashboard';

interface FloatingNavbarProps {
  currentScreen: string;
  onNavigate: (screen: NavTab) => void;
}

const TABS: { id: NavTab; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap; label: string; color: string }[] = [
  { id: 'Home', icon: 'home-outline', activeIcon: 'home', label: 'Home', color: COLORS.primary },
  { id: 'KanbanPlanner', icon: 'grid-outline', activeIcon: 'grid', label: 'Planner', color: COLORS.primary },
  { id: 'FoodScan', icon: 'camera', activeIcon: 'camera', label: 'Scan', color: COLORS.white },
  { id: 'AIAgentCoach', icon: 'sparkles-outline', activeIcon: 'sparkles', label: 'AI', color: COLORS.accent },
  { id: 'HealthDashboard', icon: 'stats-chart-outline', activeIcon: 'stats-chart', label: 'Insights', color: COLORS.primary },
];

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ currentScreen, onNavigate }) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.dock, SHADOWS.lg]}>
        {TABS.map((tab) => {
          const isActive = currentScreen === tab.id;
          const isScan = tab.id === 'FoodScan';

          if (isScan) {
            return (
              <AnimatedPressable key={tab.id} style={styles.scanWrapper} onPress={() => onNavigate(tab.id)} scaleTo={0.92}>
                <View style={[styles.scanFab, SHADOWS.glow]}>
                  <Ionicons name="camera" size={24} color={COLORS.white} />
                </View>
                <Text style={styles.scanLabel}>Scan</Text>
              </AnimatedPressable>
            );
          }

          return (
            <AnimatedPressable key={tab.id} style={styles.tabItem} onPress={() => onNavigate(tab.id)} scaleTo={0.93}>
              <View style={[styles.iconWrap, isActive && { transform: [{ translateY: -2 }] }]}>
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={22}
                  color={isActive ? tab.color : COLORS.textMuted}
                />
              </View>
              <Text style={[styles.tabLabel, isActive && { color: tab.color, fontWeight: '800' }]}>
                {tab.label}
              </Text>
              {isActive && <View style={[styles.dot, { backgroundColor: tab.color }]} />}
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  dock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(200, 207, 228, 0.7)',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    gap: 2,
    paddingTop: 2,
  },
  iconWrap: {
    transition: 'transform 0.2s' as any,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  scanWrapper: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 2,
  },
  scanFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
    borderWidth: 3.5,
    borderColor: '#FFFFFF',
  },
  scanLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 3,
  },
});
