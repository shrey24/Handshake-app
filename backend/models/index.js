'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// // Models/tables
// db.student_auth = require('./student_auth')(sequelize, Sequelize);
// db.student_profile = require('./student_profile')(sequelize, Sequelize);
// db.student_education = require('./student_education')(sequelize, Sequelize);
// db.student_experience = require('./student_experience')(sequelize, Sequelize);

// relations
db.student_profile.hasMany(db.student_education);
db.student_education.belongsTo(db.student_profile, {
  onDelete: 'CASCADE'
});

db.student_profile.hasMany(db.student_experience);
db.student_experience.belongsTo(db.student_profile, {
  onDelete: 'CASCADE'
});

module.exports = db;
