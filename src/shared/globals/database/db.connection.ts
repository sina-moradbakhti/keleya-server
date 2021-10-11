import { Sequelize, Model, DataTypes } from "sequelize";

const dbConfig = require('./db.config');
export const sequlize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql'
});