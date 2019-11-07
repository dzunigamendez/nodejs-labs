const User = require('./model');
const { createToken } = require('../auth');
const { compareHash } = require('../crypt');

async function create(req, res) {
    try {
        const body = req.body;
        const persistedUser = await User.create(body);
        res.status(201).send(persistedUser);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

async function login(req, res) {
    const creds = req.body;
    const { email, password } = creds;
    
    if (!email) {
        res.status(400).send('Email is required');
    }
    if (!password) {
        res.status(400).send('Password is required');
    }

    const user = await User.findOne({ email })
        .select(['email', 'password']);
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    const isMatch = await compareHash(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid email or password');
    }
    
    const token = createToken(user);
    res.send({ token });
}

module.exports = { create, login };