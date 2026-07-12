import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { PageResponse } from '../models/page-response.model';
import { Customer } from '../models/customer.model';
import { CustomerRequest } from '../models/customer-request';
import { of } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly http = inject(HttpClient);

  private readonly rootUrl = `${environment.apiUrl}/api/customers`;

  getCustomers(pageNumber: number, pageSize: number) {
    const params = new HttpParams().set('page', pageNumber).set('size', pageSize);
    return this.http.get<ApiResponse<PageResponse<Customer>>>(`${this.rootUrl}`, { params });
  }

  addCustomer(createCustomerReq: CustomerRequest) {
    return this.http.post(`${this.rootUrl}/create`, createCustomerReq);
  }

  deleteCustomer(customerId?: string) {
    return this.http.delete(`${this.rootUrl}/${customerId}`);
  }
  getCustomer(customerId?: string) {
    return this.http.get<ApiResponse<Customer>>(`${this.rootUrl}/${customerId}`);
  }
  updateCustomer(customerId: string, customerReq: CustomerRequest) {
    return this.http.put<ApiResponse<Customer>>(`${this.rootUrl}/${customerId}`, customerReq);
  }
  getCustomerInvoices(customerId: string) {
    return this.http.get<ApiResponse<Invoice[]>>(`${this.rootUrl}/${customerId}/invoices`);
  }
}
