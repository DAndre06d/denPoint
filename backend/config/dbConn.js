import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required for the Neon Postgres connection.");
}

const useSsl =
  connectionString.includes("sslmode=require") ||
  process.env.PG_SSL === "true";

const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});

const normalizeRow = (row) => {
  if (!row || typeof row !== "object") return row;

  if ("typeofservice" in row && !("typeOfService" in row)) {
    row.typeOfService = row.typeofservice;
  }

  return row;
};

const convertPlaceholders = (sql) => {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
};

const db = {
  query(sql, params, callback) {
    let queryText = sql;
    let queryParams = params;
    let queryCallback = callback;

    if (typeof params === "function") {
      queryCallback = params;
      queryParams = [];
    }

    queryText = convertPlaceholders(queryText);

    const promise = pool
      .query(queryText, queryParams || [])
      .then((result) => result.rows.map(normalizeRow));

    if (queryCallback) {
      promise.then((rows) => queryCallback(null, rows)).catch((error) => queryCallback(error));
      return;
    }

    return promise;
  },

  async execute(sql, params = []) {
    const rows = await this.query(sql, params);
    return [rows];
  },

  async end() {
    await pool.end();
  },
};

export default db;
