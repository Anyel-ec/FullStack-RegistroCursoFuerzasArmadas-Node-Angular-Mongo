const { getDB } = require("./../config/db");
const Register = require("./../collections/Register");
const VerifyData = require("./../collections/VerifyData");
const { ObjectId } = require("mongodb");

const emailService = require("../services/emailService");
const Registro = require("../emails/register");

// Obtener todos los registros
exports.getRegisters = async (req, res) => {
  try {
    const db = getDB();
    const registers = await db.collection("registers").find().toArray();
    res.json({
      state: "exito",
      code: 200,
      message: "Registros obtenidos correctamente",
      data: registers,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: "error", code: 500, message: "Error del servidor" });
  }
};

// Obtener un registro por ID
exports.getRegisterById = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    const register = await db
      .collection("registers")
      .findOne({ _id: new ObjectId(id) });
    if (!register) {
      return res
        .status(404)
        .json({ state: "error", code: 404, message: "Registro no encontrado" });
    }
    res.json({
      state: "exito",
      code: 200,
      message: "Registro obtenido correctamente",
      data: register,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: "error", code: 500, message: "Error del servidor" });
  }
};

// Obtener un registro por identificación
exports.getRegisterByIdentification = async (req, res) => {
  const { identification } = req.params;
  try {
    const db = getDB();
    const register = await db
      .collection("registers")
      .findOne({ identification: identification });
    if (!register) {
      return res
        .status(404)
        .json({ state: "error", code: 404, message: "Registro no encontrado" });
    }
    res.json({
      state: "exito",
      code: 200,
      message: "Registro obtenido correctamente",
      data: register,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: "error", code: 500, message: "Error del servidor" });
  }
};

// Crear un nuevo registro
exports.createRegister = async (req, res) => {
  const {
    identification,
    phone,
    email,
    name,
    birthdate,
    id_province,
    address,
    id_gender,
    id_commandType,
    gradeNote,
  } = req.body;
  try {
    const db = getDB();
    const register = new Register(
      identification,
      phone,
      email,
      name,
      birthdate,
      id_province,
      address,
      id_gender,
      id_commandType,
      gradeNote
    );
    await db.collection("registers").insertOne(register);
    res.status(201).json({
      state: "exito",
      code: 201,
      message: "Registro creado correctamente",
      data: register,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: "error", code: 500, message: "Error del servidor" });
  }
};

// Actualizar un registro por identificación
exports.updateRegisterByIdentification = async (req, res) => {
  const { identification } = req.params;
  const {
    phone,
    email,
    name,
    birthdate,
    id_province,
    address,
    id_gender,
    id_commandType,
    gradeNote,
  } = req.body;
  try {
    const db = getDB();
    const updatedRegister = await db.collection("registers").findOneAndUpdate(
      { identification: identification },
      {
        $set: {
          phone,
          email,
          name,
          birthdate,
          id_province,
          address,
          id_gender,
          id_commandType,
          gradeNote,
        },
      },
      { returnOriginal: false, returnDocument: "after" }
    );

    if (!updatedRegister.value) {
      return res
        .status(404)
        .json({ state: "error", code: 404, message: "Registro no encontrado" });
    }

    // Actualizar verifyData
    const id_state = 1;

    const verifyData = new VerifyData(
      updatedRegister.value._id,
      new Date(),
      new Date(),
      id_state
    );

    console.log("verifyData:", verifyData);
    await db.collection("verifyData").insertOne(verifyData);

    res.json({
      state: "exito",
      code: 200,
      message: "Registro actualizado correctamente",
      data: updatedRegister.value,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: "error", code: 500, message: "Error del servidor" });
  }
};

// Actualizar un registro por ID
exports.updateRegister = async (req, res) => {
  const { id } = req.params;
  const {
    identification,
    phone,
    email,
    name,
    birthdate,
    id_province,
    address,
    id_gender,
    id_commandType,
    gradeNote,
  } = req.body;
  try {
    const db = getDB();
    const updatedRegister = await db.collection("registers").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          identification,
          phone,
          email,
          name,
          birthdate,
          id_province,
          address,
          id_gender,
          id_commandType,
          gradeNote,
        },
      },
      { returnOriginal: false, returnDocument: "after" }
    );
    if (!updatedRegister.value) {
      return res
        .status(404)
        .json({ state: "error", code: 404, message: "Registro no encontrado" });
    }
    res.json({
      state: "exito",
      code: 200,
      message: "Registro actualizado correctamente",
      data: updatedRegister.value,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: "error", code: 500, message: "Error del servidor" });
  }
};

// Eliminar un registro
exports.deleteRegister = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    await db.collection("registers").deleteOne({ _id: new ObjectId(id) });
    res.json({
      state: "exito",
      code: 200,
      message: "Registro eliminado correctamente",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: "error", code: 500, message: "Error del servidor" });
  }
};

// Crear o actualizar un registro por identificación
exports.createOrUpdateRegister = async (req, res) => {
  const {
    identification,
    phone,
    email,
    name,
    birthdate,
    id_province,
    address,
    id_gender,
    id_commandType,
    gradeNote,
  } = req.body;
  console.log("ENTRO AL METODO DE CREAR");

  try {
    const db = getDB();
    const existingRegister = await db
      .collection("registers")
      .findOne({ identification: identification });
    if (existingRegister) {
      console.log("ENTRO AL METODO DE ACTUALIZAR");
      const updatedRegister = await db.collection("registers").findOneAndUpdate(
        { identification: identification },
        {
          $set: {
            phone,
            email,
            name,
            birthdate,
            id_province,
            address,
            id_gender,
            id_commandType,
            gradeNote,
          },
        },
        { returnOriginal: false, returnDocument: "after" }
      );

      // Actualizar verifyData
      const id_state = 1;
      const verifyData = new VerifyData(
        existingRegister._id,
        new Date(),
        new Date(),
        id_state
      );
      console.log("verifyData", verifyData);
      await db.collection("verifyData").insertOne(verifyData);

      const htmlContent = Registro(name);
      emailService.sendEmail(email, "REGISTRO EXITOSO", htmlContent);

      res.json({
        state: "exito",
        code: 200,
        message: "Registro actualizado correctamente",
        data: updatedRegister.value,
      });
    } else {
      const register = new Register(
        identification,
        phone,
        email,
        name,
        birthdate,
        id_province,
        address,
        id_gender,
        id_commandType,
        gradeNote
      );
      const result = await db.collection("registers").insertOne(register);

      // Crear verifyData
      const id_state = 1;
      const verifyData = new VerifyData(
        result.insertedId,
        new Date(),
        new Date(),
        id_state
      );
      await db.collection("verifyData").insertOne(verifyData);

      const htmlContent = Registro(name);
      emailService.sendEmail(email, "REGISTRO EXITOSO", htmlContent);

      res.status(201).json({
        state: "exito",
        code: 201,
        message: "Registro creado correctamente",
        data: register,
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: "error", code: 500, message: "Error del servidor" });
  }
};
