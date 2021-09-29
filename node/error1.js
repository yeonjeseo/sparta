let cnt = 0;
setInterval(() => {
  console.log("시작!");
  cnt++;
  try {
    throw new Error(`서버를 고장내주마! ${cnt}`);
  } catch (err) {
    console.log(err);
  }
}, 1000);
