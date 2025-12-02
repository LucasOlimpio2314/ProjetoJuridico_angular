## 📹 Demonstração do Projeto

[Assista ao vídeo demonstrativo](https://drive.google.com/file/d/1pw8IdF9_AL2brVSS35J4TowFClVm5jDk/view?usp=sharing)

# 📚 Sistema Jurídico - Tech Jurídico

Sistema de gestão jurídica desenvolvido em Angular para gerenciamento de clientes, processos e documentos jurídicos.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Documentação Técnica](#documentação-técnica)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O **Tech Jurídico** é uma aplicação web moderna desenvolvida em Angular que permite o gerenciamento completo de informações jurídicas, incluindo:

- **Clientes**: Cadastro e gestão de clientes (Pessoa Física e Pessoa Jurídica)
- **Processos**: Controle de processos jurídicos com informações detalhadas
- **Documentos**: Armazenamento e organização de documentos vinculados a processos e clientes

O sistema utiliza **LocalStorage** para persistência de dados, proporcionando uma solução prática e eficiente para escritórios jurídicos de pequeno e médio porte.

## ✨ Funcionalidades

### 👥 Gestão de Clientes

- ✅ Cadastro de **Pessoa Física (PF)** com validação de CPF
- ✅ Cadastro de **Pessoa Jurídica (PJ)** com validação de CNPJ
- ✅ Visualização, edição e exclusão de clientes
- ✅ Formatação automática de documentos (CPF/CNPJ)
- ✅ Campos completos: dados pessoais, contato e endereço

### ⚖️ Gestão de Processos

- ✅ Cadastro de processos jurídicos vinculados a clientes
- ✅ Informações detalhadas: número do processo, tipo de ação, área do direito
- ✅ Status do processo (Em andamento, Concluído, Arquivado)
- ✅ Filtros e busca por número, cliente, tipo ou status
- ✅ Visualização, edição e exclusão de processos

### 📄 Gestão de Documentos

- ✅ Cadastro de documentos vinculados a processos e clientes
- ✅ Tipos de documento: Petição, Sentença, Despacho, Outro
- ✅ Link para documentos externos
- ✅ Filtros por cliente, processo ou tipo de documento
- ✅ Visualização, edição e exclusão de documentos

### 🎨 Interface

- ✅ Design moderno e responsivo com Angular Material
- ✅ Navegação intuitiva com filtros dinâmicos
- ✅ Modais para criação e edição de registros
- ✅ Busca em tempo real nas listagens

## 🛠️ Tecnologias Utilizadas

### Core
- **[Angular](https://angular.io/)** 20.1.0 - Framework principal
- **[TypeScript](https://www.typescriptlang.org/)** 5.8.2 - Linguagem de programação
- **[RxJS](https://rxjs.dev/)** 7.8.0 - Programação reativa

### UI/UX
- **[Angular Material](https://material.angular.io/)** 20.2.4 - Componentes de interface
- **[Angular CDK](https://material.angular.io/cdk)** 20.2.4 - Componentes de desenvolvimento
- **[Font Awesome](https://fontawesome.com/)** 7.0.1 - Ícones
- **[SCSS](https://sass-lang.com/)** - Pré-processador CSS

### Desenvolvimento
- **[Angular CLI](https://angular.io/cli)** 20.1.0 - Ferramentas de linha de comando
- **[Karma](https://karma-runner.github.io/)** 6.4.0 - Test runner
- **[Jasmine](https://jasmine.github.io/)** 5.8.0 - Framework de testes

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[npm](https://www.npmjs.com/)** (geralmente vem com Node.js)
- **[Angular CLI](https://angular.io/cli)** (instalado globalmente)

### Instalando o Angular CLI

```bash
npm install -g @angular/cli
```

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd ProjetoJuridico
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   # ou
   ng serve
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:4200
   ```

## 💻 Como Usar

### Gerenciando Clientes

1. Clique no botão **"Clientes"** na barra de navegação superior
2. Selecione o filtro **"Clientes"** na sub-navegação
3. Clique em **"Novo Cliente"** para cadastrar
4. Escolha entre **Pessoa Física** ou **Pessoa Jurídica**
5. Preencha os campos obrigatórios e salve
6. Use o menu de ações (três pontos) para visualizar, editar ou excluir

### Gerenciando Processos

1. Clique no botão **"Processos"** na barra de navegação
2. Selecione o filtro **"Processos"** na sub-navegação
3. Clique em **"Novo Processo"** para cadastrar
4. Selecione o cliente vinculado
5. Preencha as informações do processo (número, tipo, área, status)
6. Use a busca para filtrar processos por número, cliente ou status

### Gerenciando Documentos

1. Clique no botão **"Documentos"** na barra de navegação
2. Selecione o filtro **"Documentos"** na sub-navegação
3. Clique em **"Novo Documento"** para cadastrar
4. Selecione o cliente e o processo vinculados
5. Informe o tipo de documento e o link
6. Use a busca para filtrar documentos

## 📁 Estrutura do Projeto

```
ProjetoJuridico/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── lista-clientes/
│   │   │   ├── lista-documentos/
│   │   │   └── lista-processos/
│   │   ├── Modal/               # Modais de criação/edição
│   │   │   ├── cliente/
│   │   │   ├── documentos/
│   │   │   └── processos/
│   │   ├── pages/               # Páginas da aplicação
│   │   │   └── home/
│   │   ├── app.ts               # Componente raiz
│   │   ├── app.routes.ts        # Configuração de rotas
│   │   └── app.config.ts        # Configuração da aplicação
│   ├── index.html
│   ├── main.ts                  # Ponto de entrada
│   └── styles.scss              # Estilos globais
├── public/                      # Arquivos estáticos
├── angular.json                 # Configuração do Angular
├── package.json                 # Dependências do projeto
├── tsconfig.json                # Configuração TypeScript
└── README.md                    # Este arquivo
```

### Descrição dos Diretórios

- **`components/`**: Componentes standalone para listagem e exibição de dados
- **`Modal/`**: Componentes modais para criação e edição de registros
- **`pages/`**: Páginas principais da aplicação
- **`services/`**: Serviços para gerenciamento de dados (LocalStorage)

## 📜 Scripts Disponíveis

### Desenvolvimento
```bash
npm start          # Inicia servidor de desenvolvimento (porta 4200)
ng serve           # Mesmo que npm start
```

### Build
```bash
npm run build      # Compila para produção
ng build           # Mesmo que npm run build
```

### Testes
```bash
npm test           # Executa testes unitários
ng test            # Mesmo que npm test
```

### Outros
```bash
ng generate component nome-componente    # Gera novo componente
ng generate service nome-servico         # Gera novo serviço
```

## 📖 Documentação Técnica

Para informações técnicas detalhadas sobre arquitetura, componentes, serviços e padrões de código, consulte a [Documentação Técnica Completa](./DOCUMENTACAO_TECNICA.md).

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript strict mode
- Siga o estilo de código do Angular
- Adicione testes para novas funcionalidades
- Documente funções e classes complexas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para gestão jurídica eficiente.

## 🔮 Próximas Funcionalidades

- [ ] Autenticação e controle de acesso
- [ ] Integração com API backend
- [ ] Exportação de relatórios (PDF, Excel)
- [ ] Dashboard com estatísticas
- [ ] Notificações e lembretes
- [ ] Upload de arquivos de documentos
- [ ] Busca avançada com múltiplos filtros
- [ ] Histórico de alterações
- [ ] Backup e restauração de dados

## 📞 Suporte

Para dúvidas, sugestões ou problemas:

- Abra uma [issue](https://github.com/seu-usuario/ProjetoJuridico/issues) no GitHub
- Entre em contato através do email: [seu-email@exemplo.com]

---

**Desenvolvido com Angular 20** 🚀


