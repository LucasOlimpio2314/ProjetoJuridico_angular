import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { Processos } from '../../Modal/processos/processos';
import { ProcessosService } from '../../Modal/processos/processos.service';

@Component({
  selector: 'app-lista-processos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './lista-processos.html',
  styleUrls: ['./lista-processos.scss']
})
export class ListaProcessosComponent {

  processos: any[] = [];
  processosFiltrados: any[] = [];
  busca = '';

  itemAberto: number | null = null;

  constructor(
    private dialog: MatDialog,
    private processoService: ProcessosService
  ) {}

  ngOnInit() {
    this.carregarProcessos();
  }

  carregarProcessos() {
    this.processos = this.processoService.getProcessos() ?? [];
    this.filtrar();
  }

  // 👉 nome correto PF/PJ
  getNomeCliente(proc: any): string {
    if (!proc.cliente) return 'Cliente não informado';

    return (
      proc.cliente.nome ||           // PF
      proc.cliente.razaoSocial ||    // PJ
      'Sem nome'
    );
  }

  // 👉 Campo clienteNome criado dinamicamente para facilitar filtros
  filtrar() {
    const termo = this.busca.toLowerCase();

    this.processosFiltrados = this.processos
      .map(p => ({
        ...p,
        clienteNome: this.getNomeCliente(p)
      }))
      .filter(p =>
        (p.numeroProcesso?.toLowerCase().includes(termo)) ||
        (p.clienteNome?.toLowerCase().includes(termo)) ||
        (p.tipoAcao?.toLowerCase().includes(termo)) ||
        (p.status?.toLowerCase().includes(termo))
      );
  }

  toggleMenu(id: number) {
    this.itemAberto = this.itemAberto === id ? null : id;
  }

  abrirCriar() {
    const ref = this.dialog.open(Processos, {
      width: '90vw',
      height: '90vh'
    });

    ref.afterClosed().subscribe(processo => {
      if (!processo) return;

      this.processoService.addProcesso(processo);
      this.carregarProcessos();
    });
  }

  editar(proc: any) {
    const ref = this.dialog.open(Processos, {
      width: '90vw',
      height: '90vh',
      data: proc
    });

    ref.afterClosed().subscribe(editado => {
      if (!editado) return;

      this.processoService.updateProcesso(editado);
      this.carregarProcessos();
    });
  }

  visualizar(proc: any) {
    alert("📄 Visualizar processo:\n\n" + JSON.stringify(proc, null, 2));
  }

  excluir(id: number) {
    if (confirm("Deseja realmente excluir este processo?")) {
      this.processoService.deleteProcesso(id);
      this.carregarProcessos();
    }
  }
}
