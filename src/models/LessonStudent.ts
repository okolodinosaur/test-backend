import { Model, DataTypes } from "sequelize";

import sequelize from "../database";
import { Lesson, Student } from ".";

class LessonStudent extends Model {}

LessonStudent.init(
    {
        student_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Student,
                key: "id",
            },
        },
        lesson_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Lesson,
                key: "id",
            },
        },
        visit: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    { sequelize, modelName: "lesson_student", timestamps: false, tableName: "lesson_students" },
);

export default LessonStudent;
