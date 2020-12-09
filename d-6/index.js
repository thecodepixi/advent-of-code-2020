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
