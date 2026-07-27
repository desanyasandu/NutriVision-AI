import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { COLORS } from '../theme/colors';

interface NutritionAnalysisScreenProps {
  onBack: () => void;
  onNavigateToRisk: () => void;
}

export const NutritionAnalysisScreen: React.FC<NutritionAnalysisScreenProps> = ({
  onBack,
  onNavigateToRisk,
}) => {
  const { currentScan } = useApp();
  const food = currentScan || {
    id: 'food_1',
    name: 'Cheese Burger',
    calories: 680,
    proteinGrams: 28,
    fatGrams: 35,
    carbsGrams: 54,
    sugarGrams: 12,
    sodiumMg: 1150,
    healthScore: 42,
  };

  const nutrientList = [
    { label: 'Calories', val: `${food.calories} kcal`, pct: '34% DV', icon: 'flame', color: COLORS.warning },
    { label: 'Protein', val: `${food.proteinGrams} g`, pct: '56% DV', icon: 'fitness', color: COLORS.primary },
    { label: 'Total Fat', val: `${food.fatGrams} g`, pct: '45% DV', icon: 'water', color: COLORS.danger },
    { label: 'Carbohydrates', val: `${food.carbsGrams} g`, pct: '18% DV', icon: 'cube', color: COLORS.accent },
    { label: 'Added Sugar', val: `${food.sugarGrams} g`, pct: '24% DV', icon: 'ice-cream', color: COLORS.secondaryLight },
    { label: 'Sodium (Salt)', val: `${food.sodiumMg} mg`, pct: '50% DV (High)', icon: 'alert-circle', color: COLORS.danger },
  ];

  return (
    <View style={styles.container}>
      <Header title="Nutrition Analysis" subtitle={food.name} showBack onBack={onBack} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Health Score Banner */}
        <View style={styles.scoreBanner}>
          <View style={styles.scoreLeft}>
            <Text style={styles.bannerTitle}>Health Impact Score</Text>
            <Text style={styles.bannerSub}>Calculated using AI Nutritional Matrix</Text>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreVal}>{food.healthScore}</Text>
            <Text style={styles.scoreLabel}>/100</Text>
          </View>
        </View>

        {/* Breakdown Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nutrition Facts (Per Serving)</Text>
        </View>

        {/* Nutrient Rows */}
        <View style={styles.nutrientsContainer}>
          {nutrientList.map((item, idx) => (
            <View key={idx} style={styles.nutrientRow}>
              <View style={styles.nutrientLeft}>
                <View style={[styles.iconCircle, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons name={item.icon as any} size={18} color={item.color} />
                </View>
                <Text style={styles.nutrientLabel}>{item.label}</Text>
              </View>

              <View style={styles.nutrientRight}>
                <Text style={styles.nutrientVal}>{item.val}</Text>
                <Text style={[styles.nutrientPct, item.label.includes('Sodium') && styles.warningText]}>
                  {item.pct}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Disease Risk Trigger Callout */}
        <View style={styles.riskCalloutCard}>
          <Ionicons name="pulse" size={24} color={COLORS.danger} />
          <View style={styles.riskCalloutText}>
            <Text style={styles.riskCalloutTitle}>Predictive Disease Risk Detected</Text>
            <Text style={styles.riskCalloutSub}>
              Sodium & Saturated fat levels correlate to increased Hypertension & Obesity factors.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={onNavigateToRisk} activeOpacity={0.85}>
          <Text style={styles.nextBtnText}>See Full Disease Risk Analysis</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
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
  scrollContent: {
    paddingBottom: 40,
  },
  scoreBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  scoreLeft: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  bannerSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  scoreBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 2,
    borderColor: COLORS.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreVal: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.danger,
  },
  scoreLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  nutrientsContainer: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  nutrientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nutrientLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  nutrientRight: {
    alignItems: 'flex-end',
  },
  nutrientVal: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  nutrientPct: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  warningText: {
    color: COLORS.warning,
    fontWeight: '700',
  },
  riskCalloutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  riskCalloutText: {
    flex: 1,
  },
  riskCalloutTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.danger,
  },
  riskCalloutSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 16,
  },
  nextBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
