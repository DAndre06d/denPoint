import db from "../config/dbConn";
const fetchDentistNames = async (dentistIds) => {
    if (dentistIds.length === 0) return {};
    try {
        const query = 'SELECT id, name FROM dentists WHERE id IN (?)';
        const [rows] = await db.execute(query, [dentistIds]);
        const dentistMap = rows.reduce((acc, row) => {
            acc[row.id] = row.name;
            return acc;
        }, {});
        return dentistMap;
    } catch (error) {
        console.error('Error fetching dentist names:', error);
        throw new Error('Failed to fetch dentist names');
    }
};