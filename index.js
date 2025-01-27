const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const todoRoutes = require("./routes/todo-route");
const authRoutes = require("./routes/auth-route");
const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// anjay slebe
