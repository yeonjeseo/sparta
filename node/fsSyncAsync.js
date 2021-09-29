import fs from "fs";

// 비동기, 콜백 방식 - > 순서 보장 안됨
console.log("시작");
// fs.readFile("./readme2.txt", (err, data) => {
//   if (err) throw err;
//   console.log("1번", data.toString());
// });

// fs.readFile("./readme2.txt", (err, data) => {
//   if (err) throw err;
//   console.log("2번", data.toString());
// });

// fs.readFile("./readme2.txt", (err, data) => {
//   if (err) throw err;
//   console.log("3번", data.toString());
// });

// fs.readFile("./readme2.txt", (err, data) => {
//   if (err) throw err;
//   console.log("4번", data.toString());
// });

console.log("비동기, 콜백 -> 순서대로 찍기");
// 비동기 , 콜백 -> 순서대로 찍기, 콜백 지옥
// fs.readFile("./readme2.txt", (err, data) => {
//   if (err) throw err;
//   console.log("1번", data.toString());
//   fs.readFile("./readme2.txt", (err, data) => {
//     if (err) throw err;
//     console.log("2번", data.toString());
//     fs.readFile("./readme2.txt", (err, data) => {
//       if (err) throw err;
//       console.log("3번", data.toString());
//       fs.readFile("./readme2.txt", (err, data) => {
//         if (err) throw err;
//         console.log("4번", data.toString());
//       });
//     });
//   });
// });

console.log("비동기, promise 사용");
fs.promises
  .readFile("./readme2.txt")
  .then((data) => {
    console.log("1번", data.toString());
    return fs.promises.readFile("./readme2.txt");
  })
  .then((data) => {
    console.log("2번", data.toString());
    return fs.promises.readFile("./readme2.txt");
  })
  .then((data) => {
    console.log("3번", data.toString());
    return fs.promises.readFile("./readme2.txt");
  })
  .then((data) => {
    console.log("4번", data.toString());
  })
  .catch((err) => console.log(err));
