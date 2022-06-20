module.exports = app => {
    const controller = app.controllers.TodoListController;

    app.route('/api/v1/todos')
        .get(controller.listOfTodos);
}