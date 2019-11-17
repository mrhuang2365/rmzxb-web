const path = require('path');
const http = require('http');
const express = require('express');
const app = express();

const Port = 3000
const server = http.createServer(app)

// app.use('/static',express.static('./static'))
app.use('/',express.static('./dist'))

server.listen(Port, () => {
  console.log('Listening on Port:', Port)
})