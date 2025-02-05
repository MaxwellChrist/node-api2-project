// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find()
    .then(result => {
        res.json(result)
    })
    .catch(result => {
        res.status(500).json({ message: "The posts information could not be retrieved"  })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Posts.findById(id)
    .then(result => {
        if (!result) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.json(result)
        }
    })
    .catch(result => {
        res.status(500).json({ message: "The post information could not be retrieved" })
    })

})

router.post('/', (req, res) => {
    const {title, contents} = req.body
    console.log(req.body)
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Posts.insert(req.body)
        .then(result => {
            Posts.findById(result.id)
                .then(result2 => {
                    res.status(201).json(result2)
            })
        })
        .catch(result => {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {title, contents} = req.body
    console.log(req.body)
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Posts.update(id, req.body)
        .then(result => {
            if (result) {
            Posts.findById(id)
                .then(result2 => {
                    res.status(200).json(result2)
            })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
        })
        .catch(result => {
            res.status(500).json({ message: "The post information could not be modified"})
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Posts.findById(id)
    .then(result => {
        if (result) {
            const deleter = result;
            Posts.remove(id)
            .then(result2 => {
                if (result2 > 0) {
                    res.json(deleter)
                }
            })
            .catch(result => {
                res.status(500).json({ message: "The post could not be removed"  })
            })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    console.log(req.body, id)
    Posts.findPostComments(id)
    .then(result => {
        if (result.length > 0) {
            res.json(result)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    })
    .catch(result => {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
})


module.exports = router;