import { DataTypes, Model } from "sequelize";

import sequelize from "../database";
import Teacher from "./Teacher";
import Lesson from "./Lesson";

class LessonTeacher extends Model {}

LessonTeacher.init(
    {
        teacher_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Teacher,
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
    },
    { sequelize, modelName: "lesson_teacher", timestamps: false, tableName: "lesson_teachers" },
);

export default LessonTeacher;
