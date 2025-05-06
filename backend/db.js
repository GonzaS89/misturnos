import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host:'b7dytv4f6tpscr3avqdp-mysql.services.clever-cloud.com',
    user:'uhuznve5mzltadzd',
    password:'bfPKxGTF8W67LbHDPbpj',
    database:'b7dytv4f6tpscr3avqdp'
})

db.connect((err) => {
    if (err) {
      console.error('❌ Error al conectar a la base de datos:', err);
    } else {
      console.log('✅ Conectado a la base de datos MySQL');
    }
  });

export default db;


