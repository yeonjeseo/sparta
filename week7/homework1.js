let personArray = [
  { name: "John Doe", age: 20 },
  { name: "Jane Doe", age: 18 },
  { name: "Marcus Doe", age: 22 },
  { name: "Austin Doe", age: 17 },
];

for (let i = 0; i < personArray.length; i++) {
  console.log(personArray[i]);
}
for (let person in personArray) {
  console.log(personArray[person]);
}

for (let person of personArray) {
  console.log(person);
}

personArray.forEach((person) => console.log(person));

const isOdd = (num) => (num % 2 !== 0 ? true : false);
const isEven = (num) => (num % 2 === 0 ? true : false);

const chkName = (name) => (name === "John Doe" ? true : false);

personArray.forEach((person) => {
  if (chkName(person.name)) {
    console.log(`Here's your beer! ${person.name}!`);
  } else {
    console.log(`Get out! ${person.name}!!`);
  }
});

let childrenArray = [];
// const getChildren = (personArray) => {
//   personArray.forEach((person) => {
//     if (person.age < 18) childrenArray.push(person);
//   });
// };

const getChildren = (personArray) => {
  childrenArray = personArray.filter((person) => person.age < 18);
};
getChildren(personArray);
console.log(childrenArray);
// const isAdult = (personArray) => {
//   personArray.forEach(person => {
//     return person.age > 20 ? true : false;
//   })
// }
