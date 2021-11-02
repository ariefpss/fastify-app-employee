const Sequlieze = require('sequelize');

var db = {};

const sequelize = new Sequlieze('appemployee', 'postgres', '', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

db.sequelize = sequelize;
db.Sequlieze = Sequlieze;

db.user = require('../models/Muser')(sequelize, Sequlieze);

module.exports = db;