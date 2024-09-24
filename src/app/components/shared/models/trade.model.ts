export interface Trade {
  id?: number;
  stockSymbol: string;
  quantity: number;
  price: number;
  notes: string;
  settlementDate?: string;
  paymentMethod: string;
  transactionFee?: number;
}
