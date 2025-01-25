const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const todosRoute = require("./routes/todos-route");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

async function connectDb() {
  try {
    await db.connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}

connectDb();

app.use("/todos", todosRoute);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
