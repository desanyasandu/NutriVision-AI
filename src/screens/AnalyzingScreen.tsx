import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StepProgressBar } from '../components/StepProgressBar';
import { COLORS } from '../theme/colors';

interface AnalyzingScreenProps {
  onComplete: () => void;
}

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(15);
  const [stepText, setStepText] = useState('Detecting food items & bounding frame...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStepText('Extracting ingredients list (Multi-Modal Vision)...');
    }, 800);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setStepText('Evaluating nutrition facts & chronic disease risks...');
    }, 1600);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStepText('Analysis Complete!');
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StepProgressBar currentStep={2} />

      <View style={styles.centerBox}>
        {/* Animated Progress Ring Circle */}
        <View style={styles.progressCircle}>
          <Ionicons name="hardware-chip" size={44} color={COLORS.primary} />
          <Text style={styles.percentText}>{progress}%</Text>
        </View>

        <Text style={styles.title}>Analyzing Food Image...</Text>
        <Text style={styles.subText}>Nutrition & Risk Factors Computational Engine</Text>

        <View style={styles.stepBox}>
          <Ionicons name="sync" size={16} color={COLORS.primary} />
          <Text style={styles.stepText}>{stepText}</Text>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="shield-checkmark" size={18} color={COLORS.secondary} />
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
    marginTop: 40,
  },
  progressCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 4,
  },
  percentText: {
    fontSize: 22,
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
    gap: 8,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 24,
    borderWidth: 1,
    borderColor: 'rgba(33, 118, 255, 0.2)',
  },
  stepText: {
    fontSize: 12,
    color: COLORS.jetBlack,
    fontWeight: '600',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginHorizontal: 24,
  },
  tipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
});
