const fs = require('fs');

const rawFile = fs.readFileSync('d-6/input.txt', { encoding: 'utf-8' });

const answerGroups = rawFile.split(/\n\n/);

/* 
IF: 
The first group contains one person who answered "yes" to 3 questions: a, b, and c.
The second group contains three people; combined, they answered "yes" to 3 questions: a, b, and c.
The third group contains two people; combined, they answered "yes" to 3 questions: a, b, and c.
The fourth group contains four people; combined, they answered "yes" to only 1 question, a.
The last group contains one person who answered "yes" to only 1 question, b.
In this example, the sum of these counts is 3 + 3 + 3 + 1 + 1 = 11.

For each group, count the number of questions to which anyone answered "yes". What is the sum of those counts?
*/

// Part 1:
let any = 0;

answerGroups.forEach((group) => {
  let singleLine = group.replace(/\n/g, '');
  any += new Set(singleLine).size;
});

console.log(any);

// Part 2:
/* 
You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!
*/

let all = 0;

for (let group of answerGroups) {
  let contents = {};

  let splitGroup = group.split(/\n/);

  splitGroup.forEach((response) => {
    response.split('').forEach((i) => {
      if (contents[i]) {
        contents[i] = contents[i] + 1;
      } else {
        contents[i] = 1;
      }
    });
  });

  for (letter in contents) {
    if (contents[letter] == splitGroup.length) {
      all++;
    }
  }
}

console.log(all);
