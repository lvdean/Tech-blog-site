const router = require('express').Router();
const { blogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', async (req, res) => {
  console.log("Route '/' hit");
  try {
    console.log("Session Data:", req.session);
   
    const blogData = await blogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {model: User,
            attributes: ['name']
            },
          ],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // console.log(blogs); // check if this correct
console.log(req.session)
    // Pass serialized data and session flag into template
    res.render('home', { 
      blogs, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
 
});



router.get('/blogPost/:id', async (req, res) => {
  try {
    const blogData = await blogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {model: User,
            attributes: ['name']
            },
          ],
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err) 
    res.status(500).json(err);
  }
});

// Access to dashboard using withAuth middleware to prevent access to route if not logged in
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
   
      attributes: { exclude: ['password'] },
      include: [
        {
          model: blogPost,
          include: [{ model: User, attributes: ['name'] }],
        },
      ],
    });
    console.log(userData)

    const user = userData.get({ plain: true });
    console.log(user)

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error('Error fetching user data for dashboard:', err); // Improved error logging
    res.status(500).json(err);
  }
});


router.get('/comment/:id', async (req, res) => {
  try {
    const blogData = await blogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {model: User,
            attributes: ['name']
            },
          ],
        },
      ],
    });
    console.log(blogData)

    const blog = blogData.get({ plain: true });
console.log(blog)
    res.render('comment', {
      ...blog,
      logged_in: true
    });
  } catch (err) {
    console.log(err) 
    res.status(500).json(err);
  }
});



// routing to the signin/signup page or to the dashboard
router.get('/signin', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signin');
});
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  res.render('signup');
});




module.exports = router;
