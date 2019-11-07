
const config = require('config');
const bcrypt = require('bcryptjs');

const hashSalt = config.get('crypt.hashSalt');

async function createHash(text) {
    return await bcrypt.hash(text, hashSalt);
}
async function compareHash(text, hash) {
    return await bcrypt.compare(text, hash);
}

module.exports = {
    createHash,
    compareHash,
};
