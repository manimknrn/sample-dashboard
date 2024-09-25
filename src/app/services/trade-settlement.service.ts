// src/app/trade-settlement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trade } from '../components/shared/models/trade.model';

@Injectable({
  providedIn: 'root',
})
export class TradeSettlementService {
  private apiUrl = 'api/tradeSettlements'; // Use the endpoint provided by InMemoryWebApi

  constructor(private http: HttpClient) {}

  getTradeSettlements(): Observable<Trade[]> {
    return this.http.get<Trade[]>(this.apiUrl);
  }

  addTradeSettlement(data: Trade): Observable<Trade> {
    return this.http.post<Trade>(this.apiUrl, data);
  }

  updateTradeSettlement(id: number, data: Trade): Observable<Trade> {
    return this.http.put<Trade>(`${this.apiUrl}/${id}`, data);
  }

  deleteTradeSettlement(id: number): Observable<Trade> {
    return this.http.delete<Trade>(`${this.apiUrl}/${id}`);
  }
}
