import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Conexão MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Conexão bem-sucedida!', result: rows[0].solution });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao conectar ao banco de dados', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
}); 