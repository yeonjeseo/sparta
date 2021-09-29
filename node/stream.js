import fs from "fs";

const readStream = fs.createReadStream("./readme2.txt", { highWaterMark: 16 });
const data = [];

readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data : ", chunk, chunk.length);
});

readStream.on("end", () => {
  console.log(data);
  console.log("end : ", Buffer.concat(data).toString());
});

readStream.on("error", (err) => {
  console.log("error : ", err);
});
