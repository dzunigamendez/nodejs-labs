const api = require('./api');
const pages = require('./pages');

function routes(app) {
    app.use('/api', api);
    app.use('/pages', pages);
}

module.exports = routes;