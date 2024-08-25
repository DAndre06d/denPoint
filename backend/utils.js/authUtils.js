import db from "../config/dbConn.js";
import bcrypt from "bcrypt"
export const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE id = ?";
        db.query(query, [userId], (err, data) => {
            if (err) return reject(new Error(err.message));
            if (data.length === 0) return reject(new Error("User not found."));
            resolve(data[0]);
        });
    });
};

export const comparehashed = (data, hashedData) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(data, hashedData, (err, result) => {
            if (err) return reject(new Error("Error comparing passwords."));
            resolve(result);
        });
    });
};

export const updatePassword = (userId, newPassword) => {
    return new Promise((resolve, reject) => {
        // Hash the new password
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) return reject(new Error("Error hashing new password."));
            
            const query = "UPDATE users SET password_hash = ? WHERE id = ?";
            db.query(query, [hashedPassword, userId], (err) => {
                if (err) return reject(new Error("Error updating password."));
                resolve();
            });
        });
    });
};