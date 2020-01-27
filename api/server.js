const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const usersRouter = require('./routers/usersRouter');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(
    session({
        name: 'testsession',
        secret: 'ramen for breakfast',
        cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: true
        },
        httpOnly: true,
        resave: false,
        saveUninitialized: false
    })
);
server.use('/api', usersRouter);

server.get('/', (req, res) => {
    res.json({ message: 'W15 Monday & Tuesday server up and running.'})
})

module.exports = server;