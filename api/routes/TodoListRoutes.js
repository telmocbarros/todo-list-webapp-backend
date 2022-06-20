const express = require('express');
const recordRoutes = express.Router();
const dbo = require("../../database/conn");

recordRoutes.route("/api/v1/todos").get(async function (req, res){
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("Todos")
        .find({}).limit(50)
        .toArray(function (err, result){
            if(err){
                res.status(400).send("Error fetching listings!");
            } else {
                res.json(result);
            }
        });
});

module.exports = recordRoutes;