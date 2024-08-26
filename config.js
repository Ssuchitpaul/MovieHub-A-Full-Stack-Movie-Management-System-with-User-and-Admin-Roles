const mysql=require('mysql2');
const dotenv=require('dotenv');

dotenv.config();

const connection=mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"9705511180",
    database:"NODE"

});

connection.connect((err)=>
{
    if(err) throw err;
    console.log('connected to database-------------------');
});

module.exports=connection;
