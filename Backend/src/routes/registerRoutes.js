const express = require('express');
const router = express.Router();
const registerController = require('./../controller/registerController');
const validateRegister = require('./../middleware/registerMiddleware');

router.get('/', registerController.getRegisters);
router.get('/:id', registerController.getRegisterById); // Ruta para obtener por ID
router.get('/identification/:identification', registerController.getRegisterByIdentification); // Ruta para obtener por identificación
router.post('/', validateRegister, registerController.createOrUpdateRegister); // Ruta para crear o actualizar por identificación
router.put('/:id', validateRegister, registerController.updateRegister);
router.put('/identification/:identification', validateRegister, registerController.updateRegisterByIdentification);
router.delete('/:id', registerController.deleteRegister);

module.exports = router;
