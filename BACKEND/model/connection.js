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


module.exports = {
  openConnection
}