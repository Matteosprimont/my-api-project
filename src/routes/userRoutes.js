import express from 'express';
import pool from '../db.js'; 

const router = express.Router();

function validateUserData({ name, email, password }) {
  if (!name || /\d/.test(name)) {
      return 'Naam mag niet leeg zijn en mag geen cijfers bevatten.';
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return 'Voer een geldig e-mailadres in.';
  }
  if (password && password.length < 8) {
      return 'Wachtwoord moet minstens 8 tekens lang zijn.';
  }
  return null;
}

router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0; 
  try {
    const [rows] = await pool.query('SELECT * FROM users LIMIT ? OFFSET ?', [limit, offset]);
    res.json(rows);
  } catch (error) {
      res.status(500).json({ error: 'Kan gebruikers niet ophalen.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length === 0) {
          return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
      }
      res.json(rows[0]);
  } catch (error) {
      res.status(500).json({ error: 'Kan gebruiker niet ophalen.' });
  }
});


router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const error = validateUserData({ name, email, password });
  
  if (error) {
      return res.status(400).json({ error });
  }
  try {
      const [result] = await pool.query(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, password]
      );
      res.status(201).json({ id: result.insertId, name, email });
        } catch (err) {
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const error = validateUserData({ name, email, password });

  if (error) {
      return res.status(400).json({ error });
  }
  try {
      const [result] = await pool.query(
          'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
          [name, email, password, id]
      );
      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
      }
      res.status(200).json({ message: 'Gebruiker bijgewerkt.' });
        } catch (err) {
            res.status(500).json({ error: 'Kan gebruiker niet bijwerken.' });
        }
});

export default router;
