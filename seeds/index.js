const sequelize = require('../config/connection');
const { User, blogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    // Sync the database
    await sequelize.sync({ force: true });

    // Create Users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Create Blog Posts
    const blogs = await Promise.all(
      blogData.map((blog) =>
        blogPost.create({
          ...blog,
          user_id: users[Math.floor(Math.random() * users.length)].id,
        })
      )
    );

    console.log('Blogs created:', blogs.length); // Log for debugging

    // Create Comments
    await Promise.all(
      commentData.map((comment) =>
        Comment.create({
          ...comment,
          user_id: users[Math.floor(Math.random() * users.length)].id,
          blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
        })
      )
    );

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
};

seedDatabase();
