import { Model, DataTypes } from "sequelize";

import sequelize from "../database";

class Lesson extends Model {}

Lesson.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "lesson",
        timestamps: false,
        tableName: "lessons",
    },
);

export default Lesson;
