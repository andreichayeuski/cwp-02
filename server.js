const net = require('net');
const fs = require('fs');
const getArrayOfQA = require('./getArrayOfQA');
const port = 8124;
let questionAndAnswers = getArrayOfQA('qa.json');

fs.mkdir("log", (err) =>
{
	if (err)
	{
		throw "Error founded: " + err;
	}
});
const server = net.createServer((client) => {
    let seed = 0;
    console.log('Client connected');
	client.identifier = Date.now() + seed++; // unique id
	let filename = `log/client_${client.identifier}.log`;
	fs.writeFile(filename, "", function (err) {
		if (err)
		{
			throw "Error found: " + err;
		}
	});

    client.setEncoding('utf8');
    let isConnected = false;
	client.on('end', () => console.log('Client disconnected\r\n'));
	client.on('data', (data) => {
        console.log("Received from client: " + data);
        fs.appendFileSync(filename, data + "\r\n");
        if (isConnected)
        {
	        let max = questionAndAnswers.length;

	        let rand = max * Math.random();
	        rand = Math.floor(rand);

	        console.log(data + " " + questionAndAnswers[rand].answer + "\r\n");
	        let message = '' + questionAndAnswers[rand].answer;
	        client.write(message);
	        fs.appendFileSync(filename, message + "\r\n");
        }
        else
        {
	        let message = "";
            if (data === 'QA')
	        {
	        	isConnected = true;
	        	message = "ACK";
	        	client.write(message);
	        }
	        else
	        {
	        	message = "DEC";
		        client.write(message);
		        client.end();
	        }
	        fs.appendFileSync(filename, message + "\r\n");
        }
    });


});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});
