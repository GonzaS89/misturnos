import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host:'sql10.freesqldatabase.com',
    user:'sql10774543',
    password:'qGBflyp3tU',
    database:'sql10774543'
})

db.connect((err) => {
    if (err) {
      console.error('❌ Error al conectar a la base de datos:', err);
    } else {
      console.log('✅ Conectado a la base de datos MySQL');
    }
  });

export default db;


