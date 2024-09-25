// src/app/trade-settlement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Trade } from '../components/shared/models/trade.model';

@Injectable({
  providedIn: 'root',
})
export class TradeSettlementService {
  private apiUrl = 'api/tradeSettlements'; // Use the endpoint provided by InMemoryWebApi

  constructor(private http: HttpClient) {}

  getTradeSettlements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching trade settlements', error);
        return throwError(error);
      })
    );
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
