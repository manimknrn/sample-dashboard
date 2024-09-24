import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trade } from '../components/shared/models/trade.model';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private apiUrl = 'http://localhost:5000/api/trades';

  constructor(private http: HttpClient) { }

  registerTrade(tradeId: any): Observable<Trade> {
    return this.http.post<Trade>(this.apiUrl, tradeId);
  }

  getTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>('/assets/mock-service/trade-settlement.json');
  }

}
