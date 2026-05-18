import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { ITableColumn } from '../../interface/itable-column';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { IRestResponse } from '../../interface/irestresponse';
import { FormsModule } from '@angular/forms';
import { IPaciente } from '../../interface/ipaciente';
import { NgxMaskPipe } from 'ngx-mask';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mobilemed-table',
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    NgxMaskPipe,
    DatePipe,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<T> {
  private _restResp: IRestResponse<any> = {
    data: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1
  };

  @Input()
  set restResp(value: IRestResponse<any>) {
    this._restResp = value ?? this._restResp;
    this.currentPage = (value as any)?.page ?? (value as any)?.page ?? value?.pageNumber ?? 1;
    this.currentPageSize = (value as any)?.pageSize ?? (value as any)?.pageSize ?? value?.pageSize ?? 10;
  }
  get restResp() { return this._restResp; }
  @Input() columns: ITableColumn<T>[] = [];

  @Output() action = new EventEmitter();
  @Output() pageChange = new EventEmitter();

  get total() {
    return (this.restResp as any)?.total ?? (this.restResp as any)?.total ?? this.restResp?.totalCount ?? 0;
  }

  get totalPages() {
    return (this.restResp as any)?.totalPages ?? (this.restResp as any)?.totalPages ?? Math.max(1, Math.ceil(this.total / (this.restResp?.pageSize ?? this.currentPageSize)));
  }

  // pagination controls bound to the template
  currentPage: number = 1;
  currentPageSize: number = 10;

  get pageItems() {
    return this.restResp?.data as IRow[];
  }

  // ações
  emitAction(type: string, row: IRow) {
    this.action.emit({ type, row });

  }

  pageChanged(event: any): void {
    // update local page and propagate
    if (event && event.page) this.currentPage = event.page;
    this.pageChange.emit(event.page);
  }
}


export interface IRow { [key: string]: string }
