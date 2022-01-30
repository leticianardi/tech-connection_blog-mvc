const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all users
// router.get('/', (req, res) => {
//   User.findAll({
//     attributes: { exclude: ['password'] }
//   })
//     .then((user) => res.json(user))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.get('/:id', (req, res) => {
//   User.findOne({
//     attributes: { exclude: ['password'] },
//     where: {
//       id: req.params.id
//     },
//     include: [
//       {
//         model: Post,
//         attributes: ['id', 'post_title', 'post_content']
//       },
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'created_at'],
//         include: {
//           model: Post,
//           attributes: ['post_title']
//         }
//       }
//     ]
//   })
//     .then((user) => {
//       if (!user) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(user);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then((user) => {
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json(user);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (!user) {
      res.status(400).json({ message: 'Email does not exist!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user: user, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// router.put('/:id', (req, res) => {
//   User.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id
//     }
//   })
//     .then((user) => {
//       if (!user) {
//         res.status(404).json({ message: 'No username found with this id' });
//         return;
//       }
//       res.json(user);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete('/:id', (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then((user) => {
//       if (!user) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(user);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
