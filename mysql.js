// mysql/index.js
var mysql = require("mysql");
var config = require("./config.js");
var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
});

class Mysql {
  constructor() {}
  query(MysqlQuery) {
    const sql = MysqlQuery;
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          throw error;
        } else {
          connection.query(sql, function (error, results, fields) {
            if (error) {
              throw error;
            }
            if (results) {
              resolve(results);
            }
            connection.release(); //官方写法
          });
        }
      });
    });
  }
  select(tableName) {
    const sql = `select * from ${tableName}`;
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          throw error;
        } else {
          connection.query(sql, function (error, results, fields) {
            if (error) {
              // reject(fields);
              throw error;
            }
            if (results) {
              resolve(results);
            }
            connection.release(); //官方写法释放连接
            // connection.end();//可以
            // console.log("1");
          });
          // console.log("2");
          // 输出顺序2,1
          // connection.end(); //错误写法，位置不对
          // pool.releaseConnection(connection); //可以
          // connection.release();//可以
        }
      });
    });
  }
  payDelete() {
    this.query("truncate table test");
  }
}

module.exports = new Mysql();
