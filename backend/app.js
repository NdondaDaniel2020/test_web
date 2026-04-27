import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// rota de teste
app.get('/', (req, res) => {
  res.send('welcome');
})

// criar um novo usuário
app.post('/user', async (req, res) => {
  const user = await prisma.user.create({data: req.body})
  res.status(201).json(user);
});

// editar usuario
app.put('/user', async (req, res) => {
  const user = await prisma.user.update({
    where: { email: req.body.email },
    data: req.body
  });
  res.json(user);
});

// deletar usuario
app.delete('/user', async (req, res) => {
  const user = await prisma.user.delete({
    where: { email: req.body.email }
  });
  res.json(user);
});

// listar todos os usuários
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
