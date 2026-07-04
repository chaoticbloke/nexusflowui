export interface Invoice {
  customerId?: string;
  customerName: string;
  invoiceNumber: string;
  totalAmount: number;
  services: string;
  status: 'PAID' | 'PENDING' | 'CANCELLED';
  createdAt: Date;
  date: Date;
}
