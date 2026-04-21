import { pool } from "../config/db"

export async function getEmployeeAll() {
    try {
        const result = await pool.query(`SELECT * FROM users`);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function getEmployeeById(usr_id: number) {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE usr_id = $1`, [usr_id]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function createEmployee(data: {
    firstname: string;
    lastname: string;
    gender: string;
    department: string;
    jobrole: string;
    email: string;
    phone: string;
    profile: string | null;
}) {
    try {
        const result = await pool.query(
            `INSERT INTO users 
                (usr_rol_id, usr_firstname, usr_lastname, usr_gender, usr_department, usr_jobrole, usr_email, usr_phone, usr_profile) 
             VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
             RETURNING *`,
            [
                2, // default role = employee
                data.firstname,
                data.lastname,
                data.gender,
                data.department,
                data.jobrole,
                data.email,
                data.phone,
                data.profile,
            ]
        );
        return result.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function updateEmployee(
    id: number,
    data: {
        firstname?: string;
        lastname?: string;
        gender?: string;
        department?: string;
        jobrole?: string;
        email?: string;
        phone?: string;
        profile?: string | null;
    }
) {
    try {
        const result = await pool.query(
            `UPDATE users SET
                usr_firstname = COALESCE($1, usr_firstname),
                usr_lastname = COALESCE($2, usr_lastname),
                usr_gender = COALESCE($3, usr_gender),
                usr_department = COALESCE($4, usr_department),
                usr_jobrole = COALESCE($5, usr_jobrole),
                usr_email = COALESCE($6, usr_email),
                usr_phone = COALESCE($7, usr_phone),
                usr_profile = COALESCE($8, usr_profile)
            WHERE usr_id = $9
            RETURNING *`,
            [
                data.firstname,
                data.lastname,
                data.gender,
                data.department,
                data.jobrole,
                data.email,
                data.phone,
                data.profile,
                id
            ]
        );

        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function deleteEmployee(id: number) {
    try {
        const result = pool.query(
            `DELETE FROM users WHERE usr_id = $1 RETURNING *`,
            [id]
        );

        return (await result).rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}