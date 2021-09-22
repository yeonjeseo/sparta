async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!!"), 3000);
  });
  console.log("before await");
  let result = await promise;
  console.log("after await");
  console.log(result);
}

f();
