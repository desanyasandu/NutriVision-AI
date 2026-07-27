export interface FoodItem {
  id: string;
  name: string;
  category: string;
  confidence: number; // e.g. 97
  confidenceInterval: string; // e.g. "±4.2%"
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

export const MEDICAL_DISCLAIMER =
  "⚕️ Medical Disclaimer: NutriVision AI offers dietary risk estimates based on dietary guidelines for educational purposes only. It is not a clinical diagnosis or medical treatment advice. Please consult a registered dietitian or licensed physician for personal health decisions.";

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
    confidenceInterval: '±3.8%',
    healthScore: 42,
    calories: 680,
    proteinGrams: 28,
    fatGrams: 35,
    carbsGrams: 54,
    sugarGrams: 12,
    sodiumMg: 1150,
    ingredients: ['Bun', 'Cheese', 'Beef Patty', 'Onion', 'Sauce', 'Pickles'],
    diseaseWarnings: ['High Saturated Fat', 'High Sodium (Hypertension factor)', 'Refined Carbs'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    scannedAt: 'Today, 12:30 PM',
  },
  {
    id: 'food_2',
    name: 'Grilled Chicken Salad',
    category: 'Healthy Meal',
    confidence: 99,
    confidenceInterval: '±1.5%',
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
    confidenceInterval: '±4.1%',
    healthScore: 30,
    calories: 520,
    proteinGrams: 6,
    fatGrams: 26,
    carbsGrams: 65,
    sugarGrams: 48,
    sodiumMg: 310,
    ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Flour', 'Eggs', 'Vanilla'],
    diseaseWarnings: ['Excessive Sugar (Pre-diabetes risk)', 'Potential Migraine Trigger'],
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    scannedAt: 'Yesterday, 3:10 PM',
  },
];

export const MOCK_DISEASE_RISKS: DiseaseRisk[] = [
  {
    disease: 'Obesity Risk',
    riskPercentage: 78,
    level: 'High',
    contributingFoods: ['Cheese Burger', 'Pizza', 'French Fries', 'Sugary Drinks'],
    description: 'Caloric surplus and refined fats elevate body mass index over extended periods.',
    mitigationTip: 'Replace 2 processed meals weekly with high-fiber lean protein bowls.',
  },
  {
    disease: 'Pre-diabetes Risk',
    riskPercentage: 62,
    level: 'Moderate',
    contributingFoods: ['Chocolate Lava Cake', 'Soft Drinks', 'White Bakery Items'],
    description: 'Frequent glycemic spikes increase insulin resistance vulnerability.',
    mitigationTip: 'Limit added sugars under 25g daily and prioritize soluble dietary fiber.',
  },
  {
    disease: 'Hypertension Risk',
    riskPercentage: 45,
    level: 'Moderate',
    contributingFoods: ['Salted Snacks', 'Processed Meats', 'Fast Food Sauces'],
    description: 'Elevated sodium intake increases arterial pressure.',
    mitigationTip: 'Maintain sodium below 2,000 mg daily and incorporate potassium-rich foods.',
  },
  {
    disease: 'Heart Disease Risk',
    riskPercentage: 20,
    level: 'Low',
    contributingFoods: ['Trans Fats', 'Deep Fried Foods'],
    description: 'Cardiovascular health remains relatively stable with active routine.',
    mitigationTip: 'Maintain regular cardio exercises and omega-3 rich fish intake.',
  },
  {
    disease: 'Fatty Liver Risk',
    riskPercentage: 35,
    level: 'Moderate',
    contributingFoods: ['High Fructose Corn Syrup', 'Processed Sweets'],
    description: 'Excess fructose storage in liver tissue.',
    mitigationTip: 'Hydrate well and reduce fructose-sweetened beverages.',
  },
];

export const MOCK_EXISTING_DISEASE_CHECKS: DiseaseCompatibilityCheck[] = [
  {
    condition: 'Migraine',
    isCompatible: false,
    warnings: ['Contains Chocolate & Aged Cheese ingredients that may trigger severe migraine episodes.'],
    triggerIngredients: ['Chocolate', 'Aged Cheese', 'Nitrates'],
  },
  {
    condition: 'Pre-diabetes',
    isCompatible: false,
    warnings: ['High Glycemic Index item with 48g refined sugar. Triggers sharp blood glucose spikes.'],
    triggerIngredients: ['Added Sugar', 'Refined Wheat Flour'],
  },
  {
    condition: 'Hypertension',
    isCompatible: true,
    warnings: ['Moderate sodium content. Track carefully against your daily 2000mg limit.'],
    triggerIngredients: [],
  },
];

export const MOCK_INITIAL_CHAT: AgentChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'agent',
    text: "Hello Desan! 👋 I'm NutriVision AI, your clinical dietary assistant. Based on your active profile (Pre-diabetes risk & Migraine history), I've evaluated today's nutrition logs.",
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
    text: "I recommend a Grilled Salmon Bowl with Quinoa, Steamed Broccoli, and Olive Oil dressing. 🥗\n\n✓ Zero refined sugars (Protects against Pre-diabetes spikes)\n✓ Rich in Magnesium & Omega-3 (Helps prevent Migraine triggers)\n✓ High protein & low glycemic load.",
    timestamp: '10:02 AM',
    recommendations: ['Grilled Salmon with Quinoa', 'Avocado Chicken Salad', 'Steamed Veggie Stir-Fry'],
    suggestedAction: 'View Full Meal Plan',
  },
];

export const DIGITAL_TWIN_PREDICTION = {
  currentWeight: 72,
  predictedWeight6Months: 76,
  riskIncreaseDisease: 'Pre-diabetes Risk',
  riskIncreasePercentage: 12,
  recommendationsToReduce: ['Soft Drinks', 'Processed Cheese', 'White Flour Bakery Items'],
  recommendationsToAdd: ['Leafy Greens', 'Walnuts & Seeds', 'Herbal Teas', 'Water (2.5L/day)'],
};
