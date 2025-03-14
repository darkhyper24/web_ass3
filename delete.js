const BlogPost = require("./db");
const express = require("express");
const router = express.Router();
router.delete('/posts/:id', async (req, res) => {
    try {
      const post = await BlogPost.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json({ message: 'Post deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;