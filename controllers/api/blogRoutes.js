const router = require('express').Router();
const { blogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await blogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await blogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update a blog post

router.put('blog/:id', async (req, res) => {
    try {
      const userData = await blogPost.update(req.body, {
        where: {
          title: req.params.title,
          content: req.params.content,
        },
      });
      if (!userData[0]) {
        res.status(404).json({ message: 'No blog with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error!' });
    }
  });
  

module.exports = router;
