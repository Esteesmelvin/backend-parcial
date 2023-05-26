const Mensaje = require('../models/Mensaje');

// Controlador para enviar un mensaje en el chat
function enviarMensaje(req, res) {
    const { id, latitud, longitud, room, contenido } = req.body;

    // Crear una nueva instancia del modelo de Mensaje
    const nuevoMensaje = new Mensaje({ id, latitud, longitud, room, contenido });

    // Guardar el mensaje en la base de datos
    nuevoMensaje.save((err, mensajeGuardado) => {
        if (err) {
            console.error('Error al guardar el mensaje:', err);
            res.status(500).json({ error: 'Ocurrió un error al enviar el mensaje.' });
        } else {
            res.status(201).json(mensajeGuardado);
        }
    });
}

// Controlador para obtener la lista de mensajes del chat
function obtenerMensajes(req, res) {
    Mensaje.find({}, (err, mensajes) => {
        if (err) {
            console.error('Error al obtener los mensajes:', err);
            res.status(500).json({ error: 'Ocurrió un error al obtener los mensajes.' });
        } else {
            res.status(200).json(mensajes);
        }
    });
}


module.exports = {
    enviarMensaje,
    obtenerMensajes,
};
