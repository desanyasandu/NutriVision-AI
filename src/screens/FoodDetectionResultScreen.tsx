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

interface FoodDetectionResultScreenProps {
  onBack: () => void;
  onViewNutrition: () => void;
  onCheckDisease: () => void;
  onAskAgent: () => void;
}

const MACRO_CONFIG = [
  { key: 'calories', label: 'Calories', unit: 'kcal', max: 2000, color: COLORS.primary, icon: 'flame' as const },
  { key: 'protein', label: 'Protein', unit: 'g', max: 80, color: COLORS.secondary, icon: 'barbell' as const },
  { key: 'fat', label: 'Fat', unit: 'g', max: 65, color: COLORS.warning, icon: 'water' as const },
  { key: 'carbs', label: 'Carbs', unit: 'g', max: 250, color: COLORS.accent, icon: 'leaf' as const },
];

export const FoodDetectionResultScreen: React.FC<FoodDetectionResultScreenProps> = ({
  onBack, onViewNutrition, onCheckDisease, onAskAgent,
}) => {
  const { currentScan } = useApp();
  const [expanded, setExpanded] = useState(false);

  const scan = currentScan || {
    name: 'Cheese Burger', category: 'Fast Food', confidence: 97, confidenceInterval: '±3.8%',
    healthScore: 42, calories: 680, proteinGrams: 28, fatGrams: 35, carbsGrams: 54,
    sugarGrams: 12, sodiumMg: 1150,
    ingredients: ['Bun', 'Cheese', 'Beef Patty', 'Onion', 'Sauce', 'Pickles'],
    diseaseWarnings: ['High Saturated Fat', 'High Sodium (Hypertension)', 'Refined Carbs'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    scannedAt: 'Today, 12:30 PM', id: 'food_1',
  };

  const macroValues = [scan.calories, scan.proteinGrams, scan.fatGrams, scan.carbsGrams];
  const scoreColor = scan.healthScore >= 70 ? COLORS.secondary : scan.healthScore >= 40 ? COLORS.warning : COLORS.danger;

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="Food Analysis"
          subtitle="AI Detection Result"
          showBack
          onBack={onBack}
          rightActionIcon="sparkles"
          onRightAction={onAskAgent}
        />

        {/* Hero Image Card */}
        <View style={[styles.heroCard, SHADOWS.md]}>
          <Image source={{ uri: scan.imageUrl }} style={StyleSheet.absoluteFill} />
          <View style={styles.heroOverlay} />

          {/* Top badges */}
          <View style={styles.heroBadgesRow}>
            <View style={styles.aiConfBadge}>
              <Ionicons name="sparkles" size={11} color={COLORS.white} />
              <Text style={styles.aiConfText}>{scan.confidence}% Conf. {scan.confidenceInterval}</Text>
            </View>
            <View style={[styles.scoreBadge, { backgroundColor: 'rgba(255,255,255,0.95)' }]}>
              <Text style={styles.scoreBadgeLabel}>SCORE</Text>
              <Text style={[styles.scoreBadgeVal, { color: scoreColor }]}>{scan.healthScore}</Text>
            </View>
          </View>

          {/* Bottom food info */}
          <View style={styles.heroBottom}>
            <Text style={styles.heroFoodName}>{scan.name}</Text>
            <Text style={styles.heroCategory}>{scan.category} · {scan.scannedAt}</Text>
          </View>
        </View>

        {/* Macro Bars Card */}
        <GlassCard title="Macronutrient Breakdown" subtitle="vs Recommended Daily Intake">
          {MACRO_CONFIG.map((m, i) => {
            const val = macroValues[i];
            const pct = Math.min(100, Math.round((val / m.max) * 100));
            return (
              <View key={m.key} style={styles.macroItem}>
                <View style={styles.macroRow}>
                  <View style={[styles.macroIcon, { backgroundColor: m.color + '15' }]}>
                    <Ionicons name={m.icon} size={13} color={m.color} />
                  </View>
                  <Text style={styles.macroLabel}>{m.label}</Text>
                  <Text style={styles.macroVal}>{val} {m.unit}</Text>
                  <Text style={[styles.macroPct, { color: pct > 60 ? COLORS.danger : COLORS.textMuted }]}>{pct}%</Text>
                </View>
                <View style={styles.macroTrack}>
                  <View style={[styles.macroFill, { width: `${pct}%`, backgroundColor: m.color }]} />
                </View>
              </View>
            );
          })}
        </GlassCard>

        {/* AI Warnings */}
        {scan.diseaseWarnings.length > 0 && (
          <GlassCard
            variant="outline"
            icon="warning"
            iconColor={COLORS.danger}
            iconBg={COLORS.dangerSubtle}
            title="Clinical Risk Flags"
            subtitle="Detected based on active health profile"
          >
            {scan.diseaseWarnings.map((w, i) => (
              <Text key={i} style={styles.warnText}>⚠️  {w}</Text>
            ))}
          </GlassCard>
        )}

        {/* AI Advice */}
        <GlassCard
          variant="gradient"
          icon="sparkles"
          iconColor={COLORS.accent}
          iconBg={COLORS.accentSubtle}
          title="AI Clinical Recommendation"
          subtitle="Tailored to your pre-diabetes & migraine profile"
        >
          <Text style={styles.aiText}>
            "This item has elevated sodium ({scan.sodiumMg}mg). Drink 500ml water and choose a potassium-rich dinner like grilled salmon or avocado to counter vascular pressure effects."
          </Text>
        </GlassCard>

        {/* Healthy Alternatives */}
        <Text style={styles.sectionTitle}>Healthy Alternatives</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { name: 'Turkey Wrap', cal: 360, score: 88, icon: 'fast-food' },
            { name: 'Salmon Bowl', cal: 420, score: 95, icon: 'fish' },
            { name: 'Avocado Toast', cal: 280, score: 91, icon: 'leaf' },
          ].map((alt) => (
            <View key={alt.name} style={[styles.altCard, SHADOWS.xs]}>
              <View style={[styles.altIcon, { backgroundColor: COLORS.secondarySubtle }]}>
                <Ionicons name={alt.icon as any} size={22} color={COLORS.secondary} />
              </View>
              <Text style={styles.altName}>{alt.name}</Text>
              <Text style={styles.altCal}>{alt.cal} kcal</Text>
              <View style={styles.altScoreBadge}>
                <Text style={styles.altScore}>Score: {alt.score}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Expandable Nutrient Details */}
        <AnimatedPressable onPress={() => setExpanded(!expanded)} scaleTo={0.98}>
          <GlassCard variant="outline" icon="list" iconColor={COLORS.primary} title="Full Ingredient & Nutrient Breakdown">
            {expanded && (
              <View style={styles.detailsBox}>
                <Text style={styles.detailLabel}>Ingredients</Text>
                <Text style={styles.detailVal}>{scan.ingredients.join(', ')}</Text>
                <Text style={styles.detailLabel}>Sodium</Text>
                <Text style={styles.detailVal}>{scan.sodiumMg} mg ({Math.round((scan.sodiumMg / 2000) * 100)}% Daily Limit)</Text>
                <Text style={styles.detailLabel}>Added Sugar</Text>
                <Text style={styles.detailVal}>{scan.sugarGrams} g</Text>
              </View>
            )}
            <View style={styles.expandRow}>
              <Text style={styles.expandText}>{expanded ? 'Collapse Details' : 'Expand Full Analysis'}</Text>
              <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={COLORS.primary} />
            </View>
          </GlassCard>
        </AnimatedPressable>

        <View style={styles.btnGroup}>
          <PrimaryButton title="Check Disease Compatibility" icon="shield-checkmark" onPress={onCheckDisease} />
          <SecondaryButton title="View Nutrition Timeline" icon="pie-chart-outline" onPress={onViewNutrition} />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  heroCard: {
    height: 250,
    borderRadius: 26,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 12,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(13,14,26,0.48)',
  },
  heroBadgesRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiConfBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13,14,26,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  aiConfText: { fontSize: 10, fontWeight: '800', color: COLORS.white },
  scoreBadge: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  scoreBadgeLabel: { fontSize: 8, fontWeight: '900', color: COLORS.textMuted, letterSpacing: 0.6 },
  scoreBadgeVal: { fontSize: 20, fontWeight: '900', lineHeight: 24 },
  heroBottom: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  heroFoodName: { fontSize: 28, fontWeight: '900', color: COLORS.white, letterSpacing: -0.6 },
  heroCategory: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  macroItem: { marginBottom: 10 },
  macroRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, gap: 8 },
  macroIcon: { width: 24, height: 24, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  macroLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary, flex: 1 },
  macroVal: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  macroPct: { fontSize: 11, fontWeight: '700', width: 36, textAlign: 'right' },
  macroTrack: { height: 6, borderRadius: 3, backgroundColor: COLORS.trackBg, overflow: 'hidden' },
  macroFill: { height: '100%', borderRadius: 3 },
  warnText: { fontSize: 13, fontWeight: '600', color: COLORS.danger, lineHeight: 20, marginTop: 3 },
  aiText: { fontSize: 13, lineHeight: 20, color: COLORS.textPrimary, fontStyle: 'italic' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.3, marginTop: 14, marginBottom: 10 },
  altCard: {
    width: 140,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
    alignItems: 'center',
    marginBottom: 4,
  },
  altIcon: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  altName: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary, textAlign: 'center' },
  altCal: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  altScoreBadge: { backgroundColor: COLORS.secondarySubtle, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginTop: 6 },
  altScore: { fontSize: 10, fontWeight: '800', color: COLORS.secondary },
  detailsBox: { paddingTop: 8, gap: 4 },
  detailLabel: { fontSize: 11, fontWeight: '800', color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 8 },
  detailVal: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  expandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 12 },
  expandText: { fontSize: 12, fontWeight: '800', color: COLORS.primary },
  btnGroup: { gap: 4, marginTop: 14 },
});
