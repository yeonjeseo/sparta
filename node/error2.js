import fs from "fs";
setInterval(() => {
  fs.unlink("./asdasd.txt", (err) => (err ? console.log(err) : null));
}, 1000);
