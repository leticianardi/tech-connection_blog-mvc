const { Comment } = require('../models');
const commentData = [
  {
    comment_text: 'Great article!',
    user_id: 4,
    post_id: 1
  },
  {
    comment_text: 'Thank you for sharing!',
    user_id: 3,
    post_id: 2
  },
  {
    comment_text: 'Thats very interesting!',
    user_id: 1,
    post_id: 3
  },
  {
    comment_text: 'Interesting, definitely gonna read more about it!',
    user_id: 5,
    post_id: 4
  },
  {
    comment_text: 'Good news i guess!',
    user_id: 2,
    post_id: 5
  }
];
const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;
