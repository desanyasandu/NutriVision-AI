import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { ProgressRing } from '../components/ProgressRing';
import { StatCard } from '../components/StatCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface NutritionAnalysisScreenProps {
  onBack: () => void;
  onNavigateToRisk: () => void;
}

export const NutritionAnalysisScreen: React.FC<NutritionAnalysisScreenProps> = ({
  onBack,
  onNavigateToRisk,
}) => {
  const { userProfile, foodHistory } = useApp();
  const [waterMl, setWaterMl] = useState(1800);

  const remainingCalories = userProfile.dailyCalorieTarget - userProfile.todayCaloriesConsumed;
  const progressPercent = Math.min(
    100,
    Math.round((userProfile.todayCaloriesConsumed / userProfile.dailyCalorieTarget) * 100)
  );

  const addWater = (amount: number) => {
    setWaterMl((prev) => Math.min(3000, prev + amount));
  };

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated App Bar */}
        <AnimatedAppBar
          title="Nutrition & Macros"
          subtitle="Daily Target & Micronutrient Metrics"
          showBack
          onBack={onBack}
          rightActionIcon="fitness"
          onRightAction={onNavigateToRisk}
        />

        {/* Circular Nutrition Ring Hero Card */}
        <GlassCard variant="glass" style={styles.heroCard}>
          <View style={styles.ringContainer}>
            <ProgressRing
              size={180}
              strokeWidth={16}
              progress={progressPercent}
              gradientColors={['#3B82F6', '#8B5CF6']}
            >
              <Text style={styles.consumedVal}>{userProfile.todayCaloriesConsumed}</Text>
              <Text style={styles.consumedLabel}>kCal Consumed</Text>
              <Text style={styles.remainingBadge}>
                {remainingCalories >= 0 ? `${remainingCalories} Left` : `${Math.abs(remainingCalories)} Over`}
              </Text>
            </ProgressRing>
          </View>

          {/* Daily Target Summary Grid */}
          <View style={styles.targetGrid}>
            <View style={styles.targetStatBox}>
              <Text style={styles.statLabel}>Daily Target</Text>
              <Text style={styles.statVal}>{userProfile.dailyCalorieTarget} kcal</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.targetStatBox}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={[styles.statVal, { color: COLORS.primary }]}>{remainingCalories} kcal</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.targetStatBox}>
              <Text style={styles.statLabel}>Metabolic Index</Text>
              <Text style={[styles.statVal, { color: COLORS.secondary }]}>Normal</Text>
            </View>
          </View>
        </GlassCard>

        {/* Interactive Water Progress Card */}
        <GlassCard
          icon="water"
          iconColor="#0EA5E9"
          iconBg="rgba(14, 165, 233, 0.12)"
          title="Hydration Goal"
          subtitle="Track daily water balance to prevent vascular headache triggers"
        >
          <View style={styles.waterRow}>
            <View style={styles.waterTextCol}>
              <Text style={styles.waterVal}>{(waterMl / 1000).toFixed(1)} / 2.5 L</Text>
              <Text style={styles.waterSub}>
                {waterMl >= 2500 ? '🎉 Goal Achieved!' : `${2500 - waterMl}ml needed for daily balance`}
              </Text>
            </View>

            <AnimatedPressable style={styles.addWaterBtn} onPress={() => addWater(250)}>
              <Ionicons name="add" size={16} color={COLORS.white} />
              <Text style={styles.addWaterText}>+250 ml</Text>
            </AnimatedPressable>
          </View>

          <View style={styles.waterTrack}>
            <View style={[styles.waterBar, { width: `${Math.min(100, (waterMl / 2500) * 100)}%` }]} />
          </View>
        </GlassCard>

        {/* Vitamin & Micronutrient Score */}
        <Text style={styles.sectionTitle}>Micronutrient Balance</Text>
        <View style={styles.vitaminGrid}>
          <GlassCard variant="glass" style={styles.vitaminTile}>
            <Ionicons name="sunny-outline" size={22} color={COLORS.warning} />
            <Text style={styles.vitaminName}>Vitamin D</Text>
            <Text style={styles.vitaminVal}>85%</Text>
            <Text style={styles.vitaminSub}>Optimal Level</Text>
          </GlassCard>

          <GlassCard variant="glass" style={styles.vitaminTile}>
            <Ionicons name="sparkles-outline" size={22} color={COLORS.accent} />
            <Text style={styles.vitaminName}>Magnesium</Text>
            <Text style={styles.vitaminVal}>92%</Text>
            <Text style={styles.vitaminSub}>Migraine Shield</Text>
          </GlassCard>
        </View>

        {/* Today's Meal Log Timeline */}
        <Text style={styles.sectionTitle}>Today's Meal Timeline</Text>
        {foodHistory.map((item, idx) => (
          <GlassCard key={item.id || idx} style={styles.timelineCard}>
            <View style={styles.timelineRow}>
              <View style={styles.timeBadge}>
                <Ionicons name="time-outline" size={14} color={COLORS.primary} />
                <Text style={styles.timeBadgeText}>{item.scannedAt}</Text>
              </View>
              <Text style={styles.timelineCal}>{item.calories} kcal</Text>
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>{item.name}</Text>
              <Text style={styles.timelineSub}>{item.category} • Health Score: {item.healthScore}/100</Text>
            </View>
          </GlassCard>
        ))}

        {/* CTA Button to Disease Analysis */}
        <PrimaryButton
          title="Analyze Disease Risk Factors"
          icon="shield-checkmark-outline"
          onPress={onNavigateToRisk}
          style={{ marginTop: 16 }}
        />

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
  heroCard: {
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 24,
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  consumedVal: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
  },
  consumedLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  remainingBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  targetGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(241, 245, 249, 0.9)',
  },
  targetStatBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(226, 232, 240, 0.9)',
  },
  sectionTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginTop: 18,
    marginBottom: 10,
  },
  waterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  waterTextCol: {
    flex: 1,
  },
  waterVal: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  waterSub: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  addWaterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0EA5E9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    gap: 4,
  },
  addWaterText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white,
  },
  waterTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(224, 242, 254, 0.9)',
    overflow: 'hidden',
    marginTop: 12,
  },
  waterBar: {
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 4,
  },
  vitaminGrid: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 4,
  },
  vitaminTile: {
    flex: 1,
    padding: 16,
  },
  vitaminName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  vitaminVal: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: 2,
  },
  vitaminSub: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 2,
  },
  timelineCard: {
    marginVertical: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  timeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  timelineCal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  timelineContent: {
    marginTop: 2,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  timelineSub: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
