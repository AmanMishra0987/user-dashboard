import { useState } from 'react';
import { apiService } from '../services/api.service';
import type { User } from '../types/user.types';

interface UseCreateUserReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  createUser: (userData: Omit<User, 'id'>) => Promise<User | null>;
  reset: () => void;
}

export const useCreateUser = (): UseCreateUserReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createUser = async (userData: Omit<User, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const newUser = await apiService.createUser(userData);
      setSuccess(true);
      return newUser;
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { loading, error, success, createUser, reset };
};