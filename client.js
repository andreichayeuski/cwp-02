const net = require('net');
const readline = require('readline');
const port = 8124;

const client = new net.Socket();

client.setEncoding('utf8');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Input a command\r\n', (answer) => {
        client.connect(port, function() {
            console.log('Connected');
            client.write(answer);
        });

        client.on('data', function(data) {
            console.log(data);
            if (data === "ACK")
            {
                client.write("ok");
            }
            // client.destroy();
        });

        client.on('close', function () {
            console.log('Connection closed');
        });
    rl.close();
});
