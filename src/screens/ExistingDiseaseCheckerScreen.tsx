import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { MOCK_EXISTING_DISEASE_CHECKS } from '../data/mockData';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

interface ExistingDiseaseCheckerScreenProps {
  onBack: () => void;
  onAskAgent: () => void;
}

export const ExistingDiseaseCheckerScreen: React.FC<ExistingDiseaseCheckerScreenProps> = ({
  onBack,
  onAskAgent,
}) => {
  const { userProfile, currentScan } = useApp();
  const [selectedCondition, setSelectedCondition] = useState<string>('Migraine');

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated App Bar */}
        <AnimatedAppBar
          title="Condition Checker"
          subtitle="Pre-existing Medical Vulnerability Cross-Check"
          showBack
          onBack={onBack}
          rightActionIcon="sparkles"
          onRightAction={onAskAgent}
        />

        {/* User Conditions Summary Card */}
        <GlassCard
          icon="person"
          iconColor={COLORS.primary}
          title={`${userProfile.name}'s Medical Profile`}
          subtitle="Active diagnosed conditions"
        >
          <View style={styles.conditionsPillsRow}>
            {userProfile.existingConditions.map((cond) => {
              const isSelected = selectedCondition === cond;
              return (
                <AnimatedPressable
                  key={cond}
                  style={[styles.condPill, isSelected && styles.condPillActive]}
                  onPress={() => setSelectedCondition(cond)}
                >
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={14}
                    color={isSelected ? COLORS.white : COLORS.primary}
                  />
                  <Text style={[styles.condPillText, isSelected && styles.condPillTextActive]}>{cond}</Text>
                </AnimatedPressable>
              );
            })}
          </View>
        </GlassCard>

        {/* Detailed Condition Compatibility Matrix */}
        <Text style={styles.sectionTitle}>Compatibility Matrix</Text>
        {MOCK_EXISTING_DISEASE_CHECKS.map((item) => (
          <GlassCard
            key={item.condition}
            variant={item.isCompatible ? 'glass' : 'solid'}
            style={
              !item.isCompatible
                ? { ...styles.matrixCard, borderColor: 'rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(255, 241, 242, 0.85)' }
                : styles.matrixCard
            }
          >
            <View style={styles.matrixHeader}>
              <View style={styles.matrixTitleRow}>
                <Text style={styles.conditionName}>{item.condition}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: item.isCompatible ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)' },
                  ]}
                >
                  <Ionicons
                    name={item.isCompatible ? 'checkmark-circle' : 'close-circle'}
                    size={14}
                    color={item.isCompatible ? COLORS.secondary : COLORS.danger}
                  />
                  <Text
                    style={[
                      styles.statusBadgeText,
                      { color: item.isCompatible ? COLORS.secondaryDark : COLORS.dangerDark },
                    ]}
                  >
                    {item.isCompatible ? 'COMPATIBLE' : 'TRIGGER WARNING'}
                  </Text>
                </View>
              </View>
            </View>

            {item.warnings.map((warn, i) => (
              <Text key={i} style={styles.warningText}>
                ⚠️ {warn}
              </Text>
            ))}

            {item.triggerIngredients.length > 0 && (
              <View style={styles.triggersRow}>
                <Text style={styles.triggersLabel}>Trigger Ingredients:</Text>
                <View style={styles.triggersGrid}>
                  {item.triggerIngredients.map((ing, idx) => (
                    <View key={idx} style={styles.triggerChip}>
                      <Text style={styles.triggerChipText}>{ing}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </GlassCard>
        ))}

        {/* Doctor Consultation Banner */}
        <GlassCard
          variant="gradient"
          icon="medkit-outline"
          iconColor={COLORS.accent}
          title="Clinical Recommendation"
          subtitle="Direct advice from licensed dietary protocols"
        >
          <Text style={styles.clinicalAdviceText}>
            "Because Cheese Burger has high sodium and nitrate traces, it is flagged for Migraine and Pre-diabetes vulnerability. Swap sauce for extra greens to maintain stability."
          </Text>
        </GlassCard>

        {/* Action Buttons */}
        <View style={styles.actionGroup}>
          <PrimaryButton title="Consult AI Clinical Assistant" icon="chatbubbles-outline" onPress={onAskAgent} />
          <SecondaryButton title="Return to Dashboard" icon="home-outline" onPress={onBack} />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  conditionsPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  condPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  condPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  condPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  condPillTextActive: {
    color: COLORS.white,
  },
  sectionTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginTop: 18,
    marginBottom: 10,
  },
  matrixCard: {
    marginVertical: 6,
  },
  matrixHeader: {
    marginBottom: 6,
  },
  matrixTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conditionName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  warningText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.dangerDark,
    marginTop: 4,
    lineHeight: 18,
  },
  triggersRow: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(241, 245, 249, 0.9)',
  },
  triggersLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  triggersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  triggerChip: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  triggerChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.danger,
  },
  clinicalAdviceText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 19,
    fontStyle: 'italic',
  },
  actionGroup: {
    marginTop: 16,
    gap: 4,
  },
});
