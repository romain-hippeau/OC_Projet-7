//configuration de la db Mysql
module.exports = {
    HOST: "127.0.0.1",
    username: "root",
    PASSWORD: "Manutd33",
    DB: "server-groupomania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };