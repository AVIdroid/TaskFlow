const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

// POST - Create new todo
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO todos (title, description, completed) VALUES ($1, $2, false) RETURNING *',
      [title.trim(), description?.trim() || '']
    );
    res.redirect('/');
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Error creating todo' });
  }
});

// GET - Edit todo page
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Todo not found');
    }
    res.render('edit', { todo: result.rows[0] });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).send('Error loading todo');
  }
});

// PUT - Update todo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const result = await db.query(
      'UPDATE todos SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title.trim(), description?.trim() || '', id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ success: true, todo: result.rows[0] });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Error updating todo' });
  }
});

// POST - Update todo (form submission)
router.post('/:id/update', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).send('Title is required');
  }

  try {
    await db.query(
      'UPDATE todos SET title = $1, description = $2 WHERE id = $3',
      [title.trim(), description?.trim() || '', id]
    );
    res.redirect('/');
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send('Error updating todo');
  }
});

// POST - Toggle completion status
router.post('/:id/toggle', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ success: true, todo: result.rows[0] });
  } catch (error) {
    console.error('Error toggling todo:', error);
    res.status(500).json({ error: 'Error toggling todo' });
  }
});

// DELETE - Delete todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

// POST - Delete todo (form submission)
router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM todos WHERE id = $1', [id]);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Error deleting todo');
  }
});

module.exports = router;
