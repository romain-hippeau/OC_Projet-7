const env = require('../config/env');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.publication = require("../models/publications.model.js")(sequelize, Sequelize);
db.comments = require("../models/commentaire.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.hasMany(db.publication, {
  foreignKey: 'userId',
  
});
db.publication.belongsTo(db.user)

db.publication.hasMany(db.comments)

db.comments.belongsTo(db.publication, {
  foreignKey: "publicationId", 
  as: "publication",
})

db.user.hasMany(db.comments, {
  foreignKey: 'userId'
  
});
db.comments.belongsTo(db.user)




db.ROLES = ["user", "admin"];

module.exports = db;