const customerInfo = `select * from customer as c left join feedback as f on f.cus_id = c.cus_id where c.cus_id = $1;`;

// Review Queries
const updateActivity = `update customer set activity = $2 where cus_id = $1 returning *;`;
const recordFeedbackText = `update feedback set feedback_text = $2 where cus_id = $1 returning *;`;
const recordRatingDb = `update feedback set rating = $2 where cus_id = $1 returning *;`;
const recordRatingandClick = `update feedback set rating = $2, click = $3 where cus_id = $1 returning *;`;
const recordClickQ = `update feedback set click = $2, click_site = $3, source = $4 where cus_id = $1 returning *;`;

// Query Function
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

const pool = new Pool(config);

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const query = async (sql, values) => {
  try {
    const client = await pool.connect();

    const result = await client.query(sql, values);

    return result.rows;
  } catch (error) {
    throw new createError.InternalServerError(error);
  }
};

export { query, customerInfo, updateActivity, recordFeedbackText, recordRatingDb, recordRatingandClick, recordClickQ };
