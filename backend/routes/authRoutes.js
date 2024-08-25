import express from "express"


//import for controllers
import authController from "../controller/authController.js"


const router = express.Router()

//routes
router.post("/register", authController.register)
router.post("/login", authController.login)

export default router