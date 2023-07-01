import mysql from "mysql2";
import dotenv from "dotenv";

const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

if (dev) {
  dotenv.config();
}

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
};

const poolConfig = {
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 1,
  namedPlaceholders: true,
};

const db = mysql.createPool(poolConfig).promise();

export default function DB() {
  return db;
}

export function config() {
  return poolConfig;
}