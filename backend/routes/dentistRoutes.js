import express from "express"
import dentistController from "../controller/dentistController.js"
const router = express.Router()
router.get("/getDentists", dentistController.getDentist)
router.get("/getDentistAvailableTime", dentistController.getDentistAvailableTime)


export default router