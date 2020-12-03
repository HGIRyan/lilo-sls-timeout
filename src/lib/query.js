import { Pool } from "pg";
import createError from "http-errors";
const { user, password, host, database } = process.env;

const config = {
  ssl: {
    rejectUnauthorized: false,
    ssl: true,
  },
  user,
  password,
  port: 5432,
  host,
  database,
  engine: "postgres",
  dbClusterIdentifier: "database-1",
};

export const query = async (sql, values, end) => {
  try {
    const pool = new Pool(config);

    pool.on("error", (err, client) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });

    // const client = await pool.connect();

    const result = await pool.query(sql, values);

    if (end) {
      await pool.end();
    }

    return result.rows;
  } catch (error) {
    console.error("CONSOLE ERROR", error);
    throw new createError.InternalServerError(error);
  }
};
