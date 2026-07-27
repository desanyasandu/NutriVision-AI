import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { MOCK_EXISTING_DISEASE_CHECKS } from '../data/mockData';
import { COLORS } from '../theme/colors';

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
        <View style={styles.foodBanner}>
          <Ionicons name="fast-food-outline" size={24} color={COLORS.primary} />
          <View style={styles.foodBannerText}>
            <Text style={styles.foodLabel}>Checking Food Item:</Text>
            <Text style={styles.foodTitle}>{foodName}</Text>
          </View>
        </View>

        {/* Condition Filter Selector (Slide 7 Screen 8) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Disease or Medical Condition:</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {diseaseOptions.map((item, idx) => {
            const isSelected = selectedDiseaseFilter === item;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.diseaseChip, isSelected && styles.diseaseChipSelected]}
                onPress={() => setSelectedDiseaseFilter(item)}
              >
                <Text style={[styles.diseaseChipText, isSelected && styles.diseaseChipTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
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
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: currentCheck.isCompatible ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)' },
              ]}
            >
              <Ionicons
                name={currentCheck.isCompatible ? 'checkmark-circle' : 'warning'}
                size={28}
                color={currentCheck.isCompatible ? COLORS.primary : COLORS.danger}
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
                    <Ionicons name="alert-circle-outline" size={12} color={COLORS.danger} />
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
        <TouchableOpacity style={styles.agentConsultBtn} onPress={onAskAgent} activeOpacity={0.85}>
          <Ionicons name="sparkles" size={20} color={COLORS.white} />
          <Text style={styles.agentConsultText}>Ask AI Agent for Safe Substitutes</Text>
        </TouchableOpacity>
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
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  foodBannerText: {
    flex: 1,
  },
  foodLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  chipScroll: {
    paddingLeft: 20,
    marginBottom: 12,
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
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: COLORS.primary,
  },
  diseaseChipText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  diseaseChipTextSelected: {
    color: COLORS.primaryLight,
    fontWeight: '800',
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  resultCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
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
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  conditionSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  warningBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    marginBottom: 14,
  },
  warningBoxTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.danger,
    marginBottom: 6,
  },
  warningItemText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  triggersSection: {
    marginBottom: 12,
  },
  triggersLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 8,
    fontWeight: '600',
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
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  triggerPillText: {
    fontSize: 11,
    color: COLORS.danger,
    fontWeight: '600',
  },
  disclaimerNote: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 10,
  },
  disclaimerText: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    lineHeight: 14,
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
    borderRadius: 16,
  },
  agentConsultText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
