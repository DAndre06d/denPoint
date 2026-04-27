import fs from "fs/promises";
import path from "path";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const mode = process.argv[2];
const backendDir = path.resolve(process.cwd());
const migrationsDir = path.join(backendDir, "database", "migrations");
const seedsDir = path.join(backendDir, "database", "seeds");
const validModes = new Set(["--migrate", "--seed", "--setup"]);

if (!validModes.has(mode)) {
  console.error("Usage: node scripts/setupDatabase.js --migrate|--seed|--setup");
  process.exit(1);
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is required in backend/.env for Postgres setup.");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl:
    connectionString.includes("sslmode=require") || process.env.PG_SSL === "true"
      ? { rejectUnauthorized: false }
      : false,
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

const runFiles = async (dirPath) => {
  const files = await readSqlFiles(dirPath);

  for (const file of files) {
    await client.query(file.sql);
  }
};

try {
  await client.connect();

  if (mode === "--migrate" || mode === "--setup") {
    await runFiles(migrationsDir);
  }

  if (mode === "--seed" || mode === "--setup") {
    await runFiles(seedsDir);
  }

  console.log("Database setup completed successfully.");
} catch (error) {
  console.error("Database setup failed:", error.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
