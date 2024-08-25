import express from "express"
import schedController from "../controller/schedController.js"

const router = express.Router()
router.post("/createAppointment", schedController.createAppointment)
router.get("/getAppointments", schedController.getAppointments)
router.post("/updateAppointment", schedController.updateAppointment)
router.post("/deleteAppointment", schedController.deleteAppointment)


export default router