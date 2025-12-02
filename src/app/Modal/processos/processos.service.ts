import { Injectable } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';

@Injectable({ providedIn: 'root' })
export class ProcessosService {

  private storageKey = 'processos';

  constructor(private clienteService: ClienteService) {}

  // -----------------------------------------------------------
  // UTILITÁRIO: Corrige processo que salvou cliente como ID
  // -----------------------------------------------------------
  private corrigirProcesso(p: any) {
    const clientes = this.clienteService.getClientes();

    // Se cliente está como número → substituir pelo objeto completo
    if (p.cliente && typeof p.cliente === 'number') {
      const encontrado = clientes.find(c => c.id === p.cliente);
      if (encontrado) p.cliente = encontrado;
    }

    return p;
  }

  // -----------------------------------------------------------
  // GET: Carrega lista com correção automática
  // -----------------------------------------------------------
  getProcessos(): any[] {
    const lista = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    // Corrige processos antigos
    const corrigida = lista.map((p: any) => this.corrigirProcesso(p));

    // Atualiza localStorage caso tenha corrigido algo
    localStorage.setItem(this.storageKey, JSON.stringify(corrigida));

    return corrigida;
  }

  // -----------------------------------------------------------
  // ADD: Sempre adiciona processo completo (com cliente objeto)
  // -----------------------------------------------------------
  addProcesso(processo: any) {
    const lista = this.getProcessos();
    lista.push(processo);
    localStorage.setItem(this.storageKey, JSON.stringify(lista));
    return processo;
  }

  // -----------------------------------------------------------
  // UPDATE: Garante atualização completa
  // -----------------------------------------------------------
  updateProcesso(processoAtualizado: any) {
    const lista = this.getProcessos().map(p =>
      p.id === processoAtualizado.id ? processoAtualizado : p
    );

    localStorage.setItem(this.storageKey, JSON.stringify(lista));
    return processoAtualizado;
  }

  // -----------------------------------------------------------
  // DELETE
  // -----------------------------------------------------------
  deleteProcesso(id: number) {
    const lista = this.getProcessos().filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(lista));
  }
}
