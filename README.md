# Auster Parfums

Site sobre perfumes e fragrâncias: catálogo, marcas, notas olfativas, ferramentas de descoberta e comunidade. Interface em Next.js com tema claro/escuro.

## Requisitos

- **Node.js** 18 ou superior (recomendado LTS)
- **PostgreSQL** acessível via URL de conexão

## Começando

### 1. Instalar dependências

```bash
npm install
```

O script `postinstall` executa `prisma generate` e gera o cliente Prisma em `lib/generated/prisma` (pasta ignorada pelo Git).

### 2. Variáveis de ambiente

Copie o exemplo e ajuste os valores:

```bash
copy .env.example .env
```

No Linux ou macOS:

```bash
cp .env.example .env
```

Edite `.env`:

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | Connection string do PostgreSQL (usuário, senha, host, porta e nome do banco) |
| `AUTH_SECRET` | Segredo para assinar cookies de sessão (JWT). Use uma string aleatória longa — **mínimo 32 caracteres** |

### 3. Banco de dados

Com o Postgres em execução e `DATABASE_URL` correto:

```bash
npm run db:migrate
```

Isso aplica as migrações em `prisma/migrations`. Em ambientes de CI ou produção sem modo interativo, use:

```bash
npx prisma migrate deploy
```

Para inspecionar dados no navegador:

```bash
npm run db:studio
```

### 4. Servidor de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Build de produção

```bash
npm run build
npm start
```

## Scripts npm

| Comando | Função |
|---------|--------|
| `npm run dev` | Servidor de desenvolvimento Next.js |
| `npm run build` | Build otimizado |
| `npm start` | Sobe a app após `build` |
| `npm run lint` | ESLint (Next.js) |
| `npm run db:migrate` | Cria/aplica migrações Prisma em desenvolvimento |
| `npm run db:push` | Sincroniza o schema ao banco sem migração nomeada (útil em protótipos) |
| `npm run db:studio` | Interface visual do Prisma para o banco |

## Autenticação e perfil

- Registro e login na rota **`/perfil`**, com dados persistidos no PostgreSQL.
- Senhas armazenadas com hash (**bcrypt**). Sessão via cookie HTTP-only (**JWT** com a biblioteca `jose`).
- Perfil: edição de nome, e-mail e senha; exclusão de conta. Para alterar **e-mail** ou **senha**, é necessário informar a senha atual.

Rotas de API principais:

- `POST /api/auth/register` — cadastro
- `POST /api/auth/login` — login
- `POST /api/auth/logout` — sair
- `GET /api/auth/me` — usuário da sessão atual
- `PATCH /api/user` — atualizar perfil
- `DELETE /api/user` — excluir conta

## Stack técnica

- **Next.js** (App Router), **React**, **TypeScript**
- **Tailwind CSS** e componentes estilo **shadcn/ui** (Radix)
- **Prisma** com PostgreSQL (`@prisma/adapter-pg` e driver `pg`)

## Estrutura (resumo)

- `app/` — páginas e rotas da API
- `components/` — componentes React e UI
- `lib/` — utilitários, cliente Prisma, sessão e favoritos no navegador
- `prisma/` — schema e migrações

---

Licença e detalhes do produto seguem as decisões do repositório.
