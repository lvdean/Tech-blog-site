const router = require('express').Router();
const { blogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newblog = await blogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newblog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await blogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a blog post

router.put('/:id', async (req, res) => {
    try {
      const blogData = await blogPost.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!blogData[0]) {
        res.status(404).json({ message: 'No blog with this id!' });
        return;
      }
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json({ message: 'Internal error!' });
    }
  });
  
  // create a comment
  // POST route to add a comment
router.post('/:id/comments', async (req, res) => {
  try {
      const { commentText } = req.body;
      const blogId = req.params.id;

      if (!req.session.user_id) {
        return res.status(401).json({ message: 'You must be logged in to comment.' });
      }

      if (!commentText.trim() || !blogId) {
        return res.status(400).json({ message: 'Comment text and Blog ID are required.' });
      }
      const newComment = await Comment.create({
          commentText,
          blog_id: blogId, // Make sure this matches the field name in your database
          user_id: req.session.user_id, // Adjust if your session has the user ID
      });

      res.status(201).json(newComment); // Respond with the newly created comment
  } catch (err) {
      console.error('Failed to add comment:', err);
      res.status(500).json({ message: 'Failed to add comment' });
  }
});

module.exports = router;
