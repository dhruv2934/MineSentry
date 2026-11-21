
/**
 * MineSentry Authentication Types
 *
 * Types aligned with FastAPI authentication schemas.
 */

export type EmployeeRole =
  | 'WORKER'
  | 'INSPECTOR'
  | 'MANAGER'
  | 'ADMIN';

export type EmployeeStatus = 'ACTIVE' | 'INACTIVE';

export interface AuthenticatedEmployee {
  id: number;
  name: string;
  code: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  mine_id: number;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  employee_code: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  employee: AuthenticatedEmployee;
}
