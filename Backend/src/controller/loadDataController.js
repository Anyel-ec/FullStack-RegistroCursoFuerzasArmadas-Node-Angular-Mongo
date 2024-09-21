const { getDB } = require('./../config/db');

// Obtener todos los registros
exports.getProvinces = async (req, res) => {
    try {
        const db = getDB();
        const registers = await db.collection('provinces').find().toArray();
        res.json({ state: 'exito', code: 200, message: 'Registros obtenidos correctamente', data: registers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ state: 'error', code: 500, message: 'Error del servidor' });
    }
};

exports.getGender = async (req, res) => {
    try {
        const db = getDB();
        const registers = await db.collection('gender').find().toArray();
        // cerrar session de la base de datos
        res.json({ state: 'exito', code: 200, message: 'Registros obtenidos correctamente', data: registers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ state: 'error', code: 500, message: 'Error del servidor' });
    }
};

exports.getCommandType = async (req, res) => {
    try {
        const db = getDB();
        const registers = await db.collection('commandType').find().toArray();
        res.json({ state: 'exito', code: 200, message: 'Registros obtenidos correctamente', data: registers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ state: 'error', code: 500, message: 'Error del servidor' });
    }
};