export interface InvoiceRequest {
  customerName: string;
  status: string;
  services: string;
  date: string;
  totalAmount: number;
}
