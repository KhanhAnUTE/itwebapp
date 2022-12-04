const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_db',
  multipleStatements: true,
});


connection.connect(function(err) {
    if (err) {
      console.error('Kết nối db thất bại');
      return;
    }
    console.log('Kết nối db thành công!!');
})

module.exports = connection