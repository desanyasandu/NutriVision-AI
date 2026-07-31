import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { ProgressRing } from '../components/ProgressRing';
import { COLORS, SHADOWS } from '../theme/colors';

interface DiseaseRiskAnalysisScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const DISEASES = [
  { name: 'Pre-Diabetes / T2D', risk: 68, icon: 'water' as const, color: COLORS.warning, category: 'Metabolic', trend: '+2% this week' },
  { name: 'Hypertension', risk: 42, icon: 'pulse' as const, color: COLORS.primary, category: 'Cardiovascular', trend: '-3%' },
  { name: 'Migraine Disorder', risk: 55, icon: 'flash' as const, color: COLORS.accent, category: 'Neurological', trend: '+8% (sodium spike)' },
  { name: 'Metabolic Syndrome', risk: 38, icon: 'fitness' as const, color: COLORS.secondary, category: 'Metabolic', trend: 'Stable' },
  { name: 'Kidney Stones', risk: 24, icon: 'medical' as const, color: COLORS.danger, category: 'Renal', trend: '-5%' },
];

const getRiskLevel = (r: number) => {
  if (r >= 70) return { label: 'HIGH', color: COLORS.danger, bg: COLORS.dangerSubtle };
  if (r >= 50) return { label: 'MODERATE', color: COLORS.warning, bg: COLORS.warningSubtle };
  return { label: 'LOW', color: COLORS.secondary, bg: COLORS.secondarySubtle };
};

export const DiseaseRiskAnalysisScreen: React.FC<DiseaseRiskAnalysisScreenProps> = ({ onBack, onNavigate }) => {
  const { userProfile } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);
  const overallRisk = 48;

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="Disease Risk"
          subtitle="Predictive AI Risk Modeling"
          showBack
          onBack={onBack}
          rightActionIcon="document-text-outline"
          onRightAction={() => {}}
        />

        {/* Overall Risk Ring */}
        <View style={[styles.riskHero, SHADOWS.md]}>
          <ProgressRing
            size={150}
            strokeWidth={12}
            progress={overallRisk}
            gradientColors={['#FFAA00', '#FF5C7A']}
            id="risk-overall"
            trackColor="rgba(255,255,255,0.1)"
          >
            <Text style={styles.riskScore}>{overallRisk}</Text>
            <Text style={styles.riskScoreLabel}>Overall</Text>
          </ProgressRing>

          <View style={styles.riskMeta}>
            <Text style={styles.riskTitle}>Composite Disease Risk</Text>
            <Text style={styles.riskSub}>Based on nutrition, genetics & biometrics</Text>
            <View style={styles.riskBadge}>
              <View style={styles.riskDot} />
              <Text style={styles.riskBadgeText}>Moderate Risk · Monitor</Text>
            </View>
            <View style={styles.riskFactorsRow}>
              {['Nutrition', 'Hydration', 'Sleep'].map((f) => (
                <View key={f} style={styles.riskFactor}>
                  <Ionicons name="checkmark-circle" size={11} color={COLORS.secondary} />
                  <Text style={styles.riskFactorText}>{f}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Disease Cards */}
        <Text style={styles.sectionTitle}>Individual Risk Assessment</Text>
        {DISEASES.map((d) => {
          const level = getRiskLevel(d.risk);
          const isExpanded = expanded === d.name;
          return (
            <AnimatedPressable key={d.name} onPress={() => setExpanded(isExpanded ? null : d.name)} scaleTo={0.98} style={[styles.diseaseCard, SHADOWS.sm]}>
              <View style={styles.diseaseHeader}>
                <View style={[styles.diseaseIcon, { backgroundColor: d.color + '15' }]}>
                  <Ionicons name={d.icon} size={18} color={d.color} />
                </View>
                <View style={styles.diseaseMeta}>
                  <Text style={styles.diseaseName}>{d.name}</Text>
                  <Text style={styles.diseaseCategory}>{d.category} · {d.trend}</Text>
                </View>
                <View style={[styles.riskLevelBadge, { backgroundColor: level.bg }]}>
                  <Text style={[styles.riskLevelText, { color: level.color }]}>{level.label}</Text>
                  <Text style={[styles.riskLevelPct, { color: level.color }]}>{d.risk}%</Text>
                </View>
              </View>

              <View style={styles.riskBar}>
                <View style={[styles.riskFill, { width: `${d.risk}%`, backgroundColor: d.color }]} />
              </View>

              {isExpanded && (
                <View style={styles.expandedContent}>
                  <Text style={styles.expandedTitle}>AI Clinical Recommendation</Text>
                  <Text style={styles.expandedText}>
                    Your {d.name.toLowerCase()} risk is {level.label.toLowerCase()}. Key actions: reduce processed sugar, increase fiber, add 20min daily movement, and monitor with weekly blood panels.
                  </Text>
                  <AnimatedPressable
                    style={styles.expandedCta}
                    onPress={() => onNavigate('AIAgentCoach')}
                    scaleTo={0.96}
                  >
                    <Ionicons name="sparkles" size={14} color={COLORS.white} />
                    <Text style={styles.expandedCtaText}>Get AI Prevention Plan</Text>
                  </AnimatedPressable>
                </View>
              )}
            </AnimatedPressable>
          );
        })}

        {/* Prevention Tips */}
        <GlassCard
          variant="dark"
          icon="shield-checkmark"
          iconColor={COLORS.secondary}
          title="AI Prevention Shield"
          subtitle="Personalized disease prevention protocol"
        >
          {[
            'Eliminate refined sugar from lunch — pre-diabetic insulin spike prevention',
            'Take 400mg magnesium glycinate at bedtime — migraine block',
            'Limit sodium to <1600mg daily — vascular pressure control',
            'Add 2000 IU Vitamin D3 weekly — metabolic syndrome protection',
          ].map((tip, i) => (
            <Text key={i} style={styles.preventTip}>◉ {tip}</Text>
          ))}
        </GlassCard>

        <PrimaryButton title="Consult AI Disease Coach" icon="sparkles" variant="accent" onPress={() => onNavigate('AIAgentCoach')} />

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  riskHero: {
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
  riskScore: { fontSize: 38, fontWeight: '900', color: COLORS.darkText, letterSpacing: -1, textAlign: 'center' },
  riskScoreLabel: { fontSize: 12, fontWeight: '700', color: 'rgba(228,231,255,0.6)', textAlign: 'center' },
  riskMeta: { flex: 1 },
  riskTitle: { fontSize: 17, fontWeight: '900', color: COLORS.darkText, letterSpacing: -0.3 },
  riskSub: { fontSize: 12, color: 'rgba(228,231,255,0.55)', marginTop: 3, lineHeight: 17 },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,170,0,0.15)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  riskDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.warning },
  riskBadgeText: { fontSize: 11, fontWeight: '800', color: COLORS.warning },
  riskFactorsRow: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' },
  riskFactor: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  riskFactorText: { fontSize: 10, fontWeight: '600', color: 'rgba(228,231,255,0.55)' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.3, marginTop: 4, marginBottom: 10 },
  diseaseCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
  },
  diseaseHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  diseaseIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  diseaseMeta: { flex: 1 },
  diseaseName: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  diseaseCategory: { fontSize: 11, fontWeight: '500', color: COLORS.textMuted, marginTop: 1 },
  riskLevelBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, alignItems: 'center' },
  riskLevelText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  riskLevelPct: { fontSize: 16, fontWeight: '900', marginTop: 1 },
  riskBar: { height: 5, borderRadius: 2.5, backgroundColor: COLORS.trackBg, overflow: 'hidden', marginTop: 12 },
  riskFill: { height: '100%', borderRadius: 2.5 },
  expandedContent: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200,207,228,0.45)',
  },
  expandedTitle: { fontSize: 12, fontWeight: '800', color: COLORS.accent, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 },
  expandedText: { fontSize: 13, fontWeight: '500', color: COLORS.textSecondary, lineHeight: 19 },
  expandedCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 14,
    marginTop: 10,
    gap: 5,
    alignSelf: 'flex-start',
  },
  expandedCtaText: { fontSize: 13, fontWeight: '800', color: COLORS.white },
  preventTip: { fontSize: 13, fontWeight: '500', color: COLORS.darkText, lineHeight: 20, marginBottom: 5 },
});
