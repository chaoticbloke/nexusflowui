export interface User {
  token: string;
  userId: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
}

export interface LoginRequest {
  email: string;
  password: string;
}
