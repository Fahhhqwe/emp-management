import { Router } from "express";
import { upload } from "../upload";
import * as employeeController from "../controllers/employee.controller";

const router = Router();

router.get('/employee', employeeController.getEmployeeAll);
router.get('/employee/:emp_id', employeeController.getEmployeeById);

// ใช้ multer middleware เพื่อรับไฟล์ profile จาก field ชื่อ "profile"
router.post('/employee', upload.single("profile"), employeeController.createEmployee);

router.patch('/employee/:emp_id', upload.single("profile"), employeeController.updateEmployee);
router.delete('/employee/:emp_id', employeeController.deleteEmployee);

export default router;