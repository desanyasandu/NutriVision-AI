import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { DiseaseRiskCard } from '../components/DiseaseRiskCard';
import { MedicalDisclaimerBox } from '../components/MedicalDisclaimerBox';
import { StepProgressBar } from '../components/StepProgressBar';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface DiseaseRiskAnalysisScreenProps {
  onBack: () => void;
  onNavigateToChecker: () => void;
  onAskAgent: () => void;
}

export const DiseaseRiskAnalysisScreen: React.FC<DiseaseRiskAnalysisScreenProps> = ({
  onBack,
  onNavigateToChecker,
  onAskAgent,
}) => {
  const { diseaseRisks } = useApp();

  return (
    <View style={styles.container}>
      <Header title="Disease Risk Analysis" subtitle="AI Health Risk Estimator" showBack onBack={onBack} />
      <StepProgressBar currentStep={4} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner Summary */}
        <View style={[styles.banner, SHADOWS.sm]}>
          <View style={styles.iconBox}>
            <Ionicons name="git-network" size={24} color={COLORS.primary} />
          </View>

          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>Predictive Health Risk Models</Text>
            <Text style={styles.bannerSub}>
              Statistical estimates based on long-term eating habits, dietary guidelines, and user demographics.
            </Text>
          </View>
        </View>

        {/* Prominent Medical Disclaimer */}
        <MedicalDisclaimerBox />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Chronic Health Risk Factor Breakdown</Text>
        </View>

        {/* Render Risk Cards */}
        {diseaseRisks.map((risk, idx) => (
          <DiseaseRiskCard key={idx} risk={risk} />
        ))}

        {/* Navigation Action Stack */}
        <View style={styles.btnRow}>
          <AnimatedPressable
            style={styles.checkerBtn}
            onPress={onNavigateToChecker}
          >
            <Ionicons name="shield-checkmark" size={18} color={COLORS.primary} />
            <Text style={styles.checkerBtnText}>Check Condition Safeguards</Text>
          </AnimatedPressable>

          <AnimatedPressable
            style={[styles.agentBtn, SHADOWS.md]}
            onPress={onAskAgent}
          >
            <Ionicons name="sparkles" size={18} color={COLORS.white} />
            <Text style={styles.agentBtnText}>Ask AI Companion to Fix Diet Plan</Text>
          </AnimatedPressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 14,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(33, 118, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTextContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  bannerSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
    fontWeight: '500',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  btnRow: {
    paddingHorizontal: 20,
    marginTop: 12,
    gap: 10,
  },
  checkerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    minHeight: 48,
  },
  checkerBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
  },
  agentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 16,
    minHeight: 48,
  },
  agentBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
  },
});
