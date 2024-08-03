import express from "express"
import { addEmployee, getEmployeeById, updateEmployee ,getAllEmployees, deleteEmployee } from "../controllers/employeeController.js"

const router = express.Router()

router.post("/add_employee", addEmployee)
router.get("/", getAllEmployees)
router.get("/:id", getEmployeeById)
router.put("/:id",updateEmployee)
router.delete("/:id",deleteEmployee)

export default router