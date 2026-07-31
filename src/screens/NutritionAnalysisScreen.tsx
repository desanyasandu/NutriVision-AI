import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { MedicalDisclaimerBox } from '../components/MedicalDisclaimerBox';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

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
    { label: 'Calories', val: `${food.calories} kcal`, pct: '34% DV', icon: 'flame', color: COLORS.secondary },
    { label: 'Protein', val: `${food.proteinGrams} g`, pct: '56% DV', icon: 'fitness', color: COLORS.primary },
    { label: 'Total Fat', val: `${food.fatGrams} g`, pct: '45% DV', icon: 'water', color: COLORS.danger },
    { label: 'Carbohydrates', val: `${food.carbsGrams} g`, pct: '18% DV', icon: 'cube', color: COLORS.primaryLight },
    { label: 'Added Sugar', val: `${food.sugarGrams} g`, pct: '24% DV', icon: 'ice-cream', color: COLORS.secondary },
    { label: 'Sodium (Salt)', val: `${food.sodiumMg} mg`, pct: '50% DV (High)', icon: 'alert-circle', color: COLORS.danger },
  ];

  return (
    <View style={styles.container}>
      <Header title="Nutrition Facts" subtitle={food.name} showBack onBack={onBack} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Health Score Banner */}
        <View style={[styles.scoreBanner, SHADOWS.sm]}>
          <View style={styles.scoreLeft}>
            <Text style={styles.bannerTitle}>Nutritional Quality Score</Text>
            <Text style={styles.bannerSub}>Calculated via WHO & Dietary Guideline Standards</Text>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreVal}>{food.healthScore}</Text>
            <Text style={styles.scoreLabel}>/100</Text>
          </View>
        </View>

        <MedicalDisclaimerBox compact />

        {/* Breakdown Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nutrition Breakdown (Per Serving)</Text>
        </View>

        {/* Nutrient Rows */}
        <View style={[styles.nutrientsContainer, SHADOWS.sm]}>
          {nutrientList.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.nutrientRow,
                idx === nutrientList.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={styles.nutrientLeft}>
                <View style={[styles.iconCircle, { backgroundColor: `${item.color}15` }]}>
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

        {/* Disease Risk Callout */}
        <View style={styles.riskCalloutCard}>
          <Ionicons name="pulse" size={24} color={COLORS.danger} />
          <View style={styles.riskCalloutText}>
            <Text style={styles.riskCalloutTitle}>Health Risk Indicator Identified</Text>
            <Text style={styles.riskCalloutSub}>
              Sodium and saturated fat content correlate to increased Hypertension and Pre-diabetes factors.
            </Text>
          </View>
        </View>

        <AnimatedPressable
          style={[styles.nextBtn, SHADOWS.md]}
          onPress={onNavigateToRisk}
        >
          <Text style={styles.nextBtnText}>See Full Health Risk Report</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </AnimatedPressable>
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
    marginTop: 14,
    padding: 18,
    borderRadius: 20,
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
    letterSpacing: -0.2,
  },
  bannerSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  scoreBox: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 3,
    borderColor: COLORS.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreVal: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.danger,
    lineHeight: 22,
  },
  scoreLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  nutrientsContainer: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    borderRadius: 20,
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
    borderBottomColor: COLORS.cardBorder,
  },
  nutrientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nutrientLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  nutrientRight: {
    alignItems: 'flex-end',
  },
  nutrientVal: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  nutrientPct: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  warningText: {
    color: COLORS.danger,
    fontWeight: '800',
  },
  riskCalloutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  riskCalloutText: {
    flex: 1,
  },
  riskCalloutTitle: {
    fontSize: 14,
    fontWeight: '800',
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
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginTop: 18,
    paddingVertical: 16,
    borderRadius: 18,
    minHeight: 48,
  },
  nextBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
});
