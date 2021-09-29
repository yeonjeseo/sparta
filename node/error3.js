process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("여긴 이벤트");
});

setInterval(() => {
  throw new Error("서버를 고장내주마!");
}, 2000);
