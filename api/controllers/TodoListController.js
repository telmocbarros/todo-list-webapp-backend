module.exports = app => {
    const todoListDB = app.data.todoList;
    const controller = {};

    controller.listOfTodos = (req, res) => res.status(200).json(todoListDB);

    return controller;
}