import { NextFunction, Request, Response } from "express";
import * as employeeService from "../services/employee.service";
import fs from "fs";
import path from "path";

export async function getEmployeeAll(req: Request, res: Response, next: NextFunction) {
    try {
        const employee = await employeeService.getEmployeeAll();
        res.status(200).json(employee);
    } catch (err) {
        next(err);
    }
}

export async function getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
        const empId = Number(req.params.emp_id);
        const employee = await employeeService.getEmployeeById(empId);
        res.status(200).json(employee);
    } catch (err) {
        next(err);
    }
}

export async function createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
        // multer จะใส่ข้อมูลไฟล์ไว้ใน req.file
        // ข้อมูลอื่นๆ จะอยู่ใน req.body (ส่งมาเป็น FormData)
        const { firstname, lastname, gender, department, jobrole, email, phone } = req.body;

        const data = {
            firstname,
            lastname,
            gender,
            department,
            jobrole,
            email,
            phone,
            profile: req.file ? req.file.filename : null, // เก็บชื่อไฟล์ที่ multer generate ให้
        };

        const result = await employeeService.createEmployee(data);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}

export async function updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
        const empId = Number(req.params.emp_id);

        const { firstname, lastname, gender, department, jobrole, email, phone } = req.body;

        // ถ้ามีการ upload รูปใหม่ → ดึงข้อมูล employee เดิมเพื่อลบรูปเก่า
        if (req.file) {
            const existing = await employeeService.getEmployeeById(empId);
            if (existing?.usr_profile) {
                const oldFilePath = path.join("uploads", existing.usr_profile);
                fs.unlink(oldFilePath, (err) => {
                    if (err) console.warn("Could not delete old profile image:", err.message);
                });
            }
        }

        const data = {
            firstname,
            lastname,
            gender,
            department,
            jobrole,
            email,
            phone,
            // ถ้าไม่มีรูปใหม่ ให้ไม่ส่ง key "profile" เลย เพื่อให้ COALESCE รักษาค่าเดิมไว้
            ...(req.file ? { profile: req.file.filename } : {})
        };

        const result = await employeeService.updateEmployee(empId, data);

        if (!result) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
        const empId = Number(req.params.emp_id);

        const employee = await employeeService.deleteEmployee(empId);

        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        next(err);
    }
}