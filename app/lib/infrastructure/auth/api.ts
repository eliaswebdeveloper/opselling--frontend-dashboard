import type { AuthResponse } from '~/lib/infrastructure/auth/types';
import { apiClient } from '../api/client';

export async function performLogin(
  formData: Record<string, any>
): Promise<AuthResponse> {
  try {
    const result = await apiClient.post<AuthResponse>('/auth/login', formData);
    return result;
  } catch (error) {
    console.error('Error login user:', error);
    throw error;
  }
}

export async function performSignup(
  requestBody: Record<string, any>
): Promise<AuthResponse> {
  try {
    const result = await apiClient.post<AuthResponse>('/auth/shopping-signup', {
      username: requestBody.body.username,
      email: requestBody.body.email,
      password: requestBody.body.password,
    });
    return result;
  } catch (error) {
    console.error('Error in signup:', error);
    throw error;
  }
}
