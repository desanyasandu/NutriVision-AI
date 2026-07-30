import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { MedicalDisclaimerBox } from '../components/MedicalDisclaimerBox';
import { StepProgressBar } from '../components/StepProgressBar';
import { COLORS } from '../theme/colors';

interface FoodDetectionResultScreenProps {
  onBack: () => void;
  onViewNutrition: () => void;
  onCheckDisease: () => void;
  onAskAgent: () => void;
}

export const FoodDetectionResultScreen: React.FC<FoodDetectionResultScreenProps> = ({
  onBack,
  onViewNutrition,
  onCheckDisease,
  onAskAgent,
}) => {
  const { currentScan } = useApp();
  const food = currentScan || {
    id: 'food_1',
    name: 'Cheese Burger',
    category: 'Fast Food',
    confidence: 97,
    confidenceInterval: '±3.8%',
    healthScore: 42,
    calories: 680,
    proteinGrams: 28,
    fatGrams: 35,
    carbsGrams: 54,
    sugarGrams: 12,
    sodiumMg: 1150,
    ingredients: ['Bun', 'Cheese', 'Beef Patty', 'Onion', 'Sauce', 'Pickles'],
    diseaseWarnings: ['High Saturated Fat', 'High Sodium (Hypertension factor)'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    scannedAt: 'Just Now',
  };

  const [ingredients, setIngredients] = useState<string[]>(food.ingredients);
  const [newIngredient, setNewIngredient] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Header title="Food Result" subtitle="AI Vision Analysis" showBack onBack={onBack} />
      <StepProgressBar currentStep={3} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Food Image & Detection Card */}
        <View style={styles.imageCard}>
          <Image source={{ uri: food.imageUrl }} style={styles.foodImage} />

          <View style={styles.imageOverlay}>
            <View style={styles.badgeRow}>
              <View style={styles.confidenceBadge}>
                <Ionicons name="checkmark-circle" size={14} color={COLORS.primary} />
                <Text style={styles.confidenceText}>
                  AI Confidence: ~{food.confidence}% ({food.confidenceInterval || '±3.8%'})
                </Text>
              </View>

              <View style={styles.scoreBadge}>
                <Text style={styles.scoreBadgeText}>Health Score: {food.healthScore}/100</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Title & Category */}
        <View style={styles.infoSection}>
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.categoryText}>
            {food.category} • Detected via Multi-Modal Computer Vision
          </Text>
        </View>

        {/* Medical Disclaimer Banner */}
        <MedicalDisclaimerBox compact />

        {/* Ingredients Section */}
        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="list" size={18} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Identified Ingredients</Text>
            </View>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setIsEditing(!isEditing)}
              accessibilityRole="button"
              accessibilityLabel="Edit Detected Ingredients"
            >
              <Ionicons
                name={isEditing ? 'checkmark' : 'create-outline'}
                size={16}
                color={COLORS.primary}
              />
              <Text style={styles.editBtnText}>{isEditing ? 'Done' : 'Edit List'}</Text>
            </TouchableOpacity>
          </View>

          {ingredients.length === 0 ? (
            <Text style={styles.emptyIngredientsText}>No ingredients listed. Tap "Edit List" to add ingredients.</Text>
          ) : (
            <View style={styles.ingredientsChipsRow}>
              {ingredients.map((item, idx) => (
                <View key={idx} style={styles.ingredientChip}>
                  <Text style={styles.ingredientText}>{item}</Text>
                  {isEditing && (
                    <TouchableOpacity
                      onPress={() => removeIngredient(idx)}
                      style={styles.removeBtn}
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ingredient ${item}`}
                    >
                      <Ionicons name="close-circle" size={18} color={COLORS.danger} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}

          {isEditing && (
            <View style={styles.addInputRow}>
              <TextInput
                style={styles.input}
                placeholder="Add ingredient..."
                placeholderTextColor={COLORS.textMuted}
                value={newIngredient}
                onChangeText={setNewIngredient}
                onSubmitEditing={addIngredient}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.addBtn}
                onPress={addIngredient}
                accessibilityRole="button"
                accessibilityLabel="Add Ingredient Button"
              >
                <Ionicons name="add" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Quick Nutrition Highlights */}
        <View style={styles.macroGrid}>
          <View style={styles.macroRow}>
            <View style={styles.macroCard}>
              <Ionicons name="flame" size={18} color={COLORS.secondary} />
              <Text style={styles.macroVal}>{food.calories} kcal</Text>
              <Text style={styles.macroLabel}>Calories</Text>
            </View>

            <View style={styles.macroCard}>
              <Ionicons name="fitness" size={18} color={COLORS.primary} />
              <Text style={styles.macroVal}>{food.proteinGrams}g</Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
          </View>

          <View style={styles.macroRow}>
            <View style={styles.macroCard}>
              <Ionicons name="water" size={18} color={COLORS.danger} />
              <Text style={styles.macroVal}>{food.fatGrams}g</Text>
              <Text style={styles.macroLabel}>Total Fat</Text>
            </View>

            <View style={styles.macroCard}>
              <Ionicons name="cube" size={18} color={COLORS.primaryLight} />
              <Text style={styles.macroVal}>{food.carbsGrams}g</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons Stack */}
        <View style={styles.actionButtonsStack}>
          <TouchableOpacity
            style={styles.primaryActionBtn}
            onPress={onViewNutrition}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="View Full Nutrition Analysis"
          >
            <Ionicons name="nutrition-outline" size={20} color={COLORS.white} />
            <Text style={styles.primaryActionText}>View Detailed Nutrition Facts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryActionBtn}
            onPress={onCheckDisease}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Check Disease Compatibility"
          >
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.primary} />
            <Text style={styles.secondaryActionText}>Check Existing Condition Safeguards</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.agentActionBtn}
            onPress={onAskAgent}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Ask AI Companion for Healthier Meal Alternatives"
          >
            <Ionicons name="sparkles" size={20} color={COLORS.white} />
            <Text style={styles.agentActionText}>Ask AI Companion for Meal Substitutes</Text>
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
  },
  imageCard: {
    height: 200,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-start',
    padding: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  confidenceText: {
    fontSize: 11,
    color: COLORS.jetBlack,
    fontWeight: '700',
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: COLORS.jetBlack,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 14,
  },
  foodName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.jetBlack,
  },
  categoryText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionBox: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.jetBlack,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 44,
    paddingHorizontal: 8,
  },
  editBtnText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  ingredientsChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  ingredientText: {
    fontSize: 13,
    color: COLORS.jetBlack,
    fontWeight: '600',
  },
  removeBtn: {
    padding: 4,
    minHeight: 44,
    justifyContent: 'center',
  },
  addInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: COLORS.jetBlack,
    fontSize: 13,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    minHeight: 44,
  },
  addBtn: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  macroGrid: {
    paddingHorizontal: 20,
    marginVertical: 14,
    gap: 10,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 10,
  },
  macroCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  macroVal: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.jetBlack,
    marginTop: 4,
  },
  macroLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  actionButtonsStack: {
    paddingHorizontal: 20,
    gap: 10,
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    minHeight: 48,
  },
  primaryActionText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
  secondaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
    minHeight: 48,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  agentActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 14,
    minHeight: 48,
  },
  agentActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
  },
  emptyIngredientsText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    paddingVertical: 8,
  },
});
