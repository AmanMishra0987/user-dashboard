import { useState } from "react";
import { apiService } from "../services/api.service";
import type { User } from "../types/user.types";

interface UseUpdateUserReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  updateUser: (id: number, userData: Partial<User>) => Promise<User | null>;
  reset: () => void;
}

export const useUpdateUser = (): UseUpdateUserReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateUser = async (id: number, userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const updatedUser = await apiService.updateUser(id, userData);
      setSuccess(true);
      return updatedUser;
    } catch (err) {
      setError("Failed to update user");
      console.error("Error updating user:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { loading, error, success, updateUser, reset };
};
