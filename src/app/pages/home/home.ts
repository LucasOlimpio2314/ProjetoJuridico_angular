import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Modais
import { Cliente } from '../../Modal/cliente/cliente';
import { Documentos } from '../../Modal/documentos/documentos';
import { Processos } from '../../Modal/processos/processos';
import { CommonModule } from '@angular/common';

// Componentes Standalone usados no HTML
//import { DashboardResumoComponent } from '../../components/dashboard-resumo/dashboard-resumo.component';
import { ListaClientesComponent } from '../../components/lista-clientes/lista-clientes';
import { ListaDocumentosComponent } from '../../components/lista-documentos/lista-documentos';
import { ListaProcessosComponent } from '../../components/lista-processos/lista-processos';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [
    CommonModule,
    //DashboardResumoComponent,
    ListaClientesComponent,
    ListaDocumentosComponent,
    ListaProcessosComponent
  ]
})
export class Home {

  constructor(private dialog: MatDialog) {}

  abrirModalCliente() {
    this.dialog.open(Cliente, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px'
    });
  }

  abrirModalDocumentos() {
    this.dialog.open(Documentos, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px'
    });
  }

  abrirModalProcessos() {
    this.dialog.open(Processos, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px'
    });
  }

  active: string = 'all';
  setActive(tab: string) {
    this.active = tab;
  }

  filtroAtivo: string = 'clientes';
  setFiltro(filtro: string) {
    this.filtroAtivo = filtro;
  }
}
