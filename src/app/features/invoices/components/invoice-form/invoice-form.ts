import { Component, inject, ChangeDetectorRef, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
export class InvoiceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  editMode = false;
  isLoading = signal(false);
  invoiceService = inject(InvoiceService);
  notificationService = inject(NotificationService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  customerId = '';

  invoiceForm = this.fb.nonNullable.group({
    customerName: ['', Validators.required],

    status: ['PENDING', Validators.required],

    services: ['', Validators.required],

    date: ['', Validators.required],

    totalAmount: [0, [Validators.required, Validators.min(0.01)]],
  });

  invoiceNumber = '';
  ngOnInit(): void {
    const invoiceNumber = this.activatedRoute.snapshot.paramMap.get('invoiceNumber');
    if (!invoiceNumber) {
      return;
    }
    this.invoiceNumber = invoiceNumber;
    this.editMode = true;
    this.loadInvoice(invoiceNumber);
  }

  loadInvoice(invoiceNumber: string) {
    this.invoiceService.getInvoice(invoiceNumber).subscribe({
      next: (response) => {
        this.invoiceForm.patchValue(response.data);
      },
      error: (error) => {
        this.notificationService.error(error.message || 'Failed to load invoice');
      },
    });
  }

  updateInvoice(invoiceNumber: string) {
    const invoiceData: InvoiceRequest = this.invoiceForm.getRawValue();

    this.invoiceService
      .updateInvoice(invoiceNumber, invoiceData)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          this.notificationService.success(response.message || 'Invoice updated successfully.');
          this.router.navigate(['/invoices']);
        },
        error: (error) => {
          this.notificationService.error(error.message || 'Failed to update invoice.');
        },
      });
  }
  onSubmit() {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    if (this.editMode) {
      this.updateInvoice(this.invoiceNumber);
    } else {
      this.createInvoice();
    }
  }

  createInvoice() {
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
