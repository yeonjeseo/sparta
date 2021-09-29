console.log("hello world!");

setImmediate(() => {
  console.log("Immediate");
});

setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("resloved!"));

process.nextTick(() => console.log("nextTick!"));
