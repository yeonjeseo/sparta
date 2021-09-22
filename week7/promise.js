const isReady = true;
const promise = new Promise((resolve, reject) => {
  if (isReady) resolve("It's Ready");
  reject("Not ready!");
});

promise
  .then((resolve) => console.log(resolve))
  .catch((reject) => console.log(reject))
  .finally(() => console.log("done"));
