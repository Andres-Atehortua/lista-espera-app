let socket = io();

socket.on("connect", () => console.log("Conectado a servidor público."));
// socket.on("disconnect", () => alert("Desconectado de servidor público."));

// Número de ticket
let lblTicket1 = document.getElementById("lblTicket1");
let lblTicket2 = document.getElementById("lblTicket2");
let lblTicket3 = document.getElementById("lblTicket3");
let lblTicket4 = document.getElementById("lblTicket4");

// Número de mesa
let lblDesk1 = document.getElementById("lblEscritorio1");
let lblDesk2 = document.getElementById("lblEscritorio2");
let lblDesk3 = document.getElementById("lblEscritorio3");
let lblDesk4 = document.getElementById("lblEscritorio4");

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblDesk = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

function updateHtml(lastFourTickets) {
  for (let i = 0; i < lastFourTickets.length; i++) {
    lblTickets[i].innerText = `Ticket ${lastFourTickets[i].number}`;
    lblDesk[i].innerText = `Escritorio ${lastFourTickets[i].desk}`;
  }
}

socket.on("status", (data) => {
  console.log(data);
  let { lastFourTickets } = data;
  updateHtml(lastFourTickets);
});

socket.on("lastFourTickets", (data) => {
  let audio = new Audio("audio/new-ticket.mp3");
  audio.play();
  updateHtml(data.lastFourTickets);
});
