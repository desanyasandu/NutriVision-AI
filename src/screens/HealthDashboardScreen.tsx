import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface HealthDashboardScreenProps {
  onBack: () => void;
  onNavigateToTwin: () => void;
}

type Timeframe = 'Weekly' | 'Monthly' | 'Yearly';

const CHART_DATA: Record<Timeframe, { labels: string[]; values: number[] }> = {
  Weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [78, 82, 80, 85, 88, 84, 82],
  },
  Monthly: {
    labels: ['W1', 'W2', 'W3', 'W4'],
    values: [75, 80, 84, 82],
  },
  Yearly: {
    labels: ['Jan', 'Apr', 'Jul', 'Oct'],
    values: [70, 76, 80, 82],
  },
};

const ACHIEVEMENTS = [
  { title: '7-Day Clean Log', icon: 'flame' as const, color: COLORS.warning, desc: 'Logged all meals for 7 consecutive days' },
  { title: 'Hydration Hero', icon: 'water' as const, color: '#0EA5E9', desc: 'Hit 2.5L water intake 5 times this week' },
  { title: 'Migraine Shield', icon: 'shield-checkmark' as const, color: COLORS.secondary, desc: 'Zero migraine triggers detected for 10 days' },
  { title: 'Low Glycemic Master', icon: 'sparkles' as const, color: COLORS.accent, desc: 'Maintained sugar under 25g daily' },
];

export const HealthDashboardScreen: React.FC<HealthDashboardScreenProps> = ({
  onBack,
  onNavigateToTwin,
}) => {
  const { userProfile } = useApp();
  const [timeframe, setTimeframe] = useState<Timeframe>('Weekly');

  const currentChart = CHART_DATA[timeframe];

  // SVG Animated Bar Chart Renderer
  const renderBarChart = () => {
    const chartHeight = 130;
    const width = 280;
    const barWidth = 24;
    const maxVal = 100;

    return (
      <Svg width={width} height={chartHeight + 30} style={{ alignSelf: 'center' }}>
        <Defs>
          <LinearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#3B82F6" />
            <Stop offset="100%" stopColor="#60A5FA" />
          </LinearGradient>
        </Defs>

        {currentChart.values.map((val, idx) => {
          const x = idx * (width / currentChart.values.length) + 12;
          const h = (val / maxVal) * chartHeight;
          const y = chartHeight - h;

          return (
            <React.Fragment key={idx}>
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx={8}
                fill="url(#barGrad)"
              />
            </React.Fragment>
          );
        })}
      </Svg>
    );
  };

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated App Bar */}
        <AnimatedAppBar
          title="Health Dashboard"
          subtitle="Apple Health Inspired Trends & Analytics"
          showBack
          onBack={onBack}
          rightActionIcon="body-outline"
          onRightAction={onNavigateToTwin}
        />

        {/* Timeframe Toggle Buttons (Weekly, Monthly, Yearly) */}
        <View style={styles.toggleRow}>
          {(['Weekly', 'Monthly', 'Yearly'] as Timeframe[]).map((tf) => {
            const isActive = timeframe === tf;
            return (
              <AnimatedPressable
                key={tf}
                style={[styles.toggleBtn, isActive && styles.toggleBtnActive]}
                onPress={() => setTimeframe(tf)}
              >
                <Text style={[styles.toggleText, isActive && styles.toggleTextActive]}>{tf}</Text>
              </AnimatedPressable>
            );
          })}
        </View>

        {/* Apple Health Style Large Animated Graph Glass Card */}
        <GlassCard variant="glass" style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Metabolic Health Trend</Text>
              <Text style={styles.chartSub}>Average Health Index: 82/100 (+4% vs last week)</Text>
            </View>
            <View style={styles.trendBadge}>
              <Ionicons name="trending-up" size={14} color={COLORS.secondary} />
              <Text style={styles.trendText}>+4%</Text>
            </View>
          </View>

          <View style={styles.chartWrapper}>
            {renderBarChart()}
            <View style={styles.labelsRow}>
              {currentChart.labels.map((lbl, i) => (
                <Text key={i} style={styles.axisLabel}>{lbl}</Text>
              ))}
            </View>
          </View>
        </GlassCard>

        {/* Health Trends Summary Grid */}
        <Text style={styles.sectionTitle}>Key Health Trends</Text>
        <View style={styles.trendsGrid}>
          <GlassCard variant="solid" style={styles.trendTile}>
            <Ionicons name="flame" size={20} color={COLORS.primary} />
            <Text style={styles.trendTileTitle}>Caloric Stability</Text>
            <Text style={styles.trendTileVal}>92% Balanced</Text>
            <Text style={styles.trendTileSub}>Daily target adherence</Text>
          </GlassCard>

          <GlassCard variant="solid" style={styles.trendTile}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.secondary} />
            <Text style={styles.trendTileTitle}>Sodium Control</Text>
            <Text style={styles.trendTileVal}>1150mg Avg</Text>
            <Text style={styles.trendTileSub}>Well below 2000mg</Text>
          </GlassCard>
        </View>

        {/* Achievements, Streaks & Badges Grid */}
        <Text style={styles.sectionTitle}>Achievements & Streaks</Text>
        <View style={styles.achievementsGrid}>
          {ACHIEVEMENTS.map((ach, idx) => (
            <GlassCard key={idx} style={styles.achievementCard}>
              <View style={styles.achHeader}>
                <View style={[styles.achIconBox, { backgroundColor: ach.color + '15' }]}>
                  <Ionicons name={ach.icon} size={22} color={ach.color} />
                </View>
                <View style={styles.achBadge}>
                  <Text style={styles.achBadgeText}>UNLOCKED</Text>
                </View>
              </View>

              <Text style={styles.achTitle}>{ach.title}</Text>
              <Text style={styles.achDesc}>{ach.desc}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Explore Digital Twin CTA */}
        <PrimaryButton
          title="Open Digital Health Twin Model"
          icon="body"
          onPress={onNavigateToTwin}
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
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(241, 245, 249, 0.9)',
    borderRadius: 18,
    padding: 4,
    marginVertical: 10,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 14,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.sm,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  toggleTextActive: {
    color: COLORS.primary,
    fontWeight: '900',
  },
  chartCard: {
    marginVertical: 8,
    padding: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  chartSub: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 3,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.secondaryDark,
  },
  chartWrapper: {
    marginTop: 8,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 6,
  },
  axisLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  sectionTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginTop: 18,
    marginBottom: 10,
  },
  trendsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 4,
  },
  trendTile: {
    flex: 1,
    padding: 16,
  },
  trendTileTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 6,
  },
  trendTileVal: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  trendTileSub: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 2,
  },
  achievementsGrid: {
    gap: 8,
    marginVertical: 4,
  },
  achievementCard: {
    padding: 16,
  },
  achHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  achIconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  achBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.secondaryDark,
  },
  achTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  achDesc: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
