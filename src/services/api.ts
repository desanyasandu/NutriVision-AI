export const API_BASE_URL = __DEV__
  ? 'http://localhost:8000'
  : 'https://api.nutrivision.ai';

export const API_ENDPOINTS = {
  HEALTH: '/',
  DETECT: '/detect/',
  DETECTIONS: '/detections/',
  FOODS: '/foods/',
  NUTRITION: '/nutrition/',
  MEALS: '/meals/',
} as const;

export const detectFood = async (imageFile: File): Promise<{ foods: { name: string; confidence: number }[] }> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DETECT}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Detection failed: ${response.statusText}`);
  }

  return response.json();
};

export const getDetections = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DETECTIONS}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch detections: ${response.statusText}`);
  }
  return response.json();
};

export const getDetectionById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DETECTIONS}${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch detection: ${response.statusText}`);
  }
  return response.json();
};

export const deleteDetection = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DETECTIONS}${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete detection: ${response.statusText}`);
  }
};

export const getFoods = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FOODS}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch foods: ${response.statusText}`);
  }
  return response.json();
};

export const getNutrition = async (foodId: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NUTRITION}${foodId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch nutrition: ${response.statusText}`);
  }
  return response.json();
};

export const createFood = async (foodData: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FOODS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(foodData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create food: ${response.statusText}`);
  }
  return response.json();
};

export const createNutrition = async (nutritionData: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NUTRITION}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nutritionData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create nutrition: ${response.statusText}`);
  }
  return response.json();
};

export const createMeal = async (mealData: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MEALS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mealData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create meal: ${response.statusText}`);
  }
  return response.json();
};