const { getDB } = require("./../config/db");
const User = require('./../collections/User');
const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');


// Obtener todos los registros
exports.getRoles = async (req, res) => {
  try {
    const db = getDB();
    const roles = await db.collection("Roles").find().toArray();
    res.json({
      state: "exito",
      code: 200,
      message: "Registros obtenidos correctamente",
      data: roles,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ state: "error", code: 500, message: "Error del servidor" });
  }
};


exports.getRoleByID= async (req, res) => {
    const { id } = req.params;
    try {
      const db = getDB();
      const roles = await db
        .collection("roles")
        .findOne({ _id: new ObjectId(id) });
      if (!roles) {
        return res
          .status(404)
          .json({ state: "error", code: 404, message: "Registro no encontrado" });
      }
      res.json({
        state: "exito",
        code: 200,
        message: "Registro obtenido correctamente",
        data: roles,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ state: "error", code: 500, message: "Error del servidor" });
    }
  };

  // Crear un nuevo usuario
exports.createUser = async (req, res) => {
    const { username, id_rol, fullName, password, email, state } = req.body;

    try {
        const db = getDB();
        const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ state: "error", code: 400, message: "Username or email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, id_rol, fullName, hashedPassword, email, state);

        await db.collection('users').insertOne(user);
        res.status(201).json({
            state: "success",
            code: 201,
            message: "User created successfully",
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ state: "error", code: 500, message: "Server error" });
    }
};

// Autenticar un usuario
exports.loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const db = getDB();
        const user = await db.collection('users').findOne({ 
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });

        if (!user) {
            return res.status(400).json({ state: "error", code: 400, message: "Invalid username or email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ state: "error", code: 400, message: "Invalid password" });
        }

        res.json({
            state: "success",
            code: 200,
            message: "Login successful",
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ state: "error", code: 500, message: "Server error" });
    }
};