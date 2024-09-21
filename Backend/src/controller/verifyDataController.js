const { getDB } = require('./../config/db');
const { ObjectId } = require('mongodb');
const VerifyDocumentCreate = require("../collections/VerifyDocument");
const UploadDocumentCreate = require("../collections/UploadDocument");

const emailService = require("../services/emailService");
const RegistroDenegado = require("../emails/registerDenied");
const SubirArchivo = require("../emails/uploadDocument");

// Obtener todos los registros
exports.getVerifyData = async (req, res) => {
  try {
    const db = getDB();
    const verifyData = await db.collection('verifyData').find().toArray();
    res.status(200).json(verifyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ estado: 'error', codigo: 500, mensaje: 'Error del servidor' });
  }
};

// Obtener todos los registros con datos relacionados
exports.getRelationsVerifyData = async (req, res) => {
  try {
    const db = getDB();
    const verifyData = await db.collection('fullVerifyData').find().toArray();
    res.status(200).json(verifyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ estado: 'error', codigo: 500, mensaje: 'Error del servidor' });
  }
};

// Actualizar un registro
exports.updateVerifyData = async (req, res) => {
  const { id } = req.params;
  const { updated_at } = req.body;
  try {
    const db = getDB();

    const searchName = await db.collection('verifyData').findOne({ _id: new ObjectId(id) });
    const register = await  db.collection('registers').findOne({ _id: new ObjectId(searchName.id_register) });

    const updatedVerifyData = await db.collection('verifyData').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { updated_at, id_state: 2 } },
      { returnOriginal: false }
    );

    const VerifyDocument = new VerifyDocumentCreate(
      new ObjectId(id),
      new Date(),
      new Date(),
      1
    );
    await db.collection("verifyDocument").insertOne(VerifyDocument);

    const searchData = await db.collection('verifyDocument').findOne({ id_verifyData: new ObjectId(id) });
    const uploadDocument = new UploadDocumentCreate(
      new ObjectId(searchData._id),
      null,
      null,
      1
    );
    await db.collection("uploadDocument").insertOne(uploadDocument);

    const searchId = await db.collection('uploadDocument').findOne({ id_verifyDocument: new ObjectId(searchData._id) });

    const htmlContent = SubirArchivo(register.name, searchId._id);
    emailService.sendEmail(register.email, "DATOS ACEPTADOS", htmlContent);


    res.json({ estado: 'exito', codigo: 200, mensaje: 'Datos de verificación actualizados correctamente', data: updatedVerifyData.value });
  } catch (err) {
    console.error(err);
    res.status(500).json({ estado: 'error', codigo: 500, mensaje: 'Error del servidor' });
  }
};

// Eliminar un registro
exports.deleteVerifyData = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    const searchName = await db.collection('verifyData').findOne({ _id: new ObjectId(id) });
    const register = await  db.collection('registers').findOne({ _id: new ObjectId(searchName.id_register) });
    
    const htmlContent = RegistroDenegado(register.name);
    emailService.sendEmail(register.email, "Real Agency - Datos Rechazados", htmlContent);

    await db.collection('verifyData').deleteOne({ _id: new ObjectId(id) });
    res.json({ estado: 'exito', codigo: 200, mensaje: 'Datos de verificación eliminados correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ estado: 'error', codigo: 500, mensaje: 'Error del servidor' });
  }
};

