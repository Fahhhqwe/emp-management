import express, { Application } from 'express';
import path from 'path';
import routes from "./routes/employee.route"

export const app: Application = express();

app.use(express.json());

// serve ไฟล์ที่อัปโหลดไว้ เข้าถึงได้ผ่าน /uploads/filename
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api', routes);