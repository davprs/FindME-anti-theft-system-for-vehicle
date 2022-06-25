const jwt = require('jsonwebtoken');
const tokenSecret = require("./tokenSecret");

module.exports.generateAccessToken = (credentials) => {
    return jwt.sign(credentials, tokenSecret, { expiresIn: '1800s' });
}

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, tokenSecret, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

