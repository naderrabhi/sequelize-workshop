const router = require('express').Router();
const { Category, Post } = require('../models')

router
    .route('/categories')
    .get((req, res) => {
        Category.findAll().then(categories => {
            res.json(categories)
        })
    })
    .post((req, res) => {
        let body = req.body
        Category.create(body).then(category => {
            res.json(category)
        })
            .catch((e) => res.json(e.message))
    })

router
    .route('/categories/:categoryid/posts')
    .get((req, res) => {
        Category.findAll({
            where: { id: req.params.categoryid },
            include: [{
                model: Post, as: "articles"
            }]
        })
            .then(result => {
                res.json(result)
            })
    })

module.exports = router