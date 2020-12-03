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

/*
  Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

  Given the same example list from above:

  1-3 a: abcde is valid: position 1 contains a and position 3 does not.
  1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
  2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
  How many passwords are valid according to the new interpretation of the policies?
*/

function validPasswordPositions(password) {
  let firstInstance = password.password[password.min - 1];
  let secondInstance = password.password[password.max - 1];
  return (
    (firstInstance === password.char && secondInstance !== password.char) ||
    (firstInstance !== password.char && secondInstance === password.char)
  );
}

let validPositionPasswords = 0;

for (password of passwords) {
  validPasswordPositions(password) ? validPositionPasswords++ : null;
}
