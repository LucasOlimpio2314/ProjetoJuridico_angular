import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule
  ],
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.scss']
})
export class Cliente {

  tabIndex = 0;

  /** 
   * MODO:
   * criar = novo cliente
   * editar = alterar
   * visualizar = modo de leitura
   */
  modo: 'criar' | 'editar' | 'visualizar' = 'criar';

  pfForm: FormGroup;
  pjForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<Cliente>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // FORM PF
    this.pfForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: [''],
      dataNascimento: [''],
      email: ['', Validators.email],
      telefone: [''],
      cep: [''],
      rua: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],
      observacoes: ['']
    });

    // FORM PJ
    this.pjForm = this.fb.group({
      id: [null],
      razaoSocial: ['', Validators.required],
      nomeFantasia: [''],
      cnpj: [''],
      inscricaoEstadual: [''],
      email: ['', Validators.email],
      responsavel: [''],
      cpfResponsavel: [''],
      telefone: [''],
      cep: [''],
      rua: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],
      observacoes: ['']
    });

    // 🔥 Se veio pelo visualizar/editar
    if (data) {
      this.modo = data.modo || 'editar';

      if (data.tipo === 'pf') {
        this.tabIndex = 0;
        this.pfForm.patchValue(data.cliente);

        if (this.modo === 'visualizar') {
          this.pfForm.disable();
        }

      } else if (data.tipo === 'pj') {
        this.tabIndex = 1;
        this.pjForm.patchValue(data.cliente);

        if (this.modo === 'visualizar') {
          this.pjForm.disable();
        }
      }
    }
  }

  /** Texto do botão **/
  get labelBotao() {
    if (this.modo === 'visualizar') return 'Fechar';
    if (this.modo === 'editar') return 'Atualizar';
    return 'Salvar';
  }

  onSubmitPF() {
    // Modo visualizar: apenas fecha
    if (this.modo === 'visualizar') return this.dialogRef.close();

    if (this.pfForm.valid) {
      const cliente = this.clienteService.salvar(this.pfForm.value);
      this.dialogRef.close(cliente);
    }
  }

  onSubmitPJ() {
    if (this.modo === 'visualizar') return this.dialogRef.close();

    if (this.pjForm.valid) {
      const cliente = this.clienteService.salvar(this.pjForm.value);
      this.dialogRef.close(cliente);
    }
  }

  onCancelar() {
    this.dialogRef.close();
  }
}
