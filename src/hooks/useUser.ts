import { useState } from 'react';
import { apiService } from '../services/api.service';
import type { User } from '../types/user.types';

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: (id: number) => Promise<void>;
}

export const useUser = (): UseUserReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUser = await apiService.getUserById(id);
      setUser(fetchedUser);
    } catch (err) {
      setError('Failed to fetch user');
      console.error(`Error fetching user with id ${id}:`, err);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, fetchUser };
};