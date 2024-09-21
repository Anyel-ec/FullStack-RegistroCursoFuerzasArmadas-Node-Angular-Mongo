const validateVerifyData = (req, res, next) => {
    const { id_register, created_at, updated_at } = req.body;
    let errores = [];
  
    // Check if all required fields are present
    if (!id_register) errores.push('El campo ID de registro es requerido');
    if (!created_at) errores.push('El campo fecha de creación es requerido');
    if (!updated_at) errores.push('El campo fecha de actualización es requerido');
  
    // Validate date fields
    if (created_at && isNaN(Date.parse(created_at))) {
      errores.push('Fecha de creación inválida');
    }
    if (updated_at && isNaN(Date.parse(updated_at))) {
      errores.push('Fecha de actualización inválida');
    }
  
    // Return errors if any
    if (errores.length > 0) {
      return res.status(400).json({ estado: 'error', codigo: 400, mensajes: errores });
    }
  
    next();
  };
  
  module.exports = validateVerifyData;
  