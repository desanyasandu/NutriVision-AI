import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FoodItem } from '../data/mockData';
import { AnimatedPressable } from './AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface FoodCardProps {
  food: FoodItem;
  onPress?: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onPress }) => {
  const isHealthy = food.healthScore >= 70;

  return (
    <AnimatedPressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: food.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {food.name}
          </Text>
          <View
            style={[
              styles.scorePill,
              {
                backgroundColor: isHealthy
                  ? 'rgba(16, 185, 129, 0.12)'
                  : 'rgba(239, 68, 68, 0.12)',
              },
            ]}
          >
            <Text
              style={[
                styles.scoreText,
                { color: isHealthy ? COLORS.successDark : COLORS.danger },
              ]}
            >
              {food.healthScore}/100
            </Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.timeText}>{food.scannedAt}</Text>
          <View style={styles.confidenceChip}>
            <Text style={styles.confidenceText}>
              {food.confidence}% {food.confidenceInterval}
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={12} color={COLORS.warning} />
            <Text style={styles.statText}>{food.calories} kcal</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="fitness" size={12} color={COLORS.primary} />
            <Text style={styles.statText}>{food.proteinGrams}g P</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="nutrition" size={12} color={COLORS.secondary} />
            <Text style={styles.statText}>{food.carbsGrams}g C</Text>
          </View>
        </View>

        {food.diseaseWarnings.length > 0 && (
          <View style={styles.warningTag}>
            <Ionicons name="warning" size={12} color={COLORS.warningDark} />
            <Text style={styles.warningText} numberOfLines={1}>
              {food.diseaseWarnings[0]}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.arrowIcon}>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.sm,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 14,
    backgroundColor: COLORS.trackBg,
  },
  content: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.textPrimary,
    flex: 1,
    letterSpacing: -0.3,
  },
  scorePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
    marginBottom: 6,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  confidenceChip: {
    backgroundColor: 'rgba(33, 118, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  warningTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 6,
  },
  warningText: {
    fontSize: 12,
    color: COLORS.warningDark,
    fontWeight: '800',
    flex: 1,
  },
  arrowIcon: {
    paddingLeft: 4,
  },
});
