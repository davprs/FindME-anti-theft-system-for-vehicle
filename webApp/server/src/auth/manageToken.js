const jwt = require('jsonwebtoken');
const tokenSecret = require("./tokenSecret");

module.exports.generateAccessToken = (credentials) => {
    return jwt.sign(credentials, tokenSecret, { expiresIn: '1800s' });
}

module.exports.authenticateToken = (token) => {
    if (token == null) throw new Error("401 - Token is null");

    return jwt.verify(token, tokenSecret, (err, user) => {
        console.log("error : " + err)

        if (err) throw new Error("403 - Token verification failed")

        return user

    });
}

module.exports.parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}

