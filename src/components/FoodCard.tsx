import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FoodItem } from '../data/mockData';
import { COLORS } from '../theme/colors';

interface FoodCardProps {
  food: FoodItem;
  onPress?: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onPress }) => {
  const isHealthy = food.healthScore >= 70;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: food.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {food.name}
          </Text>
          <View
            style={[
              styles.scorePill,
              { backgroundColor: isHealthy ? 'rgba(33, 118, 255, 0.15)' : 'rgba(247, 152, 36, 0.15)' },
            ]}
          >
            <Text style={[styles.scoreText, { color: isHealthy ? COLORS.primary : COLORS.danger }]}>
              {food.healthScore}/100
            </Text>
          </View>
        </View>

        <Text style={styles.timeText}>{food.scannedAt}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="flame-outline" size={12} color={COLORS.warning} />
            <Text style={styles.statText}>{food.calories} kcal</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="fitness-outline" size={12} color={COLORS.accent} />
            <Text style={styles.statText}>{food.proteinGrams}g Protein</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="cube-outline" size={12} color={COLORS.secondaryLight} />
            <Text style={styles.statText}>{food.carbsGrams}g Carbs</Text>
          </View>
        </View>

        {food.diseaseWarnings.length > 0 && (
          <View style={styles.warningTag}>
            <Ionicons name="warning-outline" size={12} color={COLORS.warning} />
            <Text style={styles.warningText} numberOfLines={1}>
              {food.diseaseWarnings[0]}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.arrowIcon}>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#2A3654',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  scorePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  scoreText: {
    fontSize: 11,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
    marginBottom: 6,
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
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  warningTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
  },
  warningText: {
    fontSize: 10,
    color: COLORS.warning,
    flex: 1,
  },
  arrowIcon: {
    paddingLeft: 4,
  },
});
