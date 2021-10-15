import { Model, DataTypes } from "sequelize";
import { sequlize } from "../globals/database/db.connection";

export interface UserInterface extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
    baby_birth_date: string;
    onboarding_done: boolean;
    accepted_privacy_policy: boolean;
    accepted_terms_and_conditions: boolean;
}

export const UserModel = sequlize.define<UserInterface>("Users", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    baby_birth_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    onboarding_done: {
        type: DataTypes.BOOLEAN
    },
    accepted_privacy_policy: {
        type: DataTypes.BOOLEAN
    },
    accepted_terms_and_conditions: {
        type: DataTypes.BOOLEAN
    }
});