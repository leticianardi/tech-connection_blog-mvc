const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  Post.findAll({
    // attributes: ['id', 'post_title', 'post_content', 'created_at'],
    include: [User]
  })
    .then((postsData) => {
      const posts = postsData.map((post) => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one post by its id
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    // attributes: ['id', 'post_title', 'post_content', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      post.post_content = post.post_content.split('\n');

      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  res.render('login');
});

// router.get('/logout', (req, res) => {
//   res.render('logout');
// });

// router.get('/homepage', (req, res) => {
//   Post.findAll({
//     attributes: ['id', 'post_title', 'post_content', 'created_at'],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then((postsData) => {
//       const posts = postsData.map((post) => post.get({ plain: true }));
//       res.render('homepage', { posts, loggedIn: req.session.loggedIn });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
