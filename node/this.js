console.log(this);
console.log(this === module.exports);
console.log(this === exports);
function whatIsthis() {
  console.log("fucntion", this === exports, this === global);
}
whatIsthis();
