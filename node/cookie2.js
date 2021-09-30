import http from "http";
import fs from "fs/promises";
import url from "url";
import qs from "querystring";

const parserCookies = (cookie = "") => {
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
};

http
  .createServer(async (req, res) => {
    const cookies = parserCookies(req.headers.cookie);
    console.log(cookies);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();

      // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
      expires.setMinutes(expires.getMinutes() + 5);
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      res.end();
    } else if (cookies.name != undefined) {
      //name이라는 쿠키가 있는 경우
      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end(`${cookies.name}님 안녕하세요!`);
    } else {
      try {
        const data = await fs.readFile("./cookie2.html");
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
        });
        res.end(data);
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "textp/plain; charset-utf-8",
        });
        res.end(err.message);
      }
    }
  })
  .listen(8080, () => {
    console.log("8080포트에서 대기중입니다.");
  });
