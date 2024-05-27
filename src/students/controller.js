const pool = require('../../db');
const queries = require('./queries')
const getStudents = (req, res) => {
    pool.query(queries.getStudent, (err, result) => {  
        if (err) {
            console.error("Error executing query", err.stack);
            res.status(500).json({ error: 'Internal Server Error', exception: err.message });
        } else {
            res.status(200).json(result.rows);
        }
    });
};
const isDataExist = (item, data) => {
    const query = `SELECT 1 FROM students WHERE ${item} = $1`;
    return new Promise((resolve, reject) => {
        pool.query(query, [data], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                reject(new Error("Internal server error"));
            } else {
                resolve(result.rows.length > 0);
            }
        });
    });
};


const getStudentsById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid student ID" });
    }
    const idExists = await isDataExist("id", id);
    if (!idExists) {
        return res.status(400).json({ message: "id not exists! Please use another id." });
    }
    pool.query(queries.getStudentById, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Internal server error", exception: err.message })
        } else {
            res.status(200).json(result.rows)
        }
    })

}

const addStudent = async (req, res) => {
    const { name, email, age, dob } = req.body;

    try {
        const emailExists = await isDataExist("email", email);

        if (emailExists) {
            return res.status(400).json({ message: "Email already exists! Please use another email." });
        }

        pool.query(queries.addStudent, [name, email, age, dob], (error, result) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ error: "Internal server error", exception: error.message });
            } else {
                res.status(201).json({ message: "Student added successfully", data: result.rows });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error", exception: error.message });
    }
};

const deleteStudent = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid student ID" });
        }
        const idExists = await isDataExist("id", id);
        if (!idExists) {
            return res.status(400).json({ message: "id not exists! Please use another id." });
        }
        pool.query(queries.deleteStudent, [id], (err, result) => {
            if (err) {
                res.status(500).json({ error: "Intenal server error", exception: err.message })
            } else {
                if (result.rowCount === 0) {
                    return res.status(404).json({ error: "Student not found" });
                }
                res.status(400).json({ message: "successfully deleted" })
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error", exception: error.message });
    }

}
const updateStudent = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age, dob } = req.body
    try {
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid student ID" });
        }
        const idExists = await isDataExist("id", id);
        if (!idExists) {
            return res.status(400).json({ message: "id not exists! Please use another id." });
        }
        pool.query(queries.updateStudent, [name, email, age, dob, id], (err, result) => {
            if (err) res.status(500).json({ message: "Interna; server error", exception: err.message })

            res.status(200).json({ message: "successfully updated" })
        })
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error", exception: error.message });
    }
}
module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    deleteStudent,
    updateStudent
};
