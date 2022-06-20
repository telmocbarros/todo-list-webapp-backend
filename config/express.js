const express = require('express');
const config = require('config');
const consign = require('consign');

module.exports = () => {
    const app = express();

    // setting application variables
    app.set('port', process.env.PORT || config.get('server.port'));

    // middlewares
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());


    // set endpoints automatically
    consign({cwd: 'api'})
        .then('data')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};