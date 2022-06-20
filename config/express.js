const express = require('express');
const consign = require('consign');
const cors = require("cors");
// get MongoDB driver connection
const dbo = require("../database/conn");

module.exports = () => {
    const app = express();

    // setting application variables
    


    // middlewares
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(require("../api/routes/TodoListRoutes"));

    
    // Global error handling
    app.use(function (err, _req, res) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    // connect to database when the server starts
    dbo.connectToServer(function (err) {
        if (err) {
          console.error(err);
          process.exit();
        }
      });
    return app;
};
