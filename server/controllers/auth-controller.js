const db = require("../config/db");

// SIGNUP
exports.signUp = async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username.trim();

    const isExist = await db.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    if (isExist.rowCount !== 0) {
      return res.status(400).json({
        status: "Gagal",
        message: "Username sudah ada",
      });
    }

    const user = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, password]
    );
    const id = user.rows.id;

    res.status(201).json({
      status: "Berhasil",
      message: "Akun dibuat",
      user: { id, username },
    });
  } catch (error) {
    res.status(500).json({
      status: "Gagal",
      message: "Gagal membuat akun",
      details: error.message,
      error,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.query(
      "SELECT * FROM users WHERE username=$1 AND password=$2",
      [username, password]
    );

    if (user.rowCount === 0) {
      return res.status(404).json({
        status: "Gagal",
        message: "Akun tidak ditemukan",
      });
    }
    const id = user.rows[0].id;

    res.status(200).json({
      status: "Berhasil",
      message: "Berhasil login",
      user: { id, username },
    });
  } catch (error) {
    res.status(500).json({
      status: "Gagal",
      message: "Gagal masuk akun",
      details: error.message,
      error,
    });
  }
};
