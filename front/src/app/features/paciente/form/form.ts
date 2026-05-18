import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { PacienteService } from '../../../core/services/paciente.service';
import { CepService, CepResponse } from '../../../core/services/cep.service';
import { Paciente } from '../../../core/model/paciente';
import { TipoSanguineoOptions } from '../../../core/model/tipo-sanguineo.enum';
import { NgxMaskDirective } from "ngx-mask";
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'mobilemed-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    TooltipModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  form: FormGroup;
  id!: string;
  paciente: Paciente = new Paciente();
  tipoSanguineoOptions = TipoSanguineoOptions;
  ufOptions = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private cepService: CepService,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      nome: [null, Validators.required],
      documento: [null],
      dataNascimento: [null, Validators.required],
      telefone: [null],
      celular: [null],
      tipoSanguineo: [''],
      cep: [null],
      logradouro: [null],
      numero: [null],
      bairro: [null],
      complemento: [null],
      cidade: [null],
      uf: [null]
    });
  }

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];

      if (this.id) {
        this.pacienteService.getPacienteporId(this.id).subscribe({
          next: (paciente) => {
            this.paciente = new Paciente(paciente);
            this.form.patchValue({
              ...paciente,

              dataNascimento:
                paciente.dataNascimento
                  ?.split('T')[0]
            });
          }, error: (err) => {
            console.log(err);
            this.toastr.error('Erro ao carregar Paciente!', 'Falha!');
          }
        });
      }
    });
  }

  buscarCep(): void {
    const cep = (this.form.get('cep')?.value ?? '').toString().replace(/\D/g, '');

    if (cep.length !== 8) {
      this.toastr.warning('Informe um CEP válido com 8 dígitos.', 'Aviso');
      return;
    }

    this.cepService.buscarCep(cep)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.toastr.error('Erro ao buscar CEP.', 'Falha!');
          return of(null);
        })
      )
      .subscribe((result: CepResponse | null) => {
        if (result && !result.erro) {
          this.form.patchValue({
            logradouro: result.logradouro,
            bairro: result.bairro,
            cidade: result.localidade,
            uf: result.uf
          });
        } else {
          this.toastr.warning('CEP não encontrado.', 'Aviso');
        }
      });
  }

  onSubmit() {
    const formData = {
      ...this.form.value
    };
    const that = this;
    if (this.id) {
      const paciente = new Paciente(formData);
      paciente.id = this.id;
      debugger;
      this.pacienteService.updatePaciente(this.id, paciente)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            that.toastr.success('Paciente atualizado com sucesso!', 'Sucesso!');
          }, error: (err: any) => {
            that.toastr.error('Erro ao atualizar Paciente!', 'Falha!');
            console.log(err);
          }
        });
    } else {
      this.pacienteService.createPaciente(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            that.toastr.success('Paciente criado com sucesso!', 'Sucesso!');
          }, error: (err: any) => {
            that.toastr.error('Erro ao criar Paciente!', 'Falha!');
            console.log(err);
          }
        });
    }
  }

  onCancel() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
