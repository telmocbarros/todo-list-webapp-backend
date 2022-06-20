const express = require('express');
const config = require('config');

module.exports = () => {
    const app = express();

    // setting application variables
    app.set('port', process.env.PORT || config.get('server.port'));

    // middlewares
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    return app;
};