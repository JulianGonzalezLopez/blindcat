import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

export default async function openConnection(){
    try{
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          });
        return connection;          
    }
    catch(e){
        if (typeof e === "string") {
            throw new Error(e);
        } else if (e instanceof Error) {
            throw e;
        }
    }
}

