const blogPost = require('./blogPost')
const User = require ('./User')
const Comment = require ('./Comment')
blogPost.belongsTo(User, {
    foreignKey:"user_id"
})


User.hasMany(blogPost, {
    foreignKey: "user_id"
})

blogPost.hasMany(Comment,{
    foreignKey:"blog_id"
})

Comment.belongsTo(User,{
    foreignKey:"user_id"
})

module.exports = {blogPost, User, Comment}