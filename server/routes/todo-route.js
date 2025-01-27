const express = require("express");
const todoController = require("../controllers/todo-controller");

const router = express.Router();

router
  .route("/")
  .get(todoController.getAllTodo)
  .post(todoController.createTodo);

router
  .route("/:id")
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

router.get("/user/:id", todoController.getUserTodos);

module.exports = router;
