const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        }
    })
    .then((postData) => {
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("all-posts-admin", { 
            layout: "dashboard",
            posts 
        }); 
    })
    .catch((err) => {
        res.status(500).json(err);
        res.redirect("login")
    });
});

router.get('/', withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User, 
            {
                model: Comment,
                include: [user],
            },
        ],
    })
    .then((postData) => {
        if (postData) {
            const post = postData.get({ plain: true });
            res.render("single-post", { post })
        } else {
            res.status(404).end();
        }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;
