import React, { createContext, useContext, useState } from 'react';
import {
  UserHealthProfile,
  FoodItem,
  DiseaseRisk,
  AgentChatMessage,
  INITIAL_USER_PROFILE,
  MOCK_RECENT_FOODS,
  MOCK_DISEASE_RISKS,
  MOCK_INITIAL_CHAT,
} from '../data/mockData';

interface AppContextType {
  userProfile: UserHealthProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserHealthProfile>>;
  foodHistory: FoodItem[];
  currentScan: FoodItem | null;
  setCurrentScan: (food: FoodItem | null) => void;
  diseaseRisks: DiseaseRisk[];
  chatMessages: AgentChatMessage[];
  addChatMessage: (text: string, sender?: 'user' | 'agent') => void;
  addFoodScan: (food: FoodItem) => void;
  selectedDiseaseFilter: string;
  setSelectedDiseaseFilter: (disease: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserHealthProfile>(INITIAL_USER_PROFILE);
  const [foodHistory, setFoodHistory] = useState<FoodItem[]>(MOCK_RECENT_FOODS);
  const [currentScan, setCurrentScan] = useState<FoodItem | null>(MOCK_RECENT_FOODS[0]);
  const [diseaseRisks, setDiseaseRisks] = useState<DiseaseRisk[]>(MOCK_DISEASE_RISKS);
  const [chatMessages, setChatMessages] = useState<AgentChatMessage[]>(MOCK_INITIAL_CHAT);
  const [selectedDiseaseFilter, setSelectedDiseaseFilter] = useState<string>('Migraine');

  const addChatMessage = (text: string, sender: 'user' | 'agent' = 'user') => {
    const newMessage: AgentChatMessage = {
      id: `msg_${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMessage]);

    // Simulate Agent Auto-Response if user sent a message
    if (sender === 'user') {
      setTimeout(() => {
        let responseText = "I've analyzed your question against your dietary profile and health metrics.";
        let recommendations: string[] | undefined = undefined;

        const lower = text.toLowerCase();
        if (lower.includes('calori') || lower.includes('fat') || lower.includes('burger')) {
          responseText = "The Cheese Burger scanned today contains 680 kcal and 1150mg Sodium. This accounts for 46% of your daily sodium limit and elevates blood pressure risk. I suggest drinking 500ml water and choosing a potassium-rich snack like banana later.";
          recommendations = ['Drink 500ml Water', 'Eat a Potassium Snack', 'Walk for 20 mins'];
        } else if (lower.includes('migraine') || lower.includes('headache')) {
          responseText = "Your health profile indicates Migraine vulnerability. Try avoiding dark chocolate, aged cheeses, and synthetic nitrates. Stick to herbal teas, salmon, and leafy greens.";
          recommendations = ['Chamomile Tea', 'Steamed Spinach Bowl', 'Almonds & Seeds'];
        } else if (lower.includes('sugar') || lower.includes('diabet')) {
          responseText = "Your Pre-diabetes risk factor is at 62%. Avoid high glycemic index snacks after 6 PM to prevent overnight insulin spikes.";
          recommendations = ['Greek Yogurt with Chia', 'Green Apple Slices', 'Cinnamon Oatmeal'];
        }

        const agentResponse: AgentChatMessage = {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendations,
        };
        setChatMessages((prev) => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const addFoodScan = (newFood: FoodItem) => {
    setFoodHistory((prev) => [newFood, ...prev]);
    setCurrentScan(newFood);
    // Update daily calories
    setUserProfile((prev) => ({
      ...prev,
      todayCaloriesConsumed: prev.todayCaloriesConsumed + newFood.calories,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        foodHistory,
        currentScan,
        setCurrentScan,
        diseaseRisks,
        chatMessages,
        addChatMessage,
        addFoodScan,
        selectedDiseaseFilter,
        setSelectedDiseaseFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
