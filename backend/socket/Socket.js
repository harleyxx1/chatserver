const socket = require('socket.io');

class Socket { 
    constructor(http) {
        this.http = http;
        this.io = socket(this.http);

        this.io.on('connection', (socket) => {

            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var newTime = {
                date: `${day}-${month}-${year}`,
                time: `${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0'+minutes : minutes} ${hour > 11 ? 'PM' : AM}`
            }

            this.socket = socket;

            socket.on('userJoined', (name) => {
                socket.nickname = name;

                var otherParticipantResponse = {
                    name: 'Server',
                    timestamp: newTime,
                    message: `${name} has joined.`
                } 

                var socketReponse = {
                    name: 'Server',
                    timestamp: newTime,
                    message: `Weclome to the Lets Talk.`
                }

                socket.emit('userJoined', socketReponse)

                socket.broadcast.emit('userJoined', otherParticipantResponse);
            })

            socket.on('messageSent', (message) => {
                var response = {
                    name: socket.nickname,
                    timestamp: newTime,
                    message: message
                } 
                this.io.emit('messageReceived', response);
            })
        })
    }

    getSocket = () => {
        return this.socket;
    }
}

module.exports = Socket;