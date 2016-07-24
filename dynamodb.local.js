var env = process.env;

var exec = require('child_process').exec;

var port = env.DB_PORT || 8001;

// Execute some command with process.env and my custom variables
var command = 'java -Djava.library.path=DynamoDBLocal_lib -jar DynamoDBLocal/DynamoDBLocal.jar" +' +
    ' -port ' + port +
    ' -optimizeDbBeforeStartup' +
    ' -dbPath DynamoDBLocal';
console.log("Executing " + command);
var child = exec(command, {env: env}, function (err, stdout, stderr) {
    if (err) {
        throw err;
    }
    // console.log(stdout);
    // console.error(stderr);
});

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

module.exports = function (keep_process_alive) {
    // Keep the thread alive forever
    if (keep_process_alive) {
        setInterval(function () {
        }, Math.POSITIVE_INFINITY);
    }
    return child;
};


