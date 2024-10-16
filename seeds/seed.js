const sequelize = require('../config/connection');
const { User, blogPost } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

const blogPromises = blogData.map(blog =>
      blogPost.create({
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id, 
  })
);
    await Promise.all(blogPromises);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1); // Exit with failure code if there's an error.
  }
};

seedDatabase();