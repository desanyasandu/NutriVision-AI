export interface FoodItem {
  id: string;
  name: string;
  category: string;
  confidence: number;
  healthScore: number; // 0 - 100
  calories: number;
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
  sugarGrams: number;
  sodiumMg: number;
  ingredients: string[];
  diseaseWarnings: string[];
  imageUrl: string;
  scannedAt: string;
}

export interface DiseaseRisk {
  disease: string;
  riskPercentage: number; // 0 - 100
  level: 'Low' | 'Moderate' | 'High' | 'Severe';
  contributingFoods: string[];
  description: string;
  mitigationTip: string;
}

export interface DiseaseCompatibilityCheck {
  condition: string;
  isCompatible: boolean;
  warnings: string[];
  triggerIngredients: string[];
}

export interface UserHealthProfile {
  name: string;
  age: number;
  weightKg: number;
  heightCm: number;
  dailyCalorieTarget: number;
  todayCaloriesConsumed: number;
  healthScore: number;
  existingConditions: string[];
  dietaryGoals: string[];
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  recommendations?: string[];
  suggestedAction?: string;
  riskAlert?: {
    disease: string;
    level: string;
  };
}

export const INITIAL_USER_PROFILE: UserHealthProfile = {
  name: 'Desan',
  age: 24,
  weightKg: 72,
  heightCm: 175,
  dailyCalorieTarget: 2500,
  todayCaloriesConsumed: 1250,
  healthScore: 82,
  existingConditions: ['Migraine', 'Pre-diabetes', 'Hypertension'],
  dietaryGoals: ['Lower Sugar Intake', 'Control Blood Pressure', 'Maintain Weight'],
};

export const MOCK_RECENT_FOODS: FoodItem[] = [
  {
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
    diseaseWarnings: ['High Saturated Fat', 'High Sodium (Hypertension risk)', 'Refined Carbs'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    scannedAt: 'Today, 12:30 PM',
  },
  {
    id: 'food_2',
    name: 'Grilled Chicken Salad',
    category: 'Healthy Meal',
    confidence: 99,
    healthScore: 92,
    calories: 340,
    proteinGrams: 36,
    fatGrams: 10,
    carbsGrams: 18,
    sugarGrams: 4,
    sodiumMg: 420,
    ingredients: ['Grilled Chicken Breast', 'Spinach', 'Cherry Tomatoes', 'Olive Oil', 'Cucumber', 'Avocado'],
    diseaseWarnings: [],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    scannedAt: 'Yesterday, 7:15 PM',
  },
  {
    id: 'food_3',
    name: 'Chocolate Lava Cake',
    category: 'Dessert',
    confidence: 95,
    healthScore: 30,
    calories: 520,
    proteinGrams: 6,
    fatGrams: 26,
    carbsGrams: 65,
    sugarGrams: 48,
    sodiumMg: 310,
    ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Flour', 'Eggs', 'Vanilla'],
    diseaseWarnings: ['Excessive Sugar (Diabetes risk)', 'Trigger for Migraine'],
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    scannedAt: 'Yesterday, 3:10 PM',
  },
];

export const MOCK_DISEASE_RISKS: DiseaseRisk[] = [
  {
    disease: 'Obesity',
    riskPercentage: 78,
    level: 'High',
    contributingFoods: ['Cheese Burger', 'Pizza', 'French Fries', 'Sugary Drinks'],
    description: 'Caloric surplus and processed fats elevate body mass index over time.',
    mitigationTip: 'Replace 2 fast-food meals weekly with high-fiber lean protein bowls.',
  },
  {
    disease: 'Diabetes (Type 2)',
    riskPercentage: 62,
    level: 'Moderate',
    contributingFoods: ['Chocolate Lava Cake', 'Soft Drinks', 'White Bread'],
    description: 'Frequent spikes in blood glucose due to high glycemic foods.',
    mitigationTip: 'Limit refined sugars to less than 25g daily and increase soluble fiber.',
  },
  {
    disease: 'Hypertension',
    riskPercentage: 45,
    level: 'Moderate',
    contributingFoods: ['Salted Snacks', 'Processed Meats', 'Fast Food Sauces'],
    description: 'Elevated sodium intake stresses arterial walls.',
    mitigationTip: 'Keep daily sodium intake below 2,000 mg and add potassium-rich foods.',
  },
  {
    disease: 'Heart Disease',
    riskPercentage: 20,
    level: 'Low',
    contributingFoods: ['Trans Fats', 'Deep Fried Foods'],
    description: 'Cardiovascular health remains relatively stable with your active routine.',
    mitigationTip: 'Maintain regular cardio exercises and omega-3 rich fish intake.',
  },
  {
    disease: 'Fatty Liver',
    riskPercentage: 35,
    level: 'Moderate',
    contributingFoods: ['High Fructose Corn Syrup', 'Process Sweets'],
    description: 'Excess fructose storage in liver tissue.',
    mitigationTip: 'Drink plenty of water and reduce fructose-sweetened beverages.',
  },
];

export const MOCK_EXISTING_DISEASE_CHECKS: DiseaseCompatibilityCheck[] = [
  {
    condition: 'Migraine',
    isCompatible: false,
    warnings: ['Contains Chocolate & Aged Cheese ingredients that may trigger severe migraines.'],
    triggerIngredients: ['Chocolate', 'Aged Cheese', 'Nitrates'],
  },
  {
    condition: 'Pre-diabetes',
    isCompatible: false,
    warnings: ['High Glycemic Index item with 48g refined sugar. Spikes blood glucose.'],
    triggerIngredients: ['Added Sugar', 'Refined Wheat Flour'],
  },
  {
    condition: 'Hypertension',
    isCompatible: true,
    warnings: ['Moderate sodium content. Stay within your daily 2000mg limit.'],
    triggerIngredients: [],
  },
];

export const MOCK_INITIAL_CHAT: AgentChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'agent',
    text: "Hello Desan! 👋 I'm NutriVision AI, your proactive health & nutrition agent. Based on your profile (Pre-diabetes risk & Migraine history), I've analyzed today's food intake.",
    timestamp: '10:00 AM',
  },
  {
    id: 'msg_2',
    sender: 'user',
    text: 'What should I eat for dinner to keep my blood sugar low and avoid migraine triggers?',
    timestamp: '10:02 AM',
  },
  {
    id: 'msg_3',
    sender: 'agent',
    text: "I recommend a Grilled Salmon Bowl with Quinoa, Steamed Broccoli, and Olive Oil dressing. 🥗\n\n✓ Zero refined sugars (Protects against Pre-diabetes spikes)\n✓ Rich in Magnesium & Omega-3 (Prevents Migraine triggers)\n✓ High protein & low glycemic load.",
    timestamp: '10:02 AM',
    recommendations: ['Grilled Salmon with Quinoa', 'Avocado Chicken Salad', 'Steamed Veggie Stir-Fry'],
    suggestedAction: 'View Full Meal Plan',
  },
];

export const DIGITAL_TWIN_PREDICTION = {
  currentWeight: 72,
  predictedWeight6Months: 76,
  riskIncreaseDisease: 'Diabetes',
  riskIncreasePercentage: 12,
  recommendationsToReduce: ['Soft Drinks', 'Processed Cheese', 'White Flour Bakery Items'],
  recommendationsToAdd: ['Leafy Greens', 'Walnuts & Seeds', 'Herbal Teas', 'Water (2.5L/day)'],
};
