import { DataTypes, Model } from "sequelize";

import sequelize from "../database";

class Teacher extends Model {}

Teacher.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "teacher", timestamps: false, tableName: "teachers" },
);

export default Teacher;
