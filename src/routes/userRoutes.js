import express from 'express';
import pool from '../db.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Kan gebruikers niet ophalen.' });
  }
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Vul alle velden in.' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ error: 'Kan gebruiker niet toevoegen.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
    }

    res.status(200).json({ message: 'Gebruiker verwijderd.' });
  } catch (error) {
    res.status(500).json({ error: 'Kan gebruiker niet verwijderen.' });
  }
});

export default router;
