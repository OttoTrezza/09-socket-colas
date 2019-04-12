// ** YO SOY EL CLIENTE */

var label = $('#lblNuevoTicket');

// Comando para establecer la conecicon
var socket = io();

socket.on('connect', function() {
    console.log('Conectado al Servidor');
});


socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});

socket.on('disconnect', function() {
    console.log('Desonectado del Servidor');
});


$('button').on('click', function() { // Cuando clickeen en nuevo-ticket.html, ejecuto function(){...esto...}
    console.log('click');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);
    }); // le hablo al socket(motoquero) y le digo que lleve "TICKET" al SERVER

});