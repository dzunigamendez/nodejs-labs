const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../users/model');

const { secretKey, tokenExpiresIn } = config.get('auth'); 

async function isLoggedIn(req, res, next) {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).end();
    }
    try {
        const bearer = auth.split(' ');
        const token = bearer[1];
        const payload = jwt.verify(token, secretKey);
        const user = await User.findById(payload._id);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };
    return jwt.sign(payload, secretKey, { expiresIn: tokenExpiresIn });
}

module.exports = {
    isLoggedIn,
    createToken,
};
