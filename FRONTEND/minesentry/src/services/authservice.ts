
/**
 * MineSentry Authentication Service
 *
 * Handles:
 * - Employee login
 * - JWT storage
 * - Logout
 * - Retrieving authenticated employee details
 */

import {
  api,
  setAccessToken,
  clearAccessToken
} from './apiClient';

import type {
  LoginRequest,
  LoginResponse,
  AuthenticatedEmployee
} from '../types/auth';


const EMPLOYEE_KEY = 'minesentry_employee';


class AuthService {

  // Authenticate employee using backend
  async login(
    employeeCode: string,
    password: string
  ): Promise<LoginResponse> {

    const loginData: LoginRequest = {
      employee_code: employeeCode,
      password: password
    };

    const response = await api.post<LoginResponse>(
      '/auth/login',
      loginData
    );

    // Store JWT
    setAccessToken(response.access_token);

    // Store authenticated employee details
    sessionStorage.setItem(
      EMPLOYEE_KEY,
      JSON.stringify(response.employee)
    );

    return response;
  }


  // Logout employee
  logout(): void {
    clearAccessToken();

    sessionStorage.removeItem(EMPLOYEE_KEY);
  }


  // Retrieve currently authenticated employee
  getCurrentEmployee(): AuthenticatedEmployee | null {

    const employeeData = sessionStorage.getItem(EMPLOYEE_KEY);

    if (!employeeData) {
      return null;
    }

    try {
      return JSON.parse(employeeData) as AuthenticatedEmployee;
    } catch {
      this.logout();
      return null;
    }
  }


  // Check whether a JWT exists
  isAuthenticated(): boolean {
    return this.getCurrentEmployee() !== null &&
      sessionStorage.getItem('minesentry_access_token') !== null;
  }
}


export const authService = new AuthService();
