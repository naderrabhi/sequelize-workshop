const router = require('express').Router();
const { User, Post } = require('../models')

router
    .route('/users')
    .get((req, res) => {
        User.findAll().then(users => {
            res.json(users)
        })
    })
    .post((req, res) => {
        let body = req.body
        User.create(body).then(user => {
            res.json(user)
        })
            .catch((e) => res.json(e.message))
    })

router
    .route('/users/:userid/posts')
    .get((req, res) => {
        User.findAll({
            where: { id: req.params.userid },
            include: [Post]
        })
            .then(result => {
                res.json(result)
            })
    })

module.exports = router