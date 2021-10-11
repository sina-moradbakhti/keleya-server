"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var sequelize_1 = require("sequelize");
var db_connection_1 = require("../globals/database/db.connection");
exports.UserModel = db_connection_1.sequlize.define("Users", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    baby_birth_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    onboarding_done: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    accepted_privacy_policy: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    accepted_terms_and_conditions: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
