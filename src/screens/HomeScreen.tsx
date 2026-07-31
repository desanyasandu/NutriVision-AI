import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { HealthScoreCard } from '../components/HealthScoreCard';
import { FoodCard } from '../components/FoodCard';
import { KanbanCard } from '../components/KanbanCard';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const {
    userProfile,
    foodHistory,
    setCurrentScan,
    kanbanCards,
    moveKanbanCard,
    deleteKanbanCard,
  } = useApp();

  // Animation Refs for Entry Micro-animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const cardScaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(cardScaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="NutriVision AI"
        subtitle="Clinical Nutrition & Disease Intelligence"
        rightAction={
          <AnimatedPressable style={styles.profileBtn} onPress={() => onNavigate('UserProfile')}>
            <Ionicons name="person-circle" size={32} color={COLORS.primary} />
          </AnimatedPressable>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: cardScaleAnim }] }}>
          {/* Health Score Overview */}
          <HealthScoreCard
            score={userProfile.healthScore}
            consumedCalories={userProfile.todayCaloriesConsumed}
            targetCalories={userProfile.dailyCalorieTarget}
            userName={userProfile.name}
          />

          {/* Quick Action Grid */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.actionGrid}>
            <View style={styles.actionRow}>
              <AnimatedPressable
                style={[styles.glassActionCard, { backgroundColor: 'rgba(33, 118, 255, 0.06)' }]}
                onPress={() => onNavigate('FoodScan')}
              >
                <View style={[styles.actionIconBox, { backgroundColor: COLORS.primary }]}>
                  <Ionicons name="camera" size={20} color={COLORS.white} />
                </View>
                <Text style={styles.actionTitle}>Scan Food</Text>
                <Text style={styles.actionSub}>Camera & Vision AI</Text>
              </AnimatedPressable>

              <AnimatedPressable
                style={[styles.glassActionCard, { backgroundColor: 'rgba(247, 152, 36, 0.07)' }]}
                onPress={() => onNavigate('VoiceAssistant')}
              >
                <View style={[styles.actionIconBox, { backgroundColor: COLORS.secondary }]}>
                  <Ionicons name="mic" size={20} color={COLORS.white} />
                </View>
                <Text style={styles.actionTitle}>Voice Scan</Text>
                <Text style={styles.actionSub}>NLP Audio Logger</Text>
              </AnimatedPressable>
            </View>

            <View style={styles.actionRow}>
              <AnimatedPressable
                style={[styles.glassActionCard, { backgroundColor: 'rgba(51, 161, 253, 0.07)' }]}
                onPress={() => onNavigate('HealthDashboard')}
              >
                <View style={[styles.actionIconBox, { backgroundColor: COLORS.accent }]}>
                  <Ionicons name="stats-chart" size={20} color={COLORS.white} />
                </View>
                <Text style={styles.actionTitle}>Health Report</Text>
                <Text style={styles.actionSub}>ML Analytics</Text>
              </AnimatedPressable>

              <AnimatedPressable
                style={[styles.glassActionCard, { backgroundColor: 'rgba(139, 92, 246, 0.07)' }]}
                onPress={() => onNavigate('AIAgentCoach')}
              >
                <View style={[styles.actionIconBox, { backgroundColor: COLORS.aiSparkle }]}>
                  <Ionicons name="sparkles" size={20} color={COLORS.white} />
                </View>
                <Text style={styles.actionTitle}>AI Coach</Text>
                <Text style={styles.actionSub}>Agentic Guidance</Text>
              </AnimatedPressable>
            </View>
          </View>

          {/* Proactive Agent Alert Banner */}
          <AnimatedPressable
            style={styles.alertGlassBanner}
            onPress={() => onNavigate('DiseaseRiskAnalysis')}
          >
            <View style={styles.alertIconPulse}>
              <Ionicons name="warning" size={20} color={COLORS.warningDark} />
            </View>
            <View style={styles.alertTextContent}>
              <Text style={styles.alertTitle}>Proactive AI Alert</Text>
              <Text style={styles.alertBody}>
                High sodium item (Cheese Burger) detected today. 12% increase in Pre-diabetes risk factor.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.warningDark} />
          </AnimatedPressable>

          {/* Daily Kanban Pipeline Section */}
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.titleRowFlex}>
              <Ionicons name="grid" size={18} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Daily Kanban Action Cards</Text>
            </View>
            <AnimatedPressable onPress={() => onNavigate('KanbanPlanner')}>
              <Text style={styles.viewAllText}>Full Board →</Text>
            </AnimatedPressable>
          </View>

          <View style={styles.kanbanSectionContainer}>
            {kanbanCards
              .filter((c) => c.status === 'in_progress' || c.status === 'todo')
              .slice(0, 3)
              .map((card) => (
                <KanbanCard
                  key={card.id}
                  card={card}
                  onMove={moveKanbanCard}
                  onDelete={deleteKanbanCard}
                />
              ))}
          </View>

          {/* Recent Scans Section */}
          <View style={styles.sectionHeaderBetween}>
            <Text style={styles.sectionTitle}>Recent Scans</Text>
            <AnimatedPressable onPress={() => onNavigate('HealthDashboard')}>
              <Text style={styles.viewAllText}>View All</Text>
            </AnimatedPressable>
          </View>

          {foodHistory.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onPress={() => {
                setCurrentScan(food);
                onNavigate('FoodDetectionResult');
              }}
            />
          ))}

          {/* Digital Twin Glass Banner */}
          <AnimatedPressable
            style={styles.twinGlassBanner}
            onPress={() => onNavigate('DigitalHealthTwin')}
          >
            <View style={styles.twinIconBox}>
              <Ionicons name="body" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.twinTextContainer}>
              <Text style={styles.twinTitle}>Digital Health Twin Projections</Text>
              <Text style={styles.twinSub}>See your predicted 6-month health risk trajectory</Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={24} color={COLORS.primary} />
          </AnimatedPressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileBtn: {
    padding: 2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 14,
    marginBottom: 10,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  titleRowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
  },
  viewAllText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  actionGrid: {
    paddingHorizontal: 20,
    gap: 10,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  glassActionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.sm,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  actionSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  alertGlassBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    ...SHADOWS.sm,
  },
  alertIconPulse: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTextContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.warningDark,
  },
  alertBody: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  kanbanSectionContainer: {
    paddingHorizontal: 20,
  },
  twinGlassBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(33, 118, 255, 0.25)',
    ...SHADOWS.md,
  },
  twinIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(33, 118, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twinTextContainer: {
    flex: 1,
  },
  twinTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  twinSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
