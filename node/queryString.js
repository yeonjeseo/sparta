import url from "url";
import queryString from "querystring";

const parsedUrl = url.parse(
  "http://www.gitbout.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);
const query = queryString.parse(parsedUrl.query);

console.log(query);
// console.log(`queryString.parse() : ${query}`);
console.log(`queryString.stringify() : ${queryString.stringify(query)}`);

const obj = {
  title: "title",
  author: "author",
};

console.log(`obj is ${JSON.stringify(obj)}`);
console.log(`${obj}`);
