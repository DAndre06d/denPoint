import fs from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const mode = process.argv[2];
const backendDir = path.resolve(process.cwd());
const migrationsDir = path.join(backendDir, "database", "migrations");
const seedsDir = path.join(backendDir, "database", "seeds");

const validModes = new Set(["--migrate", "--seed", "--setup"]);

if (!validModes.has(mode)) {
  console.error(
    "Usage: node scripts/setupDatabase.js --migrate|--seed|--setup",
  );
  process.exit(1);
}

const databaseName = process.env.DB_DATABASE;

if (!databaseName) {
  console.error("DB_DATABASE is required in backend/.env");
  process.exit(1);
}

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

const readSqlFiles = async (dirPath) => {
  const entries = await fs.readdir(dirPath);
  const sqlFiles = entries.filter((file) => file.endsWith(".sql")).sort();

  return Promise.all(
    sqlFiles.map(async (fileName) => ({
      fileName,
      sql: await fs.readFile(path.join(dirPath, fileName), "utf8"),
    })),
  );
};

const runFiles = async (dirPath, label) => {
  const files = await readSqlFiles(dirPath);

  for (const file of files) {
    await connection.query(file.sql);
  }
};

try {
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
  await connection.changeUser({ database: databaseName });

  if (mode === "--migrate" || mode === "--setup") {
    await runFiles(migrationsDir, "migration");
  }

  if (mode === "--seed" || mode === "--setup") {
    await runFiles(seedsDir, "seed");
  }

  console.log("Database setup completed successfully.");
} catch (error) {
  console.error("Database setup failed:", error.message);
  process.exitCode = 1;
} finally {
  await connection.end();
}
