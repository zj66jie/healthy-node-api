// default.js
// 设置配置文件
const config = {
  // 启动端口
  port: 3000,
  http: "http://localhost:3000/", //问件服务地址
  // 数据库配置
  database: {
    DATABASE: "healthy", //数据库名字
    USERNAME: "root",
    PASSWORD: "root",
    PORT: "3306",
    HOST: "localhost",
  },
};

module.exports = config;
