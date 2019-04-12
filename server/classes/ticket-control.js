// **YO SIGO SIENDO SERVER**//

const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDay();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        console.log(data);

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }



    siguiente() {
        this.ultimo = this.ultimo + 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo}`;
    }

    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;
    }
    getUltimos4() {

        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) { //VERIFICA QUE HAYAN TICKETS PENDIENTES DE ATENDER
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero; // EXTRAIGO EL NUMERO PARA ROMPER LA RELACION QUE TIENE JSCRIPT CON QUE TODOS LOS OBJETOS SON PASADOS POR REFERENCIA
        this.tickets.shift(); // ELIMINO LA PRIMERA POSICION DEL ARREGLO
        let atenderTicket = new Ticket(numeroTicket, escritorio); // DECLARO EL TICKET QUE VOYT A ATENDER(VIENE CON NºTICKET Y ESCRITORIO)
        console.log(atenderTicket);
        this.ultimos4.unshift(atenderTicket); // UBICO ESTE TICKET AL INICIO DEL ARREGLO DEL LOS ULTIMOS 4

        if (this.ultimos4.length > 4) { // VERIFICO QUE SIEMPRE SEAN 4
            this.ultimos4.splice(-1, 1);
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);
        this.grabarArchivo();
        return atenderTicket;
    }
    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }


}
module.exports = {
    TicketControl
};