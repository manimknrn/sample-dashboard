import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trade } from '../components/shared/models/trade.model';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private apiUrl = 'https://66f40d7177b5e889709811bf.mockapi.io/api/v1/trades';

  constructor(private http: HttpClient) { }

  registerTrade(tradeId: any): Observable<Trade> {
    return this.http.post<Trade>(this.apiUrl, tradeId);
  }

  getTrades1(): Observable<Trade[]> {
    return this.http.get<Trade[]>('/assets/mock-service/trade-settlement.json');
  }

  getTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>(`${this.apiUrl}`);
  }

  createTrade(data: Trade) {
    return this.http.post<Trade[]>(`${this.apiUrl}`, data)
  }

  getTradeById(id: number): Observable<Trade> {
    return this.http.get<Trade>(`${this.apiUrl}/${id}`);
  }

  updateTrade(data: any) {
    return this.http.put<Trade[]>(`${this.apiUrl}/${data.id}`, data)
  }

  deleteTrade(id: number): Observable<Trade> {
    return this.http.delete<Trade>(`${this.apiUrl}/${id}`);
  }

}
