import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

interface StepProgressBarProps {
  currentStep: number; // 1 | 2 | 3 | 4
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Scan' },
    { num: 2, label: 'Analyze' },
    { num: 3, label: 'Result' },
    { num: 4, label: 'Risk Report' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.stepsRow}>
        {steps.map((s, idx) => {
          const isActive = s.num === currentStep;
          const isDone = s.num < currentStep;

          return (
            <React.Fragment key={s.num}>
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.circle,
                    isDone && styles.circleDone,
                    isActive && styles.circleActive,
                  ]}
                >
                  {isDone ? (
                    <Ionicons name="checkmark" size={13} color={COLORS.white} />
                  ) : (
                    <Text
                      style={[
                        styles.circleText,
                        isActive && styles.circleTextActive,
                      ]}
                    >
                      {s.num}
                    </Text>
                  )}
                </View>
                <Text style={[styles.stepLabel, (isActive || isDone) && styles.stepLabelActive]}>
                  {s.label}
                </Text>
              </View>

              {idx < steps.length - 1 && (
                <View style={[styles.connector, isDone && styles.connectorDone]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    gap: 4,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    backgroundColor: COLORS.primary,
  },
  circleActive: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: 'rgba(33, 118, 255, 0.3)',
  },
  circleText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  circleTextActive: {
    color: COLORS.white,
  },
  stepLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  stepLabelActive: {
    color: COLORS.jetBlack,
    fontWeight: '700',
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 6,
    marginBottom: 14,
  },
  connectorDone: {
    backgroundColor: COLORS.primary,
  },
});
