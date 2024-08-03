import express from "express"
import { getFeedbackByEmployee, giveFeedback } from "../controllers/feedbackController.js"

const router = express.Router()

router.post("/", giveFeedback)
router.get("/reviews/:id" ,getFeedbackByEmployee)



export default router