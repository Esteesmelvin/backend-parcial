const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// Ruta para enviar un mensaje
router.post('/mensaje', chatController.enviarMensaje);

// Ruta para obtener la lista de mensajes
router.get('/mensajes', chatController.obtenerMensajes);

module.exports = router;
