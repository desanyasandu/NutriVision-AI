import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface FoodDetectionResultScreenProps {
  onBack: () => void;
  onViewNutrition: () => void;
  onCheckDisease: () => void;
  onAskAgent: () => void;
}

export const FoodDetectionResultScreen: React.FC<FoodDetectionResultScreenProps> = ({
  onBack,
  onViewNutrition,
  onCheckDisease,
  onAskAgent,
}) => {
  const { currentScan } = useApp();
  const [showNutrientDetails, setShowNutrientDetails] = useState(false);

  const scan = currentScan || {
    id: 'food_1',
    name: 'Cheese Burger',
    category: 'Fast Food',
    confidence: 97,
    confidenceInterval: '±3.8%',
    healthScore: 42,
    calories: 680,
    proteinGrams: 28,
    fatGrams: 35,
    carbsGrams: 54,
    sugarGrams: 12,
    sodiumMg: 1150,
    ingredients: ['Bun', 'Cheese', 'Beef Patty', 'Onion', 'Sauce', 'Pickles'],
    diseaseWarnings: ['High Saturated Fat', 'High Sodium (Hypertension factor)', 'Refined Carbs'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    scannedAt: 'Today, 12:30 PM',
  };

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated App Bar */}
        <AnimatedAppBar
          title="Analysis Result"
          subtitle="AI Food Recognition & Risk Log"
          showBack
          onBack={onBack}
          rightActionIcon="sparkles"
          onRightAction={onAskAgent}
        />

        {/* Large Food Image Hero Card */}
        <View style={[styles.heroCard, SHADOWS.md]}>
          <Image source={{ uri: scan.imageUrl }} style={styles.heroImg} />
          <View style={styles.heroOverlay} />

          {/* Floating Health Score Badge */}
          <View style={styles.scoreFloatBadge}>
            <Text style={styles.scoreFloatLabel}>NUTRITION SCORE</Text>
            <Text style={[styles.scoreFloatVal, { color: scan.healthScore > 70 ? COLORS.secondary : COLORS.warning }]}>
              {scan.healthScore}/100
            </Text>
          </View>

          {/* Confidence Badge */}
          <View style={styles.confidenceFloatBadge}>
            <Ionicons name="sparkles" size={12} color={COLORS.white} />
            <Text style={styles.confidenceFloatText}>{scan.confidence}% Confidence ({scan.confidenceInterval})</Text>
          </View>

          <View style={styles.heroTitleBox}>
            <Text style={styles.foodName}>{scan.name}</Text>
            <Text style={styles.foodCategory}>{scan.category} • Logged {scan.scannedAt}</Text>
          </View>
        </View>

        {/* Animated Macro Nutrient Progress Bars */}
        <GlassCard variant="glass" title="Macronutrients Breakdown" subtitle="Recorded Intake vs Recommended Daily Ratios">
          <View style={styles.macroRow}>
            {/* Calories */}
            <View style={styles.macroCol}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroName}>Calories</Text>
                <Text style={styles.macroVal}>{scan.calories} kcal</Text>
              </View>
              <View style={styles.macroTrack}>
                <View style={[styles.macroBar, { width: `${Math.min(100, (scan.calories / 2000) * 100)}%`, backgroundColor: COLORS.primary }]} />
              </View>
            </View>

            {/* Protein */}
            <View style={styles.macroCol}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroName}>Protein</Text>
                <Text style={styles.macroVal}>{scan.proteinGrams}g</Text>
              </View>
              <View style={styles.macroTrack}>
                <View style={[styles.macroBar, { width: `${Math.min(100, (scan.proteinGrams / 80) * 100)}%`, backgroundColor: COLORS.secondary }]} />
              </View>
            </View>
          </View>

          <View style={styles.macroRow}>
            {/* Fat */}
            <View style={styles.macroCol}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroName}>Fat</Text>
                <Text style={styles.macroVal}>{scan.fatGrams}g</Text>
              </View>
              <View style={styles.macroTrack}>
                <View style={[styles.macroBar, { width: `${Math.min(100, (scan.fatGrams / 65) * 100)}%`, backgroundColor: COLORS.warning }]} />
              </View>
            </View>

            {/* Carbs */}
            <View style={styles.macroCol}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroName}>Carbs</Text>
                <Text style={styles.macroVal}>{scan.carbsGrams}g</Text>
              </View>
              <View style={styles.macroTrack}>
                <View style={[styles.macroBar, { width: `${Math.min(100, (scan.carbsGrams / 250) * 100)}%`, backgroundColor: COLORS.accent }]} />
              </View>
            </View>
          </View>
        </GlassCard>

        {/* AI Advice Card */}
        <GlassCard
          variant="gradient"
          icon="sparkles"
          iconColor={COLORS.accent}
          title="Clinical AI Advice"
          subtitle="Tailored to your active pre-diabetes & migraine profile"
        >
          <Text style={styles.aiAdviceText}>
            "This item contains high sodium ({scan.sodiumMg}mg) and refined carbs. While high in protein, consider drinking extra water to offset vascular pressure spikes."
          </Text>

          {scan.diseaseWarnings.length > 0 && (
            <View style={styles.warningsBox}>
              <Text style={styles.warningTitle}>Detected Disease Warnings:</Text>
              {scan.diseaseWarnings.map((warn, i) => (
                <Text key={i} style={styles.warningItem}>⚠️ {warn}</Text>
              ))}
            </View>
          )}
        </GlassCard>

        {/* Healthy Alternatives Recommendations */}
        <Text style={styles.sectionTitle}>Healthy Alternatives</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.altScroll}>
          <GlassCard variant="accent" style={styles.altCard}>
            <Ionicons name="leaf-outline" size={24} color={COLORS.secondary} />
            <Text style={styles.altTitle}>Grilled Turkey Wrap</Text>
            <Text style={styles.altSub}>-320 kcal • Low Sodium</Text>
            <View style={styles.altBadge}>
              <Text style={styles.altBadgeText}>Score: 91</Text>
            </View>
          </GlassCard>

          <GlassCard variant="accent" style={styles.altCard}>
            <Ionicons name="fish-outline" size={24} color={COLORS.primary} />
            <Text style={styles.altTitle}>Salmon Avocado Bowl</Text>
            <Text style={styles.altSub}>Omega-3 Rich • Zero Sugar</Text>
            <View style={styles.altBadge}>
              <Text style={styles.altBadgeText}>Score: 95</Text>
            </View>
          </GlassCard>
        </ScrollView>

        {/* Expandable Nutrient Details */}
        <GlassCard
          icon="list"
          iconColor={COLORS.primary}
          title="Micro-Nutrients & Ingredients"
          subtitle="Tap to expand full ingredient breakdown"
          onPress={() => setShowNutrientDetails(!showNutrientDetails)}
        >
          {showNutrientDetails && (
            <View style={styles.detailsExpandBox}>
              <Text style={styles.expandLabel}>Ingredients:</Text>
              <Text style={styles.expandVal}>{scan.ingredients.join(', ')}</Text>

              <Text style={[styles.expandLabel, { marginTop: 8 }]}>Sodium Level:</Text>
              <Text style={styles.expandVal}>{scan.sodiumMg} mg (57% Daily Limit)</Text>

              <Text style={[styles.expandLabel, { marginTop: 8 }]}>Added Sugar:</Text>
              <Text style={styles.expandVal}>{scan.sugarGrams} g</Text>
            </View>
          )}
          <View style={styles.expandToggleRow}>
            <Text style={styles.toggleText}>{showNutrientDetails ? 'Hide Details' : 'Show All Details'}</Text>
            <Ionicons name={showNutrientDetails ? 'chevron-up' : 'chevron-down'} size={16} color={COLORS.primary} />
          </View>
        </GlassCard>

        {/* Bottom Primary Action Buttons */}
        <View style={styles.actionGroup}>
          <PrimaryButton
            title="Check Disease Compatibility"
            icon="medical-outline"
            onPress={onCheckDisease}
          />
          <SecondaryButton
            title="Full Nutrition Timeline"
            icon="pie-chart-outline"
            onPress={onViewNutrition}
          />
        </View>

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
    height: 240,
    borderRadius: DESIGN_TOKENS.borderRadius.card, // 24
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 12,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  scoreFloatBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
  scoreFloatLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  scoreFloatVal: {
    fontSize: 18,
    fontWeight: '900',
  },
  confidenceFloatBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  confidenceFloatText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.white,
  },
  heroTitleBox: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  foodName: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  foodCategory: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 6,
  },
  macroCol: {
    flex: 1,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  macroName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  macroVal: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  macroTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(241, 245, 249, 0.9)',
    overflow: 'hidden',
  },
  macroBar: {
    height: '100%',
    borderRadius: 3,
  },
  aiAdviceText: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  warningsBox: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(241, 245, 249, 0.9)',
    gap: 4,
  },
  warningTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.dangerDark,
  },
  warningItem: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.danger,
  },
  sectionTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginTop: 16,
    marginBottom: 10,
  },
  altScroll: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  altCard: {
    width: 170,
    marginRight: 12,
  },
  altTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 6,
  },
  altSub: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  altBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  altBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.secondaryDark,
  },
  detailsExpandBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(241, 245, 249, 0.9)',
  },
  expandLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textSecondary,
  },
  expandVal: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  expandToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 10,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  actionGroup: {
    marginTop: 14,
    gap: 4,
  },
});
