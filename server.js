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
    socket.on('userJoined', (name) => {
        socket.nickname = name;

        const otherParticipantResponse = {
            name: 'Server',
            timestamp: {
                date: `13-02-2021`,
                time: `Test hour`
            },
            message: `${name} has joined.`
        } 

        const socketReponse = {
            name: 'Server',
            timestamp: {
                date: `13-02-2021`,
                time: `Test hour`
            },
            message: `Weclome to the Lets Talk.`
        }

        socket.emit('userJoined', socketReponse)

        socket.broadcast.emit('userJoined', otherParticipantResponse);
    })

    socket.on('messageSent', (message) => {
        var response = {
            name: socket.nickname,
            timestamp: {
                date: `13-02-2021`,
                time: `Test hour`
            },
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
