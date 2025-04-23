import mysql from 'mysql2';

const db = mysql.createConnection({
    host:'sql10.freesqldatabase.com',
    user:'sql10774543',
    password:'qGBflyp3tU',
    database:'sql10774543'
})

export default db;


