const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.json({ message: 'W15 Monday & Tuesday server up and running.'})
})

module.exports = server;