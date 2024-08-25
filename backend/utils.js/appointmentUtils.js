import db from "../config/dbConn.js";

export const checkExistingAppointmentForUser = (userId, appointDate, time) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM appointments WHERE user_id = ? AND appointment_date = ? AND time = ?`;
        db.query(query, [userId, appointDate, time], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

export const checkDentistAvailability = (denID, appointDate, time) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM appointments WHERE dentist_id = ? AND appointment_date = ? AND time = ?`;
        db.query(query, [denID, appointDate, time], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

export const saveAppointment = (userId, denID, appointDate, status, concern, time, typeOfService) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO appointments (user_id, dentist_id, appointment_date, status, concern, time, typeOfService) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [userId, denID, appointDate, status, concern, time, typeOfService], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};
export const deleteAppointmentById = (appointId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM appointments WHERE id = ?';
        db.query(query, [appointId], (err, result) => {
            if (err) {
                console.error('Error deleting appointment:', err.message);
                return reject(new Error('Error deleting appointment'));
            }
            resolve(result);
        });
    });
}

export const checkAppointmentIfExist = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM appointments WHERE id = ?`;
        db.query(query, [id], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

export const isUserCreatorOfAppointment = (userId, appointmentId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM appointments WHERE id = ? AND user_id = ?`;
        db.query(query, [appointmentId, userId], (err, data) => {
            if (err) return reject(err);
            resolve(data.length > 0); // Resolve with true if user is the creator, false otherwise
        });
    });
};

export const updateAppointment = (appointmentId, updates) => {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE appointments SET ';
        const params = [];
        let fieldsUpdated = false;

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined && value !== null) {
                const columnName = key === 'type_of_service' ? 'typeOfService' : key;
                query += `${columnName} = ?, `;
                params.push(value);
                fieldsUpdated = true;
            }
        }
        if (!fieldsUpdated) {
            return reject(new Error('No fields to update'));
        }
        query = query.slice(0, -2);
        query += ' WHERE id = ?';
        params.push(appointmentId);
        db.query(query, params, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

export const getPagination = (page, limit) => {
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    return {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize
    };
}

export const fetchTotalCount = (countQuery, params) => {
    return new Promise((resolve, reject) => {
        db.query(countQuery, params, (err, results) => {
            if (err) return reject(err);
            resolve(results[0].total);
        });
    });
};

export const fetchPaginatedData = (baseQuery, params) => {
    return new Promise((resolve, reject) => {
        db.query(baseQuery, params, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

export const getAppointmentsQueries = (userId, denId) => {
    // Base query to get appointments with an inner join on the dentists table
    let baseQuery = `
        SELECT appointments.*, dentists.full_name AS dentist_name 
        FROM appointments 
        INNER JOIN dentists ON appointments.dentist_id = dentists.id 
        WHERE 1=1`;
    let countQuery = `
        SELECT COUNT(*) AS total 
        FROM appointments 
        INNER JOIN dentists ON appointments.dentist_id = dentists.id 
        WHERE 1=1`;
    const params = [];

    if (userId) {
        baseQuery += ' AND appointments.user_id = ?';
        countQuery += ' AND appointments.user_id = ?';
        params.push(userId);
    }
    if (denId) {
        baseQuery += ' AND appointments.dentist_id = ?';
        countQuery += ' AND appointments.dentist_id = ?';
        params.push(denId);
    }

    return { baseQuery, countQuery, params };
}

export const getUpcomingAppointments = (date) => {
    return new Promise((resolve, reject) => {
        // Format the date as 'YYYY-MM-DD' for the query
        const formattedDate = date.toISOString().split('T')[0];
        const query = `
            SELECT a.*, u.email, u.firstname
            FROM appointments AS a
            JOIN users AS u ON a.user_id = u.id
            WHERE DATE(a.appointment_date) = ?
        `;

        db.query(query, [formattedDate], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    })
}
