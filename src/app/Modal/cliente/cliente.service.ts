import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private key = 'clientes';

  // Carregar lista
  getClientes(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  // Salvar lista
  private save(list: any[]) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  // ------------------------------------------------------
  // SALVAR PF OU PJ (correção total)
  // ------------------------------------------------------
  salvar(payload: any): any {
    const lista = this.getClientes();

    // Normaliza PF e PJ
    const isPJ = !!payload.cnpj;
    const nome = payload.nome || payload.razaoSocial || payload.nomeFantasia || '';

    const cliente = {
      ...payload,
      id: payload.id || Date.now(),
      tipo: isPJ ? 'PJ' : 'PF',
      nome: nome,                 // Nome exibido na lista
      documento: payload.cpf || payload.cnpj || '',
      dataCadastro:
        payload.dataCadastro || new Date().toISOString(),
    };

    // Atualiza ou adiciona
    const idx = lista.findIndex((c: any) => c.id === cliente.id);
    if (idx !== -1) {
      lista[idx] = cliente;
    } else {
      lista.push(cliente);
    }

    this.save(lista);
    return cliente;
  }

  // ------------------------------------------------------
  // EDITAR
  // ------------------------------------------------------
  updateCliente(cliente: any) {
    return this.salvar(cliente); // salva com normalização automática
  }

  // ------------------------------------------------------
  // DELETAR
  // ------------------------------------------------------
  deleteCliente(id: any) {
    const lista = this.getClientes().filter((c: any) => c.id !== id);
    this.save(lista);
  }
}
