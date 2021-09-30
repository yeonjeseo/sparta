import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
  try {
    const buffer = await fs.readFile("./main.html");
    const template = buffer.toString();
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.write(template);
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    res.end(err.message);
  }
});

server.listen(8080);

server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중!");
});

server.on("error", (error) => {
  console.error(error);
});
