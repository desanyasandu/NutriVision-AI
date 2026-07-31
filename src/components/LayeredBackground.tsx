import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle } from 'react-native-svg';
import { COLORS } from '../theme/colors';

interface LayeredBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'dark' | 'violet' | 'health';
}

export const LayeredBackground: React.FC<LayeredBackgroundProps> = ({
  children,
  style,
  variant = 'default',
}) => {
  const getGradient = () => {
    switch (variant) {
      case 'dark':
        return { c1: '#13142A', c2: '#1E2040', c3: '#13142A', bg: '#13142A' };
      case 'violet':
        return { c1: '#1A1240', c2: '#13142A', c3: '#0D0E1A', bg: '#0D0E1A' };
      case 'health':
        return { c1: '#E8FFF7', c2: '#F5F6FA', c3: '#F0F2F8', bg: '#F5F6FA' };
      default:
        return { c1: '#E8ECFF', c2: '#F5F6FA', c3: '#F0F2F8', bg: '#F5F6FA' };
    }
  };

  const grad = getGradient();

  return (
    <View style={[styles.container, { backgroundColor: grad.bg }, style]}>
      {/* Top Ambient Gradient Layer */}
      <View style={styles.ambientTop}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="layerTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={grad.c1} stopOpacity="1" />
              <Stop offset="60%" stopColor={grad.c2} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={grad.c3} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#layerTop)" />
        </Svg>
      </View>

      {/* Blob 1: Top-right ambient sphere */}
      <View style={styles.blob1} />

      {/* Blob 2: Bottom-left ambient sphere */}
      <View style={styles.blob2} />

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  ambientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 380,
    zIndex: 0,
  },
  blob1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(79, 110, 247, 0.07)',
    zIndex: 0,
  },
  blob2: {
    position: 'absolute',
    bottom: 100,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(123, 97, 255, 0.05)',
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
