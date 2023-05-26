const socketio = require('socket.io');
const { generarID } = require('../utils/helperFunctions');

let io;

// Inicializar el manejador de sockets
function init(server) {
    io = socketio(server);

    // Manejar eventos de conexión
    io.on('connection', socket => {
        console.log('Nueva conexión de socket establecida:', socket.id);

        // Manejar evento de nuevo mensaje
        socket.on('nuevoMensaje', mensaje => {
            mensaje.id = generarID();
            io.emit('mensaje', mensaje);
        });

        // Manejar evento de desconexión
        socket.on('disconnect', () => {
            console.log('Se ha desconectado un socket:', socket.id);
        });
    });
}

// Obtener instancia de socket.io
function getIO() {
    if (!io) {
        throw new Error('Socket.io no está inicializado.');
    }
    return io;
}

module.exports = {
    init,
    getIO,
};
