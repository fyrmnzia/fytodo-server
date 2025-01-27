const db = require("../config/db");

// CREATE
exports.createTodo = async (req, res) => {
  try {
    const { desc, completed, user_id } = req.body;

    const newData = await db.query(
      "INSERT INTO todos_table (todo_desc, todo_completed, user_id) VALUES ($1, $2, $3) RETURNING *",
      [desc, completed, user_id]
    );

    res.status(201).json({
      status: "Berhasil",
      message: "Todo berhasil dibuat",
      data: { todo: newData.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "Gagal",
      message: "Gagal membuat todo",
      details: error.message,
      error,
    });
  }
};

// READ
exports.getAllTodo = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM todos_table");

    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil membaca semua todo",
      data: { todo: data.rows },
    });
  } catch (error) {
    res.status(500).json({
      status: "Gagal",
      message: "Gagal membaca semua todo",
      details: error.message,
      error,
    });
  }
};
exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await db.query(
      "SELECT * FROM todos_table WHERE todo_id = $1",
      [id]
    );

    if (data.rowCount === 0) {
      return res.status(404).json({
        status: "Gagal",
        message: `Todo dengan id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil membaca todo",
      data: { todo: data.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "Gagal",
      message: "Gagal membaca todo",
      details: error.message,
      error,
    });
  }
};
exports.getUserTodos = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await db.query(
      "SELECT * FROM todos_table WHERE user_id = $1",
      [id]
    );
    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil membaca semua user todo",
      result: data.rowCount,
      data: { todo: data.rows },
    });
  } catch (error) {
    res.status(500).json({
      status: "Gagal",
      message: "Gagal membaca semua user todo",
      details: error.message,
      error,
    });
  }
};

// UPDATE
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { desc, completed } = req.body;

    const upData = await db.query(
      "UPDATE todos_table SET todo_desc=$1, todo_completed=$2 WHERE todo_id=$3",
      [desc, completed, id]
    );

    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil mengupdate todo",
      data: { todo: upData.rows[0] },
    });
  } catch (error) {
    res.status(500).json({
      status: "Gagal",
      message: "Gagal mengupdate todo",
      details: error.message,
      error,
    });
  }
};

// DELETE
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const delData = await db.query(
      "DELETE FROM todos_table WHERE todo_id = $1",
      [id]
    );

    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil menghapus todo",
    });
  } catch (error) {
    res.status(500).json({
      status: "Gagal",
      message: "Gagal menghapus todo",
      details: error.message,
      error,
    });
  }
};
