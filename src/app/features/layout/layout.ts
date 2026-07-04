import { authInterceptor } from './../auth/auth.interceptor';
import { Component, signal, inject, OnInit, effect } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class LayoutComponent {
  sidebarOpen = signal(true);
  authService = inject(AuthService);
  isDropdownOpen = signal(false);
  router = inject(Router);

  toggleSidebar() {
    this.sidebarOpen.update((value) => !value);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/dashboard']);
  }

  toggleDropdown() {
    this.isDropdownOpen.update((value) => !value);
  }

  // Close dropdown if user clicks anywhere else
  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
}
