// websocket

const Html5WebSocket = require('html5-websocket');
const ReconnectingWebSocket = require('reconnecting-websocket');

// websocket initialization
let isServerLocal = false;
let ws_host = 'smartgeometry.herokuapp.com';
let ws_port = '80';
if (isServerLocal) {
    let ws_host = 'localhost';
    let ws_port = '3000';
}
const options = { constructor: Html5WebSocket };
const rws = new ReconnectingWebSocket('ws://' + ws_host + ':' + ws_port + '/ws', undefined, options);
rws.timeout = 1000;

rws.addEventListener('open', () => {
    console.log('[Client] Connection to WebSocket server was opened.');
    rws.send('Hello, this is a message from a client.');
    rws.send(JSON.stringify({
        method: 'set-background-color',
        params: {
            color: 'seagreen'
        }
    }));
});

rws.addEventListener('message', (e) => {
    console.log('[Client] Message received: ' + e.data);

    try {
        let m = JSON.parse(e.data);
        handleMessage(m);
    } catch (err) {
        console.log('[Client] Message is not parseable to JSON.');
    }

});

rws.addEventListener('close', () => {
    console.log('[Client] Connection closed.');
});

rws.onerror = (err) => {
    if (err.code == 'EHOSTDOWN') {
        console.log('[Client] Error: server down.');
    }
};

// handlers

let handlers = {
    "set-background-color": function(m) {
        // ...
        console.log('[Client] set-background-color handler.');
        console.log('[Client] Color is ' + m.params.color);
    }
};

function handleMessage(m) {

    if (m.method == undefined) {
        return;
    }

    let method = m.method;

    if (method) {

        if (handlers[method]) {
            let handler = handlers[method];
            handler(m);
        } else {
            console.log('[Client] No handler defined for method ' + method + '.');
        }

    }

}