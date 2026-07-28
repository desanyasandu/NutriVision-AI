import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { HealthScoreCard } from '../components/HealthScoreCard';
import { FoodCard } from '../components/FoodCard';
import { COLORS } from '../theme/colors';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { userProfile, foodHistory, setCurrentScan } = useApp();

  // Animation Refs for Entry Micro-animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const cardScaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.spring(cardScaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="NutriVision"
        subtitle="AI Health & Disease Assistant"
        rightAction={
          <TouchableOpacity style={styles.profileBtn} onPress={() => onNavigate('UserProfile')}>
            <Ionicons name="person-circle-outline" size={28} color={COLORS.primaryLight} />
          </TouchableOpacity>
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
            <TouchableOpacity
              style={[styles.glassActionCard, { backgroundColor: 'rgba(33, 118, 255, 0.07)' }]}
              onPress={() => onNavigate('FoodScan')}
              activeOpacity={0.78}
            >
              <View style={[styles.actionIconBox, { backgroundColor: COLORS.primary }]}>
                <Ionicons name="camera" size={22} color={COLORS.white} />
              </View>
              <Text style={styles.actionTitle}>Scan Food</Text>
              <Text style={styles.actionSub}>Camera & OCR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.glassActionCard, { backgroundColor: 'rgba(247, 152, 36, 0.08)' }]}
              onPress={() => onNavigate('VoiceAssistant')}
              activeOpacity={0.78}
            >
              <View style={[styles.actionIconBox, { backgroundColor: COLORS.secondary }]}>
                <Ionicons name="mic" size={22} color={COLORS.white} />
              </View>
              <Text style={styles.actionTitle}>Voice Scan</Text>
              <Text style={styles.actionSub}>NLP Audio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.glassActionCard, { backgroundColor: 'rgba(51, 161, 253, 0.08)' }]}
              onPress={() => onNavigate('HealthDashboard')}
              activeOpacity={0.78}
            >
              <View style={[styles.actionIconBox, { backgroundColor: COLORS.accent }]}>
                <Ionicons name="stats-chart" size={22} color={COLORS.white} />
              </View>
              <Text style={styles.actionTitle}>Health Report</Text>
              <Text style={styles.actionSub}>Analytics</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.glassActionCard, { backgroundColor: 'rgba(245, 158, 11, 0.08)' }]}
              onPress={() => onNavigate('AIAgentCoach')}
              activeOpacity={0.78}
            >
              <View style={[styles.actionIconBox, { backgroundColor: COLORS.warning }]}>
                <Ionicons name="sparkles" size={22} color={COLORS.white} />
              </View>
              <Text style={styles.actionTitle}>AI Coach</Text>
              <Text style={styles.actionSub}>Agentic Guidance</Text>
            </TouchableOpacity>
          </View>

          {/* Proactive Agent Alert with Glassmorphism */}
          <TouchableOpacity
            style={styles.alertGlassBanner}
            onPress={() => onNavigate('DiseaseRiskAnalysis')}
            activeOpacity={0.82}
          >
            <View style={styles.alertIconPulse}>
              <Ionicons name="warning" size={20} color={COLORS.warning} />
            </View>
            <View style={styles.alertTextContent}>
              <Text style={styles.alertTitle}>Proactive AI Alert</Text>
              <Text style={styles.alertBody}>
                High sodium item (Cheese Burger) detected today. 12% increase in Pre-diabetes risk factor.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.warning} />
          </TouchableOpacity>

          {/* Recent Scans Section */}
          <View style={styles.sectionHeaderBetween}>
            <Text style={styles.sectionTitle}>Recent Scans</Text>
            <TouchableOpacity onPress={() => onNavigate('HealthDashboard')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.twinGlassBanner}
            onPress={() => onNavigate('DigitalHealthTwin')}
            activeOpacity={0.85}
          >
            <View style={styles.twinIconBox}>
              <Ionicons name="body-outline" size={26} color={COLORS.primary} />
            </View>
            <View style={styles.twinTextContainer}>
              <Text style={styles.twinTitle}>Digital Health Twin Projections</Text>
              <Text style={styles.twinSub}>See your predicted 6-month health risk trajectory</Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={26} color={COLORS.primary} />
          </TouchableOpacity>
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
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  viewAllText: {
    fontSize: 13,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
  },
  glassActionCard: {
    width: '47%',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  actionIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  actionSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  alertGlassBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(254, 243, 199, 0.75)',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    shadowColor: COLORS.warning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  alertIconPulse: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTextContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.warning,
  },
  alertBody: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  twinGlassBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(33, 118, 255, 0.3)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  twinIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(33, 118, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twinTextContainer: {
    flex: 1,
  },
  twinTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  twinSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
