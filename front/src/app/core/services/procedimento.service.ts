import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IRestResponse } from '../interface/irestresponse';
import { IExame } from '../interface/iexame';
import { IProcedimento } from '../interface/iprocedimento';
import { IPaciente } from '../interface/ipaciente';

@Injectable({
  providedIn: 'root',
})
export class ProcedimentoService {
  private _procedimentos$ = new BehaviorSubject<IRestResponse<IProcedimento>>({
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  procedimentos$ = this._procedimentos$.asObservable();


  private base = `${environment.apiUrl}/procedimentos`;

  constructor(private http: HttpClient) { }

  getProcedimentos(page: number, pageSize: number, filter?: string) {
    let params = `?page=${page}&pageSize=${pageSize}`;

    if (filter?.trim()) {
      params += filter;
    }

    return this.http.get<IRestResponse<IProcedimento>>(`${this.base}${params}`).pipe(
      tap(rest => {
        this._procedimentos$.next(rest);
      })
    )
  }
}