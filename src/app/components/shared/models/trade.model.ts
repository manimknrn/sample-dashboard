export interface Trade {
  id?: number;
  stockSymbol: string;
  quantity: number;
  price: number;
  notes: string;
  settlementDate?: string;
  paymentMethod: string;
  transactionFee?: number;
  cardNumber?: string;
  expiryDate?: string;
  cardName?: string;
  cvv?: string;
  bankName?: string;
  customerId?: string;
  password?: string;
}
