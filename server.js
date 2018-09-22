const net = require('net');
const port = 8124;

const server = net.createServer((client) => {
    let seed = 0;
    console.log('Client connected');

    client.setEncoding('utf8');

    client.on('data', (data) => {
        console.log(data);
        if (data === 'QA')
        {
            client.write("ACK");
        }
        else
        {
            client.write("DEC");
            client.on('end', () => console.log('Client disconnected'));
            client.end();
        }
    });

    client.identifier = Date.now() + seed++; // unique id

});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});
