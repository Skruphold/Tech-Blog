const router = require("express").Router();
const { Comment, Post, User } = require("../../models/");

router.post("/", (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        // user_id: req.session.user_id,
        post_id: req.body.post_id,
    })
        .then((commentData) => {
            res.json(commentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/", (req, res) => {
    Comment.findAll({
        attributes: ["id", "comment_text", "user_id", "post_id"],
        include: [
            {
                model: User,
                as: "user",
                attributes: ["username"],
            },
        ],
    })
        .then((commentData) => {
            res.json(commentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
