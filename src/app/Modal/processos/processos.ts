import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { Cliente } from '../../Modal/cliente/cliente';
import { ClienteService } from '../../Modal/cliente/cliente.service';

@Component({
  selector: 'app-processos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './processos.html',
  styleUrls: ['./processos.scss']
})
export class Processos {

  processoForm: FormGroup;
  clientes: any[] = [];

  tiposAcao = ['Cível', 'Criminal', 'Trabalhista'];
  areasDireito = ['Civil', 'Trabalhista', 'Penal'];
  statusProcesso = ['Em andamento', 'Concluído', 'Arquivado'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<Processos>,
    private dialog: MatDialog,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.processoForm = this.fb.group({
      id: [null],
      cliente: ['', Validators.required],  // objeto completo do cliente
      numeroProcesso: ['', Validators.required],
      tipoAcao: ['', Validators.required],
      areaDireito: ['', Validators.required],
      status: ['', Validators.required],
      comarcaVara: [''],
      dataDistribuicao: ['', Validators.required],
      juiz: [''],
      observacoes: ['']
    });
  }

  ngOnInit() {
    this.loadClientes();

    // Se for edição, preencher o formulário
    if (this.data) {
      this.processoForm.patchValue(this.data);
    }
  }

  loadClientes() {
    this.clientes = this.clienteService.getClientes();
  }

  // -----------------------------------------------------------
  // SALVAR (retorna o processo para lista-processos)
  // -----------------------------------------------------------
  onSubmit() {
    if (this.processoForm.invalid) return;

    const processo = this.processoForm.value;

    // Se novo, gera ID
    if (!processo.id) {
      processo.id = Date.now();
    }

    // Devolve o objeto completo com cliente completo
    this.dialogRef.close(processo);
  }

  onCancelar() {
    this.dialogRef.close(null);
  }

  // -----------------------------------------------------------
  // Novo cliente pelo modal
  // -----------------------------------------------------------
  abrirModalCliente() {
    this.dialog.open(Cliente, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px'
    }).afterClosed().subscribe(res => {
      if (res) this.loadClientes();
    });
  }
}
