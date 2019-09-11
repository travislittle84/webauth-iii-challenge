const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()

const authRouter = require('../auth/auth-router.js')
const usersRouter = require('../api/users-router.js')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/', authRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
    res.send("Webauth III Challenge - Travis Little")
})

module.exports = server