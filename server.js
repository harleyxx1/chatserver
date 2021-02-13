const express = require('express');
const dotenv = require('dotenv');
const crypto = require('crypto');

const { Socket } = require('./backend/socket');

//initialize dotenv.
dotenv.config();

//initialize express app.
const app = express();

//initialize http server;
const http = require('http').Server(app);

const socket = new Socket(http);

app.get('/', (req, res) => {
    res.send('hehehe')
})

//initialize port to listen.
const PORT = process.env.PORT || 5000;

//server listen to PORT.
http.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});