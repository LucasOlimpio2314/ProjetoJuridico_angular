# Projeto Jurídico Angular

Projeto de gerenciamento jurídico desenvolvido em Angular, focado em controle de clientes, documentos e processos. Possui dashboards resumidos, listagens detalhadas e estrutura modularizada, tornando a manutenção e expansão mais fáceis.

## 📹 Demonstração do Projeto

[Assista ao vídeo demonstrativo](COLE_AQUI_O_LINK_DO_VIDEO)

## 🛠 Tecnologias Utilizadas

- Angular 16
- TypeScript
- HTML / SCSS
- Git
- VSCode

## 🗂 Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `src/app/Modal/cliente` → Cadastro e serviços de clientes
- `src/app/Modal/documentos` → Cadastro e serviços de documentos
- `src/app/Modal/processos` → Cadastro e serviços de processos
- `src/app/components` → Componentes de listas e dashboards
- `src/app/pages/home` → Página principal com dashboard resumido
- `src/styles.scss` → Estilos globais

Cada módulo possui models, services e templates (HTML/SCSS) separados, seguindo boas práticas de Angular.

## ⚙️ Instalação e Execução

1. Clone o repositório.
2. Entre na pasta do projeto.
3. Instale as dependências com `npm install`.
4. Execute o projeto com `ng serve`.
5. Acesse `http://localhost:4200` no navegador.

O projeto está pronto para rodar localmente, com todas as funcionalidades de cadastro, listagem e dashboards.

## 🚀 Funcionalidades

- Cadastro e listagem de clientes, documentos e processos
- Dashboard com resumo de totais de cada categoria
- Componentes reutilizáveis e modularizados
- Suporte a testes unitários para cada módulo
- Estrutura organizada para facilitar manutenção e futuras melhorias

## 📖 Documentação das Pastas e Serviços

**Clientes:** model `cliente.ts`, serviço `cliente.service.ts` e templates (`.html` / `.scss`)  
**Documentos:** model `documentos.ts`, serviço `documentos.service.ts` e templates (`.html` / `.scss`)  
**Processos:** model `processos.ts`, serviço `processos.service.ts` e templates (`.html` / `.scss`)  
**Componentes de Listagem:** `lista-clientes`, `lista-documentos`, `lista-processos`  
**Página Principal:** `home.ts` / `.html` / `.scss`, com dashboard resumido de totais

## 🧪 Testes

Todos os serviços e componentes possuem testes unitários (`.spec.ts`) garantindo qualidade do código.

## 🤝 Contribuição

Pull requests são bem-vindos! Para mudanças maiores, abra uma issue para discutir antes de implementar.

## 📜 Licença

MIT License
