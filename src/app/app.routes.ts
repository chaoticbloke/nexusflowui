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
import { HomeComponent } from './features/home/home/home';

export const routes: Routes = [
  // Auth routes
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Main application
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Public landing page
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },

      // Dashboard
      {
        path: 'dashboard',
        component: DashboardComponent,
      },

      // Customers
      {
        path: 'customers/new',
        component: CustomerFormComponent,
      },
      {
        path: 'customers/:customerId/edit',
        component: CustomerFormComponent,
      },
      {
        path: 'customers/:customerId',
        component: CustomerDetails,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },

      // Invoices
      {
        path: 'invoices/new',
        component: InvoiceFormComponent,
      },
      {
        path: 'invoices/:invoiceNumber/edit',
        component: InvoiceFormComponent,
      },
      {
        path: 'invoices/:invoiceNumber',
        component: InvoiceDetailsComponent,
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
    ],
  },

  // Catch-all
  {
    path: '**',
    redirectTo: '',
  },
];
