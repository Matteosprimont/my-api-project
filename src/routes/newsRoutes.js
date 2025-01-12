import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM news');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Kan nieuwsberichten niet ophalen.' });
    }
});

router.post('/', async (req, res) => {
    const { title, content, image_url } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Titel en inhoud zijn verplicht.' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO news (title, content, image_url, published_at) VALUES (?, ?, ?, NOW())',
            [title, content, image_url || null]
        );
        res.status(201).json({ id: result.insertId, title, content, image_url });
    } catch (error) {
        res.status(500).json({ error: 'Kan nieuwsbericht niet toevoegen.' });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM news WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nieuwsbericht niet gevonden.' });
        }

        res.status(200).json({ message: 'Nieuwsbericht verwijderd.' });
    } catch (error) {
        res.status(500).json({ error: 'Kan nieuwsbericht niet verwijderen.' });
    }
});


export default router;
