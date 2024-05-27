import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// import * as jsonData from '../../../../assets/output.json';
export interface Item {
  Dealer: string;
  Franchise: string;
  Date: string;
  CSDPProgram: string;
  SalesTarget: number;
  SalesActualsMonthTotal: string;
  SalesActualsDaily: number;
  Hub: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Item[]> {
    return this.http
      .get<Item[]>(`../../../../assets/output.json`)
      .pipe(map((data) => data.slice(0, 1000)));
  }
}
