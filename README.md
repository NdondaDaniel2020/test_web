# test_web

Projeto fullstack em construcao com:

- Backend: Node.js + Express + Prisma
- Banco: MongoDB
- Frontend: pasta criada, ainda sem implementacao

## Visao geral da implementacao (ate esta etapa)

O backend expoe uma API HTTP simples para cadastro e listagem de usuarios.

- `GET /` retorna `welcome`
- `POST /user` cria usuario no MongoDB via Prisma
- `GET /users` lista usuarios do MongoDB via Prisma

A API usa:

- `cors` para permitir chamadas do frontend
- `express.json()` para receber JSON no body
- `@prisma/client` para acessar o banco

Modelo atual no Prisma:

- `User`
- Campos: `id` (ObjectId), `email` (unico), `name`

## Estrutura atual

```text
test_web/
	README.md
	backend/
		app.js
		package.json
		prisma.config.ts
		.gitignore
		prisma/
			schema.prisma
	frontend/
```

## Requisitos

Instale antes de rodar o projeto:

1. Node.js 18+
2. npm (normalmente vem com Node.js)
3. MongoDB local OU string de conexao MongoDB Atlas

## Setup do zero

### 1) Entrar no backend

```bash
cd backend
```

### 2) Instalar dependencias

```bash
npm install
```

Dependencias importantes do backend:

- `express`
- `cors`
- `@prisma/client`
- `prisma`
- `dotenv`

### 3) Criar arquivo de ambiente

Crie `backend/.env` com:

```env
DATABASE_URL="mongodb+srv://USUARIO:SENHA@SEU_CLUSTER/NOME_DO_BANCO?retryWrites=true&w=majority"
```

Se usar Mongo local, exemplo:

```env
DATABASE_URL="mongodb://localhost:27017/test_web"
```

### 4) Gerar Prisma Client

```bash
npx prisma generate
```

Esse comando gera o client usado no `app.js`.

### 5) Rodar servidor

```bash
node app.js
```

Servidor sobe em:

- `http://localhost:3000`

## Como testar a API

### Health check

```bash
curl http://localhost:3000/
```

### Criar usuario

```bash
curl -X POST http://localhost:3000/user \
	-H "Content-Type: application/json" \
	-d '{"name":"Ana","email":"ana@email.com"}'
```

### Listar usuarios

```bash
curl http://localhost:3000/users
```

## Secao frontend

Status atual:

- A pasta `frontend/` existe, mas ainda esta vazia.
- O backend ja esta pronto para ser consumido por frontend via HTTP (CORS habilitado).

### Como iniciar o frontend do zero (opcao recomendada)

No diretorio raiz do projeto:

```bash
npm create vite@latest frontend -- --template vanilla
cd frontend
npm install
npm run dev
```

Depois, no frontend, faca chamadas para:

- `POST http://localhost:3000/user`
- `GET http://localhost:3000/users`

Observacao: para desenvolvimento local, rode backend e frontend em terminais separados.

## Fluxo de desenvolvimento recomendado

1. Suba MongoDB (local ou Atlas)
2. Configure `DATABASE_URL` no `.env`
3. Rode `npx prisma generate`
4. Rode backend com `node app.js`
5. Rode frontend com `npm run dev` (quando implementado)

## Problemas comuns

### Erro de Prisma Client nao encontrado

Rode novamente:

```bash
npx prisma generate
```

### Erro de conexao com banco

1. Verifique `DATABASE_URL`
2. Confirme acesso de rede no Atlas (IP whitelist), se aplicavel
3. Confira usuario/senha e nome do banco

### Erro de email duplicado

O campo `email` do modelo `User` eh unico. Nao pode repetir o mesmo valor.
