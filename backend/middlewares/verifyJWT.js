import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const verifyJWT = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json({"message": "Not Authenticated."})
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
        if(err) return res.status(403).json("Invalid Token, Forbidden.")
        req.userId = decoded.userId
        req.role = decoded.role
        next()
    })
}

export default verifyJWT