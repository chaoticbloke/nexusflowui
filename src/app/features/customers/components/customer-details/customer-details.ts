import { Customer } from './../../../../shared/models/customer.model';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { CustomerService } from '../../../../shared/services/customer';
import { NotificationService } from '../../../../shared/services/notification';
import { Invoice } from '../../../../shared/models/invoice.model';
import { ApiResponse } from '../../../../shared/models/api-response.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  imports: [CommonModule, RouterLink, ConfirmDialogComponent],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.scss',
})
export class CustomerDetails implements OnInit {
  customerService = inject(CustomerService);
  notificationService = inject(NotificationService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  showDeleteModal = false;
  customer = signal<Customer | null>(null);

  invoices = signal<Invoice[]>([]);

  ngOnInit(): void {
    const customerId = this.activatedRoute.snapshot.paramMap.get('customerId');

    if (!customerId) {
      return;
    }

    forkJoin({
      customer: this.customerService.getCustomer(customerId),
      invoices: this.customerService.getCustomerInvoices(customerId),
    }).subscribe({
      next: ({ customer, invoices }) => {
        this.customer.set(customer.data);

        this.invoices.set(invoices.data);
      },

      error: (error) => {
        this.notificationService.error('Failed to load customer details.');
      },
    });
  }

  // loadCustomerInvoices(customerId: string) {
  //   this.customerService.getCustomerInvoices(customerId).subscribe({
  //     next: (response: ApiResponse<Invoice[]>) => {
  //       console.log('invoices for customer', response);
  //       this.invoices.set(response.data);
  //     },
  //     error: (error) => {
  //       this.notificationService.error(
  //         error.message || 'Failed to load invoices for customer ' + customerId,
  //       );
  //     },
  //   });
  // }
  // loadCustomer(customerId?: string) {
  //   this.customerService.getCustomer(customerId).subscribe({
  //     next: (response: any) => {
  //       console.log(response);
  //       this.customer.set(response.data);
  //     },
  //     error: (err) => {
  //       this.notificationService.error(err.message || 'Failed to load customer');
  //     },
  //   });
  // }
  editCustomer(customerId: any): void {
    console.log('Edit customer clicked', customerId);
    this.router.navigate([`/customers/${customerId}/edit`]);
  }
  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  deleteCustomer(customerId?: string): void {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.notificationService.success('Customer deleted Successfully');

        this.router.navigate(['/customers']);
      },

      error: (error) => {
        this.notificationService.error(error.message || 'Failed to delete customer.');
      },
    });

    this.showDeleteModal = false;
  }
}
