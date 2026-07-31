import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface HealthDashboardScreenProps {
  onBack: () => void;
  onNavigateToTwin: () => void;
}

export const HealthDashboardScreen: React.FC<HealthDashboardScreenProps> = ({
  onBack,
  onNavigateToTwin,
}) => {
  const { userProfile } = useApp();

  const calorieTrend = [
    { day: 'Mon', kcal: 2100, height: '70%' },
    { day: 'Tue', kcal: 1850, height: '60%' },
    { day: 'Wed', kcal: 2400, height: '80%' },
    { day: 'Thu', kcal: 1950, height: '65%' },
    { day: 'Fri', kcal: 2600, height: '90%' },
    { day: 'Sat', kcal: 2200, height: '75%' },
    { day: 'Sun', kcal: 1250, height: '42%' },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Health Dashboard"
        subtitle="Weekly Analytics & Trends"
        showBack
        onBack={onBack}
        rightAction={
          <AnimatedPressable style={styles.twinNavBtn} onPress={onNavigateToTwin}>
            <Ionicons name="body" size={20} color={COLORS.primary} />
          </AnimatedPressable>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Average Health Score Card */}
        <View style={[styles.avgScoreCard, SHADOWS.sm]}>
          <View style={styles.avgHeader}>
            <Text style={styles.avgTitle}>Average Health Score</Text>
            <Text style={styles.dateRange}>May 12 - May 18</Text>
          </View>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreNumber}>72</Text>
            <Text style={styles.scoreMax}>/100</Text>
            <View style={styles.statusBadge}>
              <Ionicons name="trending-up" size={14} color={COLORS.successDark} />
              <Text style={styles.statusText}>+4% from last week</Text>
            </View>
          </View>
        </View>

        {/* Calories Trend Bar Chart */}
        <View style={[styles.chartCard, SHADOWS.sm]}>
          <View style={styles.chartHeader}>
            <View style={styles.chartTitleRow}>
              <View style={styles.iconCircleWarning}>
                <Ionicons name="flame" size={16} color={COLORS.warning} />
              </View>
              <Text style={styles.chartTitle}>Calorie Intake Trend</Text>
            </View>
            <Text style={styles.targetLabel}>Target: 2500 kcal</Text>
          </View>

          <View style={styles.barChartContainer}>
            {calorieTrend.map((item, idx) => (
              <View key={idx} style={styles.barColumn}>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: item.height as any,
                        backgroundColor: item.kcal > 2400 ? COLORS.danger : COLORS.primary,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.dayLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Disease Risk Trajectory Chart Box */}
        <View style={[styles.chartCard, SHADOWS.sm]}>
          <View style={styles.chartHeader}>
            <View style={styles.chartTitleRow}>
              <View style={styles.iconCirclePrimary}>
                <Ionicons name="pulse" size={16} color={COLORS.primary} />
              </View>
              <Text style={styles.chartTitle}>Disease Risk Trend</Text>
            </View>
            <Text style={styles.legendText}>30-Day Predictive ML</Text>
          </View>

          <View style={styles.riskLinesContainer}>
            <View style={styles.riskItemRow}>
              <View style={styles.riskItemHeader}>
                <Text style={styles.riskItemTitle}>Obesity Risk (78%)</Text>
                <Text style={styles.riskTrendTextRed}>↑ +5% increase</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: '78%', backgroundColor: COLORS.danger }]} />
              </View>
            </View>

            <View style={styles.riskItemRow}>
              <View style={styles.riskItemHeader}>
                <Text style={styles.riskItemTitle}>Diabetes Risk (62%)</Text>
                <Text style={styles.riskTrendTextYellow}>→ Stable</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: '62%', backgroundColor: COLORS.warning }]} />
              </View>
            </View>

            <View style={styles.riskItemRow}>
              <View style={styles.riskItemHeader}>
                <Text style={styles.riskItemTitle}>Hypertension Risk (45%)</Text>
                <Text style={styles.riskTrendTextGreen}>↓ -3% reduction</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: '45%', backgroundColor: COLORS.primary }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Digital Twin Banner Button */}
        <AnimatedPressable style={[styles.digitalTwinBtn, SHADOWS.md]} onPress={onNavigateToTwin}>
          <View style={styles.twinIconBox}>
            <Ionicons name="body" size={24} color={COLORS.white} />
          </View>
          <View style={styles.twinBtnTextContainer}>
            <Text style={styles.twinBtnTitle}>View Digital Health Twin</Text>
            <Text style={styles.twinBtnSub}>6-Month predicted weight & disease trajectory</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
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
  twinNavBtn: {
    padding: 6,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  avgScoreCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  avgHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  avgTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  dateRange: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  scoreMax: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginRight: 16,
    fontWeight: '800',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 13,
    color: COLORS.successDark,
    fontWeight: '900',
  },
  chartCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircleWarning: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCirclePrimary: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(33, 118, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  targetLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  legendText: {
    fontSize: 13,
    color: COLORS.warningDark,
    fontWeight: '900',
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: 10,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    width: 14,
    height: 110,
    backgroundColor: COLORS.trackBg,
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 7,
  },
  dayLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
    fontWeight: '700',
  },
  riskLinesContainer: {
    gap: 14,
  },
  riskItemRow: {
    gap: 6,
  },
  riskItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  riskItemTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  riskTrendTextRed: {
    fontSize: 13,
    color: COLORS.danger,
    fontWeight: '900',
  },
  riskTrendTextYellow: {
    fontSize: 13,
    color: COLORS.warningDark,
    fontWeight: '900',
  },
  riskTrendTextGreen: {
    fontSize: 13,
    color: COLORS.successDark,
    fontWeight: '900',
  },
  progressBg: {
    height: 8,
    backgroundColor: COLORS.trackBg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  digitalTwinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 22,
  },
  twinIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twinBtnTextContainer: {
    flex: 1,
  },
  twinBtnTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  twinBtnSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
    fontWeight: '500',
  },
});
