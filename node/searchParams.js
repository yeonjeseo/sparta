import { URL } from "url";

const myUrl = new URL(
  "http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript"
);
console.log(`searchParams : ${myUrl.searchParams}`);
console.log(`searchParams.getAll() : ${myUrl.searchParams.getAll("category")}`);
console.log(`searchParams.get() : ${myUrl.searchParams.get("limit")}`);
console.log(`searchParams.has : ${myUrl.searchParams.has("page")}`);
console.log(`searchParams.has : ${myUrl.searchParams.has("code")}`);

console.log(`serachParams.keys() : ${myUrl.searchParams.keys()}`);

const keys = myUrl.searchParams.keys();
console.log(keys);

console.log(`serachParams,values() : ${myUrl.searchParams.values()}`);
const values = myUrl.searchParams.values();
for (const value of values) console.log(value);
