const condition = 1;

const promise = new Promise((resolve, reject) => {
  if (condition) resolve(1);
  else reject(0);
});

promise
  .then((message) => console.log(message))
  .catch((reject) => console.log(reject));

const f1 = async () => {
  const result = await promise;
  console.log(result);
};
f1();
