import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DiseaseRisk } from '../data/mockData';
import { COLORS } from '../theme/colors';

interface DiseaseRiskCardProps {
  risk: DiseaseRisk;
}

export const DiseaseRiskCard: React.FC<DiseaseRiskCardProps> = ({ risk }) => {
  let badgeBg = 'rgba(16, 185, 129, 0.15)';
  let badgeColor = COLORS.primary;

  if (risk.level === 'High' || risk.level === 'Severe') {
    badgeBg = 'rgba(239, 68, 68, 0.15)';
    badgeColor = COLORS.danger;
  } else if (risk.level === 'Moderate') {
    badgeBg = 'rgba(245, 158, 11, 0.15)';
    badgeColor = COLORS.warning;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons
            name={risk.level === 'High' ? 'warning' : 'pulse'}
            size={18}
            color={badgeColor}
          />
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
        <Ionicons name="bulb-outline" size={14} color={COLORS.primaryLight} />
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
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
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
    gap: 8,
  },
  diseaseTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
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
  },
  percentValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  barBg: {
    height: 8,
    backgroundColor: COLORS.trackBg,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  foodsContainer: {
    marginBottom: 12,
  },
  sectionSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 6,
    fontWeight: '600',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipText: {
    fontSize: 11,
    color: COLORS.textPrimary,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(33, 118, 255, 0.08)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(33, 118, 255, 0.2)',
  },
  tipText: {
    fontSize: 11,
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 16,
  },
  tipBold: {
    fontWeight: '700',
  },
});
