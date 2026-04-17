import { useState, useEffect } from 'react';
import { patientAPI, Patient } from '../services/api';

export function usePatientData(doctorId: string | undefined) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    if (!doctorId) return;
    
    try {
      setLoading(true);
      const data = await patientAPI.getPatients(doctorId);
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [doctorId]);

  return {
    patients,
    loading,
    error,
    refresh: fetchPatients,
  };
}

export function usePatient(patientId: string | undefined) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = async () => {
    if (!patientId) return;
    
    try {
      setLoading(true);
      const data = await patientAPI.getPatient(patientId);
      setPatient(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patient');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [patientId]);

  return {
    patient,
    loading,
    error,
    refresh: fetchPatient,
  };
}
