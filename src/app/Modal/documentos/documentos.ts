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
import { Processos } from '../processos/processos';
import { DocumentosService } from './documentos.service';

@Component({
  selector: 'app-documentos',
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
  templateUrl: './documentos.html',
  styleUrls: ['./documentos.scss']
})
export class Documentos {

  documentoForm: FormGroup;

  clientes: any[] = [];
  processos: any[] = [];
  processosFiltrados: any[] = [];

  tiposDocumento = ['Petição', 'Sentença', 'Despacho', 'Outro'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<Documentos>,
    private dialog: MatDialog,
    private documentosService: DocumentosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.documentoForm = this.fb.group({
      id: [null], // id para edição
      cliente: ['', Validators.required],
      processo: ['', Validators.required],
      linkDocumento: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      observacoes: ['']
    });
  }

  ngOnInit() {
    this.carregarClientes();
    this.carregarProcessos();
    this.aplicarEdicao();
    this.ouvirMudancaCliente();
  }

  // carrega clientes do localStorage (ou service futuro)
  carregarClientes() {
    this.clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
  }

  // carrega processos do localStorage (ou service futuro)
  carregarProcessos() {
    // garantimos que os processos tenham cliente e numeroProcesso
    this.processos = JSON.parse(localStorage.getItem('processos') || '[]') || [];
  }

  // filtra processos pelo cliente selecionado (cliente guarda id do cliente)
  ouvirMudancaCliente() {
    this.documentoForm.get('cliente')?.valueChanges.subscribe(clienteId => {
      if (!clienteId) {
        this.processosFiltrados = [];
        this.documentoForm.get('processo')?.setValue('');
        return;
      }
      // se seus processos armazenam cliente como objeto, ajuste p => p.cliente.id ou p.cliente
      this.processosFiltrados = this.processos.filter(p => {
        // tenta suportar ambas as formas (p.cliente pode ser id ou objeto)
        const pCliente = p.cliente ?? p.clienteId ?? (p.cliente && p.cliente.id);
        return pCliente === clienteId || (p.cliente && p.cliente.id === clienteId);
      });
      // limpa seleção de processo quando trocar cliente
      this.documentoForm.get('processo')?.setValue('');
    });
  }

  aplicarEdicao() {
    if (this.data && this.data.documento) {
      // se abrir para editar, espera receber data.documento
      this.documentoForm.patchValue(this.data.documento);

      // prepara processos filtrados para o cliente do documento
      const clienteId = this.data.documento.cliente;
      this.processosFiltrados = this.processos.filter(p => {
        const pCliente = p.cliente ?? p.clienteId ?? (p.cliente && p.cliente.id);
        return pCliente === clienteId || (p.cliente && p.cliente.id === clienteId);
      });
    }
  }

  onSubmitDocumento() {
    if (this.documentoForm.invalid) return;

    const doc = {
      ...this.documentoForm.value,
      id: this.documentoForm.value.id ?? Date.now(),
      dataCadastro: new Date().toISOString()
    };

    if (this.documentoForm.value.id) {
      // edição
      this.documentosService.updateDocumento(doc);
    } else {
      // novo
      this.documentosService.addDocumento(doc);
    }

    // fechar retornando true para chamar recarregar na lista
    this.dialogRef.close(true);
  }

  onCancelarDocumento() {
    this.dialogRef.close(false);
  }

  abrirModalCliente() {
    const ref = this.dialog.open(Cliente, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px'
    });

    ref.afterClosed().subscribe(res => {
      if (res) this.carregarClientes();
    });
  }

  abrirModalProcessos() {
    const ref = this.dialog.open(Processos, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px'
    });

    ref.afterClosed().subscribe(res => {
      if (res) this.carregarProcessos();
    });
  }
}
