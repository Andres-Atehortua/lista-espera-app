let socket = io();
let searchParams = new URLSearchParams(window.location.search);

socket.on("connect", () => console.log("Conectado al servidor, ESCRITORIO"));

socket.on("disconnect", () => console.log("Servidor desconectado. ESCRITORIO"));

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}
let desk = searchParams.get("escritorio");

document.querySelector("h1").innerText = `Escritorio ${desk}`;
document.querySelector("button").onclick = () => {
  socket.emit("attendTicket", { desk }, (resp) => {
    if (resp === "No hay tickets para atender") {
      document.querySelector("small").innerText = resp;

      alert("No hay tickets para atender");
      return;
    }
    document.querySelector("small").innerText = resp.number;
  });
};
