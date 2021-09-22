const personArray = [
  { name: "John Doe", age: 20 },
  { name: "Jane Doe", age: 19 },
  { name: "Fred Doe", age: 32 },
  { name: "Chris Doe", age: 45 },
  { name: "Layla Doe", age: 37 },
];

const ageAverage = (personArray) => {
  let total = 0;
  personArray.forEach((person) => {
    total += person.age;
  });
  console.log(total / personArray.length);
};

ageAverage(personArray);
// function getAgeAverage(personArray) {
//   let total = personArray.reduce((prev, curr) => {
//     return prev + curr.age;
//   }, 0);

//   return total / personArray.length;
// }

// console.log(getAgeAverage(personArray)); // 30.6

// for (let person of personArray) {
//   console.log(person);
// }
