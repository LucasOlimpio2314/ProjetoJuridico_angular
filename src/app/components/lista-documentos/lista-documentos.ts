import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { DocumentosService } from '../../Modal/documentos/documentos.service';
import { Documentos } from '../../Modal/documentos/documentos';
import { ProcessosService } from '../../Modal/processos/processos.service';
import { ClienteService } from '../../Modal/cliente/cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-documentos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './lista-documentos.html',
  styleUrls: ['./lista-documentos.scss']
})
export class ListaDocumentosComponent {

  documentos: any[] = [];
  documentosFiltrados: any[] = [];
  busca: string = '';

  clientes: any[] = [];
  processos: any[] = [];

  constructor(
    private documentosService: DocumentosService,
    private clienteService: ClienteService, 
    private processoService: ProcessosService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.documentos = this.documentosService.getDocumentos();
    this.clientes = this.clienteService.getClientes();
    this.processos = this.processoService.getProcessos();

    // enriquecer dados
    this.documentos = this.documentos.map(d => {
      const cliente = this.clientes.find(c => c.id === d.cliente);
      const processo = this.processos.find(p => p.id === d.processo);

      return {
        ...d,
        clienteNome: cliente ? cliente.nome : 'Cliente não encontrado',
        numeroProcesso: processo ? processo.numeroProcesso : 'Processo não encontrado'
      };
    });

    this.filtrar();
  }

  filtrar() {
    const termo = this.busca.toLowerCase();

    this.documentosFiltrados = this.documentos.filter(doc =>
      doc.clienteNome.toLowerCase().includes(termo) ||
      doc.numeroProcesso.toLowerCase().includes(termo) ||
      doc.tipoDocumento.toLowerCase().includes(termo)
    );
  }

  abrirCriar() {
    const ref = this.dialog.open(Documentos, {
      width: '90vw',
      height: '90vh'
    });

    ref.afterClosed().subscribe(ok => {
      if (ok) this.carregarDados();
    });
  }

  editar(doc: any) {
    const ref = this.dialog.open(Documentos, {
      width: '90vw',
      height: '90vh',
      data: { documento: doc }
    });

    ref.afterClosed().subscribe(ok => {
      if (ok) this.carregarDados();
    });
  }

  excluir(id: number) {
    if (confirm('Deseja realmente excluir este documento?')) {
      this.documentosService.deleteDocumento(id);
      this.carregarDados();
    }
  }
}
