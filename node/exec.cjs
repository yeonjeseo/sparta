const exec = require("child_process").exec;

const process = exec("python3 hello.py");

process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.log(data.toString());
});
