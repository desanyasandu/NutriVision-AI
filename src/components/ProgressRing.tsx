import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../theme/colors';

interface ProgressRingProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 to 100
  color?: string;
  gradientColors?: [string, string];
  centerTitle?: string;
  centerSubtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  size = 140,
  strokeWidth = 12,
  progress,
  color = COLORS.primary,
  gradientColors = ['#3B82F6', '#8B5CF6'],
  centerTitle,
  centerSubtitle,
  children,
  style,
}) => {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * Math.min(100, Math.max(0, progress))) / 100;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </LinearGradient>
        </Defs>

        {/* Background Track Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(241, 245, 249, 0.9)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Animated Progress Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#ringGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>

      {/* Center Text or Custom Element */}
      <View style={styles.centerContent}>
        {children ? (
          children
        ) : (
          <>
            {centerTitle && <Text style={styles.titleText}>{centerTitle}</Text>}
            {centerSubtitle && <Text style={styles.subtitleText}>{centerSubtitle}</Text>}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});
