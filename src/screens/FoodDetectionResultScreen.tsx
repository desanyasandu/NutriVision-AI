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
    healthScore: 42,
    calories: 680,
    proteinGrams: 28,
    fatGrams: 35,
    carbsGrams: 54,
    sugarGrams: 12,
    sodiumMg: 1150,
    ingredients: ['Bun', 'Cheese', 'Beef Patty', 'Onion', 'Sauce', 'Pickles'],
    diseaseWarnings: ['High Saturated Fat', 'High Sodium (Hypertension risk)'],
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
      <Header title="Food Result" subtitle="AI Detection Summary" showBack onBack={onBack} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Food Image & Detection Card */}
        <View style={styles.imageCard}>
          <Image source={{ uri: food.imageUrl }} style={styles.foodImage} />

          <View style={styles.imageOverlay}>
            <View style={styles.badgeRow}>
              <View style={styles.confidenceBadge}>
                <Ionicons name="checkmark-circle" size={14} color={COLORS.primaryLight} />
                <Text style={styles.confidenceText}>Confidence: {food.confidence}%</Text>
              </View>

              <View
                style={[
                  styles.scoreBadge,
                  {
                    backgroundColor:
                      food.healthScore >= 70 ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                  },
                ]}
              >
                <Text style={styles.scoreBadgeText}>Score: {food.healthScore}/100</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Title & Category */}
        <View style={styles.infoSection}>
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.categoryText}>{food.category} • Detected via AI Computer Vision</Text>
        </View>

        {/* Ingredients Section (Slide 7 Screen 5) */}
        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="list" size={18} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Detected Ingredients</Text>
            </View>

            <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(!isEditing)}>
              <Ionicons name={isEditing ? 'checkmark' : 'create-outline'} size={16} color={COLORS.primaryLight} />
              <Text style={styles.editBtnText}>{isEditing ? 'Done' : 'Edit Ingredients'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ingredientsChipsRow}>
            {ingredients.map((item, idx) => (
              <View key={idx} style={styles.ingredientChip}>
                <Text style={styles.ingredientText}>{item}</Text>
                {isEditing && (
                  <TouchableOpacity onPress={() => removeIngredient(idx)} style={styles.removeBtn}>
                    <Ionicons name="close-circle" size={16} color={COLORS.danger} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          {isEditing && (
            <View style={styles.addInputRow}>
              <TextInput
                style={styles.input}
                placeholder="Add ingredient..."
                placeholderTextColor={COLORS.textMuted}
                value={newIngredient}
                onChangeText={setNewIngredient}
              />
              <TouchableOpacity style={styles.addBtn} onPress={addIngredient}>
                <Ionicons name="add" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Quick Nutrition Highlights */}
        <View style={styles.macroGrid}>
          <View style={styles.macroCard}>
            <Ionicons name="flame" size={18} color={COLORS.warning} />
            <Text style={styles.macroVal}>{food.calories}</Text>
            <Text style={styles.macroLabel}>Calories (kcal)</Text>
          </View>

          <View style={styles.macroCard}>
            <Ionicons name="fitness" size={18} color={COLORS.primary} />
            <Text style={styles.macroVal}>{food.proteinGrams}g</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>

          <View style={styles.macroCard}>
            <Ionicons name="water" size={18} color={COLORS.danger} />
            <Text style={styles.macroVal}>{food.fatGrams}g</Text>
            <Text style={styles.macroLabel}>Fat</Text>
          </View>

          <View style={styles.macroCard}>
            <Ionicons name="cube" size={18} color={COLORS.accent} />
            <Text style={styles.macroVal}>{food.carbsGrams}g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
        </View>

        {/* Action Buttons Stack */}
        <View style={styles.actionButtonsStack}>
          <TouchableOpacity style={styles.primaryActionBtn} onPress={onViewNutrition} activeOpacity={0.85}>
            <Ionicons name="nutrition-outline" size={20} color={COLORS.white} />
            <Text style={styles.primaryActionText}>View Full Nutrition Analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryActionBtn} onPress={onCheckDisease} activeOpacity={0.85}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.primaryLight} />
            <Text style={styles.secondaryActionText}>Check Existing Disease Compatibility</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.agentActionBtn} onPress={onAskAgent} activeOpacity={0.85}>
            <Ionicons name="sparkles" size={20} color={COLORS.secondaryLight} />
            <Text style={styles.agentActionText}>Ask AI Agent for Healthier Alternatives</Text>
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
    height: 220,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
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
    backgroundColor: 'rgba(11, 15, 25, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  confidenceText: {
    fontSize: 11,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.white,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  foodName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  categoryText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionBox: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
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
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editBtnText: {
    fontSize: 12,
    color: COLORS.primaryLight,
    fontWeight: '600',
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
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ingredientText: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  removeBtn: {
    marginLeft: 2,
  },
  addInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: COLORS.textPrimary,
    fontSize: 13,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  addBtn: {
    width: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  macroGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
    gap: 8,
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
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  macroLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
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
  },
  primaryActionText: {
    fontSize: 15,
    fontWeight: '700',
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
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryLight,
  },
  agentActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  agentActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondaryLight,
  },
});
