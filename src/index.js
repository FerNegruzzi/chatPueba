const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io')
const router = require('./router');

const port = 9000;
const messages = []

// sv HTTP (para APIS)
const app = express();
// middlewors
app.use(express.json());
app.use(express.static(__dirname + '/public'));

router(app)
// motores de plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');


const httpServer = app.listen(port, () => {
    console.log(`SV running at port ${port}`);
})

//IO = un SV con protocolo WebScocket (real time)
const io = new Server(httpServer)

io.on('connection', socket => {
    console.log(`Client connectd with id ${socket}`);

    socket.on('newUser', user => {
        socket.broadcast.emit('userConnected', user)
        socket.emit('messageLogs', messages)
    })

    socket.on('message', data => {
        messages.push(data)
        // socket.broadcast.emit manda a todos menos a mi --- io.emit manda a TODOS incluso yo
        io.emit('messageLogs', messages)
    })
})