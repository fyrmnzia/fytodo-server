const express = require("express");
const db = require("../config/db");
const router = express.Router();

// READ semua todos
router.get("/", async (req, res) => {
  try {
    const todos = await db.query("SELECT * FROM todos_table");
    res.json(todos.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Gagal membaca semua todos", details: error });
  }
});

// READ todo
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db.query(
      "SELECT * FROM todos_table WHERE todo_id = $1",
      [id]
    );
    res.json(todo.rows);
  } catch (error) {
    res.status(500).json({ error: "Gagal membaca todo", details: error });
  }
});

// CREATE todo
router.post("/", async (req, res) => {
  try {
    const { desc, completed } = req.body;

    const newData = await db.query(
      "INSERT INTO todos_table (todo_desc, todo_completed) VALUES ($1, $2) RETURNING *",
      [desc, completed]
    );
    res.status(201).json(newData.rows);
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat todo", details: error });
  }
});

// UPDATE todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { desc, completed } = req.body;

    const upData = await db.query(
      "UPDATE todos_table SET todo_desc=$1, todo_completed=$2 WHERE todo_id = $3",
      [desc, completed, id]
    );
    res.status(200).json("Berhasil mengupdate todo");
  } catch (error) {
    res.status(500).json({ error: "Gagal mengupdate todo", details: error });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const delData = await db.query(
      "DELETE FROM todos_table WHERE todo_id = $1",
      [id]
    );
    res.status(200).json("Berhasil menghapus todo");
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus todo", details: error });
  }
});

// DELETE semua todos
router.delete("/", async (req, res) => {
  try {
    const delAllData = await db.query("DELETE FROM todos_table");
    res.status(200).json("Berhasil menghapus semua todo");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Gagal menghapus semua todo", details: error });
  }
});

module.exports = router;
