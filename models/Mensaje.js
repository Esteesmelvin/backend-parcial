const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true },
    room: { type: String, required: true },
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

module.exports = Mensaje;
