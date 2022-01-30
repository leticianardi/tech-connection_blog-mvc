// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

//User has many posts
User.hasMany(Post, {
  foreignKey: 'user_id'
});

//Post belongs to one user
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

//Comment belongs to one user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

//Comment belongs to one post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

//User has many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

//Post has many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
