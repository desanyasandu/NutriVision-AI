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

interface HealthDashboardScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const BODY_SYSTEMS = [
  { name: 'Cardiovascular', score: 82, icon: 'heart' as const, color: COLORS.danger, unit: 'BPM 72' },
  { name: 'Metabolic', score: 67, icon: 'flame' as const, color: COLORS.warning, unit: '1820 kcal' },
  { name: 'Neurological', score: 74, icon: 'flash' as const, color: COLORS.accent, unit: 'Stable' },
  { name: 'Immunity', score: 89, icon: 'shield-checkmark' as const, color: COLORS.secondary, unit: 'Strong' },
];

export const HealthDashboardScreen: React.FC<HealthDashboardScreenProps> = ({ onBack, onNavigate }) => {
  const { userProfile } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  const weeklyData = [78, 82, 79, 85, 88, 84, userProfile.healthScore];
  const maxH = Math.max(...weeklyData);

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="Health Insights"
          subtitle="Comprehensive Clinical Overview"
          showBack
          onBack={onBack}
          rightActionIcon="download-outline"
          onRightAction={() => {}}
        />

        {/* Central Health Ring */}
        <View style={[styles.ringPanel, SHADOWS.md]}>
          <ProgressRing
            size={170}
            strokeWidth={14}
            progress={userProfile.healthScore}
            gradientColors={['#7B61FF', '#00C48C']}
            id="dashboard-main"
            trackColor="rgba(255,255,255,0.1)"
          >
            <Text style={styles.ringScore}>{userProfile.healthScore}</Text>
            <Text style={styles.ringLabel}>out of 100</Text>
          </ProgressRing>

          <View style={styles.ringMeta}>
            <Text style={styles.ringMetaTitle}>Clinical Health Score</Text>
            <Text style={styles.ringMetaSub}>Based on nutrition, vitals & AI risk modeling</Text>
            <View style={styles.ringBadge}>
              <View style={styles.ringBadgeDot} />
              <Text style={styles.ringBadgeText}>
                {userProfile.healthScore >= 80 ? 'Excellent' : userProfile.healthScore >= 60 ? 'Good' : 'Needs Attention'}
              </Text>
            </View>
          </View>
        </View>

        {/* Period Switcher */}
        <View style={styles.periodRow}>
          {(['7d', '30d', '90d'] as const).map((p) => (
            <AnimatedPressable key={p} style={[styles.periodBtn, selectedPeriod === p && styles.periodBtnActive]} onPress={() => setSelectedPeriod(p)} scaleTo={0.94}>
              <Text style={[styles.periodText, selectedPeriod === p && styles.periodTextActive]}>{p}</Text>
            </AnimatedPressable>
          ))}
        </View>

        {/* Bar Chart */}
        <GlassCard title="Health Score Trend" subtitle="Daily composite score">
          <View style={styles.chartRow}>
            {weeklyData.map((v, i) => (
              <View key={i} style={styles.barCol}>
                <Text style={styles.barVal}>{v}</Text>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, {
                    height: `${Math.round((v / maxH) * 100)}%`,
                    backgroundColor: i === weeklyData.length - 1 ? COLORS.primary : 'rgba(79,110,247,0.35)',
                  }]} />
                </View>
                <Text style={styles.barDay}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Body Systems */}
        <Text style={styles.sectionTitle}>Body System Analysis</Text>
        <View style={styles.bodyGrid}>
          {BODY_SYSTEMS.map((sys) => (
            <AnimatedPressable key={sys.name} style={[styles.systemCard, SHADOWS.sm]} onPress={() => onNavigate('DigitalHealthTwin')} scaleTo={0.96}>
              <View style={[styles.sysIconBox, { backgroundColor: sys.color + '15' }]}>
                <Ionicons name={sys.icon} size={20} color={sys.color} />
              </View>
              <Text style={styles.sysName}>{sys.name}</Text>
              <Text style={styles.sysScore}>{sys.score}</Text>
              <Text style={styles.sysUnit}>{sys.unit}</Text>
              <View style={styles.sysTrack}>
                <View style={[styles.sysFill, { width: `${sys.score}%`, backgroundColor: sys.color }]} />
              </View>
            </AnimatedPressable>
          ))}
        </View>

        {/* Vitals Grid */}
        <Text style={styles.sectionTitle}>Biometric Vitals</Text>
        <View style={styles.vitalsGrid}>
          {[
            { label: 'Heart Rate', val: '72 bpm', icon: 'heart' as const, color: COLORS.danger, sub: 'Resting' },
            { label: 'Blood Pressure', val: '118/76', icon: 'pulse' as const, color: COLORS.primary, sub: 'Optimal' },
            { label: 'Blood Glucose', val: '94 mg/dL', icon: 'water' as const, color: COLORS.warning, sub: 'Pre-Diabetic Watch' },
            { label: 'BMI', val: (userProfile.bmi ?? 23.5).toFixed(1), icon: 'body' as const, color: COLORS.accent, sub: 'Normal Range' },
            { label: 'VO₂ Max', val: '42.1', icon: 'fitness' as const, color: COLORS.secondary, sub: 'Above Average' },
            { label: 'Sleep Quality', val: '87%', icon: 'moon' as const, color: COLORS.primaryLight, sub: '7h 45m Deep' },
          ].map((v) => (
            <View key={v.label} style={[styles.vitalCard, SHADOWS.xs]}>
              <View style={[styles.vitalIcon, { backgroundColor: v.color + '15' }]}>
                <Ionicons name={v.icon} size={16} color={v.color} />
              </View>
              <Text style={styles.vitalLabel}>{v.label}</Text>
              <Text style={styles.vitalVal}>{v.val}</Text>
              <Text style={styles.vitalSub}>{v.sub}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <PrimaryButton variant="accent" title="View 3D Digital Health Twin" icon="body" onPress={() => onNavigate('DigitalHealthTwin')} />

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  ringPanel: {
    backgroundColor: COLORS.darkPanel,
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.darkStroke,
  },
  ringScore: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.darkText,
    letterSpacing: -1,
  },
  ringLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(228,231,255,0.55)',
  },
  ringMeta: { flex: 1 },
  ringMetaTitle: { fontSize: 18, fontWeight: '900', color: COLORS.darkText, letterSpacing: -0.3 },
  ringMetaSub: { fontSize: 12, color: 'rgba(228,231,255,0.55)', marginTop: 4, lineHeight: 17 },
  ringBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
    backgroundColor: 'rgba(0,196,140,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  ringBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.secondary },
  ringBadgeText: { fontSize: 12, fontWeight: '800', color: COLORS.secondary },
  periodRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(200,207,228,0.25)',
    borderRadius: 14,
    padding: 4,
    gap: 4,
    marginBottom: 12,
  },
  periodBtn: { flex: 1, paddingVertical: 8, borderRadius: 11, alignItems: 'center' },
  periodBtnActive: { backgroundColor: COLORS.white, ...SHADOWS.xs },
  periodText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  periodTextActive: { fontWeight: '800', color: COLORS.primary },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 100,
    marginTop: 8,
  },
  barCol: { flex: 1, alignItems: 'center', gap: 4 },
  barVal: { fontSize: 9, fontWeight: '700', color: COLORS.textMuted },
  barTrack: { flex: 1, width: '100%', backgroundColor: COLORS.trackBg, borderRadius: 4, overflow: 'hidden', justifyContent: 'flex-end' },
  barFill: { width: '100%', borderRadius: 4, minHeight: 4 },
  barDay: { fontSize: 9, fontWeight: '700', color: COLORS.textMuted },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.3, marginTop: 16, marginBottom: 10 },
  bodyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  systemCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 14,
    width: '47%',
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
  },
  sysIconBox: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  sysName: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  sysScore: { fontSize: 28, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: -0.6, marginTop: 2 },
  sysUnit: { fontSize: 11, color: COLORS.textMuted, marginTop: 1 },
  sysTrack: { height: 4, borderRadius: 2, backgroundColor: COLORS.trackBg, overflow: 'hidden', marginTop: 8 },
  sysFill: { height: '100%', borderRadius: 2 },
  vitalsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  vitalCard: {
    width: '30%',
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
    alignItems: 'center',
    minWidth: 100,
  },
  vitalIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  vitalLabel: { fontSize: 9, fontWeight: '700', color: COLORS.textMuted, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.3 },
  vitalVal: { fontSize: 16, fontWeight: '900', color: COLORS.textPrimary, marginTop: 3, textAlign: 'center', letterSpacing: -0.3 },
  vitalSub: { fontSize: 10, fontWeight: '500', color: COLORS.textSecondary, textAlign: 'center', marginTop: 2 },
});
