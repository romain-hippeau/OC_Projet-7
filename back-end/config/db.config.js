//configuration de la db Mysql
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Manutd33",
    DB: "Groupomania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };