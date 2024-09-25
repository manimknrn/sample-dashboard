import { Injectable } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Trade } from '../components/shared/models/trade.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const tradeSettlements: Trade[] = [
        {
            "id": 1,
            "stockSymbol": "USD",
            "quantity": 1,
            "price": 1,
            "notes": "test notes",
            "settlementDate": "Sep 5, 2024",
            "paymentMethod": "bankTransfer",
            "transactionFee": 56
        },
        {
            "id": 2,
            "stockSymbol": "EUR",
            "quantity": 10,
            "price": 100,
            "notes": "notes info",
            "settlementDate": "Sep 13, 2024",
            "paymentMethod": "creditCard",
            "transactionFee": 200,
            "cardNumber": "2222333344445555",
            "expiryDate": "Sep 12, 2025",
            "cardName": "Manikandan Manoharan",
            "cvv": "123"
        },
        {
            "id": 3,
            "stockSymbol": "INR",
            "quantity": 1,
            "price": 1,
            "notes": "Indian Notes",
            "settlementDate": "Sep 5, 2024",
            "paymentMethod": "bankTransfer",
            "transactionFee": 56,
            "bankName": "axis",
            "customerId": "543216789",
            "password": "HelloBuddy!"
        }
    ];
    return { tradeSettlements };
  }
}
