import knex from "knex";

import * as knexfile from "../knexfile.js";
const environment = process.env.NODE_ENV || "development";

const db = knex(knexfile[environment]);

export default db ;