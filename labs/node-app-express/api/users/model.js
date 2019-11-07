const mongoose = require('mongoose');
const { createHash } = require('../crypt');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false},
});

schema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const hashedPassword = await createHash(user.password);
    user.password = hashedPassword;
    next();
});

schema.post('save', function() {
    const user = this;
    user.password = undefined;
});

const User = mongoose.model('User', schema);

module.exports = User;