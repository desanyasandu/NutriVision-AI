import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressRing } from '../components/ProgressRing';
import { COLORS, SHADOWS } from '../theme/colors';

interface NutritionAnalysisScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const MACROS = [
  { key: 'protein', label: 'Protein', unit: 'g', goal: 80, curr: 56, color: COLORS.secondary, icon: 'barbell' as const },
  { key: 'fat', label: 'Fat', unit: 'g', goal: 65, curr: 38, color: COLORS.warning, icon: 'water' as const },
  { key: 'carbs', label: 'Carbs', unit: 'g', goal: 250, curr: 172, color: COLORS.accent, icon: 'leaf' as const },
  { key: 'fiber', label: 'Fiber', unit: 'g', goal: 30, curr: 18, color: COLORS.primary, icon: 'nutrition' as const },
];

const VITAMINS = [
  { name: 'Vitamin D', pct: 48, rda: '400 IU', curr: '192 IU' },
  { name: 'Magnesium', pct: 66, rda: '400 mg', curr: '264 mg' },
  { name: 'Vitamin B12', pct: 82, rda: '2.4 mcg', curr: '1.97 mcg' },
  { name: 'Omega-3', pct: 35, rda: '1.6 g', curr: '0.56 g' },
  { name: 'Iron', pct: 78, rda: '18 mg', curr: '14 mg' },
];

export const NutritionAnalysisScreen: React.FC<NutritionAnalysisScreenProps> = ({ onBack, onNavigate }) => {
  const { userProfile } = useApp();
  const calPct = Math.min(100, Math.round((userProfile.todayCaloriesConsumed / userProfile.dailyCalorieTarget) * 100));

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="Nutrition Analysis"
          subtitle="Today's Micronutrient Report"
          showBack
          onBack={onBack}
          rightActionIcon="share-outline"
          onRightAction={() => {}}
        />

        {/* Calorie Ring Hero */}
        <View style={[styles.calHero, SHADOWS.md]}>
          <ProgressRing
            size={160}
            strokeWidth={13}
            progress={calPct}
            gradientColors={['#4F6EF7', '#00C48C']}
            id="nutrition-cal"
            trackColor="rgba(255,255,255,0.1)"
          >
            <Text style={styles.calVal}>{userProfile.todayCaloriesConsumed}</Text>
            <Text style={styles.calLabel}>kcal</Text>
            <Text style={styles.calGoal}>of {userProfile.dailyCalorieTarget}</Text>
          </ProgressRing>

          <View style={styles.calMeta}>
            <Text style={styles.calMetaTitle}>Energy Balance</Text>
            <Text style={styles.calMetaSub}>{calPct}% of daily target consumed</Text>

            <View style={styles.calBreakRow}>
              <View style={styles.calBreakItem}>
                <Text style={styles.calBreakVal}>{userProfile.dailyCalorieTarget - userProfile.todayCaloriesConsumed}</Text>
                <Text style={styles.calBreakLabel}>Remaining</Text>
              </View>
              <View style={styles.calDivider} />
              <View style={styles.calBreakItem}>
                <Text style={styles.calBreakVal}>340</Text>
                <Text style={styles.calBreakLabel}>Burned</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Macro Bars */}
        <GlassCard icon="analytics" iconColor={COLORS.primary} title="Macronutrients" subtitle="vs Daily Recommended">
          {MACROS.map((m) => {
            const pct = Math.min(100, Math.round((m.curr / m.goal) * 100));
            return (
              <View key={m.key} style={styles.macroItem}>
                <View style={styles.macroHeaderRow}>
                  <View style={[styles.macroIcon, { backgroundColor: m.color + '15' }]}>
                    <Ionicons name={m.icon} size={13} color={m.color} />
                  </View>
                  <Text style={styles.macroName}>{m.label}</Text>
                  <Text style={styles.macroCurr}>{m.curr}{m.unit}</Text>
                  <Text style={styles.macroGoal}>/{m.goal}{m.unit}</Text>
                  <Text style={[styles.macroPct, { color: pct >= 80 ? COLORS.secondary : pct >= 50 ? COLORS.warning : COLORS.danger }]}>{pct}%</Text>
                </View>
                <View style={styles.macroTrack}>
                  <View style={[styles.macroFill, { width: `${pct}%`, backgroundColor: m.color }]} />
                </View>
              </View>
            );
          })}
        </GlassCard>

        {/* Micronutrients */}
        <GlassCard icon="flask" iconColor={COLORS.accent} iconBg={COLORS.accentSubtle} title="Micronutrients" subtitle="Critical vitamins & minerals">
          {VITAMINS.map((v, i) => (
            <View key={i} style={styles.vitaminRow}>
              <Text style={styles.vitaminName}>{v.name}</Text>
              <View style={styles.vitaminMid}>
                <View style={styles.vitaminTrack}>
                  <View style={[styles.vitaminFill, {
                    width: `${v.pct}%`,
                    backgroundColor: v.pct >= 70 ? COLORS.secondary : v.pct >= 40 ? COLORS.warning : COLORS.danger,
                  }]} />
                </View>
              </View>
              <Text style={styles.vitaminPct}>{v.pct}%</Text>
              <Text style={styles.vitaminCurr}>{v.curr}</Text>
            </View>
          ))}
        </GlassCard>

        {/* AI Deficiency Alert */}
        <GlassCard
          variant="outline"
          icon="warning"
          iconColor={COLORS.warning}
          iconBg={COLORS.warningSubtle}
          title="AI Deficiency Alerts"
          subtitle="Clinical recommendations"
        >
          {[
            { nutrient: 'Vitamin D', action: 'Add 15min sunlight or 800 IU supplement', icon: 'sunny' as const },
            { nutrient: 'Omega-3', action: 'Add salmon, walnuts, or flaxseeds tonight', icon: 'fish' as const },
          ].map((a) => (
            <View key={a.nutrient} style={styles.alertRow}>
              <View style={styles.alertIcon}>
                <Ionicons name={a.icon} size={13} color={COLORS.warning} />
              </View>
              <View style={styles.alertText}>
                <Text style={styles.alertNutrient}>{a.nutrient} — Low</Text>
                <Text style={styles.alertAction}>{a.action}</Text>
              </View>
            </View>
          ))}
        </GlassCard>

        <PrimaryButton title="Get Personalized Meal Plan" icon="sparkles" onPress={() => onNavigate('AIAgentCoach')} />
        <PrimaryButton variant="success" title="Check Disease Risk Impact" icon="shield-checkmark" onPress={() => onNavigate('DiseaseRiskAnalysis')} />

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  calHero: {
    backgroundColor: COLORS.darkPanel,
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.darkStroke,
  },
  calVal: { fontSize: 30, fontWeight: '900', color: COLORS.darkText, letterSpacing: -0.8, textAlign: 'center' },
  calLabel: { fontSize: 13, fontWeight: '700', color: 'rgba(228,231,255,0.65)', textAlign: 'center' },
  calGoal: { fontSize: 11, fontWeight: '600', color: 'rgba(228,231,255,0.4)', textAlign: 'center' },
  calMeta: { flex: 1 },
  calMetaTitle: { fontSize: 18, fontWeight: '900', color: COLORS.darkText, letterSpacing: -0.3 },
  calMetaSub: { fontSize: 12, color: 'rgba(228,231,255,0.55)', marginTop: 4 },
  calBreakRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 16 },
  calBreakItem: { alignItems: 'center' },
  calBreakVal: { fontSize: 22, fontWeight: '900', color: COLORS.darkText },
  calBreakLabel: { fontSize: 11, fontWeight: '600', color: 'rgba(228,231,255,0.5)', marginTop: 2 },
  calDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.12)' },
  macroItem: { marginBottom: 12 },
  macroHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  macroIcon: { width: 24, height: 24, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  macroName: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary, flex: 1 },
  macroCurr: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  macroGoal: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted },
  macroPct: { fontSize: 12, fontWeight: '800', width: 36, textAlign: 'right' },
  macroTrack: { height: 7, borderRadius: 3.5, backgroundColor: COLORS.trackBg, overflow: 'hidden' },
  macroFill: { height: '100%', borderRadius: 3.5 },
  vitaminRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  vitaminName: { fontSize: 12, fontWeight: '700', color: COLORS.textPrimary, width: 96 },
  vitaminMid: { flex: 1 },
  vitaminTrack: { height: 6, borderRadius: 3, backgroundColor: COLORS.trackBg, overflow: 'hidden' },
  vitaminFill: { height: '100%', borderRadius: 3 },
  vitaminPct: { fontSize: 11, fontWeight: '800', color: COLORS.textSecondary, width: 34, textAlign: 'right' },
  vitaminCurr: { fontSize: 10, fontWeight: '500', color: COLORS.textMuted, width: 60, textAlign: 'right' },
  alertRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  alertIcon: { width: 26, height: 26, borderRadius: 8, backgroundColor: COLORS.warningSubtle, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  alertText: { flex: 1 },
  alertNutrient: { fontSize: 13, fontWeight: '800', color: COLORS.warning },
  alertAction: { fontSize: 12, fontWeight: '500', color: COLORS.textSecondary, marginTop: 2, lineHeight: 17 },
});
