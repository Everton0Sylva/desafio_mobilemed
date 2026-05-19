import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IRestResponse } from '../interface/irestresponse';
import { IPaciente } from '../interface/ipaciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private _pacientes$ = new BehaviorSubject<IRestResponse<IPaciente>>({
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  pacientes$ = this._pacientes$.asObservable();

  private base = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) { }

  getPacientes(page: number, pageSize: number, filter?: string) {
    let params = `?page=${page}&pageSize=${pageSize}`;

    if (filter?.trim()) {
      params += filter;
    }

    return this.http.get<IRestResponse<IPaciente>>(`${this.base}${params}`).pipe(
      tap(rest => {
        this._pacientes$.next(rest);
      })
    )
  }
  getPacienteporId(id: string): Observable<IPaciente> {
    return this.http.get<IPaciente>(`${this.base}/${id}`);
  }

  createPaciente(data: IPaciente) {
    return this.http.post<IPaciente>(this.base, data);
  }

  updatePaciente(id: string, data: IPaciente) {
    return this.http.put<IPaciente>(`${this.base}/${id}`, data);
  }

  trocaStatusPaciente(id: string, status: boolean) {
    return this.http.patch(`${this.base}/${id}`, { "status": status });
  }


}
