import {Pool} from 'pg'

const dotenv = require('dotenv');
dotenv.config();

export const connectionPool:Pool = new Pool({
    host: process.env.HOST,
    database: process.env.DB,
    user:process.env.USER,
    password: process.env.PASS,
    port:5432,
    max:5
})

