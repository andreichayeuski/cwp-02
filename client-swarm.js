const child_process = require("child_process");

for (let i = 0; i < process.argv[2]; i++)
{
	console.log(i.toString());
	child_process.exec("node client.js", (err, sysout) =>
	{
		if (err)
		{
			console.error(err);
			return;
		}
		console.log("   ---***---   " + i + "   ---***---   ");
		console.log(sysout);
	});
}