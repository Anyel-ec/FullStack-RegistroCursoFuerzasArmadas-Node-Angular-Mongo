const validateEcuadorianID = require('./../utils/validateEcuadorianID');

const validateRegister = (req, res, next) => {
  const { identification, phone, email, name, birthdate, id_province, address, id_gender, id_commandType, gradeNote } = req.body;
  let errores = [];

  // Check if all required fields are present
  if (!identification) errores.push('El campo identificación es requerido');
  if (!phone) errores.push('El campo teléfono es requerido');
  if (!email) errores.push('El campo correo electrónico es requerido');
  if (!name) errores.push('El campo nombre es requerido');
  if (!birthdate) errores.push('El campo fecha de nacimiento es requerido');
  if (!id_province) errores.push('El campo ID de provincia es requerido');
  if (!address) errores.push('El campo dirección es requerido');
  if (!id_gender) errores.push('El campo ID de género es requerido');
  if (!id_commandType) errores.push('El campo ID de tipo de comando es requerido');
  if (!gradeNote) errores.push('El campo nota es requerido');

  // Validate Ecuadorian ID
  if (identification && !validateEcuadorianID(identification)) {
    errores.push('Cédula inválida');
  }

  // Validate phone number (10 digits and starts with 0)
  const phoneRegex = /^0\d{9}$/;
  if (phone && !phoneRegex.test(phone)) {
    errores.push('Número de teléfono inválido');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errores.push('Correo electrónico inválido');
  }

  // Validate name (min 3 characters, max 100 characters)
  if (name && (name.length < 3 || name.length > 100)) {
    errores.push('El nombre debe tener entre 3 y 100 caracteres');
  }

  // Validate birthdate (must be 18 or older)
  if (birthdate) {
    const birthdateObj = new Date(birthdate);
    const ageDiff = Date.now() - birthdateObj.getTime();
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 18) {
      errores.push('Debe ser mayor de 18 años');
    }
  }

  // Validate id_province (must be between 1 and 24)
  if (id_province && (id_province < 1 || id_province > 24)) {
    errores.push('ID de provincia inválido');
  }

  // Validate id_gender (must be between 1 and 4)
  if (id_gender && (id_gender < 1 || id_gender > 4)) {
    errores.push('ID de género inválido');
  }

  // Validate id_commandType (must be between 1 and 5)
  if (id_commandType && (id_commandType < 1 || id_commandType > 5)) {
    errores.push('ID de tipo de comando inválido');
  }

  // Validate gradeNote (must be numeric, between 14 and 20)
  const gradeNoteFloat = parseFloat(gradeNote);
  if (gradeNote && (isNaN(gradeNoteFloat) || gradeNoteFloat < 14 || gradeNoteFloat > 20)) {
    errores.push('Nota inválida. Debe estar entre 14 y 20');
  }

  // Return errors if any
  if (errores.length > 0) {
    return res.status(400).json({ state: 'error', code: 400, messages: errores });
  }

  next();
};

module.exports = validateRegister;
