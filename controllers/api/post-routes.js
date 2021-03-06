const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// // get all posts
// router.get('/', (req, res) => {
//   Post.findAll({
//     // attributes: ['id', 'post_title', 'post_content', 'source', 'created_at'],
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
//     .then((postsData) => res.json(postsData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// find one post by its id
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'post_title', 'post_content', 'source', 'createdAt'],
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
        attributes: ['id', 'username']
      }
    ]
  })
    .then((postsData) => {
      if (!postsData) {
        res.status(404).json({ message: 'No post found with this id.' });
        return;
      }
      res.json(postsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// new post
router.post('/', withAuth, (req, res) => {
  Post.create({
    post_title: req.body.post_title,
    post_content: req.body.post_content,
    source: req.body.source,
    user_id: req.session.user_id
  })
    .then((postsData) => res.json(postsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a post
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      source: req.body.source
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((postsData) => {
      if (!postsData[0]) {
        res.status(404).json({ message: 'No post has been found' });
        return;
      }
      res.json(postsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  //Deletes a post by its `id` value
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((postsData) => {
      if (!postsData) {
        res.status(404).json({ message: 'No post has been found' });
        return;
      }
      res.json(postsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
