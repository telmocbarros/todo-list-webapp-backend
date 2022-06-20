import express, { urlencoded, json } from 'express';
import { get } from 'config';

export default () => {
    const app = express();

    // setting application variables
    app.set('port', process.env.PORT || get('server.port'));

    // middlewares
    app.use(urlencoded({extended: true}));
    app.use(json());

    return app;
};