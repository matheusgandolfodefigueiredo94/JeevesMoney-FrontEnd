import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StockQuote } from '../domain/stockQuote';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) {}

  getQuote(symbol: string): Observable<StockQuote> {
    return this.http.get<StockQuote>(`${environment.apiUrl}/api/stocks/${symbol}`);
  }
}
