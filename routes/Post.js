
const express = require("express")
const router = express.Router()
const { Tag, Post, User, Category } = require("../models")

router
    .route("/posts/:postid?")
    .get((req, res) => {
        let params = req.params
        let query
        if (params.postid) {
            query = Post.findOne({ where: { id: params.postid } })
        } else {
            query = Post.findAll()
        }
        query.then(r => res.json(r))
    })
    .post((req, res) => {
        let body = req.body
        const tagPromises = body.tags.map(tag =>
            Tag.findOrCreate({
                where: { title: tag },
                defaults: { title: tag }
            })
        );

        Promise.all(tagPromises)
            .then(tagResults => {
                const storedTags = tagResults.map(([tag]) => tag);

                return User.findOne({ where: { id: body.userId } })
                    .then(() => Post.create(body))
                    .then(post => post.addTags(storedTags).then(() => post))
                    .then(post =>
                        Post.findOne({
                            where: { id: post.id },
                            include: [User, Tag, Category]
                        })
                    );
            })
            .then(result => res.json(result))
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    error: `Failed to create post: ${err.message}`
                });
            });

    })

module.exports = router
