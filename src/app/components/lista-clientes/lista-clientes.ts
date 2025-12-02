import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../../Modal/cliente/cliente';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.scss'
})
export class ListaClientesComponent {

  clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

  menuAberto: any = null;

  constructor(private dialog: MatDialog) {}

  toggleMenu(cliente: any) {
    this.menuAberto = this.menuAberto === cliente ? null : cliente;
  }

  @HostListener('document:click')
  fecharMenu() {
    this.menuAberto = null;
  }

  /** Detecta automaticamente se o cliente é PF ou PJ */
  private getTipoCliente(cliente: any): 'pf' | 'pj' {
    return cliente.cpf ? 'pf' : 'pj';
  }

  /** ================================
   *  VISUALIZAR
   * ================================ */
  visualizar(cliente: any) {
    this.dialog.open(Cliente, {
      width: '90vw',
      height: '90vh',
      data: {
        modo: 'visualizar',
        tipo: this.getTipoCliente(cliente),
        cliente: cliente
      }
    });
  }

  /** ================================
   *  EDITAR
   * ================================ */
  editar(cliente: any) {
    const ref = this.dialog.open(Cliente, {
      width: '90vw',
      height: '90vh',
      data: {
        modo: 'editar',
        tipo: this.getTipoCliente(cliente),
        cliente: cliente
      }
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) {
        // Atualiza o cliente editado
        this.clientes = this.clientes.map((c: any) =>
          c.id === resultado.id ? resultado : c
        );

        localStorage.setItem('clientes', JSON.stringify(this.clientes));
      }
    });
  }

  /** ================================
   *  EXCLUIR
   * ================================ */
  excluir(cliente: any) {
    this.clientes = this.clientes.filter((c: any) => c.id !== cliente.id);
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    this.menuAberto = null;
  }

  /** ================================
   *  FORMATA CPF OU CNPJ
   * ================================ */
  formatarDocumento(cliente: any): string {
    const doc = cliente.cpf || cliente.cnpj;
    if (!doc) return '-';

    const numeros = doc.replace(/\D/g, '');

    if (numeros.length === 11) {
      return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    if (numeros.length === 14) {
      return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    }

    return doc;
  }
}
