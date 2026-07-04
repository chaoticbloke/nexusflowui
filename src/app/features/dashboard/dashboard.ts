import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  totalCustomers = 0;
  totalInvoices = 0;
  totalRevenue = 0;
  pendingInvoices = 0;

  ngOnInit() {
    // const customers = this.mockDataService.getCustomersArray();
    // const invoices = this.mockDataService.getInvoicesArray();
    // this.totalCustomers = customers.length;
    // this.totalInvoices = invoices.length;
    // this.totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    // this.pendingInvoices = invoices.filter(
    //   (inv) => inv.status === 'CANCELLED' || inv.status === 'PAID',
    // ).length;
  }
}
