import pg from "pg";

const { Pool } = pg;

const itemsPool = new Pool({
    connectionString: process.env.DBConfiglink,
    ssl: {
        rejectUnauthorized: false,
    }
});

export default itemsPool;
