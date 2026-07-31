import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LayeredBackground } from '../components/LayeredBackground';
import { SuccessCheck } from '../components/SuccessCheck';
import { COLORS, SHADOWS } from '../theme/colors';

interface AnalyzingScreenProps {
  onComplete: () => void;
}

const STAGES = [
  { label: 'Initializing Neural Segmentation', icon: 'hardware-chip' as const },
  { label: 'Extracting Macronutrients', icon: 'nutrition' as const },
  { label: 'Cross-referencing Disease Guidelines', icon: 'medical' as const },
  { label: 'Evaluating Migraine Trigger Markers', icon: 'flash' as const },
  { label: 'Building Your Health Impact Report', icon: 'sparkles' as const },
];

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const orbPulse = useRef(new Animated.Value(1)).current;
  const orbGlow = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 3400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => onComplete());

    const int = setInterval(() => {
      setStage((p) => (p < STAGES.length - 1 ? p + 1 : p));
    }, 680);

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(orbPulse, { toValue: 1.15, duration: 1200, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          Animated.timing(orbGlow, { toValue: 1, duration: 1200, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(orbPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
          Animated.timing(orbGlow, { toValue: 0.6, duration: 1200, useNativeDriver: true }),
        ]),
      ])
    ).start();

    return () => clearInterval(int);
  }, [onComplete, progress, orbPulse, orbGlow]);

  const barWidth = progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });

  return (
    <LayeredBackground variant="dark" style={styles.root}>
      <View style={styles.center}>
        {/* Glow Pulse Orb with Success Check */}
        <View style={styles.orbStack}>
          <Animated.View style={[styles.orbGlowRing, { opacity: orbGlow, transform: [{ scale: orbPulse }] }]} />
          <Animated.View style={[styles.orbMiddle, { transform: [{ scale: orbPulse }] }]}>
            <View style={styles.orbCore}>
              {stage >= STAGES.length - 1 ? (
                <SuccessCheck key="stage-done" size={42} color={COLORS.secondary} />
              ) : (
                <Ionicons name="hardware-chip" size={44} color={COLORS.white} />
              )}
            </View>
          </Animated.View>
        </View>

        <Text style={styles.mainTitle}>Deep AI Analysis</Text>
        <Text style={styles.stageText}>{STAGES[stage].label}...</Text>

        {/* Stage Dots */}
        <View style={styles.dotsRow}>
          {STAGES.map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: i <= stage ? COLORS.primary : 'rgba(255,255,255,0.15)', width: i === stage ? 20 : 6 }]} />
          ))}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: barWidth }]} />
        </View>

        {/* Status Pills */}
        <View style={styles.pillsRow}>
          {['Proteins', 'Fats', 'Carbs', 'Micronutrients'].map((l, i) => (
            <View key={i} style={[styles.statusPill, { opacity: i <= stage ? 1 : 0.3 }]}>
              {i <= stage ? (
                <SuccessCheck key={`pill-${i}`} size={16} color={COLORS.secondary} strokeWidth={3} />
              ) : (
                <Ionicons name="checkmark-circle" size={12} color={COLORS.textMuted} />
              )}
              <Text style={[styles.pillText, { color: i <= stage ? COLORS.secondary : COLORS.textMuted }]}>{l}</Text>
            </View>
          ))}
        </View>
      </View>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    paddingHorizontal: 32,
    width: '100%',
  },
  orbStack: {
    position: 'relative',
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  orbGlowRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(79, 110, 247, 0.2)',
  },
  orbMiddle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
    ...SHADOWS.glow,
  },
  orbCore: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.darkText,
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  stageText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(228,231,255,0.65)',
    textAlign: 'center',
    minHeight: 38,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    marginBottom: 20,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
