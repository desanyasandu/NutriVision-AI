const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.EXPO_PUBLIC_API_URL;

export const API_BASE_URL = isDevelopment
  ? 'http://localhost:8000'
  : process.env.EXPO_PUBLIC_API_URL || 'https://api.nutrivision.ai';

export const API_ENDPOINTS = {
  HEALTH: '/',
  DETECT: '/detect/',
  DETECTIONS: '/detections/',
  FOODS: '/foods/',
  NUTRITION: '/nutrition/',
  MEALS: '/meals/',
} as const;

export interface DetectedFood {
  name: string;
  confidence: number;
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  fiber?: number;
  category?: string;
  image_url?: string;
}

export interface DetectionResponse {
  foods: DetectedFood[];
}

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB threshold for compression

const compressImage = (blob: Blob): Promise<Blob> => {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxDimension = 1920;
      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
      }
      canvas.toBlob((compressed) => {
        URL.revokeObjectURL(url);
        resolve(compressed || blob);
      }, 'image/jpeg', 0.85);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(blob);
    };
    img.src = url;
  });
};

const createFormData = (imageSource: string | File | Blob): FormData => {
  const formData = new FormData();

  if (imageSource instanceof File || imageSource instanceof Blob) {
    const filename = (imageSource as File).name || 'food_image.jpg';
    const fileType = imageSource.type || 'image/jpeg';
    formData.append('image', imageSource, filename);
  } else {
    const imageUri = imageSource;
    const filename = imageUri.split('/').pop() || 'food_image.jpg';
    const fileType = imageUri.includes('gif') ? 'image/gif' :
                    imageUri.includes('png') ? 'image/png' :
                    imageUri.includes('webp') ? 'image/webp' :
                    imageUri.includes('jpeg') || imageUri.includes('.jpg') ? 'image/jpeg' : 'image/jpeg';

    formData.append('image', {
      uri: imageUri,
      name: filename,
      type: fileType,
    } as any);
  }

  return formData;
};

export const detectFood = async (imageSource: string | File | Blob): Promise<DetectionResponse> => {
  let processedSource: string | File | Blob = imageSource;

  if ((imageSource instanceof File || imageSource instanceof Blob) && imageSource.size > MAX_UPLOAD_SIZE) {
    processedSource = await compressImage(imageSource);
  }

  const formData = createFormData(processedSource);

  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.DETECT}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Detection failed:', response.status, errorText);
    throw new Error(`Detection failed: ${response.status} ${response.statusText}`);
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