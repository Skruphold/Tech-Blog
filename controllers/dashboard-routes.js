const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        res.render('all-posts-admin', { layout: 'dashboard' })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/new', async (req, res) => {
    try {
        res.status(200).render('new-post', { layout: 'dashboard' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
