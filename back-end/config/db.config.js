module.exports = {
  HOST: "",
  username: "",
  PASSWORD: "",
  database: "",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};