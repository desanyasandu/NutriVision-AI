import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LayeredBackground } from '../components/LayeredBackground';
import { GlassCard } from '../components/GlassCard';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface AnalyzingScreenProps {
  onComplete: () => void;
}

const STAGES = [
  'Initializing Neural Segmentation...',
  'Extracting Macronutrients (Protein, Fat, Sodium)...',
  'Cross-referencing Pre-Diabetes Risk Guidelines...',
  'Evaluating Vascular Migraine Triggers...',
  'Finalizing Personal Health Score Impact...',
];

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete }) => {
  const [stageIndex, setStageIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 3200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      onComplete();
    });

    const interval = setInterval(() => {
      setStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 640);

    return () => clearInterval(interval);
  }, [onComplete, progressAnim]);

  const widthInterpolate = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <LayeredBackground style={styles.centerContainer}>
      <View style={styles.contentBox}>
        {/* Glowing AI Radar Orb Visualizer */}
        <View style={styles.orbContainer}>
          <View style={[styles.orbOuter, SHADOWS.glow]}>
            <View style={styles.orbInner}>
              <Ionicons name="hardware-chip-outline" size={44} color={COLORS.white} />
            </View>
          </View>
        </View>

        <Text style={styles.titleText}>AI Deep Analysis</Text>
        <Text style={styles.stageText}>{STAGES[stageIndex]}</Text>

        {/* Shimmer Progress Track */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, { width: widthInterpolate }]} />
        </View>

        {/* Skeleton Placeholders as AI processes nutrients */}
        <View style={styles.skeletonSection}>
          <GlassCard variant="glass" style={styles.skeletonCard}>
            <SkeletonLoader height={18} width="60%" borderRadius={8} />
            <SkeletonLoader height={14} width="85%" borderRadius={6} style={{ marginTop: 8 }} />
            <SkeletonLoader height={14} width="40%" borderRadius={6} style={{ marginTop: 4 }} />
          </GlassCard>
        </View>
      </View>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentBox: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  orbContainer: {
    marginBottom: 24,
  },
  orbOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  orbInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: DESIGN_TOKENS.fontSize.hugeTitle, // 32
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  stageText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    height: 40,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(226, 232, 240, 0.9)',
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  skeletonSection: {
    width: '100%',
    marginTop: 10,
  },
  skeletonCard: {
    padding: 18,
  },
});
