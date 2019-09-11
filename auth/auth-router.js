const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../api/users-model.js')

router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 14)
    user.password = hash

    Users.add(user)
        .then(savedUser => {
            const token = generateToken(savedUser)
            res.status(201).json({
                user: savedUser,
                token
            })
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not register user'})
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token
                })
            } else {
                res.status(401).json({ message: 'You shall not pass!'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error logging into server"})
        })
})

function generateToken(user) {
    const payload = {
        sub:user.id,
        username:user.username,
        department: user.department
    }

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, process.env.SECRET, options)
}

module.exports = router