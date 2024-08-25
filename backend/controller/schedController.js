import db from "../config/dbConn.js"
import { checkExistingAppointmentForUser, checkDentistAvailability,saveAppointment,checkAppointmentIfExist, isUserCreatorOfAppointment,updateAppointment } from "../utils.js/appointmentUtils.js"
import { fetchPaginatedData, fetchTotalCount,getPagination, getAppointmentsQueries,deleteAppointmentById } from "../utils.js/appointmentUtils.js";
const schedController = {
    createAppointment: async (req, res) => {
        try {
            const { userId, denID, date, status, time, concern, typeOfService } = req.body;
            if (!userId || !denID || !date || !status || !time || !concern || !typeOfService) {
                return res.status(422).json({ message: "Please enter all the required information." });
            }
            const existingAppointment = await checkExistingAppointmentForUser(userId, date, time);
            if (existingAppointment.length > 0) {
                return res.status(409).json({ message: "An appointment already exists for this date and time." });
            }
    
            const dentistAvailability = await checkDentistAvailability(denID, date, time);
            if (dentistAvailability.length > 0) {
                return res.status(409).json({ message: "An appointment already exists for this dentist on this date and time." });
            }
    
            await saveAppointment(userId, denID, date, status, concern, time, typeOfService);
            res.status(200).json({ message: "Successfully booked a schedule." });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAppointments:async (req, res) => {
        const { userId, denId, page = 1, limit = 10 } = req.query;
    
        // Validate input
        if (userId && denId) {
            return res.status(400).json({ message: "Please provide only one of userId or denId, not both." });
        }
        if (userId && parseInt(userId) !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        if (!userId && !denId) {
            return res.status(400).json({ message: "Please provide either userId or denId." });
        }
    
        let { baseQuery, countQuery, params } = getAppointmentsQueries(userId, denId);
    
        if (!denId) {
            const pagination = getPagination(page, limit);
            baseQuery += ' LIMIT ? OFFSET ?';
            params.push(pagination.limit, pagination.offset);
        }
    
        try {
            // Fetch total count
            const totalCount = await fetchTotalCount(countQuery, params);
    
            // Fetch paginated data
            let data = await fetchPaginatedData(baseQuery, params);
    
            // Return the response
            res.status(200).json({
                total: totalCount,
                data: data
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching appointments from the database." });
        }
    },
    updateAppointment: async (req, res) => {
        const { userId, appointId, date, time, concern, denID, typeOfService } = req.body;
        if (!userId || !appointId) {
            return res.status(422).json({ message: "User ID, Appointment ID, and Type of Service are required." });
        }
        try {
            const appointmentExists = await checkAppointmentIfExist(appointId);
            if (appointmentExists.length === 0) {
                return res.status(404).json({ message: "Appointment not found." });
            }
            const isCreator = await isUserCreatorOfAppointment(userId, appointId);
            if (!isCreator) {
                return res.status(403).json({ message: "You do not have permission to update this appointment." });
            }
            const existingAppointment = await checkExistingAppointmentForUser(userId, date, time);
            if (existingAppointment.length > 0) {
                return res.status(400).json({ message: "An appointment already exists for the specified time and date." });
            }
            const updates = {};
            if (date !== undefined && date !== null) updates.appointment_date = date;
            if (time !== undefined && time !== null) updates.time = time;
            if (concern !== undefined && concern !== null) updates.concern = concern;
            if (denID !== undefined && denID !== null) updates.dentist_id = denID;
            if (typeOfService !== undefined && typeOfService !== null) updates.typeOfService = typeOfService;
            if (Object.keys(updates).length === 0) {
                return res.status(422).json({ message: "No fields to update." });
            }
            await updateAppointment(appointId, updates);
            res.status(200).json({ message: "Appointment updated successfully." });
        } catch (error) {
            res.status(500).json({ message: "Error updating appointment", error: error.message });
        }
    },
    deleteAppointment: async (req, res) => {
        const {userId, appointId} = req.body
        if (!userId ||!appointId) {
            return res.status(422).json({ message: "User and Appointment id are required." });
        }
        try{
            const appointmentExists = await checkAppointmentIfExist(appointId);
            if (appointmentExists.length === 0) {
                return res.status(404).json({ message: "Appointment not found." });
            }
            const isCreator = await isUserCreatorOfAppointment(userId, appointId);
            if (!isCreator) {
                return res.status(403).json({ message: "You do not have permission to make changes to this appointment." });
            }
            await deleteAppointmentById(appointId);
            return res.status(200).json({ message: "Appointment deleted successfully." });
        }catch(e){
            res.status(500).json({message: "Error deleting appointment", error: e.message})
        }
    }
}

export default schedController