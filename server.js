const net = require('net');
const getArrayOfQA = require('./getArrayOfQA');
const port = 8124;
let questionAndAnswers = getArrayOfQA('qa.json');

const server = net.createServer((client) => {
    let seed = 0;
    console.log('Client connected');

    client.setEncoding('utf8');
    let isConnected = false;
	client.on('end', () => console.log('Client disconnected'));
	client.on('data', (data) => {
        console.log("Received from client: " + data);
        if (isConnected)
        {
	        let max = questionAndAnswers.length;

	        let rand = max * Math.random();
	        rand = Math.floor(rand);

	        console.log(data + " " + questionAndAnswers[rand].answer + "\r\n");
	        client.write('' + questionAndAnswers[rand].answer);
        }
        else
        {
            if (data === 'QA')
	        {
	        	isConnected = true;
	        	client.write("ACK");
	        }
	        else
	        {
		        client.write("DEC");
		        client.end();
	        }
        }
    });

    client.identifier = Date.now() + seed++; // unique id

});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});
