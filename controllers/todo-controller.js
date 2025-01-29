const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// CREATE
exports.createTodo = async (req, res) => {
  try {
    let { user_id, title, progress, date } = req.body;
    const id = uuidv4();
    title = title.trim();

    const newData = await db`
      INSERT INTO todos (id, user_id, title, progress, date)
      VALUES (${id}, ${user_id}, ${title}, ${progress}, ${date})
      RETURNING *;
    `;

    res.status(201).json({
      status: "Berhasil",
      message: "Todo berhasil dibuat",
      data: { todo: newData[0] },
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

// READ ALL TODOS
exports.getAllTodos = async (req, res) => {
  try {
    const data = await db`SELECT * FROM todos`;

    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil membaca semua todo",
      data: { todos: data },
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

// READ SINGLE TODO
exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await db`SELECT * FROM todos WHERE id = ${id}`;

    if (data.length === 0) {
      return res.status(404).json({
        status: "Gagal",
        message: `Todo dengan id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil membaca todo",
      data: { todo: data[0] },
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

// READ TODOS BY USER
exports.getUserTodos = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await db`SELECT * FROM todos WHERE user_id = ${id}`;

    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil membaca semua user todo",
      result: data.length,
      data: { todo: data },
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

// UPDATE TODO
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    let { user_id, title, progress, date } = req.body;
    title = title.trim();

    const upData = await db`
      UPDATE todos
      SET user_id=${user_id}, title=${title}, progress=${progress}, date=${date}
      WHERE id=${id}
      RETURNING *;
    `;

    if (upData.length === 0) {
      return res.status(404).json({
        status: "Gagal",
        message: `Todo dengan id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil mengupdate todo",
      data: { todo: upData[0] },
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

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await db`DELETE FROM todos WHERE id = ${id} RETURNING *`;

    if (deleted.length === 0) {
      return res.status(404).json({
        status: "Gagal",
        message: `Todo dengan id ${id} tidak ditemukan`,
      });
    }

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
