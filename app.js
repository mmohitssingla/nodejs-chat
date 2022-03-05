require('dotenv').config();

const server = require('http').createServer();
const io = require('socket.io')(server, {
    allowEIO3: true
});
const chatHandler = require('./chatHandler');

const onConnection = (socket) => {
    chatHandler(io, socket);
}

io.on('connection', onConnection);

let port = process.env.PORT || 3000;
server.listen(port);
