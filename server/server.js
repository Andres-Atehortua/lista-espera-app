const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
let server = http.createServer(app);
let io = socketIO(server);

// Habilitar public
app.use(express.static(path.resolve(__dirname, "./../public")));

// IO = Esta es la comunicación del backend. Inputs Outputs

server.listen(process.env.PORT, () =>
  console.log(`Servidor levantado en el puerto ${process.env.PORT}`)
);

// Para que funcione sockets tiene que estar asi.
module.exports = io;
require("./sockets");
