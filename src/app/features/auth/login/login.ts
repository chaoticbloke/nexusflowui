import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { LoginRequest } from '../../../shared/models/login-request.model';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../../../shared/services/notification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  private notification = inject(NotificationService);

  // UI State using Signals
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor() {
    console.log('On LoginComp creation:', this.authService.user());
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    const loginRequest: LoginRequest = this.loginForm.getRawValue();

    this.authService
      .login(loginRequest)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.notification.success('Login successful');
          const user = response.data.user;
          const token = response.data.token;
          this.authService.setCurrentUser(user);
          this.authService.storeToken(token);
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          this.notification.error('Login failed');
          this.errorMessage.set(err.error?.message ?? 'Login failed');
        },
      });
  }
}
