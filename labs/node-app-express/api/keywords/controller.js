const Keyword = require('./model')
const Service = require('./service');

async function search(req, res) {
    try {
        const keywords = await Service.search();
        res.send(keywords);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function create(req, res) {
    try {
        const newKeyword = req.body;
        const persistedKeyword = await Keyword.create(newKeyword);
        res.status(201).send(persistedKeyword);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function readById(req, res) {
    try {
        const id = req.params.id;
        const keyword = await Keyword.findById(id);
        res.send(keyword);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        await Keyword.findByIdAndUpdate(id, body);
        res.status(204).end();
    } catch (error) {
        res.status(500).send(error);
    }
}

async function remove(req, res) {
    try {
        const id = req.params.id;
        await Keyword.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    search,
    create,
    readById,
    update,
    remove,
};