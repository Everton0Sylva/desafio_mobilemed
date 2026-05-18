import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExameService } from '../../../core/services/exame.service';
import { PacienteService } from '../../../core/services/paciente.service';
import { IExame } from '../../../core/interface/iexame';
import { IRestResponse } from '../../../core/interface/irestresponse';
import { IPaciente } from '../../../core/interface/ipaciente';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SituacaoExame } from '../../../core/model/situacao-exame.enum';

@Component({
    selector: 'mobilemed-exame-list',
    standalone: true,
    templateUrl: './list.html',
    styleUrl: './list.scss',
    imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class List implements OnInit, OnDestroy {
    exames$: Observable<IRestResponse<IExame>>;
    currentPage = 1;
    pageSize = 10;
    filterForm: FormGroup;
    pacientes: IPaciente[] = [];
    situacaoExameOptions = Object.values(SituacaoExame).map(value => ({ value, label: value }));

    private destroy$ = new Subject<void>();

    constructor(
        private exameService: ExameService,
        private pacienteService: PacienteService,
        private fb: FormBuilder
    ) {
        this.exames$ = this.exameService.exames$;
        this.filterForm = this.fb.group({
            pacienteId: [null],
            status: [null]
        });
    }

    ngOnInit(): void {
        this.carregarDadosIniciais();
        this.carregarExames();
    }

    carregarDadosIniciais(): void {
        this.pacienteService.getPacientes(1, 1000); // Carrega todos os pacientes para o filtro
        this.pacienteService.pacientes$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.pacientes = res.data;
        });
    }

    carregarExames(): void {
        const { pacienteId, status } = this.filterForm.value;
        this.exameService.getExames(this.currentPage, this.pageSize, pacienteId, status);
    }

    aplicarFiltros(): void {
        this.currentPage = 1; // Resetar para a primeira página ao aplicar filtros
        this.carregarExames();
    }

    mudarPagina(page: number): void {
        this.currentPage = page;
        this.carregarExames();
    }

    getStatusClass(status: SituacaoExame): string {
        const classes: Record<string, string> = {
            [SituacaoExame.SOLICITADO]: 'badge-secondary',
            [SituacaoExame.EM_ANDAMENTO]: 'badge-primary',
            [SituacaoExame.CONCLUIDO]: 'badge-success',
            [SituacaoExame.CANCELADO]: 'badge-danger',
            [SituacaoExame.REJEITADO]: 'badge-dark',
        };
        return classes[status] || 'badge-light';
    }

    limparFiltros(): void {
        this.filterForm.reset({ pacienteId: null, status: null });
        this.aplicarFiltros();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}