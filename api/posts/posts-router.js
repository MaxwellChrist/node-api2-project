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
    
})

router.post('/', (req, res) => {
    
})

router.put('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

router.get('/:id/comments', (req, res) => {
    
})


module.exports = router;