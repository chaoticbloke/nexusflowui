import { Injectable, signal, computed } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { LoginRequest } from '../models/login-request.model';
import { User } from '../models/user.model';
import { LoginResponse } from '../models/login-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);

  private readonly apiRootUrl = `${environment.apiUrl}/api/auth/`;

  private readonly TOKEN_KEY = 'authToken';

  private readonly token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  readonly isLoggedIn = computed(() => this.token() !== null);

  private readonly currentUser = signal<User | null>(
    JSON.parse(localStorage.getItem('currentUser') ?? 'null'),
  );

  readonly user = computed(() => this.currentUser());

  register(registerRequest: RegisterRequest) {
    return this.httpClient.post(`${this.apiRootUrl}register`, registerRequest);
  }

  login(loginRequest: LoginRequest) {
    return this.httpClient.post<ApiResponse<LoginResponse>>(
      `${this.apiRootUrl}login`,
      loginRequest,
    );
  }

  storeToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.token.set(token);
  }

  getToken(): string | null {
    return this.token();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.token.set(null);
  }

  setCurrentUser(user: User) {
    console.log('Setting user:', user);

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.set(user);

    console.log('Signal value:', this.currentUser());
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  clearCurrentUser(): void {
    localStorage.clear();
    this.currentUser.set(null);
  }
}
