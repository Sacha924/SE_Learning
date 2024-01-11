// Import the required libraries
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

const messagesFile = 'data.txt';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New client connected!');
    ws.send('Welcome to the chat!');

    fs.readFile(messagesFile, { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const messages = data.split('\n').filter(line => line);
            messages.forEach(message => ws.send(message));
        }
    });


    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);

        fs.appendFile(messagesFile, message + '\n', err => {
            if (err) console.error('Error writing to file', err);
        });

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });


    });

    ws.on('close', () => {
        console.log('Client has disconnected');
    });
});


server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
