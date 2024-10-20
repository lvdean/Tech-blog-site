const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// matching comment with the blog and user
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    commentText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    blog_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'blogPost',
          key: 'id',
        },
      onUpdate: 'CASCADE', 
      onDelete: 'SET NULL',
      },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
    tableName: 'comment'
  }
);

module.exports = Comment;
