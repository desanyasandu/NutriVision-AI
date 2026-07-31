import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { StatCard } from '../components/StatCard';
import { ProgressRing } from '../components/ProgressRing';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { userProfile, foodHistory, currentScan } = useApp();

  const caloriesProgress = Math.min(
    100,
    Math.round((userProfile.todayCaloriesConsumed / userProfile.dailyCalorieTarget) * 100)
  );

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Transparent Animated App Bar with Profile Avatar */}
        <AnimatedAppBar
          showProfile
          onProfilePress={() => onNavigate('UserProfile')}
          rightActionIcon="notifications-outline"
          onRightAction={() => onNavigate('AIAgentCoach')}
        />

        {/* Large Greeting Header */}
        <View style={styles.greetingHeader}>
          <Text style={styles.greetingSub}>WELCOME BACK</Text>
          <Text style={styles.greetingTitle}>Hello, {userProfile.name} 👋</Text>
          <Text style={styles.greetingDesc}>Your vital signs & daily nutrition are performing optimally today.</Text>
        </View>

        {/* Daily Health Score Hero Glass Card */}
        <GlassCard variant="glass" style={styles.scoreHeroCard}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreTextCol}>
              <View style={styles.scoreBadge}>
                <Ionicons name="shield-checkmark" size={14} color={COLORS.secondary} />
                <Text style={styles.scoreBadgeText}>Optimal Status</Text>
              </View>
              <Text style={styles.scoreHeroTitle}>Daily Health Score</Text>
              <Text style={styles.scoreHeroDesc}>
                Calculated from real-time metabolic rate, meal log balance, and migraine vulnerability metrics.
              </Text>
              <AnimatedPressable style={styles.viewTwinBtn} onPress={() => onNavigate('DigitalHealthTwin')}>
                <Text style={styles.viewTwinText}>Explore Digital Twin</Text>
                <Ionicons name="sparkles" size={14} color={COLORS.accent} />
              </AnimatedPressable>
            </View>

            <ProgressRing
              size={124}
              strokeWidth={11}
              progress={userProfile.healthScore}
              gradientColors={['#3B82F6', '#10B981']}
              centerTitle={`${userProfile.healthScore}`}
              centerSubtitle="Score"
            />
          </View>
        </GlassCard>

        {/* Today's Vital Metrics Grid (Calories, Water, Heart, Sleep) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Today's Vitals</Text>
          <AnimatedPressable onPress={() => onNavigate('HealthDashboard')}>
            <Text style={styles.seeAllText}>Dashboard →</Text>
          </AnimatedPressable>
        </View>

        <View style={styles.metricsGrid}>
          <StatCard
            title="Today's Calories"
            value={`${userProfile.todayCaloriesConsumed}`}
            unit={`/ ${userProfile.dailyCalorieTarget} kcal`}
            icon="flame"
            iconColor={COLORS.primary}
            iconBg="rgba(59, 130, 246, 0.1)"
            progress={caloriesProgress}
            subtitle={`${caloriesProgress}% of daily limit`}
            sparklineData={[400, 650, 920, 1100, userProfile.todayCaloriesConsumed]}
            onPress={() => onNavigate('NutritionAnalysis')}
          />

          <StatCard
            title="Water Intake"
            value="1.8"
            unit="/ 2.5 L"
            icon="water"
            iconColor="#0EA5E9"
            iconBg="rgba(14, 165, 233, 0.1)"
            progress={72}
            trend="+0.4L"
            trendPositive={true}
            sparklineData={[0.5, 0.8, 1.2, 1.5, 1.8]}
            onPress={() => onNavigate('NutritionAnalysis')}
          />
        </View>

        <View style={styles.metricsGrid}>
          <StatCard
            title="Heart Rate"
            value="72"
            unit="BPM"
            icon="heart"
            iconColor={COLORS.danger}
            iconBg="rgba(239, 68, 68, 0.1)"
            trend="Normal"
            trendPositive={true}
            sparklineData={[68, 74, 71, 69, 75, 72]}
            onPress={() => onNavigate('HealthDashboard')}
          />

          <StatCard
            title="Restful Sleep"
            value="7h 45m"
            unit="Deep"
            icon="moon"
            iconColor={COLORS.accent}
            iconBg="rgba(124, 58, 237, 0.1)"
            progress={86}
            trend="+45m"
            trendPositive={true}
            sparklineData={[6, 6.5, 7, 7.2, 7.75]}
            onPress={() => onNavigate('HealthDashboard')}
          />
        </View>

        {/* AI Recommendation Banner Card */}
        <GlassCard
          variant="gradient"
          icon="sparkles"
          iconColor={COLORS.accent}
          iconBg="rgba(124, 58, 237, 0.12)"
          title="NutriVision AI Clinical Advice"
          subtitle="Pre-Diabetes & Migraine Shield"
          badgeText="AI Recommendation"
          badgeColor={COLORS.accent}
          ctaText="Consult Clinical AI Assistant"
          onCtaPress={() => onNavigate('AIAgentCoach')}
        >
          <Text style={styles.aiAdviceBody}>
            "Your recent lunch recorded 680 kcal with elevated sodium. For dinner, choose grilled salmon with quinoa to protect against blood sugar spikes and vascular migraine triggers."
          </Text>
        </GlassCard>

        {/* Quick Actions Bar */}
        <Text style={styles.sectionTitle}>Quick Health Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActionsScroll}>
          <AnimatedPressable style={styles.actionChip} onPress={() => onNavigate('FoodScan')}>
            <View style={[styles.actionIconBox, { backgroundColor: 'rgba(59, 130, 246, 0.12)' }]}>
              <Ionicons name="camera" size={22} color={COLORS.primary} />
            </View>
            <Text style={styles.actionChipTitle}>Scan Food</Text>
            <Text style={styles.actionChipSub}>AI Camera</Text>
          </AnimatedPressable>

          <AnimatedPressable style={styles.actionChip} onPress={() => onNavigate('AIAgentCoach')}>
            <View style={[styles.actionIconBox, { backgroundColor: 'rgba(124, 58, 237, 0.12)' }]}>
              <Ionicons name="sparkles" size={22} color={COLORS.accent} />
            </View>
            <Text style={styles.actionChipTitle}>AI Coach</Text>
            <Text style={styles.actionChipSub}>ChatGPT v2</Text>
          </AnimatedPressable>

          <AnimatedPressable style={styles.actionChip} onPress={() => onNavigate('DigitalHealthTwin')}>
            <View style={[styles.actionIconBox, { backgroundColor: 'rgba(16, 185, 129, 0.12)' }]}>
              <Ionicons name="body" size={22} color={COLORS.secondary} />
            </View>
            <Text style={styles.actionChipTitle}>Health Twin</Text>
            <Text style={styles.actionChipSub}>3D Organ Model</Text>
          </AnimatedPressable>

          <AnimatedPressable style={styles.actionChip} onPress={() => onNavigate('VoiceAssistant')}>
            <View style={[styles.actionIconBox, { backgroundColor: 'rgba(245, 158, 11, 0.12)' }]}>
              <Ionicons name="mic" size={22} color={COLORS.warning} />
            </View>
            <Text style={styles.actionChipTitle}>Voice Assistant</Text>
            <Text style={styles.actionChipSub}>Live Speech</Text>
          </AnimatedPressable>
        </ScrollView>

        {/* Recent Meal Scan Card */}
        {currentScan && (
          <GlassCard
            icon="restaurant"
            iconColor={COLORS.primary}
            title="Last Scanned Meal"
            subtitle={currentScan.scannedAt}
            ctaText="Detailed Nutrition Breakdown"
            onCtaPress={() => onNavigate('FoodDetectionResult')}
          >
            <View style={styles.recentMealRow}>
              <Image source={{ uri: currentScan.imageUrl }} style={styles.recentMealImg} />
              <View style={styles.recentMealDetails}>
                <Text style={styles.recentMealName}>{currentScan.name}</Text>
                <Text style={styles.recentMealCategory}>{currentScan.category} • {currentScan.calories} kcal</Text>
                <View style={styles.macroPillsRow}>
                  <Text style={styles.macroPill}>P: {currentScan.proteinGrams}g</Text>
                  <Text style={styles.macroPill}>F: {currentScan.fatGrams}g</Text>
                  <Text style={styles.macroPill}>C: {currentScan.carbsGrams}g</Text>
                </View>
              </View>
            </View>
          </GlassCard>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  greetingHeader: {
    marginTop: 4,
    marginBottom: 16,
  },
  greetingSub: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  greetingTitle: {
    fontSize: DESIGN_TOKENS.fontSize.hugeTitle, // 32
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
    marginTop: 2,
  },
  greetingDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  scoreHeroCard: {
    marginVertical: 10,
    padding: 20,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreTextCol: {
    flex: 1,
    marginRight: 12,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 8,
  },
  scoreBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondaryDark,
  },
  scoreHeroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
  },
  scoreHeroDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  viewTwinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
  viewTwinText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.accent,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginTop: 14,
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 4,
  },
  aiAdviceBody: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 21,
    fontStyle: 'italic',
    marginTop: 4,
  },
  quickActionsScroll: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingBottom: 8,
  },
  actionChip: {
    width: 124,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 20,
    padding: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionChipTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  actionChipSub: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 2,
  },
  recentMealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  recentMealImg: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  recentMealDetails: {
    flex: 1,
  },
  recentMealName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  recentMealCategory: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  macroPillsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  macroPill: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
