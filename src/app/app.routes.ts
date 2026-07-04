import { Routes } from '@angular/router';
import { LayoutComponent } from './features/layout/layout';
import { DashboardComponent } from './features/dashboard/dashboard';
import { CustomersComponent } from './features/customers/customers';
import { InvoicesComponent } from './features/invoices/invoices';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { InvoiceFormComponent } from './features/invoices/components/invoice-form/invoice-form';
import { CustomerFormComponent } from './features/customers/components/customer-form/customer-form';
import { CustomerDetails } from './features/customers/components/customer-details/customer-details';
import { InvoiceDetailsComponent } from './features/invoices/components/invoice-details/invoice-details';

export const routes: Routes = [
  // 1. Explicit Auth routes
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // 2. Main App routes (Layout wrapped)
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers/new', component: CustomerFormComponent },
      { path: 'customers/:customerId/edit', component: CustomerFormComponent },
      { path: 'customers/:customerId', component: CustomerDetails },
      { path: 'customers', component: CustomersComponent },
      { path: 'invoices/new', component: InvoiceFormComponent },
      { path: 'invoices/:invoiceNumber/edit', component: InvoiceFormComponent },
      { path: 'invoices/:invoiceNumber', component: InvoiceDetailsComponent },
      { path: 'invoices', component: InvoicesComponent },
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // 3. Wildcard (Catch-all)
  { path: '**', redirectTo: 'login' },
];
