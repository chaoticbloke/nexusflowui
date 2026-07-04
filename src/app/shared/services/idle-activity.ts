import { inject, Injectable } from '@angular/core';
import { NotificationService } from './notification';
import { AuthService } from './auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IdleActivityService {
  notificationService = inject(NotificationService);
  authService = inject(AuthService);
  router = inject(Router);
  private readonly IDLE_TIMEOUT = 10 * 60 * 1000; // if user sits 10mins idle then logout

  private timeoutId?: ReturnType<typeof setTimeout>;

  startWatching(): void {
    this.resetTimer();

    window.addEventListener('click', this.resetTimer);
    window.addEventListener('keydown', this.resetTimer);
    window.addEventListener('scroll', this.resetTimer);
    window.addEventListener('mousemove', this.resetTimer);
  }

  private resetTimer = (): void => {
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.handleIdleTimeout();
    }, this.IDLE_TIMEOUT);
  };

  private handleIdleTimeout(): void {
    this.notificationService.error('User inactive for 10 minutes');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
