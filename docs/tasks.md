# iCEVConnect: Tarefas 

## Frontend 

- [x] Setup inicial do projeto usando Next.js e ShadcnUI
- [ ] Estrutura inicial das páginas relacionadas ao aluno:
    - [x] Página de login (OAuth)
    - [x] Página inicial (home)
    - [x] Página de listagem de artigos sobre um deterninado tópico
    - [x] Página de mostra o conteúdo de uma postagem
    - [ ] Página de criação de artigo (escrita)
    - [x] Página do perfil do aluno
- [ ] Estrutura inicial das páginas de admin:
    - [x] Página de login (email e senha)
    - [x] Página de usuários
    - [ ] Página de postagens
    - [ ] Página de tópicos

## Backend 

- [x] Setup inicial do projeto usando Nest.js e Prisma ORM
- [x] Estrutura inicial do banco de dados (schema do prisma)
- [x] Criação do módulo de banco de dados (prisma service)
- [x] Criação do módulo de autenticação:
    - [x] Integração com o Google para login com e-mail institucional (OAuth)
    - [x] Sistema de login para admin (email e senha)
    - [x] Guardas de rotas (jwt)
- [x] Criação do módulo de usuário:
    - [x] Endpoint que retorna o perfil do usuário logado
    - [x] Metódos para integrar como o módulo de autenticação
- [x] Criação do módulo de tópicos:
    - [x] Endpoint que retorna o perfil do usuário logado
    - [x] Metódos para integrar como o módulo de autenticação

- [ ] Criação do módulo de postagens (module + controller + service)
- [ ] Funcionalides de criar uma postagem