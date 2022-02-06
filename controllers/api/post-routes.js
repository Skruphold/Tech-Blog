const router = require("express").Router();
const { Post, Comment, User } = require("../../models/");

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "body", "user_id"],
        include: [
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "comment_text", "user_id"],
            },
        ],
    })
        .then((postData) => {
            res.json(postData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        // user_id: req.session.user_id,
    })
        .then((postData) => {
            res.json(postData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "title", "body", "user_id"],
        include: [
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "comment_text", "user_id"],
            },
        ],
    })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({ message: "There is no post with that ID" });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;