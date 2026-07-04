export interface Customer {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: 'BUSINESS' | 'INDIVIDUAL';
  createdAt: Date;
}
