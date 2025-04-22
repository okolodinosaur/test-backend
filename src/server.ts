import express from "express";
import bodyParser from "body-parser";

import { lessonsRouter } from "./routes";
import sequelize from "./database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/", lessonsRouter);

app.listen(PORT, async () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log("Соединение с базой данных установлено.");
    } catch (error) {
        console.error("Не удалось подключиться к базе данных:", error);
    }
});
