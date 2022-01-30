const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/', (req, res) => {});

router.post('/', withAuth, (req, res) => {
  Comment.create({
    ...req.body,
    user_id: req.session.user_id
  })
    .then((commentsData) => res.json(commentsData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((commentsData) => {
      if (!commentsData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(commentsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
