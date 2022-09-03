const crypto = require("crypto");
const tokenSecret = crypto.randomBytes(30).toString('hex');

module.exports = tokenSecret;