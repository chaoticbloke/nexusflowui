import { CustomerRequest } from './../../../../shared/models/customer-request';
import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../shared/services/customer';
import { finalize } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification';
@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerFormComponent {
  isEditMode = false;
  isLoading = signal(false);

  fb = inject(FormBuilder);
  notificationService = inject(NotificationService);
  private readonly activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  customerService = inject(CustomerService);

  customerForm = this.fb.nonNullable.group({
    name: ['', Validators.required],

    type: ['Pending', Validators.required],

    address: ['', Validators.required],

    email: ['', Validators.required],

    phone: ['', Validators.required],
  });

  customerId = '';

  ngOnInit(): void {
    const customerId = this.activatedRoute.snapshot.paramMap.get('customerId');

    if (customerId) {
      this.customerId = customerId;
      this.isEditMode = true;
      this.loadCustomer(this.customerId);
    }
  }

  loadCustomer(customerId: string): void {
    this.customerService.getCustomer(customerId).subscribe({
      next: (response) => {
        this.customerForm.patchValue(response.data);
      },
      error: (error) => {
        this.notificationService.error(error.message || 'Failed to load customer');
      },
    });
  }
  onSubmit() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    const customerReq = this.customerForm.getRawValue();
    if (this.isEditMode) {
      this.updateCustomer(this.customerId, customerReq);
    } else {
      this.createCustomer(customerReq);
    }
  }

  updateCustomer(customerId: string, customerReq: CustomerRequest) {
    this.customerService
      .updateCustomer(customerId, customerReq)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.notificationService.success(response.message);
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          this.notificationService.error(error.message || 'Failed to Update Customer!');
        },
      });
  }
  createCustomer(customerReq: CustomerRequest) {
    this.customerService
      .addCustomer(customerReq)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.notificationService.success(response.message || 'Customer added successfully.');
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          console.log(error);
          this.notificationService.error(error.message || 'Failed to add customer.');
        },
      });
  }
}
