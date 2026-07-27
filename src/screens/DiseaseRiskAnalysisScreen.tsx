import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { DiseaseRiskCard } from '../components/DiseaseRiskCard';
import { COLORS, BORDER_RADIUS } from '../theme/colors';

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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.medicalDisclaimer}>
          <Ionicons name="alert-circle" size={20} color={COLORS.danger} />
          <Text style={styles.medicalDisclaimerText}>
            For informational purposes only. Not a medical diagnosis. Consult a healthcare professional for any concerns.
          </Text>
        </View>

        {/* Banner Summary */}
        <View style={styles.banner}>
          <View style={styles.iconBox}>
            <Ionicons name="git-network-outline" size={24} color={COLORS.secondaryLight} />
          </View>

          <View style={styles.bannerTextContent}>
            <Text style={styles.bannerTitle}>Predictive NCD Risk Model</Text>
            <Text style={styles.bannerSub}>
              Based on long-term eating habits, ingredient analysis, and user demographic data.
            </Text>
          </View>
        </View>

        {/* Disclaimer Note */}
        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle-outline" size={16} color={COLORS.textMuted} />
          <Text style={styles.disclaimerText}>
            Risk levels are estimated machine learning models and not a clinical diagnosis.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Non-Communicable Disease (NCD) Risk Breakdown</Text>
        </View>

        {/* Render Risk Cards */}
        {diseaseRisks.map((risk, idx) => (
          <DiseaseRiskCard key={idx} risk={risk} />
        ))}

        {/* Navigation Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.checkerBtn} onPress={onNavigateToChecker} activeOpacity={0.85}>
            <Ionicons name="shield-checkmark" size={18} color={COLORS.primaryLight} />
            <Text style={styles.checkerBtnText}>Check Disease Compatibility</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.agentBtn} onPress={onAskAgent} activeOpacity={0.85}>
            <Ionicons name="sparkles" size={18} color={COLORS.white} />
            <Text style={styles.agentBtnText}>Ask AI Agent to Fix Diet</Text>
          </TouchableOpacity>
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
    paddingTop: 10,
  },
  medicalDisclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    borderRadius: BORDER_RADIUS.lg,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  medicalDisclaimerText: {
    fontSize: 11,
    color: COLORS.textPrimary,
    fontWeight: '600',
    flex: 1,
    lineHeight: 15,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
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
  },
  bannerSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  checkerBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryLight,
  },
  agentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 14,
  },
  agentBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
});
