import { Component, OnInit, OnDestroy, inject, WritableSignal, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExameService } from '../../../core/services/exame.service';
import { PacienteService } from '../../../core/services/paciente.service';
import { IExame } from '../../../core/interface/iexame';
import { IRestResponse } from '../../../core/interface/irestresponse';
import { IPaciente } from '../../../core/interface/ipaciente';
import { debounceTime, distinctUntilChanged, map, Observable, Observer, of, Subject, switchMap, takeUntil } from 'rxjs';
import { SituacaoExame } from '../../../core/model/situacao-exame.enum';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { IProcedimento } from '../../../core/interface/iprocedimento';
import { ProcedimentoService } from '../../../core/services/procedimento.service';
import { ITableColumn } from '../../../core/interface/itable-column';
import { Table } from '../../../core/components/table/table';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../shared/services/notification.service';
import { Exame, ExameTable } from '../../../core/model/exame';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
    selector: 'mobilemed-exame-list',
    standalone: true,
    templateUrl: './list.html',
    styleUrl: './list.scss',
    imports: [CommonModule, RouterModule, ReactiveFormsModule,
        PaginationModule,
        NgxMaskPipe,
        DatePipe,
        FormsModule, TypeaheadModule]
})
export class List implements OnInit, OnDestroy {
    dataList: WritableSignal<IRestResponse<IExame>> = signal({
        data: [],
        list: [],
        pageNumber: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 1
    });
    form: FormGroup;
    situacaoExameOptions = Object.values(SituacaoExame).map(value => ({ value, label: value }));

    private destroy$ = new Subject<void>();

    columns: ITableColumn<any>[] = [
        { key: 'nome', header: 'Nome do Paciente' },
        { key: 'documento', header: 'Documento' },
        { key: 'cidade', header: 'Cidade / UF' },
        { key: 'sigla', header: 'Procedimento' },
        { key: 'status', header: 'Status', type: 'status' },
        { key: 'updatedAt', header: 'Solicitado em' },
    ];

    searchPaciente?: string;
    searchProcedimento?: string;
    pacientesList$?: Observable<IPaciente[]>;
    procedimentosList$?: Observable<IProcedimento[]>;

    public currentPage: number = 1;
    public currentPageSize: number = 10;



    private procedimentoService: ProcedimentoService = inject(ProcedimentoService);
    private pacienteService: PacienteService = inject(PacienteService);
    private router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    private toastr: ToastrService = inject(ToastrService);

    private notificationService: NotificationService = inject(NotificationService);

    constructor(
        private exameService: ExameService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            idPaciente: [null],
            idProcedimento: [null],
            status: [null]
        });
    }

    ngOnInit(): void {
        this.carregarExames(1, 10);
        this.carregarFiltros();

        this.exameService.exames$
    }

    carregarFiltros(): void {
        this.pacientesList$ = new Observable((observer: Observer<string | undefined>) => {
            observer.next(this.searchPaciente);
        }).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string | undefined) => {
                if (!term || term.trim().length < 3) {
                    return of([]);
                }

                term = term.trim();
                let reqFilter = '';
                const isNumeric = /^\d/.test(term);

                if (isNumeric) {
                    const documento = term.replace(/\D/g, '');
                    reqFilter = `&documento=${encodeURIComponent(documento)}`;
                } else {
                    const nome = term.replace(/[0-9]/g, '');
                    reqFilter = `&nome=${encodeURIComponent(nome)}`;
                }

                return this.pacienteService.getPacientes(1, 10, reqFilter).pipe(
                    map(rest => rest.data || []),
                    takeUntil(this.destroy$)
                );
            })
        );

        this.procedimentosList$ = new Observable((observer: Observer<string | undefined>) => {
            observer.next(this.searchProcedimento);

        }).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string | undefined) => {
                if (!term || term.trim().length < 3) {
                    return of([]);
                }

                term = term.trim();
                let reqFilter = '';
                const isNumeric = /^\d/.test(term);

                if (isNumeric) {
                    const documento = term.replace(/\D/g, '');
                    reqFilter = `&documento=${encodeURIComponent(documento)}`;
                } else {
                    const nome = term.replace(/[0-9]/g, '');
                    reqFilter = `&nome=${encodeURIComponent(nome)}`;
                }

                return this.procedimentoService.getProcedimentos(1, 10, reqFilter).pipe(
                    map(rest => rest.data || []),
                    takeUntil(this.destroy$)
                );
            })
        );

    }

    onSelectPaciente(event: any): void {
        this.form.get('idPaciente')?.setValue(event.item.id);
    }

    onSelectProcedimento(event: any): void {
        this.form.get('idProcedimento')?.setValue(event.item.id);
    }

    action(type: string, row: any) {
        let id = row?.id;
        if (type === 'edit') {
            if (id) this.router.navigate(['./editar', id], { relativeTo: this.route });
        }
    }

    limparFiltros(): void {
        this.form.reset({ idPaciente: null, idProcedimento: null, status: null });
        this.carregarExames(1);
    }


    carregarExames(page?: number, pageSize?: number): void {
        let reqFilter = '';
        if (this.form.get('idPaciente')?.value?.trim()) {
            reqFilter += `&idPaciente=${encodeURIComponent(this.form.get('idPaciente')?.value)}`
        }
        if (this.form.get('idProcedimento')?.value?.trim()) {
            reqFilter += `&idProcedimento=${encodeURIComponent(this.form.get('idProcedimento')?.value)}`
        }
        if (this.form.get('status')?.value !== null) {
            reqFilter += `&status=${this.form.get('status')?.value}`
        }
        this.exameService.getExames(
            page || this.dataList().pageNumber,
            pageSize || this.dataList().pageSize,
            reqFilter).subscribe({
                next: (list) => {
                    let convertData = list.data.map(exame => new Exame(exame));
                    list.data = [...convertData] as IExame[];
                    this.dataList.set(list as IRestResponse<IExame>);
                }
            });
    }

    getStatusClass(status: SituacaoExame): string {
        const classes: Record<string, string> = {
            [SituacaoExame.SOLICITADO]: 'text-secondary',
            [SituacaoExame.EM_ANDAMENTO]: 'text-info',
            [SituacaoExame.CONCLUIDO]: 'text-success',
            [SituacaoExame.PROCESSANDO]: '.text-warning-emphasis',
            [SituacaoExame.AGENDADO]: 'text-warning',
        };
        return classes[status] || 'text-muted';
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}