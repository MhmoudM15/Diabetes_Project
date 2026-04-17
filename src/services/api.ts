// Mock API Service Layer
// Replace these functions with real backend API calls when ready

// Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'patient' | 'doctor';
  createdAt: string;
}

export interface Patient extends User {
  role: 'patient';
  age?: number;
  weight?: string;
  height?: string;
  diabetesType?: string;
  emergencyContact?: string;
  currentGlucose?: number;
  riskLevel?: 'Low' | 'Moderate' | 'High';
}

export interface Doctor extends User {
  role: 'doctor';
  licenseNumber?: string;
  specialization?: string;
  hospital?: string;
}

export interface GlucoseReading {
  id: string;
  patientId: string;
  value: number;
  timestamp: string;
  notes?: string;
}

export interface MealLog {
  id: string;
  patientId: string;
  name: string;
  calories: number;
  carbs: number;
  protein?: number;
  fat?: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  glucoseLevel?: number;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

// Simulated delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data storage (in-memory)
let mockUsers: (Patient | Doctor)[] = [
  {
    id: '1',
    email: 'patient@demo.com',
    fullName: 'John Doe',
    role: 'patient',
    age: 45,
    weight: '185 lbs',
    diabetesType: 'Type 2',
    currentGlucose: 165,
    riskLevel: 'High',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'doctor@demo.com',
    fullName: 'Dr. Sarah Smith',
    role: 'doctor',
    licenseNumber: 'MD-12345',
    specialization: 'Endocrinology',
    hospital: 'City Medical Center',
    createdAt: new Date().toISOString(),
  }
];

let mockGlucoseReadings: GlucoseReading[] = [
  { id: '1', patientId: '1', value: 128, timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
  { id: '2', patientId: '1', value: 165, timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
  { id: '3', patientId: '1', value: 185, timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
  { id: '4', patientId: '1', value: 152, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: '5', patientId: '1', value: 165, timestamp: new Date().toISOString() },
];

let mockMealLogs: MealLog[] = [
  { id: '1', patientId: '1', name: 'Oatmeal with blueberries', calories: 320, carbs: 45, timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString() },
  { id: '2', patientId: '1', name: 'Grilled chicken salad', calories: 420, carbs: 12, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
];

let mockAlerts: Alert[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Doe',
    type: 'critical',
    message: 'Severe hyperglycemia detected',
    glucoseLevel: 285,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  }
];

// Authentication API
export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(800);
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    // Store in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  signup: async (userData: Partial<Patient | Doctor>): Promise<User> => {
    await delay(800);
    const newUser = {
      id: String(mockUsers.length + 1),
      createdAt: new Date().toISOString(),
      ...userData,
    } as Patient | Doctor;
    
    mockUsers.push(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  },

  logout: async (): Promise<void> => {
    await delay(300);
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// Glucose API
export const glucoseAPI = {
  getReadings: async (patientId: string, limit?: number): Promise<GlucoseReading[]> => {
    await delay(500);
    let readings = mockGlucoseReadings.filter(r => r.patientId === patientId);
    if (limit) {
      readings = readings.slice(-limit);
    }
    return readings;
  },

  addReading: async (reading: Omit<GlucoseReading, 'id'>): Promise<GlucoseReading> => {
    await delay(500);
    const newReading = {
      id: String(mockGlucoseReadings.length + 1),
      ...reading,
    };
    mockGlucoseReadings.push(newReading);
    return newReading;
  },

  getLatestReading: async (patientId: string): Promise<GlucoseReading | null> => {
    await delay(300);
    const readings = mockGlucoseReadings.filter(r => r.patientId === patientId);
    return readings.length > 0 ? readings[readings.length - 1] : null;
  },
};

// Meal API
export const mealAPI = {
  getMeals: async (patientId: string, limit?: number): Promise<MealLog[]> => {
    await delay(500);
    let meals = mockMealLogs.filter(m => m.patientId === patientId);
    if (limit) {
      meals = meals.slice(-limit);
    }
    return meals;
  },

  addMeal: async (meal: Omit<MealLog, 'id'>): Promise<MealLog> => {
    await delay(500);
    const newMeal = {
      id: String(mockMealLogs.length + 1),
      ...meal,
    };
    mockMealLogs.push(newMeal);
    return newMeal;
  },
};

// Patient API (for doctors)
export const patientAPI = {
  getPatients: async (doctorId: string): Promise<Patient[]> => {
    await delay(600);
    // In a real app, this would fetch patients assigned to the doctor
    return mockUsers.filter(u => u.role === 'patient') as Patient[];
  },

  getPatient: async (patientId: string): Promise<Patient | null> => {
    await delay(400);
    const patient = mockUsers.find(u => u.id === patientId && u.role === 'patient');
    return patient ? patient as Patient : null;
  },
};

// Alert API
export const alertAPI = {
  getAlerts: async (patientId?: string): Promise<Alert[]> => {
    await delay(500);
    if (patientId) {
      return mockAlerts.filter(a => a.patientId === patientId);
    }
    return mockAlerts;
  },

  updateAlertStatus: async (alertId: string, status: Alert['status']): Promise<Alert> => {
    await delay(400);
    const alert = mockAlerts.find(a => a.id === alertId);
    if (!alert) {
      throw new Error('Alert not found');
    }
    alert.status = status;
    return alert;
  },
};

// AI Prediction API
export const aiAPI = {
  predictGlucose: async (patientId: string, hoursAhead: number): Promise<{ value: number; confidence: number }> => {
    await delay(1000);
    // Mock AI prediction logic
    const latestReading = await glucoseAPI.getLatestReading(patientId);
    const baseValue = latestReading?.value || 120;
    
    // Simple mock prediction: add some variation
    const prediction = baseValue + (Math.random() * 40 - 20);
    const confidence = 85 + Math.random() * 10;
    
    return {
      value: Math.round(prediction),
      confidence: Math.round(confidence),
    };
  },

  getDietRecommendations: async (patientId: string): Promise<any[]> => {
    await delay(800);
    // Mock diet recommendations
    return [
      { 
        id: '1', 
        title: 'Reduce Carb Intake', 
        description: 'Limit carbs to 45g per meal',
        priority: 'high' 
      },
      { 
        id: '2', 
        title: 'Increase Fiber', 
        description: 'Add more vegetables to meals',
        priority: 'medium' 
      },
    ];
  },

  getChatResponse: async (message: string): Promise<string> => {
    await delay(1200);
    // Mock AI chatbot response
    const responses = [
      "Based on your recent glucose levels, I recommend monitoring your carbohydrate intake more closely.",
      "Your glucose trends look stable. Keep up with your current routine!",
      "I notice some spikes after dinner. Consider reducing portion sizes or adjusting meal timing.",
      "Your readings are within target range. Great job managing your diabetes!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  },
};
