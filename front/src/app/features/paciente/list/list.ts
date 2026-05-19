import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ITableColumn } from '../../../core/interface/itable-column';
import { IPaciente } from '../../../core/interface/ipaciente';
import { Table } from '../../../core/components/table/table';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IRestResponse } from '../../../core/interface/irestresponse';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../shared/services/notification.service';
import { PacienteService } from '../../../core/services/paciente.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'mobilemed-list',
  imports: [
    Table,
    RouterLink,
    CommonModule,
    FormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  dataList: WritableSignal<IRestResponse<IPaciente>> = signal({
    data: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1
  });
  private destroy$ = new Subject<void>();

  columns: ITableColumn<IPaciente>[] = [
    { key: 'nome', header: 'Nome' },
    { key: 'documento', header: 'Documento', type: 'doc' },
    { key: 'dataNascimento', header: 'Data Nascimento', type: 'date' },
    { key: 'celular', header: 'Celular', type: 'fone' },
    { key: 'status', header: 'Status', type: 'status' },
    { key: 'cidade', header: 'Cidade', type: 'cidade' },
    { key: 'updatedAt', header: 'Atualizado em', type: 'date' },
  ];

  nomeFilter = '';
  documentoFilter = '';
  statusFilter: 'todos' | 'ativo' | 'inativo' = 'todos';

  private pacienteService = inject(PacienteService);
  private router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private toastr: ToastrService = inject(ToastrService);

  private notificationService: NotificationService = inject(NotificationService);

  ngOnInit() {
    this.getPacienteList(1);

    this.pacienteService.pacientes$.subscribe(list => {
      this.dataList.set(list as unknown as IRestResponse<IPaciente>);
    });
  }

  search() {
    this.getPacienteList(1);
  }

  action(type: string, row: any) {
    let id = row?.getPacienteListid;
    if (type === 'status') {
      let that = this;
      this.notificationService.confirm("Desativar", "Deseja realmente desativar este paciente?").then(confirmed => {
        if (confirmed) {
          this.pacienteService.trocaStatusPaciente(id, !row.status)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                status
                that.toastr.success('Paciente Desativado com sucesso!', 'Sucesso!');
                that.getPacienteList(1);
              }, error: (err: any) => {
                that.toastr.error('Erro ao desativar Paciente!', 'Falha!');
                console.log(err);
              }
            })
        }
      })
    } else if (type === 'edit') {
      if (id) this.router.navigate(['./editar', id], { relativeTo: this.route });
    }
  }
  getPacienteList(page: number) {

    let reqFilter = '';
    if (this.nomeFilter.trim()) {
      reqFilter += `&nome=${encodeURIComponent(this.nomeFilter)}`
    }
    if (this.documentoFilter.trim()) {
      reqFilter += `&documento=${encodeURIComponent(this.documentoFilter)}`
    }
    if (this.statusFilter !== 'todos') {
      reqFilter += `&status=${this.statusFilter === 'ativo'}`
    }
    this.pacienteService.getPacientes(
      page,
      10,
      reqFilter
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
