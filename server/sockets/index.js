const io = require("./../server");

const { TicketControl } = require("./../classes");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  client.emit("status", {
    actualTicket: ticketControl.getLastTicket(),
    lastFourTickets: ticketControl.getLastFourTickets(),
  });

  client.on("nextTicket", (data, callback) => {
    callback(ticketControl.next());
  });

  client.on("attendTicket", (data, callback) => {
    if (!data.desk) {
      return callback({ ok: false, message: "El escritorio es necesario." });
    }
    callback(ticketControl.attendTicket(data.desk));

    client.broadcast.emit("lastFourTickets", {
      lastFourTickets: ticketControl.getLastFourTickets(),
    });
  });
});
