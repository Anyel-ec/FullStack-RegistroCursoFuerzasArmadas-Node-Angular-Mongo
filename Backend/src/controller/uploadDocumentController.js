const { getDB } = require("./../config/db");
const { ObjectId } = require("mongodb");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('document');


exports.updateVerifyDocument = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ estado: 'error', codigo: 500, mensaje: 'Error al subir el archivo' });
    }
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ estado: 'error', codigo: 400, mensaje: 'No se ha recibido ningún archivo' });
    }

    if (file.mimetype === 'application/pdf') {
      typeDocument = 'application/pdf';
    } else if (file.mimetype.startsWith('image/')) {
      typeDocument = file.mimetype;
    } else {
      return res.status(400).json({ estado: 'error', codigo: 400, mensaje: 'Tipo de archivo no soportado' });
    }

    try {
      const db = getDB();

      const updatedDocument = await db
        .collection('uploadDocument')
        .findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { document: file.buffer, id_state: 2, typeDocument: typeDocument } },
          { returnOriginal: false }
        );

      res.json({
        estado: 'exito',
        codigo: 200,
        mensaje: 'Datos de verificación actualizados correctamente',
        data: updatedDocument.value,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        estado: 'error',
        codigo: 500,
        mensaje: 'Error del servidor',
      });
    }
  });
};
  
