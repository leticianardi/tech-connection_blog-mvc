const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_title", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find one post by its id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_title", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  })
    .then((posts) => {
      if (!posts) {
        res.status(404).json({ message: "No post found with this id." });
        return;
      }
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// new post
router.post("/", withAuth, (req, res) => {
  Post.create({
    post_title: req.body.post_title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a post
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      post_title: req.body.post_title,
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((posts) => {
      if (!posts[0]) {
        res.status(404).json({ message: "No post has been found" });
        return;
      }
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  //Deletes a post by its `id` value
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((posts) => {
      if (!posts) {
        res.status(404).json({ message: "No post has been found" });
        return;
      }
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
