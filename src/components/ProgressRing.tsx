import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../theme/colors';

interface ProgressRingProps {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color?: string;
  trackColor?: string;
  gradientColors?: [string, string];
  centerTitle?: string;
  centerSubtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  id?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  size = 140,
  strokeWidth = 12,
  progress,
  trackColor,
  gradientColors = ['#4F6EF7', '#7B61FF'],
  centerTitle,
  centerSubtitle,
  children,
  style,
  id = 'default',
}) => {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (circumference * clampedProgress) / 100;
  const gradId = `ring_${id}`;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </LinearGradient>
        </Defs>

        {/* Track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor || 'rgba(200, 207, 228, 0.4)'}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress Arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>

      <View style={styles.center}>
        {children || (
          <>
            {centerTitle && <Text style={styles.titleText}>{centerTitle}</Text>}
            {centerSubtitle && <Text style={styles.subText}>{centerSubtitle}</Text>}
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
  },
  subText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});
