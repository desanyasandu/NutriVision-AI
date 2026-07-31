import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { DESIGN_TOKENS } from '../theme/tokens';

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
  const { diseaseRisks, selectedDiseaseFilter, setSelectedDiseaseFilter } = useApp();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const selectedRisk =
    diseaseRisks.find((r) => r.disease === selectedDiseaseFilter) || diseaseRisks[0];

  // SVG Gauge Arc calculations
  const renderGaugeArc = (percent: number) => {
    const size = 160;
    const strokeWidth = 14;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius; // Semi-circle
    const dashoffset = circumference - (circumference * percent) / 100;

    return (
      <Svg width={size} height={size / 2 + 20} style={{ alignSelf: 'center' }}>
        <Defs>
          <LinearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#10B981" />
            <Stop offset="50%" stopColor="#F59E0B" />
            <Stop offset="100%" stopColor="#EF4444" />
          </LinearGradient>
        </Defs>
        <Path
          d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
          fill="none"
          stroke="rgba(241, 245, 249, 0.9)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
        />
      </Svg>
    );
  };

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated App Bar */}
        <AnimatedAppBar
          title="Disease Risk Analysis"
          subtitle="Clinical Predictive Modeling Engine"
          showBack
          onBack={onBack}
          rightActionIcon="sparkles"
          onRightAction={onAskAgent}
        />

        {/* Condition Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {diseaseRisks.map((risk) => {
            const isActive = selectedDiseaseFilter === risk.disease;
            return (
              <AnimatedPressable
                key={risk.disease}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setSelectedDiseaseFilter(risk.disease)}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {risk.disease}
                </Text>
              </AnimatedPressable>
            );
          })}
        </ScrollView>

        {/* Risk Gauge Hero Card */}
        <GlassCard variant="glass" style={styles.heroCard}>
          <Text style={styles.heroRiskTitle}>{selectedRisk.disease}</Text>
          <Text style={styles.heroRiskSub}>Calculated vulnerability score based on active meal history</Text>

          <View style={styles.gaugeWrapper}>
            {renderGaugeArc(selectedRisk.riskPercentage)}
            <View style={styles.gaugeTextContainer}>
              <Text style={styles.gaugeVal}>{selectedRisk.riskPercentage}%</Text>
              <Text
                style={[
                  styles.gaugeLevelBadge,
                  {
                    color:
                      selectedRisk.level === 'High' || selectedRisk.level === 'Severe'
                        ? COLORS.danger
                        : selectedRisk.level === 'Moderate'
                        ? COLORS.warning
                        : COLORS.secondary,
                  },
                ]}
              >
                {selectedRisk.level} Risk
              </Text>
            </View>
          </View>

          {/* AI Confidence Meter */}
          <View style={styles.confidenceMeterRow}>
            <Ionicons name="hardware-chip-outline" size={16} color={COLORS.primary} />
            <Text style={styles.confidenceText}>AI Model Confidence: 96.8% (Clinical Grade)</Text>
          </View>
        </GlassCard>

        {/* Severity Card & Clinical Description */}
        <GlassCard
          icon="alert-circle-outline"
          iconColor={selectedRisk.level === 'High' ? COLORS.danger : COLORS.warning}
          iconBg={selectedRisk.level === 'High' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'}
          title="Clinical Risk Summary"
          subtitle={`Severity Assessment: ${selectedRisk.level}`}
        >
          <Text style={styles.descText}>{selectedRisk.description}</Text>

          <View style={styles.contributingBox}>
            <Text style={styles.contributingTitle}>Key Contributing Foods Logged:</Text>
            <View style={styles.contributingGrid}>
              {selectedRisk.contributingFoods.map((food, i) => (
                <View key={i} style={styles.foodTag}>
                  <Text style={styles.foodTagText}>{food}</Text>
                </View>
              ))}
            </View>
          </View>
        </GlassCard>

        {/* Doctor Advice & Mitigation Steps */}
        <GlassCard
          variant="gradient"
          icon="medkit"
          iconColor={COLORS.secondary}
          title="Doctor Advice & Actionable Tip"
          subtitle="Dietary adjustment recommendations"
        >
          <Text style={styles.mitigationText}>💡 {selectedRisk.mitigationTip}</Text>
        </GlassCard>

        {/* Expandable AI Explanation */}
        <Text style={styles.sectionTitle}>Detailed Risk Breakdown</Text>
        {diseaseRisks.map((risk, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <GlassCard key={risk.disease} style={styles.breakdownCard}>
              <AnimatedPressable
                style={styles.breakdownHeader}
                onPress={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <View style={styles.breakdownTitleCol}>
                  <Text style={styles.breakdownName}>{risk.disease}</Text>
                  <Text style={styles.breakdownLevel}>{risk.level} Level • {risk.riskPercentage}% Risk</Text>
                </View>
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.primary} />
              </AnimatedPressable>

              {isExpanded && (
                <View style={styles.expandedContent}>
                  <Text style={styles.expandedDesc}>{risk.description}</Text>
                  <Text style={styles.expandedTip}>Tip: {risk.mitigationTip}</Text>
                </View>
              )}
            </GlassCard>
          );
        })}

        {/* Navigation Action Buttons */}
        <View style={styles.actionGroup}>
          <PrimaryButton
            title="Check Existing Conditions"
            icon="shield-checkmark"
            onPress={onNavigateToChecker}
          />
          <SecondaryButton
            title="Ask AI Assistant for Meal Plan"
            icon="sparkles"
            onPress={onAskAgent}
          />
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
  filterScroll: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.white,
    fontWeight: '800',
  },
  heroCard: {
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 20,
  },
  heroRiskTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  heroRiskSub: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 12,
  },
  gaugeWrapper: {
    alignItems: 'center',
    position: 'relative',
    marginVertical: 6,
  },
  gaugeTextContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  gaugeVal: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
  },
  gaugeLevelBadge: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginTop: -2,
  },
  confidenceMeterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    marginTop: 16,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  descText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  contributingBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(241, 245, 249, 0.9)',
  },
  contributingTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  contributingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  foodTag: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.15)',
  },
  foodTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.dangerDark,
  },
  mitigationText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondaryDark,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: DESIGN_TOKENS.fontSize.sectionTitle, // 22
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginTop: 18,
    marginBottom: 10,
  },
  breakdownCard: {
    marginVertical: 4,
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakdownTitleCol: {
    flex: 1,
  },
  breakdownName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  breakdownLevel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(241, 245, 249, 0.9)',
  },
  expandedDesc: {
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 19,
  },
  expandedTip: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondary,
    marginTop: 6,
  },
  actionGroup: {
    marginTop: 16,
    gap: 4,
  },
});
