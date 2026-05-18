import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { PacienteService } from '../../../core/services/paciente.service';
import { Paciente } from '../../../core/model/paciente';

@Component({
  selector: 'mobilemed-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  form: FormGroup;

  id!: string


  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      description: [null]
    });
  }


  private destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];

      if (this.id) {
        this.pacienteService.getPacienteporId(this.id).subscribe({
          next: (paciente) => {
            this.form.patchValue(paciente);
          }, error: (err) => {
            console.log(err);
            this.toastr.error('Erro ao carregar Paciente!', 'Falha!');
          }
        })
      }
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      const formData = this.form.value;
      let that = this;
      if (this.id) {
        let paciente = new Paciente(formData);
        paciente.id = this.id;
        this.pacienteService.updatePaciente(this.id, paciente)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              that.toastr.success('Paciente atualizado com sucesso!', 'Sucesso!');
            }, error: (err: any) => {
              that.toastr.error('Erro ao atualizar Paciente!', 'Falha!');
              console.log(err);
            }
          })
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
          })
      }
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
