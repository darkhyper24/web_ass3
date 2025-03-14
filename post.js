const {pool, client, getBlogPostsCollection} = require("./db");
const express = require("express");
const router = express.Router();
router.post("/authors", async (req, res) => {
  try {
    console.log("Author request body:", req.body);
    const name = req.body.name ? String(req.body.name) : null;
    const email = req.body.email ? String(req.body.email) : null;
    
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    
    const newBook = await pool.query(
      "INSERT INTO authors (name, email) VALUES ($1, $2) RETURNING *;",
      [name, email]
    );

    res.json(newBook.rows[0]);
  } catch (err) {
    console.error("PostgreSQL error:", err);
    res.status(500).json({ error: err.message });
  }
});
  router.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    try {
      const postsCollection = getBlogPostsCollection();
      const result = await postsCollection.insertOne({ 
        title, 
        content, 
        createdAt: new Date()
      });
      
      res.status(201).json({ 
        _id: result.insertedId,
        title,
        content,
        createdAt: new Date() 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

  module.exports = router;