import Lesson from "./Lesson";
import LessonStudent from "./LessonStudent";
import LessonTeacher from "./LessonTeacher";
import Student from "./Student";
import Teacher from "./Teacher";

Lesson.belongsToMany(Teacher, { through: LessonTeacher, foreignKey: "lesson_id" });
Lesson.belongsToMany(Student, { through: LessonStudent, foreignKey: "lesson_id", as: "students" });
Teacher.belongsToMany(Lesson, { through: LessonTeacher, foreignKey: "teacher_id" });
Student.belongsToMany(Lesson, { through: LessonStudent, foreignKey: "student_id", as: "lessons" });

export { Lesson, LessonStudent, LessonTeacher, Student, Teacher };
