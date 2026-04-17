import { useState, useEffect } from 'react';
import { mealAPI, MealLog } from '../services/api';

export function useMealData(patientId: string | undefined) {
  const [meals, setMeals] = useState<MealLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = async () => {
    if (!patientId) return;
    
    try {
      setLoading(true);
      const data = await mealAPI.getMeals(patientId);
      setMeals(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch meal logs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (mealData: Omit<MealLog, 'id' | 'patientId' | 'timestamp'>) => {
    if (!patientId) return;

    try {
      const newMeal = await mealAPI.addMeal({
        ...mealData,
        patientId,
        timestamp: new Date().toISOString(),
      });
      setMeals(prev => [...prev, newMeal]);
      return newMeal;
    } catch (err) {
      console.error('Failed to add meal:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [patientId]);

  return {
    meals,
    loading,
    error,
    refresh: fetchMeals,
    addMeal,
  };
}
