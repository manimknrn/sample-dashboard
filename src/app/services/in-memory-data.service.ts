import { Injectable } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Trade } from '../components/shared/models/trade.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
    createDb() {
        const tradeSettlements = [
          { id: 1, stockSymbol: 'USD', quantity: 10, price: 100 },
          { id: 2, stockSymbol: 'EUR', quantity: 20, price: 200 },
        ];
        return { tradeSettlements }; // Return as JSON
      }
}
