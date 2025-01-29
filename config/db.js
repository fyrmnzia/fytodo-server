const { neon } = require("@neondatabase/serverless");
const dotenv = require("dotenv");

dotenv.config();

const db = neon(process.env.DATABASE_URL);

module.exports = db;
