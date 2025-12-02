# Projeto Jurídico Angular

Projeto de gerenciamento jurídico desenvolvido em Angular, focado no controle de clientes, documentos e processos. Possui listagens detalhadas, com uma arquitetura modular que facilita manutenção e expansão.

## 📹 Demonstração do Projeto

[Assista ao vídeo demonstrativo](https://drive.google.com/file/d/1pw8IdF9_AL2brVSS35J4TowFClVm5jDk/view?usp=sharing)

## 🛠 Tecnologias Utilizadas

- Angular 16
- TypeScript
- HTML / SCSS
- Git
- VSCode

## 🗂 Estrutura do Projeto

O projeto está organizado de forma modular:

- **Clientes** (`src/app/Modal/cliente`) → Cadastro e gerenciamento de clientes
- **Documentos** (`src/app/Modal/documentos`) → Cadastro e gerenciamento de documentos
- **Processos** (`src/app/Modal/processos`) → Cadastro e gerenciamento de processos
- **Componentes de Listagem** (`src/app/components`) → Visualização de listas e dashboards
- **Página Principal** (`src/app/pages/home`) → Dashboard resumido de totais
- **Estilos Globais** (`src/styles.scss`) → Definição de estilos aplicados em todo o projeto

Cada módulo possui models, services e templates (HTML/SCSS) separados, seguindo boas práticas de desenvolvimento Angular.

## ⚙️ Instalação e Execução

Para rodar o projeto localmente:

1. Clone o repositório.
2. Entre na pasta do projeto.
3. Instale as dependências com `npm install`.
4. Execute o projeto com `ng serve`.
5. Acesse `http://localhost:4200` no navegador.

O projeto está pronto para uso, permitindo cadastro, listagem e visualização resumida de dados jurídicos.

## 🚀 Funcionalidades

- Cadastro e gerenciamento de clientes, documentos e processos
- Listagens detalhadas por categoria
- Dashboard com resumo de totais
- Estrutura modular e organizada, facilitando futuras melhorias
- Interface responsiva e intuitiva

## 📖 Documentação das Pastas e Serviços

- **Clientes:** model `cliente.ts`, serviço `cliente.service.ts`, templates (`.html` / `.scss`)  
- **Documentos:** model `documentos.ts`, serviço `documentos.service.ts`, templates (`.html` / `.scss`)  
- **Processos:** model `processos.ts`, serviço `processos.service.ts`, templates (`.html` / `.scss`)  
- **Componentes de Listagem:** `lista-clientes`, `lista-documentos`, `lista-processos`  
- **Página Principal:** `home.ts` / `.html` / `.scss`, com dashboard resumido de totais

## 🤝 Contribuição

Pull requests são bem-vindos! Para mudanças maiores, abra uma issue para discutir antes de implementar.
