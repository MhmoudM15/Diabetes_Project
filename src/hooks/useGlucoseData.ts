import { useState, useEffect } from 'react';
import { glucoseAPI, GlucoseReading } from '../services/api';

export function useGlucoseData(patientId: string | undefined, autoRefresh = false) {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReadings = async () => {
    if (!patientId) return;
    
    try {
      setLoading(true);
      const data = await glucoseAPI.getReadings(patientId);
      setReadings(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch glucose readings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addReading = async (value: number, notes?: string) => {
    if (!patientId) return;

    try {
      const newReading = await glucoseAPI.addReading({
        patientId,
        value,
        timestamp: new Date().toISOString(),
        notes,
      });
      setReadings(prev => [...prev, newReading]);
      return newReading;
    } catch (err) {
      console.error('Failed to add reading:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchReadings();

    // Auto-refresh every 30 seconds if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchReadings, 30000);
      return () => clearInterval(interval);
    }
  }, [patientId, autoRefresh]);

  return {
    readings,
    loading,
    error,
    refresh: fetchReadings,
    addReading,
  };
}
