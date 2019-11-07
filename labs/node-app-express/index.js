const config = require('config');
const express = require('express');
const middleware = require('./middleware');
const routes = require('./routes');
const database = require('./database');

const { host, port } = config.get('server');

const app = express();

app.set('view engine', 'ejs');

middleware(app);
routes(app);

database.connect();

app.listen(port, host, () => {
    console.log(`http://${host}:${port}`);
});

module.exports = app;