# test_web

Projeto fullstack com:

- Backend: Node.js + Express + Prisma
- Banco: MongoDB
- Frontend: React + Vite + Axios

## O que existe hoje

O projeto ja tem uma API funcionando e um frontend consumindo essa API.

### Backend

Rotas disponiveis:

- `GET /` retorna `welcome`
- `POST /user` cria um usuario
- `PUT /user` atualiza um usuario pelo `email`
- `DELETE /user` remove um usuario pelo `email`
- `GET /users` lista todos os usuarios

Tecnologias usadas no backend:

- `express`
- `cors`
- `@prisma/client`
- `prisma`
- `dotenv`

### Frontend

O frontend usa:

- React
- Vite
- `axios` para consumir a API

A tela principal faz:

- carregar os usuarios ao abrir a pagina
- criar usuario
- editar usuario
- deletar usuario

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
    src/
      index.css
      main.jsx
      assets/
      pages/
        Home/
          index.jsx
          style.css
      services/
        api.js
```

## Requisitos

Antes de rodar o projeto, instale:

1. Node.js 18+
2. npm
3. MongoDB local ou MongoDB Atlas

## Como instalar do zero

### 1) Backend

Entre na pasta do backend e instale as dependencias:

```bash
cd backend
npm install
```

Dependencias principais:

- `express`
- `cors`
- `@prisma/client`
- `prisma`
- `dotenv`

Crie o arquivo `backend/.env` com a URL do banco:

```env
DATABASE_URL="mongodb+srv://USUARIO:SENHA@SEU_CLUSTER/NOME_DO_BANCO?retryWrites=true&w=majority"
```

Exemplo local:

```env
DATABASE_URL="mongodb://localhost:27017/test_web"
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Suba o backend em modo desenvolvimento:

```bash
node --watch app.js
```

Se preferir, rode sem watch:

```bash
node app.js
```

Abra o Prisma Studio quando quiser visualizar os dados:

```bash
npx prisma studio
```

### 2) Frontend

Entre na pasta do frontend e instale as dependencias:

```bash
cd ../frontend
npm install
```

Dependencias principais do frontend:

- `react`
- `react-dom`
- `vite`
- `axios`

Suba o frontend:

```bash
npm run dev
```

## Como funciona a implementacao

### Prisma

O schema atual possui um modelo `User` com:

- `id` como `ObjectId`
- `email` unico
- `name`

O arquivo de configuracao `backend/prisma.config.ts` usa a variavel `DATABASE_URL` para conectar no banco.

### Backend

O backend cria uma instancia de `PrismaClient` e usa a collection de usuarios via Prisma:

- `prisma.user.create(...)`
- `prisma.user.findMany(...)`
- `prisma.user.update(...)`
- `prisma.user.delete(...)`

### Frontend

O arquivo `frontend/src/services/api.js` centraliza a baseURL da API em `http://localhost:3000`.

A tela `frontend/src/pages/Home/index.jsx`:

- busca usuarios com `GET /users`
- cria usuario com `POST /user`
- atualiza usuario com `PUT /user`
- remove usuario com `DELETE /user`

## Como testar

### Backend

Health check:

```bash
curl http://localhost:3000/
```

Criar usuario:

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@email.com"}'
```

Listar usuarios:

```bash
curl http://localhost:3000/users
```

### Frontend

Com o backend e o frontend rodando, abra a aplicacao no navegador e use o formulario para cadastrar, editar e excluir usuarios.

## Fluxo recomendado de desenvolvimento

1. Inicie o MongoDB
2. Configure `backend/.env`
3. Rode `npx prisma generate` dentro de `backend`
4. Suba o backend com `node --watch app.js`
5. Suba o frontend com `npm run dev`
6. Use `npx prisma studio` para inspecionar os dados

## Problemas comuns

### Prisma Client nao encontrado

Rode novamente:

```bash
npx prisma generate
```

### Erro de conexao com banco

1. Verifique `DATABASE_URL`
2. Confirme o acesso ao MongoDB Atlas, se estiver usando Atlas
3. Confira usuario, senha e nome do banco

### Email duplicado

O campo `email` do modelo `User` eh unico. Nao pode repetir o mesmo valor.
