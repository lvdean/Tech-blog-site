const blogPost = require('./blogPost')
const User = require ('./User')
blogPost.belongsTo(User, {
    foreignKey:"user_id"
})


User.hasMany(blogPost, {
    foreignKey: "user_id"
})
User.hasMany(Comment, {
    foreignKey: "user_id"
})

blogPost.hasMany(Comment,{
    foreignKey:"blog_id"
})

Comment.belongsTo(User,{
    foreignKey:"user_id"
})
Comment.belongsTo(blogPost,{
    foreignKey:"blog_id"
})

module.exports = {blogPost, User, Comment}