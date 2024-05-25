# Projeto de Criação e Gerenciamento de Notas

Este projeto é uma API backend que possibilita a criação de usuários, bem como a criação e gerenciamento de anotações por esses usuários. As anotações podem ter tags e links, e os usuários podem pesquisar suas notas por tags, pelo título completo ou por qualquer palavra que conste no título.

![Untitled](https://github.com/erickromao/api-creation-users-CRUD/assets/123843702/5a1d5250-c7e3-44ac-ad1f-0f47dba2c237)

[Documentação do projeto](https://github.com/erickromao/api-creation-users-CRUD/files/15445246/API-NotesAndTags-2024.1.pdf)


## Funcionalidades

- **Criar Usuário**: Permite a criação de novos usuários.
- **Listar Usuários**: Listar informações de um usuário cadastrado.
- **Atualizar Usuário**: Atualiza os dados de um usuário existente.
- **Deletar Usuário**: Remove um usuário do sistema.
- **Criar Nota**: Permite a criação de novas notas com título, conteúdo, tags e links.
- **Listar Todas as Notas**: Recupera uma lista de todas as notas de um usuário.
- **Listar Uma Nota**: Retorna uma nota específica por ID.
- **Deletar Nota**: Remove uma nota do sistema.
- **Pesquisar Notas**: Permite a busca de notas por tags, título ou qualquer palavra no título.
- **Pesquisar Tags**: Permite buscar todas as tags cadastradas de um usuário.

## Tecnologias Utilizadas

- **JavaScript**: Linguagem de programação usada para desenvolver a aplicação.
- **Node.js**: Ambiente de execução JavaScript server-side.
- **Express**: Framework web para Node.js.
- **SQLite**: Banco de dados SQL leve para armazenamento de dados.
- **Knex.js**: Query builder para SQL usado para interagir com o banco de dados.
- **Git**: Sistema de controle de versão.
- **GitHub**: Plataforma de hospedagem de código-fonte e controle de versão.

## Estrutura do Banco de Dados

- A tabela **"users"** foi criada utilizando SQL puro para fins de prática.
- As tabelas **"notes"**, **"tags"** e **"links"** foram criadas utilizando Knex.js.

## Instalação

Para instalar e rodar o projeto, siga os passos abaixo:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Navegue até o diretório do projeto
cd seu-repositorio

# Instale as dependências
npm install

# Rode as migrações do banco de dados
npx knex migrate:latest

# Rode a aplicação
npm start
