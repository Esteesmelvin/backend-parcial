const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chatRoutes');
const { init: initSocketHandler } = require('./sockets/socketHandler');

// Cargar variables de entorno
dotenv.config();

// Configurar conexión a la base de datos
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('CONECTADO A LA DB');
});
mongoose.connection.on('error', err => {
    console.error('Error al conectar a la base de datos:', err);
});

// Configurar servidor de Express
const app = express();
app.use(express.json());
app.use('/api/chat', chatRoutes);

// Crear servidor HTTP utilizando Express
const server = http.createServer(app);

// Inicializar el manejador de sockets
initSocketHandler(server);

// Configurar puerto del servidor
const port = process.env.PORT || 3000;

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
