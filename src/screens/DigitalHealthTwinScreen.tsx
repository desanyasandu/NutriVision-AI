import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { DIGITAL_TWIN_PREDICTION } from '../data/mockData';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface DigitalHealthTwinScreenProps {
  onBack: () => void;
  onAskAgent: () => void;
}

export const DigitalHealthTwinScreen: React.FC<DigitalHealthTwinScreenProps> = ({
  onBack,
  onAskAgent,
}) => {
  const { userProfile } = useApp();
  const [timeframe, setTimeframe] = useState<'6M' | '12M'>('6M');

  const is12M = timeframe === '12M';
  const weightGain = is12M ? '+7kg After 12 Months' : '+4kg After 6 Months';
  const predictedWeight = is12M ? DIGITAL_TWIN_PREDICTION.predictedWeight6Months + 3 : DIGITAL_TWIN_PREDICTION.predictedWeight6Months;
  const riskIncrease = is12M ? DIGITAL_TWIN_PREDICTION.riskIncreasePercentage + 8 : DIGITAL_TWIN_PREDICTION.riskIncreasePercentage;
  const progressWidth = is12M ? '82%' : '65%';

  return (
    <View style={styles.container}>
      <Header
        title="Digital Health Twin"
        subtitle="Predictive Future Health Simulation"
        showBack
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Timeframe Selector Pills */}
        <View style={styles.timeframeRow}>
          <AnimatedPressable
            style={[styles.timeChip, timeframe === '6M' && styles.timeChipActive]}
            onPress={() => setTimeframe('6M')}
          >
            <Ionicons name="time" size={14} color={timeframe === '6M' ? COLORS.white : COLORS.textSecondary} />
            <Text style={[styles.timeChipText, timeframe === '6M' && styles.timeChipTextActive]}>6-Month Projection</Text>
          </AnimatedPressable>

          <AnimatedPressable
            style={[styles.timeChip, timeframe === '12M' && styles.timeChipActive]}
            onPress={() => setTimeframe('12M')}
          >
            <Ionicons name="analytics" size={14} color={timeframe === '12M' ? COLORS.white : COLORS.textSecondary} />
            <Text style={[styles.timeChipText, timeframe === '12M' && styles.timeChipTextActive]}>12-Month Projection</Text>
          </AnimatedPressable>
        </View>

        {/* Banner header */}
        <View style={[styles.banner, SHADOWS.sm]}>
          <View style={styles.avatarCircle}>
            <Ionicons name="body" size={32} color={COLORS.primary} />
          </View>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Your Future Health Twin</Text>
            <Text style={styles.bannerSub}>{timeframe === '6M' ? '6-Month' : '12-Month'} Predictive Trajectory based on dietary habits</Text>
          </View>
        </View>

        {/* Weight & Risk Comparison Grid */}
        <View style={styles.comparisonGrid}>
          <View style={[styles.compCard, SHADOWS.sm]}>
            <Text style={styles.compLabel}>Current Weight</Text>
            <Text style={styles.compVal}>{DIGITAL_TWIN_PREDICTION.currentWeight} kg</Text>
            <Text style={styles.compSub}>Today</Text>
          </View>

          <View style={[styles.compCardWarning, SHADOWS.sm]}>
            <Text style={styles.compLabelWarning}>Predicted Weight</Text>
            <Text style={styles.compValWarning}>
              {predictedWeight} kg
            </Text>
            <Text style={styles.compSubWarning}>{weightGain}</Text>
          </View>
        </View>

        {/* Risk Increase Callout */}
        <View style={[styles.riskCard, SHADOWS.sm]}>
          <View style={styles.riskHeader}>
            <Ionicons name="warning" size={24} color={COLORS.danger} />
            <View style={styles.riskTitleGroup}>
              <Text style={styles.riskTitle}>Predicted Disease Risk Increase</Text>
              <Text style={styles.riskSub}>
                +{riskIncrease}% Increase in{' '}
                <Text style={styles.highlightText}>{DIGITAL_TWIN_PREDICTION.riskIncreaseDisease}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.riskBarBg}>
            <View style={[styles.riskBarFill, { width: progressWidth as any }]} />
          </View>
        </View>

        {/* Proactive Recommendations Section */}
        <View style={[styles.recsSection, SHADOWS.sm]}>
          <Text style={styles.recsHeaderTitle}>Proactive Intervention Recommendations</Text>

          {/* Reduce List */}
          <View style={styles.recGroup}>
            <View style={styles.groupTitleRow}>
              <Ionicons name="close-circle" size={18} color={COLORS.danger} />
              <Text style={styles.groupTitleRed}>Foods to Reduce / Avoid:</Text>
            </View>
            <View style={styles.chipsWrap}>
              {DIGITAL_TWIN_PREDICTION.recommendationsToReduce.map((item, idx) => (
                <View key={idx} style={styles.redChip}>
                  <Text style={styles.redChipText}>✕ {item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Increase List */}
          <View style={styles.recGroup}>
            <View style={styles.groupTitleRow}>
              <Ionicons name="checkmark-circle" size={18} color={COLORS.successDark} />
              <Text style={styles.groupTitleGreen}>Foods to Increase:</Text>
            </View>
            <View style={styles.chipsWrap}>
              {DIGITAL_TWIN_PREDICTION.recommendationsToAdd.map((item, idx) => (
                <View key={idx} style={styles.greenChip}>
                  <Text style={styles.greenChipText}>✓ {item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <AnimatedPressable style={[styles.agentActionBtn, SHADOWS.md]} onPress={onAskAgent}>
          <Ionicons name="sparkles" size={20} color={COLORS.white} />
          <Text style={styles.agentActionText}>Ask AI Agent to Generate Alternate Meal Plan</Text>
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
  timeframeRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 14,
    gap: 10,
  },
  timeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timeChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  timeChipTextActive: {
    color: COLORS.white,
    fontWeight: '800',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 14,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  bannerSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
    fontWeight: '500',
  },
  comparisonGrid: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  compCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  compLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  compVal: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginVertical: 4,
  },
  compSub: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '700',
  },
  compCardWarning: {
    flex: 1,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  compLabelWarning: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: '700',
  },
  compValWarning: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.danger,
    marginVertical: 4,
  },
  compSubWarning: {
    fontSize: 11,
    color: COLORS.danger,
    fontWeight: '800',
  },
  riskCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  riskTitleGroup: {
    flex: 1,
  },
  riskTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  riskSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  highlightText: {
    color: COLORS.danger,
    fontWeight: '800',
  },
  riskBarBg: {
    height: 8,
    backgroundColor: COLORS.trackBg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  riskBarFill: {
    height: '100%',
    backgroundColor: COLORS.danger,
    borderRadius: 4,
  },
  recsSection: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 16,
  },
  recsHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  recGroup: {
    gap: 8,
  },
  groupTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  groupTitleRed: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.danger,
  },
  groupTitleGreen: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.successDark,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  redChip: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  redChipText: {
    fontSize: 11,
    color: COLORS.danger,
    fontWeight: '700',
  },
  greenChip: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  greenChipText: {
    fontSize: 11,
    color: COLORS.successDark,
    fontWeight: '800',
  },
  agentActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 18,
  },
  agentActionText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
});
