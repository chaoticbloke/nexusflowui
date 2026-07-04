import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../shared/models/invoice.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InvoiceService } from '../../shared/services/invoice';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class InvoicesComponent implements OnInit {
  invoiceService = inject(InvoiceService);
  router = inject(Router);
  //invoices: Invoice[] = [];
  invoices = signal<Invoice[]>([]);
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 0;
  Math = Math;

  ngOnInit() {
    this.loadInvoices();
  }

  createInvoice() {
    this.router.navigate(['/invoices/new']);
  }
  loadInvoices() {
    this.invoiceService.getInvoices().subscribe((response: any) => {
      console.log('API Response:', response);
      //this.invoices = response.data.content;
      this.invoices.set(response.data.content);
      console.log('Fetched invoices:', this.invoices);
      this.totalPages = Math.ceil(this.invoices.length / this.itemsPerPage);
    });
  }

  getPaginatedInvoices(): Invoice[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.invoices().slice(startIndex, startIndex + this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'paid':
        return 'bg-success';
      case 'draft':
        return 'bg-secondary';
      case 'sent':
        return 'bg-info';
      case 'overdue':
        return 'bg-danger';
      default:
        return 'bg-warning';
    }
  }

  getTotalRevenue(): number {
    return this.invoices().reduce((sum, inv) => sum + inv.totalAmount, 0);
  }

  getPaidRevenue(): number {
    return this.invoices()
      .filter((inv) => inv.status === 'PAID')
      .reduce((sum, inv) => sum + inv.totalAmount, 0);
  }

  getOverdueAmount(): number {
    return this.invoices()
      .filter((inv) => inv.status === 'CANCELLED')
      .reduce((sum, inv) => sum + inv.totalAmount, 0);
  }
}
