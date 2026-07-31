import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { COLORS } from '../theme/colors';

interface LayeredBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  topGradientHeight?: number;
}

export const LayeredBackground: React.FC<LayeredBackgroundProps> = ({
  children,
  style,
  topGradientHeight = 340,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Layer 1: Top Soft Blue/Purple Ambient Gradient */}
      <View style={[styles.gradientCanvas, { height: topGradientHeight }]}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.85" />
              <Stop offset="40%" stopColor="#EFF6FF" stopOpacity="0.7" />
              <Stop offset="80%" stopColor="#F8FAFC" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#F8FAFC" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#bgGrad)" />
        </Svg>
      </View>

      {/* Layer 2: Subtle Ambient Radial Glow Blob */}
      <View style={styles.ambientGlowBlob} />

      {/* Main Screen Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  gradientCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  ambientGlowBlob: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
