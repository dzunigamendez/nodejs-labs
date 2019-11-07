const Keywords = require('./model');

async function search() {
    return await Keywords.find();
}

module.exports = {
    search
};