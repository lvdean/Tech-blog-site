const router = require('express').Router();
const { blogPost } = require('../../models');
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
  
  // // create a comment
  // router.post("/:id/comments", withAuth, async (req, res)=>{
  //   try{
  //     if(!req.body.body){
  //       res.status(400).json({message:"Please provide a comment"});
  //       return;
  //     }
  //     const newComment= await Comment.create({
  //       ...req.body,
  //       user_id: req.session.user_id,
  //       blogPost_id: req.params.id,
  //     });
  //     res.status(200).json(newComment);
  //   } catch (err){
  //     res.status(400).json
  //   }
  // });

module.exports = router;
