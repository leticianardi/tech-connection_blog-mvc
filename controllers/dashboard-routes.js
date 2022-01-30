const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the id from the session
      user_id: req.session.user_id
    }
  })
    .then((postsData) => {
      // serialize data before passing to template
      const posts = postsData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then((postsData) => {
      if (postsData) {
        const post = postsData.get({ plain: true });

        res.render('edit-post', { post, loggedIn: req.session.loggedIn });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/delete', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ['id', 'post_title', 'post_content', 'source', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    .then((postsData) => {
      if (postsData) {
        const post = postsData.get({ plain: true });

        res.render('edit-post', { post, loggedIn: true });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
