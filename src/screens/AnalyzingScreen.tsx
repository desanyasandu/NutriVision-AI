import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { StepProgressBar } from '../components/StepProgressBar';
import { COLORS } from '../theme/colors';

interface AnalyzingScreenProps {
  onComplete: () => void;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(15);
  const [stepText, setStepText] = useState('Detecting food items & bounding frame...');

  // Animation values for scanner HUD
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.9)).current;
  const stepFadeAnim = useRef(new Animated.Value(1)).current;

  // SVG circle dimensions
  const size = 180;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animated progress value
  const progressAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    // 1. Continuous Laser Beam Scan Animation Loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Pulse Ring Animation Loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    // Animate SVG circle stroke
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animateStepTextChange = (newProgress: number, newText: string) => {
    Animated.sequence([
      Animated.timing(stepFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(stepFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setProgress(newProgress);
    setStepText(newText);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      animateStepTextChange(45, 'Extracting ingredients list (Multi-Modal Vision)...');
    }, 800);

    const timer2 = setTimeout(() => {
      animateStepTextChange(75, 'Evaluating nutrition facts & chronic disease risks...');
    }, 1600);

    const timer3 = setTimeout(() => {
      animateStepTextChange(100, 'Analysis Complete!');
      setTimeout(() => {
        onComplete();
      }, 400);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const translateYScan = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-65, 65],
  });

  return (
    <View style={styles.container}>
      <StepProgressBar currentStep={2} />

      <View style={styles.centerBox}>
        {/* HUD Pulse Ring Container */}
        <View style={styles.hudWrapper}>
          <Animated.View
            style={[
              styles.pulseRing,
              {
                transform: [{ scale: pulseAnim }],
                opacity: pulseAnim.interpolate({
                  inputRange: [0.9, 1.25],
                  outputRange: [0.6, 0.15],
                }),
              },
            ]}
          />

          {/* SVG Circular Progress Ring */}
          <Svg width={size} height={size} style={styles.svgRing}>
            {/* Background Track Circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(33, 118, 255, 0.12)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Animated Progress Circle */}
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={COLORS.primary}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              rotation="-90"
              origin={`${size / 2}, ${size / 2}`}
            />
          </Svg>

          {/* Central Camera / Hardware Chip Surface with Laser Scanner */}
          <View style={styles.chipCore}>
            <Ionicons name="hardware-chip" size={48} color={COLORS.primary} />
            <Text style={styles.percentText}>{progress}%</Text>

            {/* Scanning Laser Beam Effect Line */}
            <Animated.View
              style={[
                styles.scannerBeam,
                {
                  transform: [{ translateY: translateYScan }],
                },
              ]}
            />
          </View>
        </View>

        <Text style={styles.title}>Analyzing Food Image...</Text>
        <Text style={styles.subText}>Nutrition & Risk Factors Computational Engine</Text>

        <Animated.View style={[styles.stepBox, { opacity: stepFadeAnim }]}>
          <Ionicons name="sparkles" size={18} color={COLORS.primary} />
          <Text style={styles.stepText}>{stepText}</Text>
        </Animated.View>
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="shield-checkmark" size={20} color={COLORS.secondary} />
        <Text style={styles.tipText}>
          Clinical Note: You can manually refine or add detected ingredients on the next screen.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  centerBox: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  hudWrapper: {
    width: 210,
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  pulseRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
  svgRing: {
    position: 'absolute',
  },
  chipCore: {
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(33, 118, 255, 0.25)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  scannerBeam: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 5,
  },
  percentText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.jetBlack,
  },
  subText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  stepBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(33, 118, 255, 0.25)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  stepText: {
    fontSize: 13,
    color: COLORS.jetBlack,
    fontWeight: '700',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginHorizontal: 24,
    shadowColor: COLORS.jetBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  tipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
});
