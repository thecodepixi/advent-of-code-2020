/* 
INSTRUCTIONS:
Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

For example, suppose your expense report contained the following:

1721
979
366
299
675
1456
In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?
*/

// Read input file
const fs = require('fs');

const file = fs.readFileSync('d-1/input.txt', { encoding: 'utf-8' });

const inputArray = file
  .split('\n')
  .filter((i) => i !== '')
  .map((n) => parseInt(n));

// start of actual functions

function findTwo2020(arr) {
  for (let n of arr) {
    for (let i of arr) {
      if (n + i === 2020) {
        return console.log(n * i);
      }
    }
  }
}

findTwo2020(inputArray);

function findThree2020(arr) {
  for (let n of arr) {
    for (let i of arr) {
      for (let p of arr) {
        if (n + i + p === 2020) {
          return console.log(n * i * p);
        }
      }
    }
  }
}

findThree2020(inputArray);
