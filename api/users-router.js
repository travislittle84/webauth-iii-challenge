const router = require('express').Router()

const Users = require('../api/users-model.js')

const restricted = require('../auth/auth-middleware.js')

router.get('/', restricted, (req, res) => {
    console.log("Decoded Token: ", req.decodedToken)
    const { sub, department } = req.decodedToken
    
    Users.findBy({department})
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.status(500).json({ message: 'Error retreiving users', error: error})
        })
})

module.exports = router