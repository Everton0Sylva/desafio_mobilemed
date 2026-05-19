import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, map, Observable, Observer, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ExameService } from '../../../core/services/exame.service';
import { PacienteService } from '../../../core/services/paciente.service';
import { Exame } from '../../../core/model/exame';
import { SituacaoExame, SituacaoExameOptions } from '../../../core/model/situacao-exame.enum';
import { IPaciente } from '../../../core/interface/ipaciente';
import { IProcedimento } from '../../../core/interface/iprocedimento';
import { NgxMaskDirective } from 'ngx-mask';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ProcedimentoService } from '../../../core/services/procedimento.service';

@Component({
    selector: 'mobilemed-exame-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TypeaheadModule
    ],
    templateUrl: './form.html',
    styleUrl: './form.scss',
})
export class Form implements OnInit, OnDestroy {
    id!: string;
    exame: Exame = new Exame();
    form: FormGroup;
    pacientesList$?: Observable<IPaciente[]>;
    procedimentosList$?: Observable<IProcedimento[]>;
    searchPaciente?: string;
    searchProcedimento?: string;

    private route: ActivatedRoute = inject(ActivatedRoute);
    private procedimentoService: ProcedimentoService = inject(ProcedimentoService);
    private exameService: ExameService = inject(ExameService);
    private destroy$ = new Subject<void>();

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private pacienteService: PacienteService,
        private toastr: ToastrService) {
        this.form = this.fb.group({
            idPaciente: [null, Validators.required],
            idProcedimento: [null, Validators.required],
            status: [SituacaoExame.SOLICITADO],
            idempotencyKey: [crypto.randomUUID()]
        });
    }

    ngOnInit(): void {

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

        this.route.params.subscribe((params: any) => {
            this.id = params['id'];

            if (this.id) {
                this.exameService.getExamePorId(this.id).subscribe({
                    next: (exame) => {
                        this.exame = new Exame(exame);
                        this.searchPaciente = this.exame.paciente?.nome;
                        this.searchProcedimento = this.exame.procedimento?.nome;
                    }, error: (err) => {
                        console.error(err);
                        this.toastr.error('Erro ao carregar Exame!', 'Falha!');
                    }
                });
            }
        });
    }

    onSelectPaciente(event: any): void {
        this.form.get('idPaciente')?.setValue(event.item.id);
    }

    onSelectProcedimento(event: any): void {
        this.form.get('idProcedimento')?.setValue(event.item.id);
    }

    onSubmit() {
        const data = this.form.value;
        const request = this.id
            ? this.exameService.updateExame(this.id, data)
            : this.exameService.createExame(data);

        request.pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
                const msg = this.id ? 'atualizado' : 'criado';
                this.toastr.success(`Exame ${msg} com sucesso!`, 'Sucesso!');
                this.onCancel();
            },
            error: (err: any) => {
                this.toastr.error('Erro ao salvar Exame!', 'Falha!');
                console.error(err);
            }
        });
    }

    onCancel() {
        this.router.navigate([this.id ? '../../' : '../'], { relativeTo: this.route });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}