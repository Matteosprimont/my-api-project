import express from 'express';
import pool from '../db.js';

const router = express.Router();

function validateNewsData({ title, content, image_url }) {
    if (!title || title.length < 5) {
        return 'Titel moet minstens 5 karakters bevatten.';
    }
    if (!content || content.length < 10) {
        return 'Inhoud moet minstens 10 karakters bevatten.';
    }
    if (image_url && !/^(https?:\/\/[^\s]+)$/.test(image_url)) {
        return 'Afbeeldings-URL is ongeldig.';
    }
    return null;
}

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM news');
        res.json(rows);
            } catch (error) {
                res.status(500).json({ error: 'Kan nieuwsberichten niet ophalen.' });
            }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Nieuwsbericht niet gevonden.' });
        }
        res.json(rows[0]);
            } catch (error) {
                res.status(500).json({ error: 'Kan nieuwsbericht niet ophalen.' });
            }
});

router.post('/', async (req, res) => {
    const { title, content, image_url } = req.body;
    const error = validateNewsData({ title, content, image_url });

    if (error) {
        return res.status(400).json({ error });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO news (title, content, image_url, published_at) VALUES (?, ?, ?, NOW())',
            [title, content, image_url || null]
        );
        res.status(201).json({ id: result.insertId, title, content, image_url });
            } catch (err) {
                res.status(500).json({ error: 'Kan nieuwsbericht niet toevoegen.' });
            }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, image_url } = req.body;
    const error = validateNewsData({ title, content, image_url });

    if (error) {
        return res.status(400).json({ error });
    }
    try {
        const [result] = await pool.query(
            'UPDATE news SET title = ?, content = ?, image_url = ? WHERE id = ?',
            [title, content, image_url || null, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nieuwsbericht niet gevonden.' });
        }
        res.status(200).json({ message: 'Nieuwsbericht bijgewerkt.' });
            } catch (err) {
                res.status(500).json({ error: 'Kan nieuwsbericht niet bijwerken.' });
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
