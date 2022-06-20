const { v4: uuidv4 } = require('uuid');
const express = require('express');
const recordRoutes = express.Router();
const dbo = require("../../database/conn");

const DEFAULT_END_DATE = "01/01/1900";

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

recordRoutes.route("/api/v1/todos").post(async function(req, res){
    const dbConnect = dbo.getDb();

    const todo = {
        createdOn: new Date().toString(),
        dueDate: new Date(req.body.dueDate).toDateString(),
        endDate: new Date(DEFAULT_END_DATE).toDateString(),
        description: req.body.description,
        todoId: uuidv4()
    };

    dbConnect
        .collection("Todos")
        .insertOne(todo, (err, result) =>{
            if(err){
                res.status(400).send("Error creating a new todo");
            } else {
                console.log(`Added a new todo with id ${result.insertedId}`);
                res.status(204).send();
            }
        });
});

recordRoutes.route("/api/v1/todos/:id").post(async (req, res) => {
    const dbConnect = dbo.getDb();

    const filter = { todoId: req.params.id };
    const update = {
        $set:{
            description: req.body.description,
        }
    };

    dbConnect
        .collection("Todos")
        .updateOne(filter, update, function (err, _result) {
            if (err) {
                res.status(400).send(`Error updating likes on listing with id ${filter.todoId}!`);
            } else {
                console.log("1 document updated");
                res.status(200).send();
            }
        });
});

recordRoutes.route("/api/v1/todos/:id").delete(async (req, res) => {
    const dbConnect = dbo.getDb();
    const filter = { todoId: req.params.id };
  
    dbConnect
      .collection("Todos")
      .deleteOne(filter, function (err, _result) {
        if (err) {
          res.status(400).send(`Error deleting listing with id ${filter.todoId}!`);
        } else {
          console.log("1 document deleted");
          res.status(200).send();
        }
      });
  });

module.exports = recordRoutes;