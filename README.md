# API de Tickets

Esta é uma API de tickets desenvolvida com Laravel.

## Funcionalidades

- Autenticação de usuário
- Gerenciamento de tickets (criar, ler, atualizar, deletar)
- Gerenciamento de comentários em tickets
- Gerenciamento de anexos em tickets
- Atribuição de tickets a usuários administradores
- Alteração de status de tickets
- Estatísticas de tickets
- Busca e filtro de tickets

## Como usar

1. Clone o repositório.
2. Instale as dependências com `composer install`.
3. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente, principalmente a conexão com o banco de dados.
4. Gere a chave da aplicação com `php artisan key:generate`.
5. Rode as migrations com `php artisan migrate`.
6. Opcionalmente, rode os seeders para popular o banco de dados com `php artisan db:seed`.
7. Inicie o servidor com `php artisan serve`.

## Documentação da API

A documentação da API é gerada automaticamente com o Scramble. Para acessá-la, inicie o servidor e acesse a rota `/docs`.

## Licença

Este projeto é um software de código aberto licenciado sob a [licença MIT](https://opensource.org/licenses/MIT).
