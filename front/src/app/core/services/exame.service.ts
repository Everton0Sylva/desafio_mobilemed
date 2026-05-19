import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable, takeUntil, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IRestResponse } from '../interface/irestresponse';
import { IExame } from '../interface/iexame';
import { IProcedimento } from '../interface/iprocedimento';

@Injectable({
  providedIn: 'root',
})
export class ExameService {
  private _exames$ = new BehaviorSubject<IRestResponse<IExame>>({
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  exames$ = this._exames$.asObservable();

  private base = `${environment.apiUrl}/exames`;

  constructor(private http: HttpClient) { }

  getExames(page: number, pageSize: number, filter?: string) {
    let params = `?page=${page}&pageSize=${pageSize}`;
    if (filter?.trim()) {
      params += filter;
    }
    return this.http.get<IRestResponse<IExame>>(`${this.base}${params}`).pipe(
      tap(rest => {
        this._exames$.next(rest);
      })
    )
  }


  getExamePorId(id: string): Observable<IExame> {
    return this.http.get<IExame>(`${this.base}/${id}`);
  }

  createExame(data: Partial<IExame>) {
    return this.http.post<IExame>(this.base, data);
  }

  updateExame(id: string, data: Partial<IExame>) {
    return this.http.put<IExame>(`${this.base}/${id}`, data);
  }
}