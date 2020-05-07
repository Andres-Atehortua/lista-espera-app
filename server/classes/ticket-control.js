const fs = require("fs");

class Ticket {
  constructor(number, desk) {
    this.number = number;
    this.desk = desk;
  }
}

class TicketControl {
  constructor() {
    this.lastTicket = 0;
    this.today = new Date().getDate();
    this.lastFourTickets = [];
    this.tickets = [];

    let {
      today,
      lastTicket,
      tickets,
      lastFourTickets,
    } = require("./../data/data.json");

    this.today === today
      ? ((this.lastTicket = lastTicket),
        (this.tickets = tickets),
        (this.lastFourTickets = lastFourTickets))
      : this.restartCount();
  }

  attendTicket(desk) {
    if (this.tickets.length === 0) return "No hay tickets para atender";

    let ticketNumber = this.tickets[0].number;
    this.tickets.shift();

    let attendTicket = new Ticket(ticketNumber, desk);
    this.lastFourTickets.unshift(attendTicket);
    this.lastFourTickets.length > 4 && this.lastFourTickets.splice(-1, 1); // Borrar el último elemento

    console.log("ultimos 4");

    console.log(this.lastFourTickets);
    this.saveData();

    return attendTicket;
  }

  restartCount() {
    this.lastTicket = 0;
    this.tickets = [];
    this.lastFourTickets = [];
    this.saveData();
    console.log("Se ha inicializado el sistema.");
  }

  next() {
    this.lastTicket += 1;
    let ticket = new Ticket(this.lastTicket, null);
    this.tickets.push(ticket);
    this.saveData();
    return `Ticket ${this.lastTicket}`;
  }

  getLastTicket() {
    return `Ticket ${this.lastTicket}`;
  }
  getLastFourTickets() {
    return this.lastFourTickets;
  }

  saveData() {
    let jsonData = {
      lastTicket: this.lastTicket,
      today: this.today,
      tickets: this.tickets,
      lastFourTickets: this.lastFourTickets,
    };
    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = TicketControl;
