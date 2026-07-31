import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DiseaseRisk } from '../data/mockData';
import { COLORS, SHADOWS } from '../theme/colors';

interface DiseaseRiskCardProps {
  risk: DiseaseRisk;
}

export const DiseaseRiskCard: React.FC<DiseaseRiskCardProps> = ({ risk }) => {
  let badgeBg = 'rgba(16, 185, 129, 0.12)';
  let badgeColor = COLORS.successDark;

  if (risk.level === 'High' || risk.level === 'Severe') {
    badgeBg = 'rgba(239, 68, 68, 0.12)';
    badgeColor = COLORS.danger;
  } else if (risk.level === 'Moderate') {
    badgeBg = 'rgba(245, 158, 11, 0.12)';
    badgeColor = COLORS.warningDark;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.iconBox, { backgroundColor: badgeBg }]}>
            <Ionicons
              name={risk.level === 'High' || risk.level === 'Severe' ? 'warning' : 'pulse'}
              size={18}
              color={badgeColor}
            />
          </View>
          <Text style={styles.diseaseTitle}>{risk.disease}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.badgeText, { color: badgeColor }]}>{risk.level} Risk</Text>
        </View>
      </View>

      <View style={styles.percentRow}>
        <Text style={styles.riskLabel}>Predicted Risk Factor</Text>
        <Text style={[styles.percentValue, { color: badgeColor }]}>{risk.riskPercentage}%</Text>
      </View>

      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            { width: `${risk.riskPercentage}%`, backgroundColor: badgeColor },
          ]}
        />
      </View>

      <Text style={styles.description}>{risk.description}</Text>

      {risk.contributingFoods.length > 0 && (
        <View style={styles.foodsContainer}>
          <Text style={styles.sectionSub}>Trigger Foods:</Text>
          <View style={styles.chipsRow}>
            {risk.contributingFoods.map((food, idx) => (
              <View key={idx} style={styles.chip}>
                <Text style={styles.chipText}>{food}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.tipBox}>
        <Ionicons name="sparkles" size={15} color={COLORS.primary} />
        <Text style={styles.tipText}>
          <Text style={styles.tipBold}>AI Recommendation: </Text>
          {risk.mitigationTip}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diseaseTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  percentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  riskLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  percentValue: {
    fontSize: 16,
    fontWeight: '900',
  },
  barBg: {
    height: 8,
    backgroundColor: COLORS.trackBg,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  foodsContainer: {
    marginBottom: 12,
  },
  sectionSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 6,
    fontWeight: '700',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  chipText: {
    fontSize: 11,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(33, 118, 255, 0.2)',
  },
  tipText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 17,
  },
  tipBold: {
    fontWeight: '800',
    color: COLORS.primary,
  },
});
