const { pool, getBlogPostsCollection } = require("./db");
const express = require("express");
const router = express.Router();
router.get("/authors", async (req, res) => {
    try {
      const allBooks = await pool.query("SELECT * FROM authors");
      res.json(allBooks.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
router.get('/posts', async (req, res) => {
    try {
      const postsCollection = getBlogPostsCollection();
      const posts = await postsCollection.find().toArray();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
  module.exports = router;