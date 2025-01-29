const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./config/db");
const todoRoutes = require("./routes/todo-route");
const authRoutes = require("./routes/auth-route");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cek koneksi database
app.get("/", async (req, res) => {
  try {
    const result = await db`SELECT version()`;
    res.json({ db_version: result[0].version });
    res.send("fytodo-server");
  } catch (error) {
    res.status(500).json({
      error: "Gagal mengambil versi database",
      details: error.message,
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
