const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: 'Unrecognized token'})
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(400).json({ message: 'No token provided'})
    }
}