const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

async function connectDb() {
  try {
    console.log("Berhasil terhubung ke database");
  } catch (error) {
    console.error("Gagal terhubung ke database", error);
  }
}

connectDb();

module.exports = db;
