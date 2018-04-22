/**
 * A minimal WebSockets server in node
 * using http://github.com/websockets/ws
 */

//'use strict';

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {

    console.log('Client connected');

    ws.on('close', () => console.log('Client disconnected'));

    ws.on('message', function incoming(message) {

        console.log('[Server] Received message: %s', message);

        // Broadcast to everyone else.
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

    });
});