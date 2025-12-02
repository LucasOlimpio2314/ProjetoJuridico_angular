import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentosService {
  private key = 'documentos';

  getDocumentos(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  addDocumento(doc: any) {
    const list = this.getDocumentos();
    list.push(doc);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  updateDocumento(doc: any) {
    const list = this.getDocumentos().map(d => d.id === doc.id ? doc : d);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  deleteDocumento(id: number) {
    const list = this.getDocumentos().filter(d => d.id !== id);
    localStorage.setItem(this.key, JSON.stringify(list));
  }
}
