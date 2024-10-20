const router = require('express').Router();
const { blogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
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

    // Pass serialized data and session flag into template
    res.render('home', { 
      blogs, 
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
console.log(blog)
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
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err) 
    res.status(500).json(err);
  }
});



// GET /comment/:id - Render the comment page for a specific blog post
// router.get('/comment/:id', async (req, res) => {
//   try {
//     const blogData = await blogPost.findByPk(req.params.id, {
//       include: [
//         { model: User, attributes: ['name'] }, // Blog post author
//         {
//           model: Comment,
//           include: [{ model: User, attributes: ['name'] }], // Comment authors
//         },
//       ],
//     });

//     if (!blogData) {
//       return res.status(404).json({ message: 'Blog post not found' });
//     }

//     const blogPost = blogData.get({ plain: true });

//     res.render('comment', {
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     console.error('Error loading comment page:', err);
//     res.status(500).json(err);
//   }
// });




// router.get('/comments/:id', async (req, res) => {
//   try {
    // console.log(`Fetching comment with ID: ${req.params.id}`); // Log the ID
//     const commentData = await Comment.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//         {
//           model: blogPost,
//           attributes:['title','content'],
//           include: [
//             {model: User,
//             attributes: ['name']
//           },
//         ],
//       },
//     ],
//   })
  // console.log(commentData)
  // const comment = commentData.get({ plain: true });
  //     res.render('comment', {
  //       ...comment,
  //       logged_in: req.session.logged_in
  //     });
  //   } catch (err) {
  //     console.log(err) 
  //     res.status(500).json(err);
  //   }
  // });
//   if (!commentData) {
//     console.log('No comment found for the given ID.'); // Debug log
//     return res.status(404).json({ message: 'Comment not found' });
//   }

//   console.log('Comment data:', JSON.stringify(commentData, null, 2)); // Log the full data

//   const comment = commentData.get({ plain: true });

//   res.render('comment', {
//     ...comment,
//     logged_in: req.session.logged_in,
//   });
// } catch (err) {
//   console.error('Error fetching comment:', err); // Better error logging
//   res.status(500).json(err);
// }
// });


// routing to the signin/signup page or to the dashboard
router.get('/signin', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signin');
});





// router.get('/blogs', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: blogPost }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('blog', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     console.error('Error fetching blogs:', err); // This will print the full error
//   res.status(500).json({ message: 'Internal server error' });
// }
// });

// router.get('/signup', (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/dashboard');
//     return;
//   }

//   res.render('signup');
// });

// router.get('/dashboard', withAuth, (req, res) => {
//   res.render('dashboard'); // Render the dashboard if logged in
// });



module.exports = router;
