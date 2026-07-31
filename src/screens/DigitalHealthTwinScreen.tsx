import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { DIGITAL_TWIN_PREDICTION } from '../data/mockData';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { ProgressRing } from '../components/ProgressRing';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface DigitalHealthTwinScreenProps {
  onBack: () => void;
  onAskAgent: () => void;
}

const BODY_SYSTEMS = [
  {
    name: 'Cardiovascular System',
    organ: 'Heart',
    status: 'Optimal',
    score: 94,
    icon: 'heart' as const,
    color: COLORS.danger,
    bg: 'rgba(239, 68, 68, 0.1)',
    metrics: 'BP: 118/76 • Resting HR: 68 BPM',
  },
  {
    name: 'Nervous & Vascular System',
    organ: 'Brain',
    status: 'Vulnerable (Migraine)',
    score: 72,
    icon: 'hardware-chip' as const,
    color: COLORS.accent,
    bg: 'rgba(124, 58, 237, 0.1)',
    metrics: 'Magnesium Level: 85% • Vascular Stress: Low',
  },
  {
    name: 'Respiratory System',
    organ: 'Lungs',
    status: 'Excellent',
    score: 96,
    icon: 'fitness' as const,
    color: COLORS.primary,
    bg: 'rgba(59, 130, 246, 0.1)',
    metrics: 'SpO2: 99% • VO2 Max: 44 ml/kg',
  },
  {
    name: 'Renal & Filtration System',
    organ: 'Kidneys',
    status: 'Balanced',
    score: 88,
    icon: 'water' as const,
    color: '#0EA5E9',
    bg: 'rgba(14, 165, 233, 0.1)',
    metrics: 'Hydration Target: 72% • Sodium Balance: Moderate',
  },
  {
    name: 'Immune & Metabolic System',
    organ: 'Immune',
    status: 'Pre-Diabetes Shield',
    score: 80,
    icon: 'shield-checkmark' as const,
    color: COLORS.secondary,
    bg: 'rgba(16, 185, 129, 0.1)',
    metrics: 'Glycemic Stability: 82% • Inflammation Index: Low',
  },
];

export const DigitalHealthTwinScreen: React.FC<DigitalHealthTwinScreenProps> = ({
  onBack,
  onAskAgent,
}) => {
  const { userProfile } = useApp();

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated App Bar */}
        <AnimatedAppBar
          title="Digital Health Twin"
          subtitle="3D Clinical Organ & Predictive Simulation"
          showBack
          onBack={onBack}
          rightActionIcon="sparkles"
          onRightAction={onAskAgent}
        />

        {/* 3D Style Avatar Placeholder & Vitality Score Card */}
        <GlassCard variant="glass" style={styles.avatarCard}>
          <View style={styles.avatarRow}>
            {/* Stylized 3D Body Outline Visualizer */}
            <View style={styles.avatarVisualBox}>
              <Svg width={110} height={160} viewBox="0 0 100 160">
                <Defs>
                  <LinearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="0%" stopColor="#3B82F6" />
                    <Stop offset="100%" stopColor="#7C3AED" />
                  </LinearGradient>
                </Defs>
                {/* Head */}
                <Circle cx={50} cy={22} r={14} fill="url(#bodyGrad)" opacity={0.9} />
                {/* Torso */}
                <Rect x={36} y={42} width={28} height={50} rx={10} fill="url(#bodyGrad)" opacity={0.8} />
                {/* Arms */}
                <Rect x={20} y={44} width={12} height={42} rx={6} fill="url(#bodyGrad)" opacity={0.6} />
                <Rect x={68} y={44} width={12} height={42} rx={6} fill="url(#bodyGrad)" opacity={0.6} />
                {/* Legs */}
                <Rect x={38} y={96} width={10} height={54} rx={5} fill="url(#bodyGrad)" opacity={0.75} />
                <Rect x={52} y={96} width={10} height={54} rx={5} fill="url(#bodyGrad)" opacity={0.75} />
                {/* Heart Glow Dot */}
                <Circle cx={46} cy={54} r={5} fill="#EF4444" />
              </Svg>
            </View>

            <View style={styles.vitalityCol}>
              <View style={styles.badgeRow}>
                <Ionicons name="sparkles" size={12} color={COLORS.accent} />
                <Text style={styles.badgeText}>3D AI Twin Active</Text>
              </View>
              <Text style={styles.vitalityTitle}>{userProfile.name}'s Twin</Text>
              <Text style={styles.vitalityScore}>
                {userProfile.healthScore}<Text style={styles.vitalityScoreMax}>/100</Text>
              </Text>
              <Text style={styles.vitalitySub}>Overall Organ Vitality Score</Text>

              <View style={styles.twinPill}>
                <Text style={styles.twinPillText}>Vulnerability: Pre-diabetes & Migraine</Text>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Body Systems (Heart, Brain, Lungs, Kidneys, Immune) */}
        <Text style={styles.sectionTitle}>Interactive Body Systems</Text>
        {BODY_SYSTEMS.map((system) => (
          <GlassCard key={system.organ} style={styles.systemCard}>
            <View style={styles.systemHeader}>
              <View style={[styles.systemIconBox, { backgroundColor: system.bg }]}>
                <Ionicons name={system.icon} size={20} color={system.color} />
              </View>

              <View style={styles.systemTitleCol}>
                <Text style={styles.systemName}>{system.name}</Text>
                <Text style={styles.systemMetrics}>{system.metrics}</Text>
              </View>

              <View style={styles.systemScoreBox}>
                <Text style={[styles.systemScoreVal, { color: system.color }]}>{system.score}%</Text>
                <Text style={styles.systemStatusText}>{system.status}</Text>
              </View>
            </View>
          </GlassCard>
        ))}

        {/* 6-Month Predictive Health Risk Timeline */}
        <GlassCard
          variant="gradient"
          icon="analytics-outline"
          iconColor={COLORS.accent}
          title="6-Month Predictive Projection"
          subtitle="AI simulation based on current diet trajectory"
        >
          <View style={styles.predictRow}>
            <View style={styles.predictBox}>
              <Text style={styles.predictLabel}>Current Weight</Text>
              <Text style={styles.predictVal}>{DIGITAL_TWIN_PREDICTION.currentWeight} kg</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={COLORS.textMuted} />
            <View style={styles.predictBox}>
              <Text style={styles.predictLabel}>Projected (6 Mos)</Text>
              <Text style={[styles.predictVal, { color: COLORS.warning }]}>
                {DIGITAL_TWIN_PREDICTION.predictedWeight6Months} kg
              </Text>
            </View>
          </View>

          <Text style={styles.predictNotice}>
            "Without adjusting sodium and refined sugars, pre-diabetes vulnerability increases by +
            {DIGITAL_TWIN_PREDICTION.riskIncreasePercentage}% over 6 months."
          </Text>
        </GlassCard>

        {/* AI Preventive Suggestions */}
        <Text style={styles.sectionTitle}>AI Twin Suggestions</Text>
        <GlassCard icon="bulb" iconColor={COLORS.warning} title="Recommended Preventive Protocol">
          <View style={styles.suggestionsGrid}>
            <Text style={styles.sugHeader}>Items to Reduce:</Text>
            {DIGITAL_TWIN_PREDICTION.recommendationsToReduce.map((item, idx) => (
              <Text key={idx} style={styles.sugItemRed}>❌ {item}</Text>
            ))}

            <Text style={[styles.sugHeader, { marginTop: 10 }]}>Items to Add:</Text>
            {DIGITAL_TWIN_PREDICTION.recommendationsToAdd.map((item, idx) => (
              <Text key={idx} style={styles.sugItemGreen}>✅ {item}</Text>
            ))}
          </View>
        </GlassCard>

        {/* Action Button */}
        <PrimaryButton
          title="Consult AI Assistant on Twin Protocol"
          icon="sparkles"
          onPress={onAskAgent}
          style={{ marginTop: 16 }}
        />

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
  avatarCard: {
    marginVertical: 10,
    padding: 18,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarVisualBox: {
    width: 110,
    height: 160,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  vitalityCol: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    textTransform: 'uppercase',
  },
  vitalityTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  vitalityScore: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -0.8,
    marginTop: 2,
  },
  vitalityScoreMax: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  vitalitySub: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  twinPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  twinPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondaryDark,
  },
  sectionTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginTop: 18,
    marginBottom: 10,
  },
  systemCard: {
    marginVertical: 4,
  },
  systemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  systemIconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  systemTitleCol: {
    flex: 1,
  },
  systemName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  systemMetrics: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  systemScoreBox: {
    alignItems: 'flex-end',
  },
  systemScoreVal: {
    fontSize: 18,
    fontWeight: '900',
  },
  systemStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  predictRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  predictBox: {
    alignItems: 'center',
  },
  predictLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  predictVal: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  predictNotice: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 19,
    fontStyle: 'italic',
    marginTop: 8,
  },
  suggestionsGrid: {
    gap: 4,
    marginTop: 6,
  },
  sugHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textSecondary,
  },
  sugItemRed: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.dangerDark,
  },
  sugItemGreen: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondaryDark,
  },
});
