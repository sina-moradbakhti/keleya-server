"use strict";
exports.__esModule = true;
exports.sequlize = void 0;
var sequelize_1 = require("sequelize");
var dbConfig = require('./db.config');
exports.sequlize = new sequelize_1.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql'
});
