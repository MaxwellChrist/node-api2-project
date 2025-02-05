// implement your server here
const express = require('express');
const postsRouter = require('./posts/posts-router')
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    console.log('Now running!')
});

// require your posts router and connect it here
server.use('/api/posts', postsRouter);

module.exports = server;