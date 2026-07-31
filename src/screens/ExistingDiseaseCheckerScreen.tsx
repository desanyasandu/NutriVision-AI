import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { MOCK_EXISTING_DISEASE_CHECKS } from '../data/mockData';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { SuccessCheck } from '../components/SuccessCheck';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { ProgressRing } from '../components/ProgressRing';
import { COLORS, SHADOWS } from '../theme/colors';

interface ExistingDiseaseCheckerScreenProps {
  onBack: () => void;
  onAskAgent: () => void;
}

const CONDITIONS = ['Pre-Diabetes', 'Migraine', 'Hypertension', 'IBS'];

const CONDITION_DATA = {
  Migraine: {
    color: COLORS.accent,
    risk: 55,
    triggers: ['High Tyramine (Cheese, Wine)', 'Caffeine', 'Skipped Meals', 'High Sodium'],
    safe: ['Magnesium-rich foods', 'Low-sodium', 'Regular meal timing', 'B2 Riboflavin'],
    advice: 'Your lunch today included aged cheese — a known tyramine trigger. Add 400mg magnesium glycinate at dinner.',
  },
  'Pre-Diabetes': {
    color: COLORS.warning,
    risk: 68,
    triggers: ['Refined carbs', 'Added sugar', 'High GI foods', 'Skipped breakfast'],
    safe: ['Whole grains', 'Leafy greens', 'Berries', 'Cinnamon & chromium'],
    advice: 'Lunch had 54g refined carbs. Choose protein-first dinner to blunt glucose spike.',
  },
  Hypertension: {
    color: COLORS.danger,
    risk: 42,
    triggers: ['Sodium >1500mg', 'Alcohol', 'Processed meats', 'Caffeine excess'],
    safe: ['DASH Diet foods', 'Potassium-rich', 'Beets', 'Dark chocolate'],
    advice: 'Sodium at 1,150mg today. Stay under 1,600mg total — choose low-sodium dinner.',
  },
  IBS: {
    color: COLORS.secondary,
    risk: 30,
    triggers: ['High-FODMAP foods', 'Raw onion', 'Lactose', 'Excess fat'],
    safe: ['Low-FODMAP', 'Soluble fiber', 'Ginger tea', 'Probiotic foods'],
    advice: 'Today\'s intake is FODMAP-safe. Continue monitoring for trigger patterns.',
  },
};

export const ExistingDiseaseCheckerScreen: React.FC<ExistingDiseaseCheckerScreenProps> = ({ onBack, onAskAgent }) => {
  const { userProfile, currentScan } = useApp();
  const [selected, setSelected] = useState('Pre-Diabetes');
  const data = CONDITION_DATA[selected as keyof typeof CONDITION_DATA] || CONDITION_DATA['Pre-Diabetes'];

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="Condition Checker"
          subtitle="Food-Disease Cross-Reference"
          showBack
          onBack={onBack}
          rightActionIcon="sparkles"
          onRightAction={onAskAgent}
        />

        {/* Condition Selector */}
        <View style={styles.conditionRow}>
          {CONDITIONS.map((c) => {
            const d = CONDITION_DATA[c as keyof typeof CONDITION_DATA];
            const active = selected === c;
            return (
              <AnimatedPressable
                key={c}
                style={[
                  styles.condBtn,
                  active && { backgroundColor: d.color + '15', borderColor: d.color + '50' },
                ]}
                onPress={() => setSelected(c)}
                scaleTo={0.94}
              >
                <Text style={[styles.condLabel, active && { color: d.color, fontWeight: '800' }]}>{c}</Text>
              </AnimatedPressable>
            );
          })}
        </View>

        {/* Risk Ring Panel */}
        <View style={[styles.riskPanel, SHADOWS.md]}>
          <ProgressRing
            size={140}
            strokeWidth={11}
            progress={data.risk}
            gradientColors={[data.color, data.color + 'AA']}
            id={`existing-${selected}`}
            trackColor="rgba(255,255,255,0.1)"
          >
            <Text style={styles.riskVal}>{data.risk}</Text>
            <Text style={styles.riskValLabel}>%</Text>
          </ProgressRing>

          <View style={styles.riskMeta}>
            <Text style={styles.riskCondName}>{selected}</Text>
            <Text style={styles.riskSub}>
              {data.risk >= 70 ? 'High Risk' : data.risk >= 50 ? 'Moderate Risk' : 'Low Risk'} · AI Monitoring Active
            </Text>
            <View style={styles.riskNote}>
              <Ionicons name="information-circle" size={14} color={data.color} />
              <Text style={[styles.riskNoteText, { color: data.color }]}>Scan-informed today</Text>
            </View>
          </View>
        </View>

        {/* Today's Scan Result */}
        {currentScan && (
          <GlassCard
            variant="outline"
            icon="scan"
            iconColor={COLORS.primary}
            title={`${currentScan.name} — Impact Analysis`}
            subtitle={`Scanned at ${currentScan.scannedAt}`}
          >
            <Text style={styles.impactText}>
              This meal has been cross-referenced against your {selected} profile. See triggers and recommendations below.
            </Text>
          </GlassCard>
        )}

        {/* Triggers */}
        <GlassCard
          variant="dark"
          icon="warning"
          iconColor={COLORS.danger}
          title="Active Triggers Detected"
          subtitle={`Foods that worsen ${selected}`}
        >
          <View style={styles.chipGrid}>
            {data.triggers.map((t, i) => (
              <View key={i} style={styles.triggerChip}>
                <Ionicons name="alert-circle" size={12} color={COLORS.danger} />
                <Text style={styles.triggerText}>{t}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Safe Foods */}
        <GlassCard
          icon="checkmark-circle"
          iconColor={COLORS.secondary}
          iconBg={COLORS.secondarySubtle}
          title="Protective Foods"
          subtitle={`Eat these to protect against ${selected}`}
        >
          <View style={styles.chipGrid}>
            {data.safe.map((s, i) => (
              <View key={i} style={styles.safeChip}>
                <SuccessCheck size={16} color={COLORS.secondary} strokeWidth={3} />
                <Text style={styles.safeText}>{s}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* AI Advice */}
        <GlassCard
          variant="gradient"
          icon="sparkles"
          iconColor={COLORS.accent}
          iconBg={COLORS.accentSubtle}
          title="AI Clinical Advice"
        >
          <Text style={styles.adviceText}>{data.advice}</Text>
        </GlassCard>

        <PrimaryButton
          variant="accent"
          waterEffect={true}
          waterVariant="purple"
          title="Get Full AI Prevention Plan"
          icon="shield-checkmark"
          onPress={onAskAgent}
        />

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  conditionRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 12 },
  condBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(200,207,228,0.6)',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  condLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary },
  riskPanel: {
    backgroundColor: COLORS.darkPanel,
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.darkStroke,
  },
  riskVal: { fontSize: 36, fontWeight: '900', color: COLORS.darkText, letterSpacing: -1, textAlign: 'center' },
  riskValLabel: { fontSize: 16, fontWeight: '700', color: 'rgba(228,231,255,0.55)', textAlign: 'center' },
  riskMeta: { flex: 1 },
  riskCondName: { fontSize: 20, fontWeight: '900', color: COLORS.darkText, letterSpacing: -0.3 },
  riskSub: { fontSize: 12, color: 'rgba(228,231,255,0.55)', marginTop: 4, lineHeight: 17 },
  riskNote: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10 },
  riskNoteText: { fontSize: 11, fontWeight: '700' },
  impactText: { fontSize: 13, fontWeight: '500', color: COLORS.textSecondary, lineHeight: 19, marginTop: 4 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  triggerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.dangerSubtle,
    borderColor: 'rgba(255,92,122,0.25)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  triggerText: { fontSize: 11, fontWeight: '700', color: COLORS.danger },
  safeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.secondarySubtle,
    borderColor: 'rgba(0,196,140,0.25)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  safeText: { fontSize: 11, fontWeight: '700', color: COLORS.secondary },
  adviceText: { fontSize: 13, fontWeight: '500', color: COLORS.textPrimary, lineHeight: 20, fontStyle: 'italic' },
});
