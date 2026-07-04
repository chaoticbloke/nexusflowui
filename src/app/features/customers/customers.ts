import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../shared/models/customer.model';
import { CustomerService } from '../../shared/services/customer';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class CustomersComponent implements OnInit {
  customerService = inject(CustomerService);
  router = inject(Router);
  //private readonly cdr = inject(ChangeDetectorRef);

  customers = signal<Customer[]>([]);
  filteredCustomers: Customer[] = [];
  searchQuery = '';
  currentPage = 0;
  itemsPerPage = 3;
  totalPages = 0;
  totalElements = 0;
  Math = Math;

  ngOnInit() {
    console.log('CustomersComponent OnInit');
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.customers.set(response.data.content);
        //current page you're on
        this.currentPage = response.data.number;
        this.totalPages = response.data.totalPages;

        //totalElements: count(*) of all rows or records  from backend
        this.totalElements = response.data.totalElements;
        //this.cdr.markForCheck();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSearch() {
    //TODO: search by name, email or phone
  }

  previousPage() {
    if (this.currentPage + 1 > 1) {
      this.currentPage--;
      this.loadCustomers();
    }
  }

  nextPage() {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.loadCustomers();
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'inactive':
        return 'bg-danger';
      case 'pending':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }

  addCustomer() {
    this.router.navigate(['/customers/new']);
  }
  viewCustomer(customerId: string) {
    this.router.navigate(['/customers/' + customerId]);
  }
}
