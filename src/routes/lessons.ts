import { Router } from "express";
import { cast, literal, Op } from "sequelize";

import { Teacher, Student, Lesson } from "../models";

export const router = Router();

router.get("/lessons", async (req, res) => {
    const { date, status, teacherIds, studentsCount, page = 1, lessonsPerPage = 5 } = req.query;

    const where: any = {};
    let teacherIdsArray: number[] = [];
    let students: number[] = [];

    if (date) {
        const dates = (date as string).split(",");
        if (dates.length === 1) {
            where.date = dates[0];
        } else if (dates.length === 2) {
            where.date = {
                [Op.between]: [new Date(dates[0]), new Date(dates[1])],
            };
        }
    }

    if (studentsCount) {
        students = (studentsCount as string).split(",").map(Number);
    }

    if (status) where.status = status;

    if (teacherIds) teacherIdsArray = (teacherIds as string).split(",").map(Number);

    const offset = (+page - 1) * +lessonsPerPage;

    try {
        const lessons = await Lesson.findAll({
            where,
            attributes: [
                "id",
                "date",
                "title",
                "status",
                [
                    cast(
                        literal(
                            "(SELECT COUNT(*) FROM lesson_students WHERE lesson_students.lesson_id = Lesson.id AND lesson_students.visit = TRUE)",
                        ),
                        "INTEGER",
                    ),
                    "visitCount",
                ],
            ],
            include: [
                {
                    model: Teacher,
                    through: { attributes: [] },
                    where:
                        teacherIdsArray.length > 0
                            ? {
                                  id: { [Op.in]: teacherIdsArray },
                              }
                            : {},
                },
                {
                    model: Student,
                    as: "students",
                    attributes: {
                        include: [
                            [
                                literal(`(
                                    SELECT lesson_students.visit
                                    FROM lesson_students
                                    WHERE lesson_students.student_id = students.id
                                    AND lesson_students.lesson_id = Lesson.id
                                )`),
                                "visit",
                            ],
                        ],
                    },
                    through: {
                        attributes: [],
                    },
                },
            ],
            limit: +lessonsPerPage,
            offset,
        });

        if (students.length === 0) {
            res.json(lessons);
            return;
        }

        if (students.length === 1) {
            res.json(
                lessons.filter((lessons) => lessons.dataValues.students.length === students[0]),
            );
        } else {
            res.json(
                lessons.filter(
                    (lessons) =>
                        lessons.dataValues.students.length >= students[0] &&
                        lessons.dataValues.students.length <= students[1],
                ),
            );
        }
    } catch (error) {
        //@ts-ignore
        res.status(400).json({ errorName: error.name, code: error.original.code });
    }
});
