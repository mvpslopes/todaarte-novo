import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Conexão MySQL
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
// });

app.get('/', async (req, res) => {
  // Simula resposta sem banco
  res.json({ message: 'API online (sem banco de dados)' });
});

// Rota de login fake
app.post('/api/login', async (req, res) => {
  // Simula resposta de login sem banco
  res.json({ user: { id: 1, email: 'demo@demo.com', nome: 'Usuário Demo' } });
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
}); 