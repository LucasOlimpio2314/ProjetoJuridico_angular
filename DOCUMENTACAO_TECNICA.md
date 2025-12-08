# 📘 Documentação Técnica - Sistema Jurídico

Documentação técnica completa do sistema de gestão jurídica desenvolvido em Angular.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Componentes](#componentes)
- [Serviços](#serviços)
- [Estrutura de Dados](#estrutura-de-dados)
- [Fluxo de Dados](#fluxo-de-dados)
- [Padrões de Código](#padrões-de-código)
- [Persistência de Dados](#persistência-de-dados)
- [Roteamento](#roteamento)
- [Estilização](#estilização)
- [Testes](#testes)

---

## 🎯 Visão Geral

O sistema é uma **Single Page Application (SPA)** desenvolvida em Angular 20, utilizando componentes standalone e Angular Material para a interface. A aplicação gerencia três entidades principais:

1. **Clientes** (PF e PJ)
2. **Processos Jurídicos**
3. **Documentos**

### Stack Tecnológica

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Angular | 20.1.0 | Framework principal |
| TypeScript | 5.8.2 | Linguagem base |
| Angular Material | 20.2.4 | Componentes UI |
| RxJS | 7.8.0 | Programação reativa |
| SCSS | - | Estilização |

---

## 🏗️ Arquitetura

### Padrão Arquitetural

O projeto segue o padrão **Component-Based Architecture** do Angular, com separação clara de responsabilidades:

```
┌─────────────────────────────────────┐
│         Pages (Home)                │
│  ┌───────────────────────────────┐  │
│  │    Components (Listas)        │  │
│  │  ┌─────────────────────────┐ │  │
│  │  │  Modals (CRUD)          │ │  │
│  │  │  ┌───────────────────┐   │ │  │
│  │  │  │  Services         │   │ │  │
│  │  │  │  (LocalStorage)  │   │ │  │
│  │  │  └───────────────────┘   │ │  │
│  │  └─────────────────────────┘ │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Estrutura de Pastas

```
src/app/
├── components/          # Componentes de apresentação
│   ├── lista-clientes/
│   ├── lista-documentos/
│   └── lista-processos/
├── Modal/              # Componentes modais (CRUD)
│   ├── cliente/
│   ├── documentos/
│   └── processos/
├── pages/              # Páginas da aplicação
│   └── home/
└── services/           # Serviços (implícitos nos Modals)
```

---

## 🧩 Componentes

### Componentes Standalone

Todos os componentes são **standalone**, permitindo importação direta sem módulos:

```typescript
@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exemplo.html',
  styleUrls: ['./exemplo.scss']
})
```

### 1. Home Component

**Localização**: `src/app/pages/home/home.ts`

**Responsabilidades**:
- Página principal da aplicação
- Gerenciamento de filtros (clientes, documentos, processos)
- Abertura de modais para criação de registros
- Navegação entre seções

**Métodos Principais**:
```typescript
abrirModalCliente()      // Abre modal de cliente
abrirModalDocumentos()    // Abre modal de documentos
abrirModalProcessos()     // Abre modal de processos
setFiltro(filtro: string) // Define filtro ativo
```

### 2. Lista Clientes Component

**Localização**: `src/app/components/lista-clientes/lista-clientes.ts`

**Responsabilidades**:
- Exibição da lista de clientes
- Ações: visualizar, editar, excluir
- Formatação de documentos (CPF/CNPJ)
- Menu de contexto

**Métodos Principais**:
```typescript
visualizar(cliente: any)  // Abre modal em modo visualização
editar(cliente: any)      // Abre modal em modo edição
excluir(cliente: any)     // Remove cliente do localStorage
formatarDocumento(cliente: any) // Formata CPF/CNPJ
```

**Detecção de Tipo**:
```typescript
private getTipoCliente(cliente: any): 'pf' | 'pj' {
  return cliente.cpf ? 'pf' : 'pj';
}
```

### 3. Lista Processos Component

**Localização**: `src/app/components/lista-processos/lista-processos.ts`

**Responsabilidades**:
- Exibição da lista de processos
- Busca e filtragem em tempo real
- CRUD completo de processos
- Enriquecimento de dados (nome do cliente)

**Métodos Principais**:
```typescript
carregarProcessos()      // Carrega do ProcessosService
filtrar()                // Filtra por termo de busca
abrirCriar()             // Abre modal para novo processo
editar(proc: any)        // Abre modal para edição
excluir(id: number)      // Remove processo
```

**Busca**:
Filtra por: número do processo, nome do cliente, tipo de ação, status

### 4. Lista Documentos Component

**Localização**: `src/app/components/lista-documentos/lista-documentos.ts`

**Responsabilidades**:
- Exibição da lista de documentos
- Enriquecimento com dados de cliente e processo
- Busca e filtragem
- CRUD completo

**Enriquecimento de Dados**:
```typescript
this.documentos = this.documentos.map(d => {
  const cliente = this.clientes.find(c => c.id === d.cliente);
  const processo = this.processos.find(p => p.id === d.processo);
  
  return {
    ...d,
    clienteNome: cliente ? cliente.nome : 'Cliente não encontrado',
    numeroProcesso: processo ? processo.numeroProcesso : 'Processo não encontrado'
  };
});
```

---

## 🔧 Serviços

### 1. ClienteService

**Localização**: `src/app/Modal/cliente/cliente.service.ts`

**Responsabilidades**:
- Gerenciamento de clientes no LocalStorage
- Normalização de dados PF/PJ
- CRUD completo

**Métodos**:

```typescript
getClientes(): any[]                    // Retorna todos os clientes
salvar(payload: any): any              // Salva ou atualiza cliente
updateCliente(cliente: any)            // Atualiza cliente existente
deleteCliente(id: any)                 // Remove cliente
```

**Normalização de Dados**:
```typescript
salvar(payload: any): any {
  const isPJ = !!payload.cnpj;
  const nome = payload.nome || payload.razaoSocial || payload.nomeFantasia || '';
  
  const cliente = {
    ...payload,
    id: payload.id || Date.now(),
    tipo: isPJ ? 'PJ' : 'PF',
    nome: nome,
    documento: payload.cpf || payload.cnpj || '',
    dataCadastro: payload.dataCadastro || new Date().toISOString(),
  };
  
  // Lógica de atualização ou inserção
}
```

**Chave LocalStorage**: `'clientes'`

### 2. ProcessosService

**Localização**: `src/app/Modal/processos/processos.service.ts`

**Responsabilidades**:
- Gerenciamento de processos no LocalStorage
- Correção automática de referências de cliente
- CRUD completo

**Métodos**:

```typescript
getProcessos(): any[]                  // Retorna todos os processos
addProcesso(processo: any)             // Adiciona novo processo
updateProcesso(processoAtualizado: any) // Atualiza processo
deleteProcesso(id: number)             // Remove processo
```

**Correção Automática**:
```typescript
private corrigirProcesso(p: any) {
  const clientes = this.clienteService.getClientes();
  
  // Se cliente está como número → substituir pelo objeto completo
  if (p.cliente && typeof p.cliente === 'number') {
    const encontrado = clientes.find(c => c.id === p.cliente);
    if (encontrado) p.cliente = encontrado;
  }
  
  return p;
}
```

**Chave LocalStorage**: `'processos'`

### 3. DocumentosService

**Localização**: `src/app/Modal/documentos/documentos.service.ts`

**Responsabilidades**:
- Gerenciamento de documentos no LocalStorage
- CRUD completo

**Métodos**:

```typescript
getDocumentos(): any[]                 // Retorna todos os documentos
addDocumento(doc: any)                 // Adiciona novo documento
updateDocumento(doc: any)              // Atualiza documento
deleteDocumento(id: number)            // Remove documento
```

**Chave LocalStorage**: `'documentos'`

---

## 📊 Estrutura de Dados

### Cliente (PF)

```typescript
interface ClientePF {
  id: number | null;
  nome: string;                    // Obrigatório
  cpf: string;
  dataNascimento: string;
  email: string;                    // Validação de email
  telefone: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  observacoes: string;
  
  // Campos normalizados
  tipo: 'PF';
  documento: string;                // CPF formatado
  dataCadastro: string;             // ISO string
}
```

### Cliente (PJ)

```typescript
interface ClientePJ {
  id: number | null;
  razaoSocial: string;              // Obrigatório
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  email: string;                    // Validação de email
  responsavel: string;
  cpfResponsavel: string;
  telefone: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  observacoes: string;
  
  // Campos normalizados
  tipo: 'PJ';
  nome: string;                     // razaoSocial ou nomeFantasia
  documento: string;                // CNPJ formatado
  dataCadastro: string;             // ISO string
}
```

### Processo

```typescript
interface Processo {
  id: number | null;
  cliente: any;                     // Objeto cliente completo (obrigatório)
  numeroProcesso: string;            // Obrigatório
  tipoAcao: string;                 // Obrigatório: 'Cível', 'Criminal', 'Trabalhista'
  areaDireito: string;              // Obrigatório: 'Civil', 'Trabalhista', 'Penal'
  status: string;                   // Obrigatório: 'Em andamento', 'Concluído', 'Arquivado'
  comarcaVara: string;
  dataDistribuicao: string;         // Obrigatório
  juiz: string;
  observacoes: string;
}
```

### Documento

```typescript
interface Documento {
  id: number | null;
  cliente: string;                  // ID do cliente (obrigatório)
  processo: string;                 // ID do processo (obrigatório)
  linkDocumento: string;            // Obrigatório
  tipoDocumento: string;            // Obrigatório: 'Petição', 'Sentença', 'Despacho', 'Outro'
  observacoes: string;
  dataCadastro: string;             // ISO string (gerado automaticamente)
  
  // Campos enriquecidos (não salvos)
  clienteNome?: string;
  numeroProcesso?: string;
}
```

---

## 🔄 Fluxo de Dados

### Criação de Cliente

```
1. Usuário clica em "Clientes" → "Novo Cliente"
2. Home.abrirModalCliente() abre modal Cliente
3. Usuário preenche formulário (PF ou PJ)
4. Cliente.onSubmitPF() ou Cliente.onSubmitPJ()
5. ClienteService.salvar() normaliza dados
6. Dados salvos no LocalStorage (chave: 'clientes')
7. Modal fecha e retorna cliente criado
8. ListaClientesComponent atualiza automaticamente
```

### Criação de Processo

```
1. Usuário clica em "Processos" → "Novo Processo"
2. Home.abrirModalProcessos() abre modal Processos
3. Processos.ngOnInit() carrega clientes via ClienteService
4. Usuário seleciona cliente e preenche dados
5. Processos.onSubmit() valida formulário
6. Modal fecha retornando processo completo
7. ListaProcessosComponent recebe processo
8. ProcessosService.addProcesso() salva no LocalStorage
9. Lista atualizada automaticamente
```

### Criação de Documento

```
1. Usuário clica em "Documentos" → "Novo Documento"
2. Home.abrirModalDocumentos() abre modal Documentos
3. Documentos.ngOnInit():
   - Carrega clientes
   - Carrega processos
   - Configura listener de mudança de cliente
4. Usuário seleciona cliente → processos filtrados
5. Usuário seleciona processo e preenche dados
6. Documentos.onSubmitDocumento() valida
7. DocumentosService.addDocumento() salva
8. Modal fecha retornando true
9. ListaDocumentosComponent recarrega dados
```

### Filtragem de Processos por Cliente (Documentos)

```typescript
// Listener reativo no Documentos Component
ouvirMudancaCliente() {
  this.documentoForm.get('cliente')?.valueChanges.subscribe(clienteId => {
    if (!clienteId) {
      this.processosFiltrados = [];
      return;
    }
    
    // Filtra processos do cliente selecionado
    this.processosFiltrados = this.processos.filter(p => {
      const pCliente = p.cliente ?? p.clienteId ?? (p.cliente && p.cliente.id);
      return pCliente === clienteId || (p.cliente && p.cliente.id === clienteId);
    });
    
    // Limpa seleção de processo
    this.documentoForm.get('processo')?.setValue('');
  });
}
```

---

## 📝 Padrões de Código

### Convenções de Nomenclatura

- **Componentes**: PascalCase (`ListaClientesComponent`)
- **Serviços**: PascalCase com sufixo `Service` (`ClienteService`)
- **Métodos**: camelCase (`abrirModalCliente()`)
- **Variáveis**: camelCase (`clientes`, `processosFiltrados`)
- **Interfaces/Types**: PascalCase (`ClientePF`, `Processo`)

### Estrutura de Componente

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exemplo.html',
  styleUrls: ['./exemplo.scss']
})
export class ExemploComponent {
  // 1. Propriedades públicas
  dados: any[] = [];
  
  // 2. Propriedades privadas
  private service: ExemploService;
  
  // 3. Constructor
  constructor(private service: ExemploService) {}
  
  // 4. Lifecycle hooks
  ngOnInit() {}
  
  // 5. Métodos públicos
  public metodoPublico() {}
  
  // 6. Métodos privados
  private metodoPrivado() {}
}
```

### Validação de Formulários

```typescript
// Reactive Forms com validação
this.form = this.fb.group({
  campo: ['', [Validators.required, Validators.email]],
  outroCampo: ['', Validators.required]
});

// Verificação antes de submit
onSubmit() {
  if (this.form.invalid) return;
  // Lógica de salvamento
}
```

### Tratamento de Dados

```typescript
// Sempre verificar existência antes de usar
const dados = JSON.parse(localStorage.getItem('chave') || '[]');

// Normalizar dados ao salvar
const normalizado = {
  ...dados,
  id: dados.id || Date.now(),
  dataCadastro: dados.dataCadastro || new Date().toISOString()
};
```

---

## 💾 Persistência de Dados

### LocalStorage

O sistema utiliza **LocalStorage** do navegador para persistência:

| Chave | Descrição | Estrutura |
|-------|-----------|-----------|
| `'clientes'` | Lista de clientes | `Array<ClientePF | ClientePJ>` |
| `'processos'` | Lista de processos | `Array<Processo>` |
| `'documentos'` | Lista de documentos | `Array<Documento>` |

### Operações

```typescript
// Leitura
const dados = JSON.parse(localStorage.getItem('chave') || '[]');

// Escrita
localStorage.setItem('chave', JSON.stringify(dados));

// Remoção
localStorage.removeItem('chave');

// Limpeza completa
localStorage.clear();
```

### Limitações

- **Tamanho**: ~5-10MB por domínio
- **Persistência**: Dados locais ao navegador
- **Sincronização**: Não há sincronização entre dispositivos
- **Backup**: Não há backup automático

### Migração Futura

Para migrar para API backend:

1. Criar interfaces de serviço abstratas
2. Implementar serviços HTTP com `HttpClient`
3. Substituir chamadas de LocalStorage
4. Adicionar tratamento de erros e loading states

---

## 🛣️ Roteamento

### Configuração

**Arquivo**: `src/app/app.routes.ts`

```typescript
export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

### Estrutura Atual

- **Rota única**: `/` → `HomeComponent`
- **Navegação interna**: Via filtros e modais (não usa rotas)
- **Redirecionamento**: Qualquer rota inválida redireciona para `/`

### Expansão Futura

Para adicionar rotas:

```typescript
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'clientes', component: ListaClientesComponent },
  { path: 'processos', component: ListaProcessosComponent },
  { path: 'documentos', component: ListaDocumentosComponent },
  { path: '**', redirectTo: '' }
];
```

---

## 🎨 Estilização

### SCSS

- **Global**: `src/styles.scss`
- **Componentes**: Cada componente tem seu arquivo `.scss`
- **Variáveis**: Definidas em `styles.scss` (se necessário)

### Angular Material

Componentes utilizados:

- `MatDialog` - Modais
- `MatFormField` - Campos de formulário
- `MatInput` - Inputs
- `MatButton` - Botões
- `MatTabs` - Abas (PF/PJ)
- `MatSelect` - Seletores
- `MatDatepicker` - Seletores de data
- `MatIcon` - Ícones

### Responsividade

- **Desktop**: Layout completo
- **Tablet**: Adaptação de modais (90vw, max-width: 1200px)
- **Mobile**: Ajustes necessários (não totalmente responsivo ainda)

---

## 🧪 Testes

### Estrutura de Testes

Cada componente possui arquivo `.spec.ts`:

```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentName]
    });
    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Executar Testes

```bash
npm test
# ou
ng test
```

### Cobertura

- **Framework**: Jasmine + Karma
- **Configuração**: `karma.conf.js` e `tsconfig.spec.json`

---

## 🔐 Segurança

### Considerações Atuais

- **Validação de formulários**: Apenas no frontend
- **Sanitização**: Não implementada
- **Autenticação**: Não implementada
- **Autorização**: Não implementada

### Recomendações

1. **Validação no Backend**: Sempre validar dados no servidor
2. **Sanitização**: Sanitizar inputs para prevenir XSS
3. **Autenticação**: Implementar JWT ou OAuth
4. **HTTPS**: Usar HTTPS em produção
5. **CORS**: Configurar CORS adequadamente

---

## 🚀 Performance

### Otimizações Implementadas

- **Standalone Components**: Redução de bundle size
- **OnPush Change Detection**: (Não implementado, mas recomendado)
- **Lazy Loading**: (Não implementado, mas recomendado para rotas)

### Recomendações

1. **Lazy Loading**: Carregar componentes sob demanda
2. **OnPush**: Usar `ChangeDetectionStrategy.OnPush`
3. **TrackBy**: Implementar `trackBy` em `*ngFor`
4. **Virtual Scrolling**: Para listas grandes
5. **Code Splitting**: Dividir código em chunks

---

## 📚 Recursos Adicionais

### Documentação Angular

- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [Angular CLI](https://angular.io/cli)

### Boas Práticas

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [RxJS Best Practices](https://rxjs.dev/guide/overview)

---

## 🔄 Versionamento

### Versão Atual

- **Angular**: 20.1.0
- **TypeScript**: 5.8.2
- **Angular Material**: 20.2.4

### Atualizações

Para atualizar dependências:

```bash
ng update @angular/core @angular/cli
ng update @angular/material
```

---

**Documentação atualizada em**: 2024

**Última revisão**: Versão 1.0

