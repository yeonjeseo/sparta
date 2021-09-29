import path from "path";

const string = path.resolve();
console.log(string);
// const string = __filename;
console.log(`path.sep : ${path.sep}`);
console.log(`path.delimiter : ${path.delimiter}`);
console.log(`-----------------------------------`);
console.log(`path.dirname() : ${path.dirname(string)}`);
console.log(`path.extname() : ${path.extname(string)}`);
console.log(`path.basename() : ${path.basename(string)}`);
console.log(
  `path.basename - extname : ${path.basename(string, path.extname(string))}`
);
