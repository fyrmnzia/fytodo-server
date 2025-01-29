const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// SIGNUP
exports.signUp = async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username.trim();

    const isExist = await db`SELECT * FROM users WHERE username=${username}`;
    if (isExist.length !== 0) {
      return res.status(400).json({
        status: "Gagal",
        message: "Username sudah ada",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const id = uuidv4();

    await db`
      INSERT INTO users (id, username, password)
      VALUES (${id}, ${username}, ${hashedPassword})
    `;

    res.status(201).json({
      status: "Berhasil",
      message: "Akun berhasil dibuat",
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

    const user = await db`SELECT * FROM users WHERE username=${username}`;

    if (user.length === 0) {
      return res.status(404).json({
        status: "Gagal",
        message: "Akun tidak ditemukan",
      });
    }

    const checkPassword = await bcrypt.compare(password, user[0].password);
    if (!checkPassword) {
      return res.status(401).json({
        status: "Gagal",
        message: "Password salah",
      });
    }

    const id = user[0].id;

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
