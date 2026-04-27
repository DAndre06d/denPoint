import db from "../config/dbConn.js";
const fetchDentistNames = async (dentistIds) => {
    if (dentistIds.length === 0) return {};
    try {
        const placeholders = dentistIds.map(() => "?").join(", ");
        const query = `SELECT id, full_name FROM dentists WHERE id IN (${placeholders})`;
        const [rows] = await db.execute(query, dentistIds);
        const dentistMap = rows.reduce((acc, row) => {
            acc[row.id] = row.full_name;
            return acc;
        }, {});
        return dentistMap;
    } catch (error) {
        console.error('Error fetching dentist names:', error);
        throw new Error('Failed to fetch dentist names');
    }
};

export default fetchDentistNames;
