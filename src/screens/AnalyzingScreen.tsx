import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

interface AnalyzingScreenProps {
  onComplete: () => void;
}

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(15);
  const [stepText, setStepText] = useState('Detecting food items & bounding box...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStepText('Extracting ingredients list (NLP / OCR)...');
    }, 800);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setStepText('Calculating nutrition & disease risk metrics...');
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
      <View style={styles.glow} />

      <View style={styles.centerBox}>
        {/* Animated Circle Simulation */}
        <View style={styles.progressCircle}>
          <Ionicons name="hardware-chip" size={48} color={COLORS.primary} />
          <Text style={styles.percentText}>{progress}%</Text>
        </View>

        <Text style={styles.title}>Analyzing Food...</Text>
        <Text style={styles.subText}>AI Agent Core Processing</Text>

        <View style={styles.stepBox}>
          <Ionicons name="sync" size={16} color={COLORS.primaryLight} />
          <Text style={styles.stepText}>{stepText}</Text>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="sparkles" size={18} color={COLORS.secondaryLight} />
        <Text style={styles.tipText}>
          Tip: You can edit ingredients or ask NutriVision AI for personalized alternative recipes.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  glow: {
    position: 'absolute',
    top: '30%',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  centerBox: {
    alignItems: 'center',
    marginTop: 60,
  },
  progressCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.cardBg,
    borderWidth: 4,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 8,
  },
  percentText: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primaryLight,
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  stepBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  stepText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    width: '100%',
  },
  tipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
});
