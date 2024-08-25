import maintenanceController from "../controller/maintenenceController.js";
import express from "express"

const router = express.Router()
router.post("/changePassword", maintenanceController.changePassword)



export default router