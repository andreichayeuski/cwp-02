const net = require('net');
const readLine = require('readline');
const fs = require('fs');
const port = 8124;
let questionAndAnswers = [];

var Question = function(question, answer) {
	this.question = question;
	this.answer = answer;
};

const client = new net.Socket();

client.setEncoding('utf8');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.readFile('qa.json','utf-8', (err, content) =>
{
	if (err)
	{
		throw err;
	}
	JSON.parse(content, (question, answer) =>
	{
		questionAndAnswers.push(new Question(question, answer));
	});
	questionAndAnswers.pop();
	console.log(questionAndAnswers);
	questionAndAnswers.sort();
	console.log(questionAndAnswers);
});
//rl.question('Input a command\r\n', (answer) => {
        client.connect(port, function() {
            console.log('Connected');
            client.write("QA");
        });

        client.on('data', function(data) {
            console.log(data);
            if (data === "ACK")
            {
				questionAndAnswers.forEach((data) =>
				{
					console.log(data);
					client.write(`Question: ${data.question}`);
				});
            }
            else
            {
                console.log("array\r\n" + data);
	            client.destroy();
            }
        });

        client.on('close', function () {
            console.log('Connection closed');
        });
   // rl.close();
//});
