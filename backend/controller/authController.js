import db from "../config/dbConn.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { comparehashed, getUserById, updatePassword } from "../utils.js/authUtils.js"
const saltRounds = 10
const authController = {
    register: (req, res) => {
        const { email, password, fName,lName, phoneNumber } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ "message": "Email and password are required." });
        }
        if (password.length <= 7) {
            return res.status(400).json({ "message": "Password should be more than 7 characters." });
        }
        const q_checkUser = "SELECT * FROM users WHERE email = ?";
        db.query(q_checkUser, [email], (err, data) => {
            if (err) {
                return res.status(500).json({ "message": "Error querying the database." });
            }
            if (data.length > 0) {
                console.log(data)
                return res.status(409).json({ "message": "Email already exists." });
            } else {
                bcrypt.hash(password, saltRounds, (err, hashedPass) => {
                    if (err) {
                        return res.status(500).json({ "message": "Error hashing password." });
                    }
                    const q = "INSERT INTO users (email, password_hash, firstname,lastname, phone_number, role) VALUES (?, ?, ?, ?, ?, 'patient')";
                    db.query(q, [email, hashedPass, fName,lName, phoneNumber], (err, result) => {
                        if (err) {
                            return res.status(500).json({ "message": "Error creating user." });
                        }
                        return res.status(201).json({ "message": "Successfully created the new user." });
                    });
                });
            }
        });
    },
    login: (req,res)=>{
        const{email, password} = req.body
        if(!email || !password) return res.status(422).json({ "message": "Email and password is required."})
        const q_checkUser = "SELECT * FROM users WHERE email =?"
        db.query(q_checkUser, [email], (err, data)=>{
            if(err) return res.status(err).json({ "message": err.message})
            if(data.length === 0) return res.status(404).json({ "message": "User not found."})
            const user = data[0]
            bcrypt.compare(password, user.password_hash, (err, result)=>{
                if(err) return res.status(500).json({ "message": "Error comparing passwords."})
                if(!result) return res.status(401).json({ "message": "Incorrect username or password."})
                const accessToken = jwt.sign({ userId: user.id, email: user.email,role: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                res.cookie('access_token', accessToken, {
                    httpOnly: true, 
                    secure: true, 
                    sameSite: 'Strict', 
                    maxAge: 3600000 
                });
                return res.status(200).json({
                    "message": "Login successful",
                    "user": {
                        "id": user.id,
                        "username": user.fName,
                        "email": user.email,
                        "role": user.role,
                        "name": user.firstname,
                    }
                })
            })
        })
    },
    
}

export default authController