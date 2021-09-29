import EventEmitter from "events";

const myEvent = new EventEmitter();

myEvent.addListener("event1", () => {
  console.log("이벤트 1");
});

myEvent.on("event2", () => {
  console.log("이벤트 2");
});

myEvent.on("event2", () => {
  console.log("이벤트 2 추가");
});

myEvent.once("event3", () => {
  console.log("이벤트 3");
});

myEvent.emit("event1");
myEvent.emit("event2");

myEvent.emit("event3");
myEvent.emit("event3");

myEvent.on("event4", () => {
  console.log("이벤트 4");
});

myEvent.emit("event4");
myEvent.removeAllListeners("event4");
myEvent.emit("event4");

const handler = () => {
  console.log("이벤트 5");
};

// myEvent.addListener("event5", handler);
// myEvent.emit("event5");

myEvent.on("event5", handler);
myEvent.emit("event5");

console.log(myEvent.listenerCount("event5"));
