const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
dotenv.config();

async function openConnection(){
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
        console.log(e);
        return null;
    }
}

async function basicUsage(){
    let connection = await openConnection();
    try {
        const [results, fields] = await connection.query(
          'SHOW TABLES'
        );
      
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      } catch (err) {
        console.log(err);
      }

}

basicUsage();