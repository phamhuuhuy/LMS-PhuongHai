export type Customer = {
  customerName?: string;
  customerType?: string;
  customerContact?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerNote?: string;
};

export interface ICustomerFetch {
  id: string;
  customerName: string;
  customerType: string;
  customerContact: string;
  customerPhone: string;
  customerEmail: string;
  customerNote?: string;
}