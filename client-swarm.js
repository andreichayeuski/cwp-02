const child_process = require("child_process");
const client = require("./client");

for (let i = 0; i < parseInt(process.argv[2], 10); i++)
{
	console.log(i.toString());
	client();
	/*child_process.exec("node ./client.js", (err, sout, serr) =>
	{
		if (err)
		{
			console.error(err);
			return;
		}
		console.log("   ---***---   " + i + "   ---***---   ");
		console.log(sout);
	});*/
}