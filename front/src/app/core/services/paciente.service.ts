import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  getPacientes(page: number, pageSize: number, nome?: string, documento?: string, status?: boolean) {
    let params = `?page=${page}&pageSize=${pageSize}`;

    if (nome?.trim()) {
      params += `&nome=${encodeURIComponent(nome.trim())}`;
    }

    if (documento?.trim()) {
      params += `&documento=${encodeURIComponent(documento.trim())}`;
    }

    if (status !== undefined) {
      params += `&status=${status}`;
    }

    this.http.get<IRestResponse<IPaciente>>(`${this.base}${params}`).subscribe(rest => {
      this._pacientes$.next(rest);
    });
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
