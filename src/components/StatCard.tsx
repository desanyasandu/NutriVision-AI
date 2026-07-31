import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { COLORS, SHADOWS } from '../theme/colors';
import { AnimatedPressable } from './AnimatedPressable';

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBg?: string;
  progress?: number;
  trend?: string;
  trendPositive?: boolean;
  sparklineData?: number[];
  onPress?: () => void;
  style?: ViewStyle;
  dark?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon,
  iconColor = COLORS.primary,
  iconBg = 'rgba(79, 110, 247, 0.12)',
  progress,
  trend,
  trendPositive = true,
  sparklineData = [20, 40, 30, 60, 50, 75, 65],
  onPress,
  style,
  dark = false,
}) => {
  const renderSparkline = () => {
    const width = 72;
    const height = 28;
    const max = Math.max(...sparklineData, 1);
    const min = Math.min(...sparklineData, 0);
    const step = width / Math.max(1, sparklineData.length - 1);
    const pts = sparklineData.map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / (max - min || 1)) * (height - 4) - 2;
      return `${x},${y}`;
    });

    return (
      <Svg width={width} height={height}>
        <Path
          d={`M ${pts.join(' L ')}`}
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.7}
        />
      </Svg>
    );
  };

  const bg = dark ? '#1E2040' : 'rgba(255, 255, 255, 0.9)';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(200, 207, 228, 0.55)';
  const titleClr = dark ? 'rgba(228, 231, 255, 0.65)' : COLORS.textSecondary;
  const valClr = dark ? COLORS.darkText : COLORS.textPrimary;

  return (
    <AnimatedPressable
      style={[styles.card, { backgroundColor: bg, borderColor: border }, SHADOWS.sm, style]}
      onPress={onPress}
      scaleTo={0.96}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: dark ? 'rgba(255,255,255,0.1)' : iconBg }]}>
          <Ionicons name={icon} size={17} color={dark ? COLORS.white : iconColor} />
        </View>
        {trend && (
          <View style={[
            styles.trendBadge,
            { backgroundColor: trendPositive ? 'rgba(0,196,140,0.12)' : 'rgba(255,92,122,0.12)' }
          ]}>
            <Ionicons
              name={trendPositive ? 'trending-up' : 'trending-down'}
              size={11}
              color={trendPositive ? COLORS.secondary : COLORS.danger}
            />
            <Text style={[styles.trendText, { color: trendPositive ? COLORS.secondary : COLORS.danger }]}>
              {trend}
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.titleText, { color: titleClr }]}>{title}</Text>
      <Text style={[styles.valueText, { color: valClr }]}>
        {value}
        {unit && <Text style={[styles.unitText, { color: dark ? 'rgba(228,231,255,0.45)' : COLORS.textMuted }]}> {unit}</Text>}
      </Text>

      <View style={styles.bottomRow}>
        {renderSparkline()}
        {progress !== undefined && (
          <View style={[styles.progressTrack, { backgroundColor: dark ? 'rgba(255,255,255,0.08)' : COLORS.trackBg }]}>
            <View style={[styles.progressFill, { width: `${Math.min(100, progress)}%`, backgroundColor: iconColor }]} />
          </View>
        )}
      </View>

      {subtitle && <Text style={[styles.subtitleText, { color: dark ? 'rgba(228,231,255,0.45)' : COLORS.textMuted }]}>{subtitle}</Text>}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 15,
    borderWidth: 1,
    flex: 1,
    minWidth: 148,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 99,
    gap: 3,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '800',
  },
  titleText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 3,
  },
  valueText: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  unitText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bottomRow: {
    marginTop: 8,
    marginBottom: 4,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  subtitleText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});
