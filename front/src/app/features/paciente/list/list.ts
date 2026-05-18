import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ITableColumn } from '../../../core/interface/itable-column';
import { IPaciente } from '../../../core/interface/ipaciente';
import { Table } from '../../../core/components/table/table';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { IRestResponse } from '../../../core/interface/irestresponse';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../shared/services/notification.service';
import { PacienteService } from '../../../core/services/paciente.service';

@Component({
  selector: 'mobilemed-list',
  imports: [
    Table,
    RouterLink,
    CommonModule,
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
  isDark = signal(false);
  private destroy$ = new Subject<void>();

  columns: ITableColumn<IPaciente>[] = [
    { key: 'nome', header: 'Nome',  sortable: true },
    { key: 'documento', header: 'Documento', type: 'doc', sortable: true },
    { key: 'dataNascimento', header: 'Data Nascimento', type: 'date', sortable: false },
    { key: 'celular', header: 'Celular', type: 'fone', sortable: false },
    { key: 'status', header: 'Status',  sortable: false },
    { key: 'cidade', header: 'Cidade', type: 'cidade', sortable: false },
    { key: 'updatedAt', header: 'Atualizado em', type: 'date', sortable: false },
  ];

  private pacienteService = inject(PacienteService);
  private router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private toastr: ToastrService = inject(ToastrService);

  private notificationService: NotificationService = inject(NotificationService);

  ngOnInit() {
    this.getProductsList(1);

    this.pacienteService.pacientes$.subscribe(list => {
      this.dataList.set(list as unknown as IRestResponse<IPaciente>);
    });
  }

  action(type: string, row: any) {
    let id = row?.id;
    if (type === 'delete') {
      let that = this;
      this.notificationService.confirm("Exclusão", "Deseja realmente deletar este produto?").then(confirmed => {
        if (confirmed) {
          this.pacienteService.trocaStatusPaciente(id, false)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                that.toastr.success('Produto Deletado com sucesso!', 'Sucesso!');
                that.getProductsList(1);
              }, error: (err: any) => {
                that.toastr.error('Erro ao deletar Produto!', 'Falha!');
                console.log(err);
              }
            })
        }
      })
    } else if (type === 'edit') {
      if (id) this.router.navigate(['./edit', id], { relativeTo: this.route });
    }
  }
  getProductsList(page: number) {
    this.pacienteService.getPacientes(page, 10);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
