"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = require("../globals/database/db.connection");
exports.UserModel = db_connection_1.sequlize.define("Users", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
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
        type: sequelize_1.DataTypes.STRING,
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
//# sourceMappingURL=user.model.js.map