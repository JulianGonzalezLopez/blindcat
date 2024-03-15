import dotenv from 'dotenv';
import mysql, {Pool} from 'mysql2/promise';

dotenv.config();

let pool : Pool | undefined;

try{
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 100,
        maxIdle: 10,
        idleTimeout: 60000
      });
}
catch(e){
    console.log(e);
    pool = undefined;
}

export default pool;