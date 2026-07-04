import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notyf = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
    dismissible: true,
  });

  success(message: string) {
    this.notyf.success(message);
  }

  error(message: string) {
    this.notyf.error(message);
  }
}
