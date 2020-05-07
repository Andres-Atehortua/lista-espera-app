let socket = io();

socket.on("connect", () =>
  console.log("Conectado al servidor, CREACIÓN DE TICKET")
);

socket.on("disconnect", () =>
  console.log("Servidor desconectado. CREACIÓN DE TICKET")
);

socket.on("status", (data) => {
  document.getElementById("lblNuevoTicket").innerText = data.actualTicket;
});

document.querySelector("button").onclick = () => {
  socket.emit("nextTicket", null, (nextTicket) => {
    document.getElementById("lblNuevoTicket").innerText = nextTicket;
  });
};
