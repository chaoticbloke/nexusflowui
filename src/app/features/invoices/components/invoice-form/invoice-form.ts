import { Component, inject, ChangeDetectorRef, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InvoiceService } from '../../../../shared/services/invoice';
import { InvoiceRequest } from '../../../../shared/models/Invoice-request.model';
import { NotificationService } from '../../../../shared/services/notification';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../../shared/models/api-response.model';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './invoice-form.html',
})
export class InvoiceFormComponent {
  private fb = inject(FormBuilder);
  isLoading = signal(false);
  invoiceService = inject(InvoiceService);
  notificationService = inject(NotificationService);
  router = inject(Router);
  customerId = 'CUST-04488A13'; // Replace with the actual customer ID

  invoiceForm = this.fb.nonNullable.group({
    customerName: ['', Validators.required],

    status: ['Pending', Validators.required],

    services: ['', Validators.required],

    date: ['', Validators.required],

    totalAmount: [0, [Validators.required, Validators.min(0.01)]],
  });

  onSubmit() {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);

    const invoiceData: InvoiceRequest = this.invoiceForm.getRawValue();

    this.invoiceService
      .createInvoice(invoiceData, this.customerId)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          this.notificationService.success(response.message || 'Invoice created successfully.');
          this.router.navigate(['/invoices']);
        },
        error: (error) => {
          this.notificationService.error(error.message || 'Failed to create invoice.');
        },
      });
  }
}
