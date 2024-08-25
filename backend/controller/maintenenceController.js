import { getUserById} from "../utils.js/authUtils.js"
import { comparehashed,updatePassword } from "../utils.js/authUtils.js"
const maintenanceController = {
    changePassword:async (req,res)=>{
        const { oldPassword, newPassword } = req.body
        if(!oldPassword ||!newPassword) return res.status(422).json({ "message": "Old password and new password are required."})
        const userId = req.userId
        if(newPassword.length < 7) return res.status(422).json({message:"Password must be at least 8 characters long."})
            try {
                const user = await getUserById(userId);
                const isMatch = await comparehashed(oldPassword, user.password_hash);
                if (!isMatch) return res.status(401).json({ message: "Old password is incorrect." });
                await updatePassword(userId, newPassword);
                res.status(200).json({ message: "Password updated successfully." });
            } catch (error) {
                if (error.message === "User not found.") {
                    return res.status(404).json({ message: error.message });
                }
                res.status(500).json({ message: error.message });
            }
    },
}
export default maintenanceController
