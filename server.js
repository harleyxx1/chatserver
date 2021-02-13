const express = require('express');
const dotenv = require('dotenv');
const socket = require('socket.io');

//initialize dotenv.
dotenv.config();

//initialize express app.
const app = express();

//initialize http server;
const http = require('http').Server(app);

const io = socket(http);

io.on('connection', (socket) => {
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
        io.emit('messageReceived', response);
    })
})

app.get('/', (req, res) => {
    res.send('hehehe')
})

//initialize port to listen.
const PORT = process.env.PORT || 5000;

//server listen to PORT.
http.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
