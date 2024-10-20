const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.commentText,
      user_id: req.session.user_id,
      blog_id: req.session.blog_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
        blog_id: req.session.blog_id
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a blog post

router.put('/:id', async (req, res) => {
    try {
      const commentData = await Comment.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!commentData[0]) {
        res.status(404).json({ message: 'No comment with this id!' });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json({ message: 'Internal error!' });
    }
  });
  

module.exports = router;
