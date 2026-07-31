import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';

interface HealthScoreCardProps {
  score: number;
  consumedCalories: number;
  targetCalories: number;
  userName: string;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({
  score = 82,
  consumedCalories = 1250,
  targetCalories = 2500,
  userName = 'Desan',
}) => {
  const caloriePercent = Math.min(100, Math.round((consumedCalories / targetCalories) * 100));

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>👋 Welcome back, {userName}</Text>
          <Text style={styles.title}>Daily Health Score</Text>
          <Text style={styles.statusText}>Optimal metabolic status detected today.</Text>
        </View>

        <View style={styles.scoreGauge}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreMax}>/100</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.calorieSection}>
        <View style={styles.calorieHeader}>
          <View style={styles.calorieTitleRow}>
            <View style={styles.flameIconBox}>
              <Ionicons name="flame" size={16} color={COLORS.warning} />
            </View>
            <Text style={styles.calorieLabel}>Calorie Target</Text>
          </View>
          <Text style={styles.calorieVal}>
            <Text style={styles.consumedText}>{consumedCalories.toLocaleString()}</Text> /{' '}
            {targetCalories.toLocaleString()} kcal
          </Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${caloriePercent}%` }]} />
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.percentBadge}>{caloriePercent}% Target Reached</Text>
          <Text style={styles.remainingText}>{targetCalories - consumedCalories} kcal remaining</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(33, 118, 255, 0.15)',
    ...SHADOWS.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  greeting: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  scoreGauge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
    borderWidth: 4,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.glow,
  },
  scoreNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
    lineHeight: 28,
  },
  scoreMax: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: 16,
  },
  calorieSection: {
    gap: 10,
  },
  calorieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calorieTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flameIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calorieLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  calorieVal: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  consumedText: {
    fontWeight: '800',
    color: COLORS.primary,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: COLORS.trackBg,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  remainingText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
});
