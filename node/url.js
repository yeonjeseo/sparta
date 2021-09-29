import url from "url";

// const URL = url.URL;
const { URL } = url;

const myURL = new URL(
  "http://www.gitbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor"
);
console.log("new URL()", myURL);
console.log(`url.format() : ${url.format(myURL)}`);

console.log(`----------------------------`);
const parsedUrl = url.parse(
  `http://www.gitbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor`
);
console.log(`url.parse() : ${url.parse(parsedUrl)}`);
const obj = url.parse(parsedUrl);
console.log(obj);
console.log(`url.format() : ${url.format(parsedUrl)}`);
