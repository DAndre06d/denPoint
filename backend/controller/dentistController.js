import db from "../config/dbConn.js"
const dentistController = {
    getDentist: (req,res)=>{
        const { time,specialty } = req.query
        let query = `SELECT * FROM dentists WHERE 1=1`
        let params = []
        if(specialty){
            query += ` AND specialty = ?`
            params = [specialty]
        }else if(time){
            query += ` AND time =?`
            params = [time]
        }else{
            return res.status(404).json({message: "Invalid query"})
        }
        db.query(query, params, (err, data)=>{
            if(err) return res.status(err).json({message: err.message})
            res.json(data)
        })
    },
    getDentistAvailableTime: (req,res)=>{
        const { denId,date } = req.query
        if(!denId){
            return res.status(400).json({message: "dentistId is required"})
        }
        let query = `
        SELECT
                d.full_name,
                d.specialty,
                a.appointment_date,
                a.time
            FROM
                dentist.dentists d
            LEFT JOIN
                dentist.appointments a
            ON
                d.id = a.dentist_id
            WHERE
                d.id = ?
        `
        let params = [denId]
        if(date){
            query += ` AND a.appointment_date =?`
            params.push(date)
        }
        db.query(query, params, (err, data)=>{
            if(err) return res.status(err).json({message: err.message})
            res.status(200).json(data)
        })
    }
}

export default dentistController