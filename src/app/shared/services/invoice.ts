import { ApiResponse } from './../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { InvoiceRequest } from '../models/Invoice-request.model';
import { Invoice } from '../models/invoice.model';
import { PageResponse } from '../models/page-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  http = inject(HttpClient);
  rootUrl = `${environment.apiUrl}/api/invoices`;

  createInvoice(invoiceData: InvoiceRequest, customerId: string) {
    return this.http.post<ApiResponse<Invoice>>(
      `${this.rootUrl}/create/${customerId}`,
      invoiceData,
    );
  }

  getInvoices(pageNumber: number = 0, pageSize: number = 10) {
    return this.http.get<ApiResponse<PageResponse<Invoice>>>(
      `${this.rootUrl}?page=${pageNumber}&size=${pageSize}`,
    );
  }

  getInvoice(invoiceNumber: string) {
    return this.http.get<ApiResponse<Invoice>>(`${this.rootUrl}/${invoiceNumber}`);
  }
  downloadInvoice(invoiceNumber: string) {
    return this.http.get(`${this.rootUrl}/${invoiceNumber}/download`, {
      responseType: 'blob',
    });
  }
}
