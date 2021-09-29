import fs from "fs/promises";

fs.readFile("./readme.txt").then((data) => console.log(data));

try {
  const data = await fs.readFile("./readme.txt", "utf8");
  console.log(data);
} catch (err) {
  console.log(err);
}

const obj = {
  name: "yeoneseo",
  age: 32,
  gender: "man",
};

try {
  const result = await fs.writeFile("./writeFile.txt", obj);
  console.log(result);
} catch (err) {
  console.log(err);
}

try {
  const result = await fs.writeFile("./writeFile.txt", JSON.stringify(obj));
  console.log(result);
} catch (err) {
  console.log(err);
}
