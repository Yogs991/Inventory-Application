require("dotenv").config(); // import 'dotenv/config'
const {Pool} = require("pg");

module.exports = new Pool({
    // connectionString: process.env.DATABASE_URL
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

