/* 
  INSTRUCTIONS: 
  For example, suppose you have the following list:

  1-3 a: abcde
  1-3 b: cdefg
  2-9 c: ccccccccc

  Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

  In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

  How many passwords are valid according to their policies?
*/

// Read input file
const fs = require('fs');

const file = fs
  .readFileSync('d-2/input.txt', { encoding: 'utf-8' })
  .split('\n');

// make lots of objects out of file array
const passwords = [];

file.forEach((password) => {
  let pass = password.split(' ');
  let thisPass = {
    min: +pass[0].split('-')[0],
    max: +pass[0].split('-')[1],
    char: pass[1].replace(':', ''),
    password: pass[2],
  };
  passwords.push(thisPass);
});

function validPassword(passObj) {
  let letterInstance = passObj.password.match(new RegExp(passObj.char, 'g'));
  if (letterInstance) {
    return (
      letterInstance.length >= passObj.min &&
      letterInstance.length <= passObj.max
    );
  } else {
    return false;
  }
}

let validPasswords = 0;

for (password of passwords) {
  validPassword(password) ? validPasswords++ : null;
}

console.log(validPasswords);
