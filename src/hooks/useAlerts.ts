import { useState, useEffect } from 'react';
import { alertAPI, Alert } from '../services/api';

export function useAlerts(patientId?: string, autoRefresh = false) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await alertAPI.getAlerts(patientId);
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch alerts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateAlertStatus = async (alertId: string, status: Alert['status']) => {
    try {
      const updatedAlert = await alertAPI.updateAlertStatus(alertId, status);
      setAlerts(prev => prev.map(a => a.id === alertId ? updatedAlert : a));
      return updatedAlert;
    } catch (err) {
      console.error('Failed to update alert:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Auto-refresh every 30 seconds if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchAlerts, 30000);
      return () => clearInterval(interval);
    }
  }, [patientId, autoRefresh]);

  return {
    alerts,
    loading,
    error,
    refresh: fetchAlerts,
    updateAlertStatus,
  };
}
