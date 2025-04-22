import { DataTypes, Model } from "sequelize";

import sequelize from "../database";

class Student extends Model {}

Student.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "student", timestamps: false, tableName: "students" },
);

export default Student;
