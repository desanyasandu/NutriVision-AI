import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { MOCK_EXISTING_DISEASE_CHECKS } from '../data/mockData';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';

interface ExistingDiseaseCheckerScreenProps {
  onBack: () => void;
  onAskAgent: () => void;
}

export const ExistingDiseaseCheckerScreen: React.FC<ExistingDiseaseCheckerScreenProps> = ({
  onBack,
  onAskAgent,
}) => {
  const { currentScan, selectedDiseaseFilter, setSelectedDiseaseFilter } = useApp();
  const foodName = currentScan?.name || 'Cheese Burger';

  const diseaseOptions = ['Migraine', 'Pre-diabetes', 'Hypertension', 'Fatty Liver', 'Obesity'];
  const [customInput, setCustomInput] = useState('');

  const currentCheck =
    MOCK_EXISTING_DISEASE_CHECKS.find((c) => c.condition.toLowerCase() === selectedDiseaseFilter.toLowerCase()) || {
      condition: selectedDiseaseFilter,
      isCompatible: false,
      warnings: [`High calorie and refined sodium content may aggravate ${selectedDiseaseFilter}.`],
      triggerIngredients: ['Sodium', 'Saturated Fats'],
    };

  return (
    <View style={styles.container}>
      <Header title="Disease Compatibility" subtitle="Condition Safeguard" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Selected Food Item Preview */}
        <View style={[styles.foodBanner, SHADOWS.sm]}>
          <View style={styles.foodIconBox}>
            <Ionicons name="fast-food" size={22} color={COLORS.primary} />
          </View>
          <View style={styles.foodBannerText}>
            <Text style={styles.foodLabel}>Checking Food Item:</Text>
            <Text style={styles.foodTitle}>{foodName}</Text>
          </View>
        </View>

        {/* Condition Filter Selector */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Disease or Medical Condition:</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {diseaseOptions.map((item, idx) => {
            const isSelected = selectedDiseaseFilter === item;
            return (
              <AnimatedPressable
                key={idx}
                style={[styles.diseaseChip, isSelected && styles.diseaseChipSelected]}
                onPress={() => setSelectedDiseaseFilter(item)}
              >
                <Text style={[styles.diseaseChipText, isSelected && styles.diseaseChipTextSelected]}>
                  {item}
                </Text>
              </AnimatedPressable>
            );
          })}
        </ScrollView>

        {/* Custom condition search box */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Type custom condition (e.g. Acid Reflux)..."
            placeholderTextColor={COLORS.textMuted}
            value={customInput}
            onChangeText={(text) => {
              setCustomInput(text);
              if (text.trim().length > 2) {
                setSelectedDiseaseFilter(text);
              }
            }}
          />
        </View>

        {/* Compatibility Result Card */}
        <View style={[styles.resultCard, SHADOWS.sm]}>
          <View style={styles.resultHeader}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: currentCheck.isCompatible ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)' },
              ]}
            >
              <Ionicons
                name={currentCheck.isCompatible ? 'checkmark-circle' : 'warning'}
                size={28}
                color={currentCheck.isCompatible ? COLORS.successDark : COLORS.danger}
              />
            </View>

            <View style={styles.resultTitleGroup}>
              <Text style={styles.resultStatusText}>
                {currentCheck.isCompatible ? 'Compatible Food' : 'Warning: High Risk Match'}
              </Text>
              <Text style={styles.conditionSub}>Target Condition: {selectedDiseaseFilter}</Text>
            </View>
          </View>

          {/* Trigger Warnings List */}
          <View style={styles.warningBox}>
            <Text style={styles.warningBoxTitle}>Compatibility Insights:</Text>
            {currentCheck.warnings.map((warn, i) => (
              <Text key={i} style={styles.warningItemText}>
                • {warn}
              </Text>
            ))}
          </View>

          {/* Trigger Ingredients Pills */}
          {currentCheck.triggerIngredients.length > 0 && (
            <View style={styles.triggersSection}>
              <Text style={styles.triggersLabel}>Potential Trigger Ingredients Identified:</Text>
              <View style={styles.triggerPillsRow}>
                {currentCheck.triggerIngredients.map((ing, i) => (
                  <View key={i} style={styles.triggerPill}>
                    <Ionicons name="alert-circle" size={12} color={COLORS.danger} />
                    <Text style={styles.triggerPillText}>{ing}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.disclaimerNote}>
            <Text style={styles.disclaimerText}>
              This is an AI health check simulation based on medical dietary research. Always follow your physician's prescription.
            </Text>
          </View>
        </View>

        {/* Ask AI Coach Button */}
        <AnimatedPressable style={[styles.agentConsultBtn, SHADOWS.md]} onPress={onAskAgent}>
          <Ionicons name="sparkles" size={20} color={COLORS.white} />
          <Text style={styles.agentConsultText}>Ask AI Agent for Safe Substitutes</Text>
        </AnimatedPressable>
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
  foodBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  foodIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(33, 118, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodBannerText: {
    flex: 1,
  },
  foodLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '700',
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  chipScroll: {
    paddingLeft: 20,
    marginBottom: 14,
  },
  diseaseChip: {
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  diseaseChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  diseaseChipText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  diseaseChipTextSelected: {
    color: COLORS.white,
    fontWeight: '900',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  resultCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitleGroup: {
    flex: 1,
  },
  resultStatusText: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  conditionSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  warningBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    marginBottom: 14,
  },
  warningBoxTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.danger,
    marginBottom: 6,
  },
  warningItemText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 20,
    fontWeight: '500',
  },
  triggersSection: {
    marginBottom: 14,
  },
  triggersLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 8,
    fontWeight: '800',
  },
  triggerPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  triggerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  triggerPillText: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: '800',
  },
  disclaimerNote: {
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingTop: 10,
  },
  disclaimerText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  agentConsultBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 18,
  },
  agentConsultText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
});
