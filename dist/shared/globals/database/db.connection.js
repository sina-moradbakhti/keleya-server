"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequlize = void 0;
const sequelize_1 = require("sequelize");
const dbConfig = require('./db.config');
exports.sequlize = new sequelize_1.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql'
});
//# sourceMappingURL=db.connection.js.map