const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET all
app.get('/api/recipes', (req, res) => {
    db.all("SELECT * FROM recipes", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET by ID
app.get('/api/recipes/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM recipes WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Record not found" });
        res.json(row);
    });
});

// POST create
app.post('/api/recipes', (req, res) => {
    const { title, ingredients, instructions, prep_time_mins, category } = req.body;
    const query = `INSERT INTO recipes (title, ingredients, instructions, prep_time_mins, category) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [title, ingredients, instructions, prep_time_mins, category], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, ingredients, instructions, prep_time_mins, category });
    });
});

// PUT update
app.put('/api/recipes/:id', (req, res) => {
    const { id } = req.params;
    const { title, ingredients, instructions, prep_time_mins, category } = req.body;
    const query = `UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, prep_time_mins = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    db.run(query, [title, ingredients, instructions, prep_time_mins, category, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Record not found" });
        res.json({ message: "Updated successfully", id, title, ingredients, instructions, prep_time_mins, category });
    });
});

// DELETE
app.delete('/api/recipes/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM recipes WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Record not found" });
        res.json({ message: "Deleted successfully", id });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});