import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth';
import { catchError } from 'rxjs';
import { NotificationService } from '../../shared/services/notification';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 && error.error?.message === 'Token expired') {
        console.log('Unauthorized request. Logging out the user.', error);
        notificationService.error('Your session has expired. Please log in again.');
        authService.logout();
        router.navigate(['/login']);
      }
      throw error;
    }),
  );
};
