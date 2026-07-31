import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';
import { AnimatedPressable } from './AnimatedPressable';

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBg?: string;
  progress?: number; // 0 to 100
  trend?: string;
  trendPositive?: boolean;
  sparklineData?: number[];
  onPress?: () => void;
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon,
  iconColor = COLORS.primary,
  iconBg = 'rgba(59, 130, 246, 0.1)',
  progress,
  trend,
  trendPositive = true,
  sparklineData = [10, 25, 18, 40, 30, 55, 45],
  onPress,
  style,
}) => {
  // Generate simple sparkline SVG path string
  const renderSparkline = () => {
    const width = 80;
    const height = 28;
    const max = Math.max(...sparklineData, 1);
    const min = Math.min(...sparklineData, 0);
    const step = width / (sparklineData.length - 1);

    const points = sparklineData
      .map((val, idx) => {
        const x = idx * step;
        const y = height - ((val - min) / (max - min || 1)) * (height - 4) - 2;
        return `${x},${y}`;
      })
      .join(' L ');

    return (
      <Svg width={width} height={height}>
        <Path
          d={`M ${points}`}
          fill="none"
          stroke={iconColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };

  return (
    <AnimatedPressable style={[styles.card, SHADOWS.sm, style]} onPress={onPress}>
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={18} color={iconColor} />
        </View>

        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trendPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }]}>
            <Ionicons
              name={trendPositive ? 'trending-up' : 'trending-down'}
              size={12}
              color={trendPositive ? COLORS.secondary : COLORS.danger}
            />
            <Text style={[styles.trendText, { color: trendPositive ? COLORS.secondary : COLORS.danger }]}>{trend}</Text>
          </View>
        )}
      </View>

      <Text style={styles.titleText}>{title}</Text>

      <View style={styles.valueRow}>
        <Text style={styles.valueText}>
          {value}
          {unit && <Text style={styles.unitText}> {unit}</Text>}
        </Text>
      </View>

      {/* Mini Sparkline Chart */}
      <View style={styles.sparklineRow}>{renderSparkline()}</View>

      {/* Progress Track if provided */}
      {progress !== undefined && (
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${Math.min(100, Math.max(0, progress))}%`, backgroundColor: iconColor }]} />
        </View>
      )}

      {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: DESIGN_TOKENS.borderRadius.card, // 24
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    flex: 1,
    minWidth: 150,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
    gap: 3,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '800',
  },
  titleText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valueText: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
  },
  unitText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  sparklineRow: {
    marginTop: 8,
    marginBottom: 6,
  },
  progressTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(241, 245, 249, 0.9)',
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 6,
  },
});
