import { Invoice } from './../../../../shared/models/invoice.model';
import { InvoiceService } from './../../../../shared/services/invoice';
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { NotificationService } from '../../../../shared/services/notification';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialogComponent],
  templateUrl: './invoice-details.html',
})
export class InvoiceDetailsComponent implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  invoiceService = inject(InvoiceService);
  notificationService = inject(NotificationService);

  showDeleteModal = signal(false);
  invoice = signal<Invoice | null>(null);
  invoiceNumber = '';
  ngOnInit(): void {
    const invoiceNumber = this.activatedRoute.snapshot.paramMap.get('invoiceNumber');
    if (!invoiceNumber) {
      return;
    }
    if (invoiceNumber) {
      this.invoiceNumber = invoiceNumber;
      this.loadInvoice(invoiceNumber);
    }
  }

  loadInvoice(invoiceNumber: string) {
    this.invoiceService.getInvoice(invoiceNumber).subscribe({
      next: (response) => {
        this.invoice.set(response.data);
      },
      error: (error) => {
        this.notificationService.error('Failed to load invoice');
      },
    });
  }
  editInvoice(): void {
    this.router.navigate([
      '/invoices',
      this.invoice()?.invoiceNumber,
      'edit',
      this.invoice()?.status,
    ]);
  }
  downloadInvoice(): void {
    this.invoiceService.downloadInvoice(this.invoiceNumber).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);

        window.open(url, '_blank');

        // Don't revoke immediately
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      error: () => {
        this.notificationService.error('Error downloading invoice.');
      },
    });
  }
  openDeleteModal(): void {
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
  }

  deleteInvoice(): void {
    this.invoiceService.deleteInvoice(this.invoiceNumber).subscribe({
      next: () => {
        this.notificationService.success('Invoice deleted successfully.');
        this.router.navigate(['/invoices']);
      },
      error: () => {
        this.notificationService.error('Error deleting invoice.');
      },
    });
  }
}
