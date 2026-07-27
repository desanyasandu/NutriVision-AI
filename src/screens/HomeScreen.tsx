import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
        {/* Health Score Overview */}
        <HealthScoreCard
          score={userProfile.healthScore}
          consumedCalories={userProfile.todayCaloriesConsumed}
          targetCalories={userProfile.dailyCalorieTarget}
          userName={userProfile.name}
        />

        {/* Quick Action Grid (Slide 7 Screen 2) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: 'rgba(16, 185, 129, 0.12)' }]}
            onPress={() => onNavigate('FoodScan')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="camera" size={22} color={COLORS.white} />
            </View>
            <Text style={styles.actionTitle}>Scan Food</Text>
            <Text style={styles.actionSub}>Camera & OCR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: 'rgba(139, 92, 246, 0.12)' }]}
            onPress={() => onNavigate('VoiceAssistant')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: COLORS.secondary }]}>
              <Ionicons name="mic" size={22} color={COLORS.white} />
            </View>
            <Text style={styles.actionTitle}>Voice Scan</Text>
            <Text style={styles.actionSub}>NLP Audio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: 'rgba(6, 182, 212, 0.12)' }]}
            onPress={() => onNavigate('HealthDashboard')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: COLORS.accent }]}>
              <Ionicons name="stats-chart" size={22} color={COLORS.white} />
            </View>
            <Text style={styles.actionTitle}>Health Report</Text>
            <Text style={styles.actionSub}>Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: 'rgba(245, 158, 11, 0.12)' }]}
            onPress={() => onNavigate('AIAgentCoach')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: COLORS.warning }]}>
              <Ionicons name="sparkles" size={22} color={COLORS.white} />
            </View>
            <Text style={styles.actionTitle}>AI Coach</Text>
            <Text style={styles.actionSub}>Agentic Guidance</Text>
          </TouchableOpacity>
        </View>

        {/* Proactive Agent Alert */}
        <View style={styles.alertBanner}>
          <Ionicons name="warning" size={20} color={COLORS.warning} />
          <View style={styles.alertTextContent}>
            <Text style={styles.alertTitle}>Proactive AI Alert</Text>
            <Text style={styles.alertBody}>
              High sodium item (Cheese Burger) detected today. 12% increase in Pre-diabetes risk factor.
            </Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate('DiseaseRiskAnalysis')}>
            <Ionicons name="chevron-forward" size={20} color={COLORS.warning} />
          </TouchableOpacity>
        </View>

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

        {/* Digital Twin Button Card */}
        <TouchableOpacity
          style={styles.twinBanner}
          onPress={() => onNavigate('DigitalHealthTwin')}
          activeOpacity={0.85}
        >
          <View style={styles.twinIconBox}>
            <Ionicons name="body-outline" size={26} color={COLORS.secondaryLight} />
          </View>
          <View style={styles.twinTextContainer}>
            <Text style={styles.twinTitle}>Digital Health Twin Projections</Text>
            <Text style={styles.twinSub}>See your predicted 6-month health risk trajectory</Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={24} color={COLORS.secondaryLight} />
        </TouchableOpacity>
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
    marginTop: 8,
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
  actionCard: {
    width: '47%',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.cardBg,
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
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  actionSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
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
  twinBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
    marginHorizontal: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(33, 118, 255, 0.25)',
  },
  twinIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.cardBg,
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
