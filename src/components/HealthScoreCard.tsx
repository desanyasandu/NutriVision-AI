import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

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
        <View>
          <Text style={styles.greeting}>👋 Hello, {userName}</Text>
          <Text style={styles.title}>Health Score</Text>
          <Text style={styles.statusText}>Good job! Keep eating healthy.</Text>
        </View>

        <View style={styles.scoreCircle}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <Text style={styles.scoreSub}>/100</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.calorieSection}>
        <View style={styles.calorieHeader}>
          <View style={styles.calorieTitleRow}>
            <Ionicons name="flame-outline" size={18} color={COLORS.warning} />
            <Text style={styles.calorieLabel}>Today's Calories</Text>
          </View>
          <Text style={styles.calorieVal}>
            <Text style={styles.consumedText}>{consumedCalories}</Text> / {targetCalories} kcal
          </Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${caloriePercent}%` }]} />
        </View>

        <Text style={styles.percentText}>{caloriePercent}% of daily limit reached</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: COLORS.primaryLight,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  scoreCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: 'rgba(33, 118, 255, 0.15)',
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primaryLight,
    lineHeight: 26,
  },
  scoreSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: 16,
  },
  calorieSection: {
    gap: 8,
  },
  calorieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calorieTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  calorieLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  calorieVal: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  consumedText: {
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  percentText: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'right',
  },
});
